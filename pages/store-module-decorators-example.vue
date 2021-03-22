
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { store } from "~/store";
import Counter from "../store/counter";
// import StoreModuleDecorator from "~/components/StoreModuleDecorator.vue";
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

  // async fetch() {}
}
</script>

<template>
  <StoreModuleDecorator />
</template>
