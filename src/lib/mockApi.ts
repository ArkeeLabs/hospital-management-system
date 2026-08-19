import type { Appointment, Patient } from '../data/hospitalData';

const wait = (milliseconds = 300) => new Promise((resolve) => setTimeout(resolve, milliseconds));

/** Demo API contract kept alongside the local CRM store for a future backend swap. */
export const mockApi = {
  async getQueueStatus(currentInsideCount: number) {
    await wait();
    return { patientsInside: currentInsideCount, updatedAt: new Date().toISOString() };
  },
  async getTodayAppointments(items: Appointment[]) {
    await wait();
    return items;
  },
  async createAppointment(appointment: Appointment) {
    await wait();
    return appointment;
  },
  async updateAppointment(id: string, status: Appointment['status']) {
    await wait();
    return { id, status };
  },
  async getPatient(id: string, items: Patient[]) {
    await wait();
    return items.find((patient) => patient.id === id) ?? null;
  },
};
