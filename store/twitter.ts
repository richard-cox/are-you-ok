import moment from 'moment';
import { io, Socket } from 'socket.io-client';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// https://www.npmjs.com/package/sentiment
// https://www.npmjs.com/package/@jharrilim/sentiment (ts?)

export interface Tweet {
  id: string,
  text: string,
  sentiment: number,
  receivedString: string,
  received: number,
}

export interface TwitterStreamSettings {
  filterZeroSentiment: boolean,
  streamOnlyOnPage: boolean,
  soundEnabled: boolean,
}

@Module({
  name: 'twitter',
  namespaced: true,
  stateFactory: true,
})
export default class TwitterStream extends VuexModule {

  // *********************************************
  // State
  // *********************************************

  private socket: Socket;
  private streaming = false;
  private _tweets: Tweet[] = [];
  private _totalTweets = 0;
  private _cumulativeSentiment = 0;
  private _settings: TwitterStreamSettings = {
    filterZeroSentiment: false,
    streamOnlyOnPage: false,
    soundEnabled: false,
  };

  // *********************************************
  // Mutations
  // *********************************************

  @Mutation
  setStreaming(isStreaming: boolean) {
    this.streaming = isStreaming;
  }

  @Mutation
  addTweet(tweet: Tweet) {
    const sen = sentiment.analyze(tweet.text);
    if (this._settings.filterZeroSentiment && sen.score === 0) {
      return;
    }
    const now = new Date();
    // TODO: TODO add positive/negative words
    const newTweet = {
      ...tweet,
      sentiment: sen.score,
      receivedString: moment(now).format('HH:MM:ss.SSS YYYY/DD/MM'), // Not great practise, but easier atm
      received: now.getTime()
    };
    this._tweets.unshift(newTweet);
    this._totalTweets += 1;
    this._cumulativeSentiment += sen.score;
  }

  @Mutation
  emptyTweets() {
    this._tweets = [];
    this._totalTweets = 0;
    this._cumulativeSentiment = 0;
  }

  @Mutation
  setSettings(settings: TwitterStreamSettings) {
    this._settings = {
      ...settings
    };
  }

  // *********************************************
  // Actions
  // *********************************************

  @Action
  async start() {
    // linux-o35c
    this.socket = io('http://localhost:3001', {
      path: '',
      transports: ['websocket']
    });
    this.socket
      .on("connect", (response: any) => console.log("connect", response))
      .on("authError", (error: any) => console.log("authError", error))
      .on("error", (error: any) => console.log("error", error))
      .on("heartbeat", (error: any) => console.log("heartbeat", error))
      .on("tweet", (tweet: any) => this.addTweet(tweet.data))
      .on("end", (response: any) => console.log("end"));
    this.socket.connect();
    this.setStreaming(true);
  }

  @Action({ commit: 'emptyTweets' })
  clear() { }

  @Action
  stop() {
    if (!this.socket) {
      return;
    }
    this.socket.disconnect();
    this.socket.close();
    delete this.socket;
    this.setStreaming(false);
  }

  // *********************************************
  // Getters
  // *********************************************

  get isStreaming() {
    // This is not the best way to handle socket state
    return this.streaming;
  }

  get tweets() {
    return this._tweets;
  }

  get totalTweets() {
    return this._totalTweets;
  }

  get cumulativeSentiment() {
    return this._cumulativeSentiment;
  }

  get settings() {
    return this._settings;
  }


}
