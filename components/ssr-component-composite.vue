
<script lang="ts">
import { logWithLocation } from "../utils/ssr-helpers";
import { Originator } from "../types/ssr.types";

import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  async fetch(ctx) {
    logWithLocation("Composite - async fetch");
    this.asyncFetchOrig = process.server
      ? Originator.SERVER
      : Originator.CLIENT;
  },
  asyncData(ctx) {
    logWithLocation("Composite - asyncData");
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
    logWithLocation("Composite - created fn");
  },

  mounted() {
    logWithLocation("Composite - mounted fn");
  },
});
</script>

<template>
  <v-col>
    <v-col><h4>Composite API</h4></v-col>
    <v-col>
      async fetch Ran: <b>{{ asyncFetchOrig }}</b>
    </v-col>
    <v-col>
      asyncData Ran: <b>{{ asyncDataOrig }}</b>
    </v-col>
  </v-col>
</template>
