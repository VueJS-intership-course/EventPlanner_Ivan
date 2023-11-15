import moment from "moment-timezone";

const timeConvert = (time, timezone) => {
  if (!timezone) {
    const parsedTime = moment.utc(time);
    const formattedUtcTime = parsedTime.format("YYYY-MM-DD HH:mm:ss");

    return formattedUtcTime;
  } else {
    const symbolRegex = /[+-]/;

    const hasSymbol = symbolRegex.test(timezone);

    const correctedTimeZone = hasSymbol
      ? timezone.replace(symbolRegex, (match) => (match === "+" ? "-" : "+"))
      : timezone;

    const convertedTime = moment.utc(time).clone().tz(correctedTimeZone);

    const result = convertedTime.format("YYYY-MM-DD HH:mm:ss");

    return result;
  }
};

export default timeConvert;
