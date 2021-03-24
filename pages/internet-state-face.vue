
<script lang="ts">
import { Component, Watch } from "nuxt-property-decorator";
import { ComponentStoreHelper } from "~/utils/store-helper";
import Twitter from "../store/twitter";
import SentimentHelper from "~/utils/sentiment-helper";

// TODO: RC demo? enums in ts/js
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

  mounted() {
    const sentiment = this.getSentimentState(0);
    const sound = new Audio(sentiment.sound.default);
    sound.play();
  }

  @Watch("score", {
    immediate: false,
  }) // TODO: Demo
  scoreChanged() {
    const sentiment = this.getSentimentState(this.score);

    const sound = new Audio(sentiment.sound.default);
    sound.play();
  }
}

// TODO: RC score over last minute/hour/day/etc
// TODO: RC add clear tweets
// TODO: RC add sound!
// TODO: RC Score is not always -5 to +5!
</script>

<template>
  <v-col>
    <h2>Internet State Face</h2>
    <v-col class="internet-state-face text-center mb-11">
      <template v-if="twitter.totalTweets === 0">
        <v-row justify="center">Internet has no state?</v-row>
        <v-row justify="center">
          <v-btn depressed color="primary" to="twitter-stream">Get Some</v-btn>
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
            <!-- TODO: RC if have time, v-for on enum, captialise name -->
            <v-btn elevation="4" small :value="timeframeEnum.SECONDS">
              Seconds
            </v-btn>
            <v-btn elevation="4" small :value="timeframeEnum.MINUTES">
              Minutes
            </v-btn>
            <v-btn elevation="4" small :value="timeframeEnum.HOURS">
              Hours
            </v-btn>
            <v-btn elevation="4" small :value="timeframeEnum.ALL"> ALL </v-btn>
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
  </v-col>
</template>




<style lang="scss" scoped>
// TODO: RC move to common
.internet-state-face {
  .time-amount {
    max-width: 100px;
    max-height: 38px;
    padding-left: 5px;
  }
}
</style>
