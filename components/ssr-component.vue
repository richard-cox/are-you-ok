
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { store } from "~/store";
import Counter from "../store/counter";
import { ComponentStoreHelper } from "~/utils/store-helper";
import { logWithLocation, Originator } from "../pages/ssr.vue";

export interface Value {
  label: String;
}

@Component<SSRComponent>({
  async fetch(ctx) {
    logWithLocation("SSRComponent - async fetch");
    this.asyncFetchOrig = process.server
      ? Originator.SERVER
      : Originator.CLIENT;
  },
  asyncData(ctx) {
    logWithLocation("SSRComponent - asyncData");
    return {
      asyncData: process.server ? Originator.SERVER : Originator.CLIENT,
    };
  },
})
export default class SSRComponent extends ComponentStoreHelper {
  public asyncFetchOrig: Originator = null;
  public asyncDataOrig: Originator = null;

  constructor() {
    super();
    logWithLocation("SSRComponent - init");
  }

  // TODO: DEMO This cause `Maximum call stack size exceeded` error
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
    <v-col><h4>Component</h4></v-col>
    <v-col>
      async fetch Ran: <b>{{ asyncFetchOrig }}</b>
    </v-col>
    <v-col>
      asyncData Ran: <b>{{ asyncDataOrig }}</b>
    </v-col>
  </v-col>
</template>
