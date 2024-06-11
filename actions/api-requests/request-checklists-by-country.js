
import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

const formatChecklists = (checklists) => {

  console.log(checklists)
  // TODO: move this inside requestCountry
  var returnObj = new Object();
  checklists.forEach(({ country_checklists: c }) => {
    returnObj[c.gid_0] = c
    //delete c.gid_0
  })
  return returnObj;
}

export const requestChecklistsByCountry = async () => {
  const parseObject = {
    opts: {
      mode: "country_checklists",
    },
  };

  return await axios
    .post(apiEndPoint, parseObject, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {

      let formatted = formatChecklists(response.data)

      return formatted;
    });
};
