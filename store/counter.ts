import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

// TODO: RC DEMO 1 - 2 Store Module

// TODO: DEMO A Vuex store typed and classed

@Module({
  name: 'counter', // TODO: X DEMO What can set in the module decorator? ... autocompletes
  namespaced: true, // TODO: DEMO Module decorator for applying namespaced (required due to way initialised... plugin not file)
  stateFactory: true,
})
export default class Counter extends VuexModule {

  // TODO: X DEMO - VuexModules cannot have ctors https://github.com/championswimmer/vuex-module-decorators/issues/105
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

  // TODO: DEMO Note - Properties in the store must be named uniquely
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


  // TODO: DEMO Actions + Mutation function above, Mutation + Action below

  // conferences: Array<ConferencesEntity> = []
  // events: Array<EventsEntity> = []

  // // 'events' and 'conferences' are replaced by returned object
  // // whose shape must be `{events: [...], conferences: [...] }`
  // @MutationAction({ mutate: ['events', 'conferences'] })
  // async fetchAll() {
  //   const response: Response = await getJSON('https://hasgeek.github.io/events/api/events.json')
  //   return response
  // }
}
