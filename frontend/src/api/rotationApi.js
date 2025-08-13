import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

export const login = async (username, password) =>
  axios.post(`${BASE_URL}/auth/login`, { username, password });

export const getRotations = async (from, to) =>
  axios.get(`${BASE_URL}/rotations`, { params: { from, to } });

export const addRotation = async (rotation, token) =>
  axios.post(`${BASE_URL}/rotations`, rotation, {
    headers: { Authorization: `Bearer ${token}` }
  });