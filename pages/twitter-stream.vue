
<script lang="ts">
import { Component, Watch } from "nuxt-property-decorator";
import { ComponentStoreHelper } from "~/utils/store-helper";
import Twitter, { TwitterStreamSettings } from "../store/twitter";
import SentimentHelper from "~/utils/sentiment-helper";
import _ from "lodash";
import { Howl } from "howler";

// TODO: DEMO - Adding type definitions for JS deps. lodash, same with howler
// yarn add lodash
// yarn add @types/lodash -d
// Restarted vscode!

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

  @Watch("settings", { deep: true }) // TODO: DEMO autocomplete
  settingsChanged() {
    this.twitter.setSettings(this.settings);
  }

  @Watch("lastTweet")
  lastTweetChanged = _.throttle(() => {
    if (!this.twitter.settings.soundEnabled) {
      return;
    }
    console.debug("State Stream: Playing Sound: ", this.lastTweet.sentiment);

    const soundFile = SentimentHelper.getSentimentState(
      this.lastTweet.sentiment
    ).sound.default;
    const howl = new Howl({
      src: soundFile,
      autoplay: true,
      preload: true,
    });

    howl.play();
  }, 1000);

  get lastTweet() {
    return this.twitter.tweets[0];
  }
}
</script>

<template>
  <v-card>
    <v-card-title> Tweets </v-card-title>
    <v-card-subtitle> The Twitter Sample Stream</v-card-subtitle>
    <v-card-text>
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
        <v-tabs background-color="#0000000f">
          <v-tab>Stream</v-tab>
          <v-tab>Settings</v-tab>

          <v-tab-item active-class="tab">
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
              <!-- TODO: DEMO Had to disable some linting rules -->
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
          </v-tab-item>
          <v-tab-item active-class="tab">
            <v-checkbox
              dense
              v-model="settings.filterZeroSentiment"
              :label="`Filter Tweets with no sentiment`"
            ></v-checkbox>
            <!-- TODO: DEMO change :value to value -->
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
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-card-text>
  </v-card>
</template>


<style lang="scss" scoped>
.twitter-stream {
  .cell-sentiment {
    margin: 8px;
  }

  $header: #0000000f;
  $tab: #1a1a1a;
  .v-tabs {
    .v-tabs-bar,
    .v-tabs-items,
    .v-data-table,
    .v-window-item {
      background-color: $tab;
    }

    .tab {
      padding: 10px;
    }
  }

  .v-window-item {
    .v-input {
      margin-top: 0;
    }
  }
}
</style>
