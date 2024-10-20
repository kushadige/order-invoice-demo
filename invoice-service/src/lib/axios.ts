import axios from "axios";
import { ORDER_SERVICE_URL } from "@/config/env";

export const axiosInstance = axios.create({
  baseURL: `${ORDER_SERVICE_URL}/api`,
});
