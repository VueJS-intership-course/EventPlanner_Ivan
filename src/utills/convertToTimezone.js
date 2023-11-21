import moment from "moment-timezone";
import revertGmt from "./revertGmt";

const timeConvert = (time, timezone) => {
  if (!timezone) {
    const parsedTime = moment.utc(time);
    const formattedUtcTime = parsedTime.format("YYYY-MM-DD HH:mm:ss");

    return formattedUtcTime;
  } else {
    const correctedTimeZone = revertGmt(timezone);

    const convertedTime = moment.utc(time).clone().tz(correctedTimeZone);

    const result = convertedTime.format("YYYY-MM-DD HH:mm:ss");

    return result;
  }
};

export default timeConvert;
