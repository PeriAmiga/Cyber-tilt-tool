import axios from "axios";

const _instanceAxios = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
        // TODO: add auth of user
    },
});

export const apiGet = async (_url, params = {}) => {
    try {
        let resp = await _instanceAxios.get(_url, {
            params,
        });
        return resp;
    } catch (err) {
        throw err;
    }
};

export const apiPost = async (_url, body) => {
    try {
        let resp = await _instanceAxios.post(_url, body);
        console.log("apiPost", resp)
        return resp;
    } catch (err) {
        throw err;
    }
};