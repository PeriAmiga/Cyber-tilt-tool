import axios from "axios";

const _interfaceAxios = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json'
    },
});

export const apiGet = async (path, params = {}) => {
    try {
        const resp = await _interfaceAxios.get(path, { params });
        return resp;
    } catch (err) {
        throw err;
    }
};

export const apiPost = async (path, body) => {
    try {
        const resp = await _interfaceAxios.post(path, body);
        console.log("apiPost", resp)
        return resp;
    } catch (err) {
        throw err;
    }
};