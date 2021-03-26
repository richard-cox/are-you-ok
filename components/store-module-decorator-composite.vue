
<script lang="ts">
import Counter from "../store/counter";

import { defineComponent } from "@vue/composition-api";
import { initialiseStores } from "../store";

export default defineComponent({
  created() {
    const store = initialiseStores(this.$store, false);
    this.storeCounter = store.counter;
  },
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    name: {
      get(): String {
        return this.value;
      },
      set(value: String) {
        this.$emit("input", value);
      },
    },
  },
  data() {
    const res: {
      increment: number;
      storeCounter: Counter;
    } = {
      increment: 0,
      storeCounter: null,
    };
    return res;
  },
  methods: {
    resetIncrement() {
      this.increment = 0;
      this.$emit("incrementReset");
    },
  },
});
</script>

<template>
  <v-col class="store-module-decorator">
    <v-col class="text-center mb-11">
      <h1 class="mb-2">Component (composition-api)</h1>
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
