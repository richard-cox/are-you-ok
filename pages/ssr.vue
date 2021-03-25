
<script lang="ts">
import { Component } from "nuxt-property-decorator";
import { store } from "~/store";
import { ComponentStoreHelper } from "~/utils/store-helper";

export enum Originator {
  CLIENT = "Client",
  SERVER = "Server",
}

@Component<SSR>({
  async fetch(ctx) {
    console.warn("SSR - fetch - ", process.server ? "Server" : "Client");
    if (process.server) {
      store.counter.incr(); // Note - This accesses SSR store... rather than client/this store
      this.asyncFetch = Originator.SERVER;
    } else {
      this.asyncFetch = Originator.CLIENT;
    }
  },
  asyncData(ctx) {
    console.warn("SSR - asyncData - ", process.server ? "Server" : "Client");
    return {
      asyncData: process.server ? Originator.SERVER : Originator.CLIENT,
    };
  },
})
export default class SSR extends ComponentStoreHelper {
  public asyncFetch: Originator = null;
  public asyncData: Originator = null;

  constructor() {
    super();
    console.warn("SSR - init - ", process.server ? "Server" : "Client");
  }
}
</script>

<template>
  <div>
    <v-card>
      <v-card-title> Server-Side Rendering </v-card-title>
      <v-card-subtitle>Where do fetch and asyncData work?</v-card-subtitle>
      <v-card-text>
        <v-col><h4>Page</h4></v-col>
        <v-col> async fetch Ran: {{ asyncFetch }} </v-col>
        <v-col> asyncData Ran: {{ asyncData }} </v-col>
        <v-col> <ssr-component></ssr-component> </v-col>
      </v-card-text>
    </v-card>
  </div>
</template>
