
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
  // https://github.com/Microsoft/TypeScript-Vue-Starter#using-decorators-to-define-a-component
  // https://github.com/kaorun343/vue-property-decorator/issues/81#issuecomment-365941684
  // strictPropertyInitialization !
  // The definite assignment assertion is a feature that allows a ! to be placed after instance property and variable declarations to relay to TypeScript that a variable is indeed assigned for all intents and purposes, even if TypeScript’s analyses cannot detect so
  // @Prop({ default: { label: "" } }) value: Value | undefined;

  // TODO: DEMO v-model/value shorthand
  @VModel({ type: String }) example!: string;
  /* Is the same as....
    props: {
      value: {
        type: String,
      },
    },
    computed: {
      name: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        },
      },
    },
   */

  public storeCounter: Counter;

  constructor() {
    super();

    this.storeCounter = this.store.counter;
  }

  // TODO: DEMO Emit - Execute code, emit a 'incrementReset' event with the value of this.increment
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
      <h1 class="mb-2">Counter</h1>
      <h1 class="mb-2">{{ storeCounter.count }}</h1>
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
