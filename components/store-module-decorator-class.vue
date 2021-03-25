
<script lang="ts">
import { Component, Emit, VModel } from "nuxt-property-decorator";
import Counter from "../store/counter";
import { ComponentStoreHelper } from "~/utils/store-helper";

export interface Value {
  label: String;
}

// TODO: DEMO what is ComponentStoreHelper? hover...
@Component
export default class StoreModuleDecorator extends ComponentStoreHelper {
  private increment = 0;
  private storeCounter: Counter;

  // TODO: DEMO v-model/value shorthand (compare)
  @VModel({ type: String }) example!: string;

  constructor() {
    super();

    this.storeCounter = this.store.counter;
  }

  // TODO: DEMO Combined Method  & Emit
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
    <v-row justify="center" class="section-header"><h4>Mutations</h4></v-row>
    <v-row justify="center" class="section-body mt-12">
      <!-- TODO: DEMO Actions can be seen in Vue.js dev tools -->
      <!-- TODO: DEMO TS in attribute values is type safe -->
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
