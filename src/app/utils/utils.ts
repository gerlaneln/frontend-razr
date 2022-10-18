export class Utils {

    static compareById(a: any, b: any): boolean {
        // return c1 && c2 ? c1.id === c2.id : c1 === c2;
        // return a && b && a.id === b.id;
        return a && b ? a.id === b.id : a === b;
    }

    static compareByName(a: string, b: string): boolean{
        return a === b;
    }
    
}
