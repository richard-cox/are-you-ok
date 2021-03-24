
<script lang="ts">
import { Component, Watch } from "nuxt-property-decorator";
import { ComponentStoreHelper } from "~/utils/store-helper";
import Twitter from "../store/twitter";
import SentimentHelper from "~/utils/sentiment-helper";
import _ from "lodash";
import { Howl } from "howler";

// TODO: DEMO TS enums > JS map
enum Timeframe {
  SECONDS = 1000,
  MINUTES = 1000 * 60,
  HOURS = 1000 * 60 * 60,
  ALL,
}

@Component
export default class InternetStateFace extends ComponentStoreHelper {
  private twitter: Twitter;
  private sentimentRange = SentimentHelper.sentimentRange;
  private timeframe: Timeframe = Timeframe.ALL;
  private timeAmount: number = 1;
  private timeframeEnum = Timeframe;

  constructor() {
    super();
    this.twitter = this.store.twitter;
  }

  get score(): number {
    if (this.timeframe === Timeframe.ALL) {
      return this.twitter.cumulativeSentiment / this.twitter.totalTweets;
    }
    const ticks = this.timeframe * this.timeAmount;
    const now = new Date().getTime();
    const maxTime = now - ticks;
    let cumulativeSentiment = 0,
      totalTweets = 0;
    for (let index = 0; index < this.twitter.tweets.length; index++) {
      const tweet = this.twitter.tweets[index];
      if (tweet.received >= maxTime) {
        cumulativeSentiment += tweet.sentiment;
        totalTweets++;
      } else {
        break;
      }
    }

    return cumulativeSentiment / totalTweets;
  }

  getSentimentState(sentiment: number) {
    return SentimentHelper.getSentimentState(sentiment);
  }

  @Watch("score")
  scoreChanged = _.throttle(() => {
    if (!this.twitter.settings.soundEnabled) {
      return;
    }
    console.debug("State Face: Playing Sound: ", this.score);

    const soundFile = SentimentHelper.getSentimentState(this.score).sound
      .default;
    const howl = new Howl({
      src: soundFile,
      autoplay: true,
      preload: true,
    });
    howl.play();
  }, 1000);
}
</script>

<template>
  <v-card>
    <v-card-title> Internet State Face </v-card-title>
    <v-card-subtitle> Are you ok? </v-card-subtitle>
    <v-card-text>
      <v-col class="internet-state-face text-center mb-11">
        <template v-if="twitter.totalTweets === 0">
          <v-row justify="center">Internet has no state?</v-row>
          <v-row justify="center">
            <v-btn depressed color="primary" to="twitter-stream"
              >Get Some</v-btn
            >
          </v-row>
        </template>
        <template v-else>
          <v-row justify="center" class="mb-10">
            <v-icon
              :color="getSentimentState(score).colour"
              style="font-size: 200px"
              >{{ getSentimentState(score).icon }}</v-icon
            >
          </v-row>
          <v-row justify="center" class="mb-5"
            >Score: {{ score }} <br />(from
            {{ twitter.totalTweets }} tweets)</v-row
          >
          <v-row justify="center" class="mb-5 align-center">
            Timeframe:
            <v-text-field
              :disabled="timeframe === timeframeEnum.ALL"
              class="time-amount"
              dense
              solo
              type="number"
              v-model="timeAmount"
            ></v-text-field>
            <v-btn-toggle v-model="timeframe" tile color="accent-3" group>
              <!-- TODO: TODO if have time, v-for on enum, captialise name -->
              <v-btn elevation="4" small :value="timeframeEnum.SECONDS">
                Seconds
              </v-btn>
              <v-btn elevation="4" small :value="timeframeEnum.MINUTES">
                Minutes
              </v-btn>
              <v-btn elevation="4" small :value="timeframeEnum.HOURS">
                Hours
              </v-btn>
              <v-btn elevation="4" small :value="timeframeEnum.ALL">
                ALL
              </v-btn>
            </v-btn-toggle>
          </v-row>

          <v-row justify="center" class="">
            <table>
              <tr>
                <td v-for="score in sentimentRange" v-bind:key="score">
                  <v-icon :color="getSentimentState(score).colour" x-large>{{
                    getSentimentState(score).icon
                  }}</v-icon>
                </td>
              </tr>
              <tr>
                <td v-for="score in sentimentRange" v-bind:key="score">
                  {{ score }}
                </td>
              </tr>
            </table>
          </v-row>
        </template>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.internet-state-face {
  .time-amount {
    max-width: 100px;
    max-height: 38px;
    padding-left: 5px;
  }
}
</style>
