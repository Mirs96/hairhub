import { TreatmentDto } from "./treatmentDto";


export interface AppointmentDetail{
    id: number;
    userId: number;
    barberId:number;
    barberName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    treatments:TreatmentDto[];

} 