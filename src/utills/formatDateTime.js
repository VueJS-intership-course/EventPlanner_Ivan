import moment from "moment";

function formatDateTime(inputTimeString) {
  const parsedTime = moment(inputTimeString);

  const formattedDate = parsedTime.format("YYYY-MM-DD");
  const formattedTime = parsedTime.format("HH:mm");

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export default formatDateTime;
