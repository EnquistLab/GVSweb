import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

/*
  Response format:
    col_name
    ordinal_position
    data_type
    description
*/

export const requestDataDictionary = async () => {
    const parseObject = {
        opts: {
            mode: "dd",
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
