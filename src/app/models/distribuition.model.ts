import { PhoneCompany } from "./phone-company.model";
import { Region } from "./region";

export interface Distribuition{
    id: number,
    modelName: string,
    personnel: number,
    taDate: string,
    beforeTa: number,
    afterTa: number,
    region: Region,
    company: PhoneCompany
}