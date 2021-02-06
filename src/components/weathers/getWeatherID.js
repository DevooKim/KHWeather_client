function weatherID(ID) {
  switch (ID) {
    case 500:
    case 501:
    case 511:
      return "비";
    case 502:
    case 503:
      return "폭우";
    case 520:
    case 521:
    case 522:
    case 531:
      return "소나기";

    case 701:
    case 711:
    case 721:
    case 741:
      return "안개";

    case 751:
    case 761:
      return "황사";

    default:
      return "";
  }
}

export default weatherID;
