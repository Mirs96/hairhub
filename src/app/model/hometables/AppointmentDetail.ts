import { TreatmentDto } from "./TreatmentDto";


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
    salonId: number;
    salonName: string;
} 
