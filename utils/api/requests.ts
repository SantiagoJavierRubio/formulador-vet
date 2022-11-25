import type { User } from "../types/User";
import constants from "../constants";
import axios from "axios";

const instance = axios.create({
  baseURL: constants.apiUrl,
});

export async function getPatients(id?: string, token?: User["token"]) {
  if (!token) return;
  return instance.get(`/patients/${id}`, {
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

export async function deletePatient(patientId: string, token?: User["token"]) {
  if (!token) return;
  return instance.delete(`/patients/${patientId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
