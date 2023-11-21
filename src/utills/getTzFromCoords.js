import tzlookup from "tz-lookup";

const getTzFromCoords = (coordinates) => {
  const [lon, lat] = coordinates;
  const timezone = tzlookup(lat, lon);

  return timezone;
};

export default getTzFromCoords;
