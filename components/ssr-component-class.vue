
<script lang="ts">
import { Component } from "nuxt-property-decorator"; //https://github.com/nuxt-community/nuxt-property-decorator#readme & https://class-component.vuejs.org/
import { ComponentStoreHelper } from "~/utils/store-helper";
import { logWithLocation } from "../utils/ssr-helpers";
import { Originator } from "../types/ssr.types";
// import Vue from "vue";
// import Component from "vue-class-component";

@Component<SSRComponent>({
  // This does not work, defaults to true normally anyway
  // fetchOnServer: true,
  fetchOnServer: false,
  async fetch(ctx) {
    logWithLocation("Class - async fetch");
    this.asyncFetchOrig = process.server
      ? Originator.SERVER
      : Originator.CLIENT;
    return Promise.resolve();
  },
  // TODO: DEMO Async data will only work on pages - https://nuxtjs.org/docs/2.x/features/data-fetching/#async-data
  // asyncData(ctx) {
  //   logWithLocation("Component - asyncData");
  //   return {
  //     asyncData: process.server ? Originator.SERVER : Originator.CLIENT,
  //   };
  // },
  // TODO: DEMO Nuxt docs both recommend and refuse to acknowledge using fetch in compontons
  // https://nuxtjs.org/docs/2.x/features/data-fetching/#the-fetch-hook
  // https://nuxtjs.org/docs/2.x/features/data-fetching/#async-data-in-components
})
export default class SSRComponent extends ComponentStoreHelper {
  public asyncFetchOrig: Originator = null;
  public asyncDataOrig: Originator = null;

  fetchOnServer = false;

  constructor() {
    super();
    // TODO: DEMO This is called both server and client side
    logWithLocation("Class - init");
  }

  created() {
    logWithLocation("Class - created fn");
  }

  mounted() {
    logWithLocation("Class - mounted fn");
  }

  // TODO: DEMO These cause `Maximum call stack size exceeded` error
  // async fetch() {
  //   logWithLocation("SSRComponent - inline fetch");
  //   return Promise.resolve();
  // }

  // asyncData() {
  //   logWithLocation("SSRComponent - inline asyncData");
  //   return {};
  // }
}
</script>

<template>
  <v-col>
    <v-col><h4>Class</h4></v-col>
    <v-col>
      async fetch Ran: <b>{{ asyncFetchOrig }}</b>
    </v-col>
    <v-col>
      asyncData Ran: <b>{{ asyncDataOrig }}</b>
    </v-col>
  </v-col>
</template>
