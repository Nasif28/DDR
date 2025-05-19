import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useTableData = (params) => {
  const { page, pageSize, search, filters, sort } = params;

  const queryString = new URLSearchParams({
    page: page,
    limit: pageSize,
    search,
    ...filters,
    ...(sort[0] && {
      sortBy: sort[0].id,
      order: sort[0].desc ? "desc" : "asc",
    }),
  }).toString();

  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const res = await api.get(`/report?${queryString}`);
      return res.data;
    },
    keepPreviousData: true,
  });
};
