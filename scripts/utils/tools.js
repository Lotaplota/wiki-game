export function toFixedIfNecessary(value, decimalPlaces) {
  return +value.toFixed(decimalPlaces); // Was parseFloat() necessary?
}