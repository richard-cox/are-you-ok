
<script lang="ts">
import { logWithLocation } from "../utils/ssr-helpers";
import { Originator } from "../types/ssr.types";
import {
  defineComponent,
  ref,
  useFetch,
  wrapProperty,
} from "@nuxtjs/composition-api";

// import { defineComponent } from "@vue/composition-api";

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

  setup(props, ctx) {
    logWithLocation("Composite - setup");
    const setupOrig = ref(null as Originator); // TODO: DEMO Make reactive with ref, typed with as :(
    const { fetch, fetchState } = useFetch(async () => {
      logWithLocation("Composite - setup fetching");
      return new Promise((res) => {
        setTimeout(() => {
          setupOrig.value = process.server
            ? Originator.SERVER
            : Originator.CLIENT;
          res();
        }, 3000);
      });
    });

    // fetch();

    console.log("fetchState.error: ", fetchState.error);
    console.log("fetchState.pending: ", fetchState.pending);
    console.log("fetchState.timestamp: ", fetchState.timestamp);
    return {
      setupOrig, // TODO: DEMO Note - these are not part of data but available and autocomplete as if they were
      fetchState,
    };
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
    <v-col>
      setup Ran: <b>{{ setupOrig }}</b
      ><br />
      Fetch: Pending: {{ fetchState.pending }} ({{ fetchState.timestamp }})
      <!-- // TODO: RC DEMO fetch blocks whole component on first load  -->
    </v-col>
  </v-col>
</template>
