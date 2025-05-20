import axios from "axios";

const API_URL = "https://681ed227c1c291fa66353a6f.mockapi.io/api/v1/report";

export const fetchBills = async ({
  page = 1,
  limit = 10,
  sortBy,
  order,
  filters = {},
}) => {
  const params = {
    page,
    limit,
    sortBy,
    order,
    ...filters,
  };

  const res = await axios.get(API_URL, { params });
  const totalCount = Number(res.headers["x-total-count"] || res.data.length); // fallback for local/mock

  return {
    items: res.data,
    totalCount,
  };
};
