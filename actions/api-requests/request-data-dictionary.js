import axios from 'axios';

const apiEndPoint = process.env.apiEndPoint;

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
        .then(response => response.data);
};

export const requestNativeStatusCodes = async () => {
    const parseObject = {
        opts: {
            mode: "dd_ns",
        },
    };
    return await axios
        .post(apiEndPoint, parseObject, {
            headers: { "Content-Type": "application/json" },
        })
        .then(response => response.data);
};
