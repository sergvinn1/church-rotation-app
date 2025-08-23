import axios from "axios";
const baseUrl = "/api/akathists";

export function getAkathists(search = "", sort = "") {
  let params = [];
  if (search) params.push(`search=${encodeURIComponent(search)}`);
  if (sort) params.push(`sort=${encodeURIComponent(sort)}`);
  const query = params.length ? "?" + params.join("&") : "";
  return axios.get(baseUrl + query);
}

export function addAkathist(data) {
  return axios.post(baseUrl, data);
}

export function updateAkathist(id, data) {
  return axios.put(`${baseUrl}/${id}`, data);
}

export function deleteAkathist(id) {
  return axios.delete(`${baseUrl}/${id}`);
}