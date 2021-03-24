
export default class SentimentHelper {
  public static getSentimentState(sentiment: number): {
    colour: string,
    icon: string,
  } {
    if (sentiment < 0) {
      if (sentiment >= -1) return {
        colour: "#FF2249",
        icon: 'mdi-emoticon-sad'
      };
      if (sentiment >= -2) return {
        colour: "#DF1544",
        icon: 'mdi-emoticon-sad'
      };
      if (sentiment >= -3) return {
        colour: "#B40A34",
        icon: 'mdi-emoticon-frown'
      };
      if (sentiment >= -4) return {
        colour: "#9D0218",
        icon: 'mdi-emoticon-cry'
      };
      return {
        colour: "#860111",
        icon: 'mdi-emoticon-cry'
      };
    } else if (sentiment > 0) {
      if (sentiment <= 1) return {
        colour: "#9CC88B",
        icon: 'mdi-emoticon-happy'
      };
      if (sentiment <= 2) return {
        colour: "#79B065",
        icon: 'mdi-emoticon-happy'
      };
      if (sentiment <= 3) return {
        colour: "#65A047",
        icon: 'mdi-emoticon-excited'
      };
      if (sentiment <= 4) return {
        colour: "#4D8C2D",
        icon: 'mdi-emoticon-cool'
      };
      return {
        colour: "#2A7111",
        icon: 'mdi-emoticon-cool'
      };
    }
    return {
      colour: "grey",
      icon: 'mdi-emoticon-neutral'
    };


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
