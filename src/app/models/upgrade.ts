import { Product } from "./product";


export interface Upgrade{
    id: number,
    upgradeType: string,
    releaseDate: string,
    changeLog: string,
    product: Product
}