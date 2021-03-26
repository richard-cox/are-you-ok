
<script lang="ts">
import { logWithLocation } from "../utils/ssr-helpers";
import { Originator } from "../types/ssr.types";
import { Context } from "@nuxt/types";

export default {
  async fetch(ctx: Context) {
    logWithLocation("Vanilla - async fetch");
    // TODO: DEMO This causes a transpile error `Property 'asyncFetchOrig' does not exist on type ...`
    // this.asyncFetchOrig = process.server ? Originator.SERVER : Originator.CLIENT;
    // return Promise.resolve({
    //   asyncFetchOrig: this.asyncFetchOrig,
    // });
  },
  asyncData(ctx: Context) {
    logWithLocation("Vanilla - asyncData");
    return {
      asyncData: process.server ? Originator.SERVER : Originator.CLIENT,
    };
  },
  data() {
    return {
      asyncFetchOrig: null as Originator,
      asyncDataOrig: null as Originator,
    };
  },

  // TODO: DEMO These suggest/autocomplete
  created() {
    logWithLocation("Vanilla - created fn");
  },

  mounted() {
    logWithLocation("Vanilla - mounted fn");
  },
};
</script>

<template>
  <v-col>
    <v-col><h4>Vanilla</h4></v-col>
    <v-col>
      async fetch Ran: <b>{{ asyncFetchOrig }}</b>
    </v-col>
    <v-col>
      asyncData Ran: <b>{{ asyncDataOrig }}</b>
    </v-col>
  </v-col>
</template>
