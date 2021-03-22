import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  name: 'counter',
  namespaced: true, // // TODO: RC Demo Module decorator for applying namespaced (required due to way initialised... plugin not file)
  stateFactory: true,
})
export default class Counter extends VuexModule {

  // TODO: RC Demo - VuexModules cannot have ctors https://github.com/championswimmer/vuex-module-decorators/issues/105
  // constructor() {
  //   super();
  // }

  // *********************************************
  // State
  // *********************************************

  private _count = 0;

  // *********************************************
  // Mutations
  // *********************************************

  // TODO: RC Examples of all different store things
  @Mutation
  increment(delta: number) {
    this._count += delta;
  }
  @Mutation
  decrement(delta: number) {
    this._count -= delta;
  }

  @Mutation
  set(newVal: number) {
    this._count = newVal;
  }

  // *********************************************
  // Actions
  // *********************************************

  // TODO: RC Demo - note the different names
  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'increment' })
  incr() {
    return 5;
  }
  // action 'decr' commits mutation 'decrement' when done with return value as payload
  @Action({ commit: 'decrement' })
  decr() {
    return 5;
  }

  @Action({ commit: 'set' })
  reset() {
    return 0;
  }

  // *********************************************
  // Getters
  // *********************************************

  get count() {
    return this._count;
  }
}
