
<script lang='ts'>
import { Component } from "nuxt-property-decorator";
import { ComponentStoreHelper } from "~/utils/store-helper";

export enum Originator {
  CLIENT = "Client",
  SERVER = "Server",
}

export function logWithLocation(...args: any[]) {
  console.warn(process.server ? "Server" : "Client", ":", ...args);
}

@Component<SSR>({
  async fetch(ctx) {
    logWithLocation("SSR - async fetch");
    this.asyncFetchOrig = process.server
      ? Originator.SERVER
      : Originator.CLIENT;
  },
  asyncData(ctx): Partial<SSR> {
    logWithLocation("SSR - asyncData");
    return {
      asyncDataOrig: process.server ? Originator.SERVER : Originator.CLIENT,
    };
  },
})
export default class SSR extends ComponentStoreHelper {
  public asyncFetchOrig: Originator = null;
  public asyncDataOrig: Originator = null;

  constructor() {
    super();
    logWithLocation("SSR - init");
  }
}
</script>

<template>
  <div>
    <v-card>
      <v-card-title> Server-Side Rendering </v-card-title>
      <v-card-subtitle
        >Where do fetch and asyncData get called?</v-card-subtitle
      >
      <v-card-text>
        <v-col><h4>Page</h4></v-col>
        <v-col>
          async fetch Ran: <b>{{ asyncFetchOrig }}</b>
        </v-col>
        <v-col>
          asyncData Ran: <b>{{ asyncDataOrig }}</b>
        </v-col>
        <v-col> <ssr-component></ssr-component> </v-col>
      </v-card-text>
    </v-card>
  </div>
</template>
