import { readString } from "react-papaparse";
import { requestResolveRecords } from "./";

export const resolveRecords = async (records, showErrorMessage, setIsProcessing) => {
  // Show spinner and clean errors
  showErrorMessage(null);
  setIsProcessing(true);

  // Split records with react-papaparse
  var splitRecords = readString(records, { delimiter: ",", skipEmptyLines: true })["data"];
  console.log("splitRecords: ", splitRecords);

  // Trim each entry and filter out empty rows
  splitRecords = splitRecords.map(row => row.map(entry => entry.trim())).filter(row => row.length === 2);

  // Make sure there's data before submitting to the API
  if (splitRecords.length === 0) {
    showErrorMessage("The input is empty or invalid. Ensure each row has exactly 2 columns.");
    setIsProcessing(false);
    return;
  }

  // Prepare records as required by the API
  const preparedRecords = splitRecords.map(row => [row[0], row[1]]);
  console.log("Prepared records: ", preparedRecords);

  var resolvedRecords = await requestResolveRecords(preparedRecords);

  // Server-side error handling
  if (typeof resolvedRecords === "string") {
    showErrorMessage(resolvedRecords);
    setIsProcessing(false);
    return;
  }

  setIsProcessing(false);

  return resolvedRecords;
};
