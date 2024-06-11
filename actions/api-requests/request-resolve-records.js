import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;


export const requestResolveRecords = async (records) => {
  //
  const parseObject = {
    opts: {
      mode: "resolve",
    },
    data: records,
  };

  //
  return await axios
    .post(apiEndPoint, parseObject, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
      //setParsedNames(response.data);
    }).catch(function (error) {
      return error.message
    });
};
