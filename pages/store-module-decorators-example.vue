
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
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
  <v-col>
    <h2>Vuex Store Module Decorator - Simplete Demo</h2>
    <!-- TODO: RC demo v-col autocomplete -->
    <!-- TODO: RC demo description for 'elevation' autocomplete -->
    <!-- <v-banner elevation="10" icon="$mdiVuetify">asdsd</v-banner> -->
    <StoreModuleDecorator />
  </v-col>
</template>
