
import { Chipset } from "./chipset.model";
import { LifeCycleStatus } from "./life-cycle-status.model";
import { ProductFamily } from "./product-family.model";
import { Team } from "./team";

export interface Product{
    id: number,
    name: string,
    broadband: string,
    isODM1: boolean,
    firstSA: string,
    firstUG: string,
    gpdLead: string,
    npiLead: string,
    productPhoto: Blob,
    productFamily: ProductFamily,
    chipset: Chipset,   
    team: Team,
    lifeCycleStatus: LifeCycleStatus,
}