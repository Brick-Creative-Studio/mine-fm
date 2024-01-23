function formatPercentage(split: number): number {

  const formattedPercentage = split.toFixed(4);
  return  Number.parseFloat(formattedPercentage.replace('.', ''));
}
