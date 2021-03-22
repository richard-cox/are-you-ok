import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  name: 'counter',
  namespaced: true,
  stateFactory: true,
})
export default class Counter extends VuexModule {

  // TODO: RC Demo - https://github.com/championswimmer/vuex-module-decorators/issues/105
  // constructor() {
  //   super();
  // }
  private _count = 0;

  // TODO: RC Examples of all different store things
  @Mutation
  increment(delta: number) {
    this._count += delta;
  }
  @Mutation
  decrement(delta: number) {
    this._count -= delta;
  }

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

  get count() {
    return this._count;
  }
}
