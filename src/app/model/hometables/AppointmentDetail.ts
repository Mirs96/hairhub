import { TreatmentDto } from "./treatmentDto";


export interface AppointmentDto{
    id: number;
    userName:string;
    userId: number;
    barberId:number;
    barberName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    treatments:TreatmentDto[];

} 