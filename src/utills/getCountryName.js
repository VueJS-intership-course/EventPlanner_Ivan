const getCountryName = async (coordinates) => {
  const [lon, lat] = [...coordinates];
  const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.display_name;
};

export default getCountryName;
