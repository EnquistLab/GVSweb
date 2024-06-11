import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

export const requestSources = async () => {
  const parseObject = {
    opts: {
      mode: "sources",
    },
  };

  return await axios
    .post(apiEndPoint, parseObject, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      // console.log(response.data)
      return response.data;
    });
};
