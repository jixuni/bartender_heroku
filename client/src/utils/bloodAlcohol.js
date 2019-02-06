// % BAC = (A x 5.14 / W x r) – .015 x H
//A = liquid ounces of alcohol consumed  (e.g 7beers x 12oz)
// W = a person’s weight in pounds
// r = a gender constant of alcohol distribution (.73 for men and .66 for women)*
// H = hours elapsed since drinking commenced

// //female constant
// const femaleConst = 0.66;
// //male constant
// const maleConst = 0.73;
// const avgMale = 195; // average male weight in us
// const avgFemale = 168; // average female weight in us

const avgFemale = {
  weight: 168,
  const: 0.66
};

const avgMale = {
  weight: 195,
  const: 0.73
};

// calculate liquid in oz consume
function alcoholConsume(numDrinks, alcoholStrength, drinkSize) {
  // numbDrinks is number of drinks
  // alcoholStrength is % of alcohol per drink
  // drinkSize is volume of drink in oz
  //e.g 7 (number of drinks) * 0.05(alcohol percentage) * 12oz(drink size)
  //e.g liquor 5(num of drinks) * 0.40(e.g vodka) * 1oz(drink size)

  const alcoholConsume = numDrinks * alcoholStrength * drinkSize;
  return parseFloat(alcoholConsume);
}

export function bac(alcoholStrength, gender) {
  // 5.14 and 0.015 are constants
  // weight is in #
  // timepass is in number of hours e.g 3.5 hours = 3.5
  //humanConst is femaleConst or maleConst
  if (parseInt(alcoholStrength) === 0) {
    return 0;
  } else if (gender.toLowerCase() === "m") {
    const numDrinks = alcoholConsume(1, parseFloat(alcoholStrength / 100), 12);
    const bac =
      (numDrinks * 5.14) / (avgMale.weight * avgMale.const) - 0.015 * 1;
    return parseFloat(bac).toFixed(5);
  } else {
    const numDrinks = alcoholConsume(1, parseFloat(alcoholStrength / 100), 12);
    const bac =
      (numDrinks * 5.14) / (avgFemale.weight * avgFemale.const) - 0.015 * 1;
    return parseFloat(bac).toFixed(5);
  }
}

//alcoholConsume(1, 0.05, 12);

//console.log(bac(avgMale, alcoholConsume, 1, maleConst));
//time is 1 hour, since 0 hours for alcohol drunk level is unrealistics
