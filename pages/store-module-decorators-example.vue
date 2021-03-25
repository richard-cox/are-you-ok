
<script lang="ts">
import { Component } from "nuxt-property-decorator";
import { store } from "~/store";
import Counter from "../store/counter";
import { ComponentStoreHelper } from "~/utils/store-helper";

@Component<StoreModuleDecoratorsExample>({
  async fetch(ctx) {
    if (process.server) {
      store.counter.incr(); // Note - This accesses SSR store... rather than client/this store
    }
  },
})
export default class StoreModuleDecoratorsExample extends ComponentStoreHelper {
  private storeCounter: Counter;

  constructor() {
    super();
    this.storeCounter = store.counter;
  }
}
</script>

<template>
  <v-card>
    <v-card-title> Vuex Store Module Decorator </v-card-title>
    <v-card-subtitle>A Simple Demo</v-card-subtitle>
    <v-card-text>
      <!-- TODO: DEMO v-col, StoreModuleDecorator autocomplete -->
      <!-- TODO: DEMO description for 'elevation' -->
      <!-- <v-banner elevation="10" icon="$mdiVuetify">asdsd</v-banner> -->
      <StoreModuleDecorator />
    </v-card-text>
  </v-card>
</template>
