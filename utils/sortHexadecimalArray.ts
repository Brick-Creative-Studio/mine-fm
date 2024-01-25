export default function sortHexadecimalArray(addressArray: `0x${string}`[]): `0x${string}`[] {
  // Use a custom comparator function to convert hex strings to numbers
  // and compare them numerically.
  const comparator = (a: string, b: string): number => {
    const numA = parseInt(a, 16);
    const numB = parseInt(b, 16);

    if (numA < numB) return -1;
    if (numA > numB) return 1;
    return 0;
  };

  // Use the custom comparator to sort the array
  return addressArray.sort(comparator);
}