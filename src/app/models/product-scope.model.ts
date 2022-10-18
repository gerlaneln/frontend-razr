import { Product } from "./product";
import { Distribuition } from "./distribuition.model";

export interface ProductScope {
    id: number,
    comment: string,
    so: string,
    product: Product,
    distModel: Distribuition
}
