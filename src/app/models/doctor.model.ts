export interface Doctor {
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    favorType: string,
    experience: number,
    specialization: string,
    appointments: Date[]
}