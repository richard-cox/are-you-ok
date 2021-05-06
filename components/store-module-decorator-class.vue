
<script lang="ts">
import { Component, Emit, VModel } from "nuxt-property-decorator";
import Counter from "../store/counter";
import { ComponentStoreHelper } from "~/utils/store-helper";

export interface Value {
  label: String;
}

// TODO: RC DEMO 1 - 3 Component as a Class
// TODO: RC DEMO 1 - 4 TS all about decreasing dev time and improving quality.
// TODO: RC DEMO 1 - 4.1 What is ComponentStoreHelper
//                         - Hover over
//                         - go to definition
//                         - self document code - End goal of all own code, vue, nuxt, random libraries etc
//                         - extends like mixin but nicer defined (typed access to `this.store`)
// TODO: RC DEMO 1 - 5 Actions can be seen in Vue.js dev tools
@Component
export default class StoreModuleDecorator extends ComponentStoreHelper {
  public increment = 0;
  public storeCounter: Counter;

  // TODO: RC DEMO 1 - 4.2 v-model/value shorthand (compare)
  @VModel({ type: String }) example!: string;

  constructor() {
    super();

    this.storeCounter = this.store.counter;
  }

  // TODO: RC DEMO 1 - 4.3 Combined Method & Emit
  @Emit("incrementReset")
  resetIncrement() {
    this.increment = 0;
    return this.increment;
  }
}
</script>

<template>
  <v-col class="store-module-decorator">
    <v-col class="text-center mb-11">
      <h1 class="mb-2">Component (Class)</h1>
      <h3 class="mb-2">Counter: {{ storeCounter.count }}</h3>
      <v-btn depressed color="primary" @click="storeCounter.reset()">
        Reset
      </v-btn>
    </v-col>
    <v-row justify="center" class="section-header"
      ><h4 class="">Actions</h4></v-row
    >
    <v-row justify="center" class="section-body">
      <v-btn depressed color="primary" @click="storeCounter.decr()">
        Decrement By 5
      </v-btn>
      <div class="small-spacer">&nbsp;</div>
      <v-btn depressed color="primary" @click="storeCounter.incr()">
        Increment By 5
      </v-btn>
    </v-row>
    <!-- TODO: RC DEMO 1 - 4.4 elements autocomplete (also see store-example)-->
    <v-row justify="center" class="section-header"><h4>Mutations</h4></v-row>
    <v-row justify="center" class="section-body mt-12">
      <!-- TODO: RC DEMO 1 - 4.5 storeCounter hover & docs -->
      <!-- TODO: RC DEMO 1 - 4.6 storeCounter autocomplete -->
      <!-- TODO: RC DEMO 1 - 4.7 storeCounter fn properties type safe -->
      <!-- TODO: RC DEMO 1 - 4.8 all this means no scrolling around C&P values-->
      <!-- TODO: RC DEMO 1 - 4.9 let down on rename -->
      <v-btn
        depressed
        color="primary"
        @click="storeCounter.decrement(increment)"
      >
        Decrement
      </v-btn>
      <v-slider
        dense
        max="25"
        min="-25"
        step="1"
        v-model="increment"
        thumb-label="always"
      ></v-slider>
      <v-btn
        depressed
        color="primary"
        @click="storeCounter.increment(increment)"
      >
        Increment
      </v-btn>
    </v-row>
  </v-col>
</template>

<style lang="scss" scoped>
.store-module-decorator {
  .section {
    &-header {
      padding-bottom: 10px;
    }
    &-body {
      padding-bottom: 10px;

      .v-input__slider {
        flex: 0 0 200px;
      }
    }
  }

  .small-spacer {
    padding: 0 10px;
  }
}
</style>
