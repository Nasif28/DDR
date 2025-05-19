import axios from "axios";

const API_URL = "https://681ed227c1c291fa66353a6f.mockapi.io/api/v1/report";

export const fetchUsers = async (page = 1, limit = 10, sortBy, order) => {
  const params = {
    page,
    limit,
    sortBy,
    order,
  };

  const res = await axios.get(API_URL, { params });
  return res.data;
};
