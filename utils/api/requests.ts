import type { User } from "../types/User";
import constants from "../constants";
import axios from "axios";

const instance = axios.create({
  baseURL: constants.apiUrl,
});

export async function getPatients(token?: User["token"]) {
  if (!token) return;
  return instance.get("/patients", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createPatient(patient: object, token?: User["token"]) {
  if (!token) return;
  return instance.post("/patients", patient, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
