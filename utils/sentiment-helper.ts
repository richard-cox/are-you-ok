
interface SentimentSetting {
  colour: string,
  icon: string,
  // sound: HTMLAudioElement,
  sound: Partial<{ default: string; }>,
}
export default class SentimentHelper {

  public static readonly sentimentStates: { [score: number]: SentimentSetting; } = {
    [-5]: {
      colour: "#860111",
      icon: 'mdi-emoticon-cry',
      //sound: '/static/sounds/c-5.mp3'
      sound: require('@/assets/sounds/c-5.mp3')
      //sound: new Audio(require('@/assets/sounds/c-5.mp3'))
    },
    [-4]: {
      colour: "#9D0218",
      icon: 'mdi-emoticon-cry',
      //sound: '/static/sounds/d5.mp3'
      sound: require('@/assets/sounds/d5.mp3')
      // sound: new Audio(require('@/assets/sounds/d5.mp3'))
    },
    [-3]: {
      colour: "#B40A34",
      icon: 'mdi-emoticon-frown',
      //sound: '/static/sounds/d-5.mp3'
      sound: require('@/assets/sounds/d-5.mp3')
      // sound: new Audio(require('@/assets/sounds/d-5.mp3'))
    },
    [-2]: {
      colour: "#DF1544",
      icon: 'mdi-emoticon-sad',
      // sound: '/static/sounds/e5.mp3'
      sound: require('@/assets/sounds/e5.mp3')
      //sound: new Audio(require('@/assets/sounds/e5.mp3'))
    },
    [-1]: {
      colour: "#FF2249",
      icon: 'mdi-emoticon-sad',
      //sound: '/static/sounds/f5.mp3'
      sound: require('@/assets/sounds/f5.mp3')
      // sound: new Audio(require('@/assets/sounds/f5.mp3'))
    },
    [0]: {
      colour: "grey",
      icon: 'mdi-emoticon-neutral',
      //sound: '/static/sounds/f-5.mp3'
      sound: require('@/assets/sounds/f-5.mp3')
      //sound: new Audio(require('@/assets/sounds/f-5.mp3'))
    },
    [1]: {
      colour: "#9CC88B",
      icon: 'mdi-emoticon-happy',
      //sound: '/static/sounds/g5.mp3'
      sound: require('@/assets/sounds/g5.mp3')
      //sound: new Audio(require('@/assets/sounds/g5.mp3'))
    },
    [2]: {
      colour: "#79B065",
      icon: 'mdi-emoticon-happy',
      //sound: '/static/sounds/g-5.mp3'
      sound: require('@/assets/sounds/g-5.mp3')
      //sound: new Audio(require('@/assets/sounds/g-5.mp3'))
    },
    [3]: {
      colour: "#65A047",
      icon: 'mdi-emoticon-excited',
      //sound: '/static/sounds/a5.mp3'
      sound: require('@/assets/sounds/a5.mp3')
      //sound: new Audio(require('@/assets/sounds/a5.mp3'))
    },
    [4]: {
      colour: "#4D8C2D",
      icon: 'mdi-emoticon-cool',
      //sound: '/static/sounds/a-5.mp3'
      sound: require('@/assets/sounds/a-5.mp3')
      //sound: new Audio(require('@/assets/sounds/a-5.mp3'))
    },
    [5]: {
      colour: "#2A7111",
      icon: 'mdi-emoticon-cool',
      //sound: '/static/sounds/b5.mp3'
      sound: require('@/assets/sounds/a-5.mp3')
      // sound: new Audio(require('@/assets/sounds/b5.mp3'))
    },
  };

  public static getSentimentState(sentiment: number): SentimentSetting {
    if (sentiment < 0) {
      if (sentiment >= -1) return this.sentimentStates[-1];
      if (sentiment >= -2) return this.sentimentStates[-2];
      if (sentiment >= -3) return this.sentimentStates[-3];
      if (sentiment >= -4) return this.sentimentStates[-4];
      return this.sentimentStates[-5];
    } else if (sentiment > 0) {
      if (sentiment <= 1) return this.sentimentStates[1];
      if (sentiment <= 2) return this.sentimentStates[2];
      if (sentiment <= 3) return this.sentimentStates[3];
      if (sentiment <= 4) return this.sentimentStates[4];
      return this.sentimentStates[5];
    }
    return this.sentimentStates[0];


    // switch (sentiment) {
    //   case -5:
    //     return {
    //       colour: "#860111",
    //       icon: 'mdi-emoticon-cry'
    //     };
    //   case -4:
    //     return {
    //       colour: "#9D0218",
    //       icon: 'mdi-emoticon-cry'
    //     };
    //   case -3:
    //     return {
    //       colour: "#B40A34",
    //       icon: 'mdi-emoticon-frown'
    //     };
    //   case -2:
    //     return {
    //       colour: "#DF1544",
    //       icon: 'mdi-emoticon-sad'
    //     };
    //   case -1:
    //     return {
    //       colour: "#FF2249",
    //       icon: 'mdi-emoticon-sad'
    //     };
    //   case 0:
    //     return {
    //       colour: "#grey",
    //       icon: 'mdi-emoticon-neutral-outline'
    //     };
    //   case 1:
    //     return {
    //       colour: "#9CC88B",
    //       icon: 'mdi-emoticon-happy'
    //     };
    //   case 2:
    //     return {
    //       colour: "#79B065",
    //       icon: 'mdi-emoticon-happy'
    //     };
    //   case 3:
    //     return {
    //       colour: "#65A047",
    //       icon: 'mdi-emoticon-excited'
    //     };
    //   case 4:
    //     return {
    //       colour: "#4D8C2D",
    //       icon: 'mdi-emoticon-cool'
    //     };
    //   case 5:
    //     return {
    //       colour: "#2A7111",
    //       icon: 'mdi-emoticon-cool'
    //     };
  }

  public static readonly sentimentRange = [
    -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5
  ];
}
