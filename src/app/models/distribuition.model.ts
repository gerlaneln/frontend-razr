import { PhoneCompany } from "./phone-company.model";
import { Region } from "./region";

export interface Distribuition{
    id: number,
    modelName: string,
    personnel: number,
    beforeTa: number,
    afterTa: number,
    region: Region,
    company: PhoneCompany
}