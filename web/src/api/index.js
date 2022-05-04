import axios from "axios";
export const url = "http://localhost:3002";

const apiAxios = axios.create({
  baseURL: url,
});
const GET_TRIPS = "/trips";

export function getTrips() {
  return apiAxios.get(GET_TRIPS);
}
export function getSearchTrips(keyword) {
  return apiAxios.get(`${GET_TRIPS}?keyword=${keyword}`);
}
