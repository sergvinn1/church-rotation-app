import axios from "axios";
const baseUrl = "/api/prayer-rites";

export function getPrayerRites(search = "", sort = "") {
  let params = [];
  if (search) params.push(`search=${encodeURIComponent(search)}`);
  if (sort) params.push(`sort=${encodeURIComponent(sort)}`);
  const query = params.length ? "?" + params.join("&") : "";
  return axios.get(baseUrl + query);
}

export function addPrayerRite(data, pdfFile) {
  const formData = new FormData();
  formData.append("name", data.name);
  if (pdfFile) formData.append("pdf", pdfFile);
  return axios.post(baseUrl, formData, { headers: { "Content-Type": "multipart/form-data" } });
}

export function updatePrayerRite(id, data, pdfFile) {
  const formData = new FormData();
  formData.append("name", data.name);
  if (pdfFile) formData.append("pdf", pdfFile);
  return axios.put(`${baseUrl}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
}

export function deletePrayerRite(id) {
  return axios.delete(`${baseUrl}/${id}`);
}

// Збільшити лічильник популярності (кліків)
export function incrementPopularity(id) {
  return axios.post(`${baseUrl}/${id}/increment-popularity`);
}