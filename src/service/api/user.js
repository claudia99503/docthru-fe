import axios from './axios';

const PATH = '/users';

export async function getUserMe() {
  const res = axios.post(`${PATH}/me`);
  return res.data;
}

export async function createUser(data) {
  const res = axios.post(`${PATH}/register`, data);
  return res.data;
}

export async function createLogin(data) {
  const res = axios.post(`${PATH}/login`, data);
  return res.data;
}

export async function createLogout() {
  const res = axios.post(`${PATH}/logout`);
  return res.data;
}
