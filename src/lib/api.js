import axios from "axios";

const API_URL = "https://681ed227c1c291fa66353a6f.mockapi.io/api/v1/report";

export const fetchBills = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};
