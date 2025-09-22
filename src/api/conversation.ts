import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getResponse(message: string) {
  const payload = {
    message,
    email: "test@starkindustries.com",
  };
  const { data } = await axios.post(`${BASE_URL}/conversation`, payload);
  return data?.response;
}
