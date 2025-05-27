import { TSpecialty } from '@/app/types/specialty';

export type TAdvocate = {
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: TSpecialty[];
    yearsOfExperience: number;
    phoneNumber: number;
};
