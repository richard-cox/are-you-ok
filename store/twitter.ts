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
  received: string,
}

@Module({
  name: 'twitter',
  namespaced: true,
  stateFactory: true,
})
export default class TwitterStream extends VuexModule {

  private socket: Socket;
  private streaming = false;
  private _tweets: Tweet[] = [];
  private _totalTweets = 0;

  @Mutation
  setStreaming(isStreaming: boolean) {
    this.streaming = isStreaming;
  }

  @Mutation
  addTweet(tweet: Tweet) {
    const sen = sentiment.analyze(tweet.text);
    // TODO: add positive/negative words
    // https://www.npmjs.com/package/sentiment
    this._tweets.unshift({
      ...tweet,
      sentiment: sen.score,
      received: moment().format('HH:MM:ss.SSS YYYY/DD/MM') // Not great practise, but easier atm
    });
    this._totalTweets += 1;
  }

  @Action
  async start() {

    this.socket = io('http://linux-o35c:3001', {
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

}
