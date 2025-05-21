import axios from "axios";

export const API_URL =
  "https://681ed227c1c291fa66353a6f.mockapi.io/api/v1/report";

export const fetchBills = async ({
  page = 1,
  limit = 30,
  sortBy,
  order,
  filters = {},
  search,
}) => {
  const params = {
    page,
    limit,
    ...(sortBy && { sortBy }),
    ...(order && { order }),
    search,
    ...filters,
  };

  const res = await axios.get(API_URL, { params });
  const totalCount = Number(res.headers["x-total-count"] || res.data.length);
  return {
    items: res.data,
    totalCount,
  };
};
