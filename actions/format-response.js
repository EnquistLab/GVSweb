export const formatResponse = (data) => {
  console.log("Raw data:", data);  // Debugging

  // create formatted response
  const formattedData = data.map(record => ({
    "Coordinates submitted": `${record.latitude_verbatim}, ${record.longitude_verbatim}`,
    "Coordinates resolved": `${record.latitude}, ${record.longitude}`,
    "Country": record.country,
    "State/Province": record.state,
    "County/Parish": record.county,
    "Centroid of...?": record.centroid_poldiv ? `${record.centroid_poldiv} centroid` : "",
    "Coordinates status": record.latlong_err ? record.latlong_err : "OK",
  }));

  console.log("Formatted data:", formattedData);  // Debugging
  return formattedData;
};
