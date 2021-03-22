import Counter from './counter';
import Twitter from './twitter';

export interface DemoStore {
  counter: Counter;
  twitter: Twitter; // TODO: RC Demo twitter import... suggests automatically
}
