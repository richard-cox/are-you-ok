
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { store } from "~/store";
import Counter from "../store/counter";
import { ComponentStoreHelper } from "~/utils/store-helper";

export interface Value {
  label: String;
}

@Component
export default class StoreModuleDecorator extends ComponentStoreHelper {
  // https://github.com/Microsoft/TypeScript-Vue-Starter#using-decorators-to-define-a-component
  // https://github.com/kaorun343/vue-property-decorator/issues/81#issuecomment-365941684
  // strictPropertyInitialization !
  // The definite assignment assertion is a feature that allows a ! to be placed after instance property and variable declarations to relay to TypeScript that a variable is indeed assigned for all intents and purposes, even if TypeScript’s analyses cannot detect so
  // @Prop({ default: { label: "" } }) value: Value | undefined;

  public storeCounter: Counter;

  // // TODO: RC Cannot access in template without exposing. If this stays it should be in a mixin/super
  // private storeAccessor = storeAccessor;

  constructor() {
    super();

    this.storeCounter = this.store.counter;

    // Linting Errors
    // const a = '';
    // console.log('HELLO');
  }
}
</script>

<template>
  <v-row>
    {{ storeCounter.count }}
    <v-btn depressed color="primary" @click="storeCounter.incr()">
      Increment By 5
    </v-btn>
    <!-- <v-col class="text-center"> </v-col> -->
  </v-row>
</template>
