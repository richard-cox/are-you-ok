
<script lang="ts">
import { Component, Watch } from "nuxt-property-decorator";
import { ComponentStoreHelper } from "~/utils/store-helper";
import Twitter, { TwitterStreamSettings } from "../store/twitter";
import SentimentHelper from "~/utils/sentiment-helper";
import _ from "lodash";
import { Howl, Howler } from "howler";

// TODO: DEMO - lodash, same with howler
// yarn add lodash
// yarn add @types/lodash -d
// Restarted vscode!

//

@Component<TwitterStream>({
  beforeRouteLeave(to, from, next) {
    if (this.twitter.settings.streamOnlyOnPage) {
      this.twitter.stop();
    }
    next();
  },
})
export default class TwitterStream extends ComponentStoreHelper {
  private twitter: Twitter;
  private tableHeaders = [
    {
      text: "Tweet",
      align: "start",
      sortable: false,
      value: "text",
    },
    {
      text: "Sentiment",
      value: "sentiment",
      sortable: false,
      width: 100,
    },
    { text: "Received", value: "received", sortable: true, width: 250 },
  ];
  private settings: TwitterStreamSettings;

  constructor() {
    super();
    this.twitter = this.store.twitter;
    this.settings = {
      ...this.twitter.settings,
    };
  }

  getColour(sentiment: number): string {
    return SentimentHelper.getSentimentState(sentiment).colour;
  }

  @Watch("settings", { deep: true }) // TODO: Demo
  settingsChanged() {
    this.twitter.setSettings(this.settings);
  }

  @Watch("lastTweet")
  lastTweetChanged = _.throttle(() => {
    if (!this.twitter.settings.soundEnabled) {
      return;
    }
    console.log("PLAYING SOUND");

    const soundFile = SentimentHelper.getSentimentState(
      this.lastTweet.sentiment
    ).sound.default;
    const howl = new Howl({
      src: soundFile,
      autoplay: true,
      preload: true,
    });

    howl.play();
    // const sound = new Audio(soundFile);
    // sound.play();
    // _.throttle(() => void, 500)
  }, 5000);

  get lastTweet() {
    return this.twitter.tweets[0];
  }
}
</script>

<template>
  <v-col>
    <h2>Twitter Stream</h2>
    <v-col class="twitter-stream">
      <v-row justify="center" class="mb-11">
        <v-btn
          depressed
          color="primary"
          v-if="twitter.isStreaming"
          @click="twitter.stop()"
        >
          Stop Stream
        </v-btn>
        <v-btn depressed color="primary" v-else @click="twitter.start()">
          Start Stream
        </v-btn>
      </v-row>
      <v-tabs>
        <v-tab>Stream</v-tab>
        <v-tab>Settings</v-tab>

        <v-tab-item>
          <v-card flat class="">
            <v-data-table
              dense
              :headers="tableHeaders"
              :items="twitter.tweets"
              item-key="id"
              class="elevation-1 flex-grow-1"
              :footer-props="{
                showFirstLastPage: true,
              }"
              :no-data-text="'No Tweets? Start streaming'"
            >
              <!-- TODO: Demo?  -->
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.sentiment="{ item }">
                <v-chip
                  label
                  :color="getColour(item.sentiment)"
                  dark
                  class="cell-sentiment"
                >
                  {{ item.sentiment }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-checkbox
              dense
              v-model="settings.filterZeroSentiment"
              :label="`Filter Tweets with no sentiment`"
            ></v-checkbox>
            <!-- TODO: Demo change :value to value -->
            <v-checkbox
              dense
              v-model="settings.streamOnlyOnPage"
              :label="`Stop stream on tab exit`"
            ></v-checkbox>
            <v-checkbox
              dense
              v-model="settings.soundEnabled"
              :label="`Enable Sound`"
            ></v-checkbox>
            <!-- TODO: Demo v-btn attribute autocomplete - outline/outlined -->
            <v-btn depressed color="primary" outlined @click="twitter.clear()">
              Clear All Tweets
            </v-btn>
          </v-card>
        </v-tab-item>
      </v-tabs>

      <v-col class="text-center">
        <!--
          " -->
      </v-col>
      <v-row> </v-row>
    </v-col>
  </v-col>
  <!-- TODO: RC HA! https://github.com/joe4dev/simple-sentiment-analysis -->
</template>




<style lang="scss" scoped>
// TODO: RC move to common
.twitter-stream {
  // .section {
  //   &-header {
  //     padding-bottom: 10px;
  //   }
  //   &-body {
  //     padding-bottom: 10px;

  //     .v-input__slider {
  //       flex: 0 0 200px;
  //     }
  //   }
  // }

  // .small-spacer {
  //   padding: 0 10px;
  // }

  .cell-sentiment {
    margin: 8px;
  }

  .v-window-item {
    & > .v-card,
    .v-data-table {
      padding: 10px;
    }
  }
}
</style>
