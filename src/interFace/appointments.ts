// Appointments Services Interfaces

export interface IAddAppointmentParams {
    description: string;
    contactId: string;
    scheduledAt: Date | string;
    appointmentItemIds: number[];
}

export interface IUpdateAppointmentParams {
    description: string;
    contactId: string;
    scheduledAt: Date | string;
    appointmentItemIds: number[];
}

export interface IFetchAppointmentsParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}
