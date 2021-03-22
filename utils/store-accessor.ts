import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import Counter from '../store/counter';
import { DemoStore } from '../store/types';

let cachedStore: DemoStore = {
  counter: null
};

function initialiseStores(vuexStore: Store<DemoStore>, useCache = true): DemoStore {
  const store: DemoStore = useCache ? cachedStore : {} as DemoStore;
  store.counter = getModule(Counter, vuexStore);
  return store;
}

export {
  initialiseStores,
  cachedStore as store
};
