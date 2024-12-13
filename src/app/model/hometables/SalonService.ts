import { Injectable } from "@angular/core";
import { Topsalons } from "./Topsalons";
import { Salon } from "./Salon";

@Injectable({
    providedIn: 'root'
})
export class SalonService {
    private topSalon: Salon[] = [
        {
            name: 'Salone1'
        },
        {
            name: 'Salone2'
        },
        {
            name: 'Salone3'
        },
        {
            name: 'Salone4'
        },
        {
            name: 'Salone5'
        }
    ];

    private topSalonByCut: Salon[] = [
        {
            name: 'Salone1A'
        },
        {
            name: 'Salone2A'
        },
        {
            name: 'Salone3A'
        },
        {
            name: 'Salone4A'
        },
        {
            name: 'Salone5A'
        }
    ];

    private topSalonByBeard: Salon[] = [
        {
            name: 'Salone1B'
        },
        {
            name: 'Salone2B'
        },
        {
            name: 'Salone3B'
        },
        {
            name: 'Salone4B'
        },
        {
            name: 'Salone5B'
        }
    ];

    getTopSalons(): Salon[]{
        return this.topSalon;
    }

    getTopSalonsByCut(): Salon[]{
        return this.topSalonByCut;
    }

    getTopSalonsByBeard(): Salon[]{
        return this.topSalonByBeard;
    }

}
