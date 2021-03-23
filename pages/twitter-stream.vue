
<script lang="ts">
import { Component } from "nuxt-property-decorator";
import { ComponentStoreHelper } from "~/utils/store-helper";
import Twitter from "../store/twitter";

@Component<TwitterStream>({
  beforeRouteLeave(to, from, next) {
    this.twitter.stop();
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

  constructor() {
    super();
    this.twitter = this.store.twitter;
  }

  getColor(sentiment: number) {
    //  switch (sentiment) {
    //    case 0:
    //      return 'red';
    //  }
    if (sentiment < 3) return "red";
    else if (sentiment < 6) return "orange";
    else return "green";
  }
}
</script>

<template>
  <v-col>
    <h2>Twitter Stream</h2>
    <v-col class="twitter-stream">
      <v-col class="text-center mb-11">
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
      </v-col>
      <v-row>
        <v-data-table
          dense
          :headers="tableHeaders"
          :items="twitter.tweets"
          item-key="id"
          class="elevation-1 flex-grow-1"
          :footer-props="{
            showFirstLastPage: true,
          }"
          :no-data-text="'No Tweets. Start streaming?'"
        >
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.sentiment="{ item }">
            <v-chip
              label
              :color="getColor(item.sentiment)"
              dark
              class="cell-sentiment"
            >
              {{ item.sentiment }}
            </v-chip>
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-col>
</template>


<style lang="scss" scoped>
// TODO: RC move to common
.twitter-stream {
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
