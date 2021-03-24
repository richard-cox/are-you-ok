
<script lang="ts">
import { Component } from "nuxt-property-decorator";
import { store } from "~/store";
import Counter from "../store/counter";
import { ComponentStoreHelper } from "~/utils/store-helper";

@Component
export default class StoreModuleDecoratorsExample extends ComponentStoreHelper {
  private storeCounter: Counter;

  constructor() {
    super();
    this.storeCounter = store.counter;

    if (process.server) {
      this.storeCounter.incr();
    }
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
