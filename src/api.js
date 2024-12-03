import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Django 서버 주소
});

// 단어 CRUD API
export const fetchWords = () => API.get("words/");
export const createWord = (data) => API.post("words/", data);
export const updateWord = (id, data) => API.put(`words/${id}/`, data);
export const deleteWord = (id) => API.delete(`words/${id}/`);
export const fetchRandomWords = () => {
  return axios.get("words/random/");
};
