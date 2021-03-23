
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { store } from "~/store";
import Counter from "../store/counter";
import { ComponentStoreHelper } from "~/utils/store-helper";
import Twitter from "../store/twitter";

@Component
export default class TwitterStream extends ComponentStoreHelper {
  private twitter: Twitter;

  constructor() {
    super();
    this.twitter = this.store.twitter;

    // this.twitter = store.

    // if (process.server) {
    //   this.storeCounter.incr();
    // }
  }

  mounted() {
    // this.socket = this.$nuxtSocket({
    //   // options
    //   url: '/'
    // })
    // this.socket.on('', (msg: any, cb: any) => {
    //   console.log(msg, cb);
    // })
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
          v-if="!!twitter.streamConsuming"
          @click="twitter.streamStop()"
        >
          Stop Stream
        </v-btn>
        <v-btn depressed color="primary" v-else @click="twitter.streamStart()">
          Start Stream
        </v-btn>
      </v-col>
      <v-row justify="center" class="section-header"
        ><h4 class="">Actions</h4></v-row
      >
    </v-col>
  </v-col>
</template>
