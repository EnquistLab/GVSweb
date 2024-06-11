import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

export const requestMeta = async () => {
  const parseObject = {
    opts: {
      mode: "meta",
    },
  };

  return await axios
    .post(apiEndPoint, parseObject, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};
