export default function getPlaceholder(id) {
  let imgLocation = "";
  switch (id) {
    case 1:
      imgLocation = "./british_ale.jpeg";
      break;
    case 2:
      imgLocation = "./irish_ale.jpeg";
      break;
    case 3:
      imgLocation = "./north_american_ale.jpeg";
      break;
    case 4:
      imgLocation = "./german_ale.jpeg";
      break;
    case 5:
      imgLocation = "./belgian_french_ale.jpeg";
      break;
    case 6:
      imgLocation = "./international_ale.jpeg";
      break;
    case 7:
      imgLocation = "./german_larger.jpeg";
      break;
    case 8:
      imgLocation = "./north_american_larger.jpeg";
      break;
    case 9:
      imgLocation = "./other.jpeg";
      break;
    case 10:
      imgLocation = "./international_larger.jpeg";
      break;
    case 11:
      imgLocation = "./other.jpeg";
      break;
    default:
      imgLocation = "./other.jpeg";
      break;
  }

  return imgLocation;
}
