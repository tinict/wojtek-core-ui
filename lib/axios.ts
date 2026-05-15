import axios from "axios";

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const apiTest = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: process.env.NEXT_PUBLIC_API_TEST_URL,
});

export { api, apiTest };