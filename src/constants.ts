export enum Flags {
  VISA = "VISA",
  MASTERCARD = "MASTER",
  DINERS = "DINERS",
  HIPERCARD = "HIPERCARD",
  AMEX = "AMEX",
  ELO = "ELO",
  DISCOVER = "DISCOVER",
  JCB = "JCB",
  AURA = "AURA",
  OTHER = "OTHER",
}

export const binRegex = [
  { name: Flags.AMEX, regex: /^3[47][0-9]{13}$/ },
  { name: Flags.AURA, regex: /^((?!504175))^((?!5067))(^50[0-9])/ },
  { name: Flags.DINERS, regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/ },
  { name: Flags.DISCOVER, regex: /^6(?:011|5[0-9]{2})[0-9]{12}/ },
  {
    name: Flags.ELO,
    regex:
      /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
  },
  { name: Flags.HIPERCARD, regex: /^606282|^3841(?:[0|4|6]{1})0/ },
  { name: Flags.JCB, regex: /^(?:2131|1800|35\d{3})\d{11}/ },
  {
    name: Flags.MASTERCARD,
    regex:
      /^((5(([1-2]|[4-5])[0-9]{8}|0((1|6)([0-9]{7}))|3(0(4((0|[2-9])[0-9]{5})|([0-3]|[5-9])[0-9]{6})|[1-9][0-9]{7})))|((508116)\\d{4,10})|((502121)\\d{4,10})|((589916)\\d{4,10})|(2[0-9]{15})|(67[0-9]{14})|(506387)\\d{4,10})/,
  },
  { name: Flags.VISA, regex: /^4[0-9]{12}(?:[0-9]{3})/ },
];
