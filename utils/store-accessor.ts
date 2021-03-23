import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import Counter from '../store/counter';
import TwitterStream from '../store/twitter';
import { DemoStore } from '../store/types';

let cachedStore: DemoStore = {
  counter: null,
  twitter: null,
};

function initialiseStores(vuexStore: Store<DemoStore>, useCache = true): DemoStore {
  const store: DemoStore = useCache ? cachedStore : {} as DemoStore;
  store.counter = getModule(Counter, vuexStore);
  store.twitter = getModule(TwitterStream, vuexStore);
  return store;
}

export {
  initialiseStores,
  cachedStore as store
};
