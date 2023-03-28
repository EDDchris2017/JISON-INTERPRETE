import { TipoPrimitivo } from "./TipoPrimitivo";

export class Tipo {
    
    tipo        : TipoPrimitivo;

    constructor(tipoPrimitivo :TipoPrimitivo) {
        this.tipo = tipoPrimitivo;
    }

    getPrimitivo(): TipoPrimitivo {
        return this.tipo;
    }
}