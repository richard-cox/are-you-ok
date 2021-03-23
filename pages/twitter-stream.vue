
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { store } from "~/store";
import Counter from "../store/counter";
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

  constructor() {
    super();
    this.twitter = this.store.twitter;
  }
}
</script>

<template>
  <v-col>
    <h2>Twitter Stream</h2>
    <v-col class="store-module-decorator">
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
      <v-row justify="center" class="section-header"
        ><h4 class="">Tweets</h4></v-row
      >
      <v-row> Tweets {{ twitter.tweets.length }} </v-row>
    </v-col>
  </v-col>
</template>
