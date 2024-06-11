import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

export const requestCitations = async () => {
  const parseObject = {
    opts: {
      mode: "citations",
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
