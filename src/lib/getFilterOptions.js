import axios from "axios";
import { API_URL } from "./api";

export async function getFilterOptions() {
  const res = await axios.get(API_URL, {
    params: {
      page: 1,
      limit: 1000,
    },
  });

  const data = res.data;

  const getUnique = (key) =>
    [...new Set(data.map((item) => item[key]).filter(Boolean))].sort();

  return {
    customerType: getUnique("customerType"),
    customerName: getUnique("customerName"),
    vehicleModel: getUnique("vehicleModel"),
    customerStatus: getUnique("customerStatus"),
    accountHolder: getUnique("accountHolder"),
    concernPerson: getUnique("concernPerson"),
  };
}
