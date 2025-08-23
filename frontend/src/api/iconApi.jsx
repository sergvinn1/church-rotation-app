import axios from "axios";

export const getIcons = (search = "", sort = "name") =>
  axios.get("/api/icons", { params: { search, sort } });

export const addIcon = (data) =>
  axios.post("/api/icons", data);

export const updateIcon = (id, data) =>
  axios.put(`/api/icons/${id}`, data);

export const deleteIcon = (id) =>
  axios.delete(`/api/icons/${id}`);