import { Product } from "./product";

export interface History {
    id: number,
    snapshotDate: string,
    comment: string,
    loggedUser: string,
    product: Product
}
