import axios from "axios";

export const api = axios.create({ baseURL: "https://simplefit-api.vercel.app/api" });