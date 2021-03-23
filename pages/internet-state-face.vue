
<script lang="ts">
import { Component } from "nuxt-property-decorator";
import { ComponentStoreHelper } from "~/utils/store-helper";
import Twitter from "../store/twitter";
import SentimentHelper from "~/utils/sentiment-helper";

@Component
export default class InternetStateFace extends ComponentStoreHelper {
  private twitter: Twitter;
  private sentimentRange = SentimentHelper.sentimentRange;

  constructor() {
    super();
    this.twitter = this.store.twitter;
  }

  get score(): number {
    return this.twitter.cumulativeSentiment / this.twitter.totalTweets;
  }

  getSentimentState(sentiment: number) {
    return SentimentHelper.getSentimentState(sentiment);
  }
}

// TODO: RC add clear tweets
// TODO: RC filter out zero score
//
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
          >Score: {{ score }} (from {{ twitter.totalTweets }} tweets)</v-row
        >
        <v-row justify="center">
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
  .section {
    &-header {
      padding-bottom: 10px;
    }
    &-body {
      padding-bottom: 10px;

      .v-input__slider {
        flex: 0 0 200px;
      }
    }
  }

  .small-spacer {
    padding: 0 10px;
  }

  .cell-sentiment {
    margin: 8px;
  }
}
</style>
