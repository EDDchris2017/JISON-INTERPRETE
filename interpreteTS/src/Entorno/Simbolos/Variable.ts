import { Tipo } from "./Tipo";

export class Variable {

    tipo:   Tipo;
    id:     string;
    valor:  any;

    constructor(tipo:Tipo, id:string, valor:any) {
        this.tipo   = tipo;
        this.id     = id;
        this.valor  = valor;
    }

    public asignarValor(valor: any){
        this.valor = valor;
    }

    public getValor(): any {
        return this.valor;
    }

    public getTipo(): Tipo {
        return this.tipo;
    }

    public getNombre(): string {
        return this.id;
    }
}