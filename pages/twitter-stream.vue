
<script lang="ts">
import { Component, Watch } from "nuxt-property-decorator";
import { ComponentStoreHelper } from "~/utils/store-helper";
import Twitter, { TwitterStreamSettings } from "../store/twitter";
import SentimentHelper from "~/utils/sentiment-helper";
import _ from "lodash";
import { Howl } from "howler";

// TODO: DEMO - Importing typing for JS dependencies is normally straight forward (`yarn add @types/<dep>`, works for lodash, howler)
// yarn add lodash
// yarn add @types/lodash -d
// Restarted vscode!

@Component<TwitterStream>({
  // TODO: DEMO - Nuxt Route leave properties are automatically typed
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
  <div>
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
                <!-- TODO: DEMO Interesting linting for vuetify slots! -->
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
              <!-- TODO: DEMO Component attribute behaviour - different in binded vs non-binded attribute value highlighting (change :value to value) -->
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
              <!-- TODO: DEMO Component attribute behaviour - autocomplete (v-btn `outline`/`outlined`) -->
              <v-btn
                depressed
                color="primary"
                outlined
                @click="twitter.clear()"
              >
                Clear All Tweets
              </v-btn>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-card-text>
    </v-card>
    <v-card class="mt-4">
      <v-card-title> About </v-card-title>
      <v-card-text>
        <p>
          Note - This stream requires a proxy backend running, see
          <code>./twitter-proxy</code>
        </p>
        <p>
          Continuing on from the more basic examples this page uses typescript store and component to present tweets
        </p>
        <p>
          The store will
          <ul>
            <li>Start a websocket connection to the local twitter proxy</li>
            <li>Recieve, apply sentiment analysis and store tweets from the local proxy</li>
          </ul>
        </p>
        <p>
          The component will
          <ul>
            <li>Interact with the store to start/stop the client websocket and persist settings</li>
            <li>Present the tweets in a table</li>
            <li>Optionally play a sound (this is throttled to one per second)</li>
          </ul>
        </p>
        <p>
          Note the Settings. These can be used to filter out the numerous tweets with zero sentiment and also enable sound
        </p>
        <p>
          A word on sentiment analysis... it can be excruciatingly difficult or very basic. Give the scope of this project I've gone for the latter and used <a href="https://github.com/thisandagain/sentiment">a small but decent library </a>
        </p>
        <p>
          Related files
          <ul>
            <li><code>./store/index.ts</code></li>
            <li><code>./store/twitter.ts</code></li>
            <li><code>./utils/store-helper.ts</code></li>
            <li><code>./twitter-proxy</code></li>
          </ul>
        </p>
      </v-card-text>
    </v-card>
  </div>
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
