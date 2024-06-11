import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

const formatChecklist = (checklist) => {
  var returnObj = new Object();
  checklist.forEach(({ checklist_countries: c }) => {
    returnObj[c.source_name] = c
  })
  return returnObj
}

export const requestChecklistsInfo = async () => {
  const parseObject = {
    opts: {
      mode: "checklist_countries",
    },
  };

  return await axios
    .post(apiEndPoint, parseObject, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      let formatted = formatChecklist(response.data)
      return formatted;
    });
};
