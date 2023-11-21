const revertGmt = (timezone) => {
  const symbolRegex = /[+-]/;

  const hasSymbol = symbolRegex.test(timezone);

  const correctedTimeZone = hasSymbol
    ? timezone.replace(symbolRegex, (match) => (match === "+" ? "-" : "+"))
    : timezone;

  return correctedTimeZone;
};

export default revertGmt;
