import { io, Socket } from 'socket.io-client';
import { Action, Module, VuexModule } from 'vuex-module-decorators';
import TwitterClient from '~/utils/twitter-lite/my-twitter-lite';

import creds from '../utils/creds';

// import { Socket } from 'socket.io-client';
// import { io, Socket } from 'socket.io-client';
const client = new TwitterClient(creds);


@Module({
  name: 'twitter',
  namespaced: true,
  stateFactory: true,
})
export default class Twitter extends VuexModule {

  // stream: Stream;
  stream: Socket;
  data: any[];

  @Action
  get() {
    // return client.stream('tweets/sample/stream', {});
  }

  @Action
  async streamStart() {


    // this.socket = this.context.$nuxtSocket({
    //   // options
    // })

    // if (this.stream) {
    //   return;
    // }

    debugger;

    // const socket: WebSocket = new WebSocket('ws://linux-o35c:3000/api/twitter/ws');
    // socket.onmessage = (message) => console.log('onmessage: ', message);
    // socket.onopen = (a) => console.log('onopen: ', a);
    // socket.onerror = (a) => console.log('onerror: ', a);
    // socket.onclose = (a) => console.log('onclose: ', a);

    this.stream = io('http://linux-o35c:3001', {
      path: '',
      // autoConnect: false,
      // secure: false,
      transports: ['websocket']
    }).connect();
    this.stream
      .on("connect", (response: any) => console.log("connect", response))
      .on("authError", (error: any) => console.log("error", error))
      .on("error", (error: any) => console.log("error", error))
      .on("heartbeat", (error: any) => console.log("error", error))
      .on("tweet", (error: any) => console.log("error", error))

      // .on("authError", (error: any) => console.log("error", error))
      // .on("start", (response: any) => console.log("start"))
      // .on("data", (tweet: any) => console.log("data", tweet.text))
      // .on("ping", () => console.log("ping"))


      .on("end", (response: any) => console.log("end"));

    // this.stream = client.stream('tweets/sample/stream', {});
    // this.stream.on("start", response => console.log("start"))
    //   .on("data", tweet => console.log("data", tweet.text))
    //   .on("ping", () => console.log("ping"))
    //   .on("error", error => console.log("error", error))
    //   .on("end", response => console.log("end"));
  }

  @Action
  streamStop() {
    if (!this.stream) {
      return;
    }
    // this.stream.destroy();
    this.stream.disconnect();
    this.stream.close();
    delete this.stream;
  }

  get SstreamConsuming() {
    return this.stream;
  }

  get streamData() {
    return this.data;
  }

}
