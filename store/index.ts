import { Store } from 'vuex';
import { initialiseStores } from '~/utils/store-accessor';

// TODO: RC DEMO 1 - 1 Store Set up

// TODO: DEMO Each store is initialised as a plugin with an instance of the store
const initializer = (store: Store<any>) => initialiseStores(store);

export const plugins = [
  initializer
];

export * from '~/utils/store-accessor';
