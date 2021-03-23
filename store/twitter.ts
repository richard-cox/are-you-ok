import { io, Socket } from 'socket.io-client';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';


@Module({
  name: 'twitter',
  namespaced: true,
  stateFactory: true,
})
export default class TwitterStream extends VuexModule {

  private socket: Socket;
  private streaming = false;
  private _tweets: string[] = [];

  @Mutation
  setStreaming(isStreaming: boolean) {
    this.streaming = isStreaming;
  }

  @Mutation
  addTweet(tweet: string) {
    this._tweets.push(tweet);
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
      .on("tweet", (tweet: any) => {
        console.log('Tweet: ', tweet.data.text);
        this.addTweet(tweet.data.text);
      })
      .on("end", (response: any) => console.log("end"));
    this.socket.connect();
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
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
    return this.streaming;
  }

  get tweets() {
    return this._tweets;
  }

}
