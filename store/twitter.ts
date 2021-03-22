import { Stream } from 'twitter-lite';
import { Action, Module, VuexModule } from 'vuex-module-decorators';
import TwitterClient from '~/utils/twitter-lite/my-twitter-lite';

import creds from '../utils/creds';

const client = new TwitterClient(creds);


@Module({
  name: 'twitter',
  namespaced: true,
  stateFactory: true,
})
export default class Twitter extends VuexModule {

  stream: Stream;
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

    if (this.stream) {
      return;
    }

    this.stream = client.stream('tweets/sample/stream', {});
    this.stream.on("start", response => console.log("start"))
      .on("data", tweet => console.log("data", tweet.text))
      .on("ping", () => console.log("ping"))
      .on("error", error => console.log("error", error))
      .on("end", response => console.log("end"));
  }

  @Action
  streamStop() {
    if (!this.stream) {
      return;
    }
    this.stream.destroy();
    delete this.stream;
  }

  get streamConsuming() {
    return this.stream;
  }

  get streamData() {
    return this.data;
  }

}
