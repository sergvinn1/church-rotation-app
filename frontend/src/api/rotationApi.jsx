import axios from "axios";
const BASE_URL = "http://localhost:4000/api";

// === CRUD для списку дияконів ===
export const getDeacons = () => axios.get(`${BASE_URL}/deacons`);
export const addDeacon = (data, token) =>
  axios.post(`${BASE_URL}/deacons`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateDeacon = (id, data, token) =>
  axios.put(`${BASE_URL}/deacons/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteDeacon = (id, token) =>
  axios.delete(`${BASE_URL}/deacons/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === CRUD для списку священників ===
export const getPriests = () => axios.get(`${BASE_URL}/priests`);
export const addPriest = (data, token) =>
  axios.post(`${BASE_URL}/priests`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updatePriest = (id, data, token) =>
  axios.put(`${BASE_URL}/priests/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deletePriest = (id, token) =>
  axios.delete(`${BASE_URL}/priests/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === CRUD для розкладу дияконів ===
export const getDeaconSchedules = (from, to) =>
  axios.get(`${BASE_URL}/deacon-schedules`, { params: { from, to } });
export const addDeaconSchedule = (data, token) =>
  axios.post(`${BASE_URL}/deacon-schedules`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateDeaconSchedule = (id, data, token) =>
  axios.put(`${BASE_URL}/deacon-schedules/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteDeaconSchedule = (id, token) =>
  axios.delete(`${BASE_URL}/deacon-schedules/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === CRUD для розкладу священників ===
export const getPriestSchedules = (from, to) =>
  axios.get(`${BASE_URL}/priest-schedules`, { params: { from, to } });
export const addPriestSchedule = (data, token) =>
  axios.post(`${BASE_URL}/priest-schedules`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updatePriestSchedule = (id, data, token) =>
  axios.put(`${BASE_URL}/priest-schedules/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deletePriestSchedule = (id, token) =>
  axios.delete(`${BASE_URL}/priest-schedules/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });