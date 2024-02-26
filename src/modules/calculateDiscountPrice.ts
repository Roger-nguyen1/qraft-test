//Calculate Price per day with Reduction
type PriceCalculatorTypes = (duration: number, pricePerDay: number) => number;

export const calculateDiscountPrice: PriceCalculatorTypes = (
  duration,
  pricePerDay
) => {
  if (duration <= 1) {
    return pricePerDay;
  } else if (duration <= 4) {
    const discount = pricePerDay * 0.1;
    return (pricePerDay - discount) * duration;
  } else if (duration <= 10) {
    const discount = pricePerDay * 0.3;
    return (pricePerDay - discount) * duration;
  } else {
    const discount = pricePerDay * 0.5;
    return (pricePerDay - discount) * duration;
  }
};
