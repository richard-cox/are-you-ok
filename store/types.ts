import Counter from './counter';
import TwitterStream from './twitter';

export interface DemoStore {
  counter: Counter;
  twitter: TwitterStream; // TODO: RC Demo twitter import... suggests automatically
}
