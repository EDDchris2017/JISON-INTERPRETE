import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class Valor extends Expresion {
    
    valor       : string;
    tipo_valor  : string;

    constructor(valor :string, tipo_valor :string, linea :number, columna :number ) {
        super(linea, columna);
        this.valor = valor;
        this.tipo_valor = tipo_valor;
    }
    
    public getValor(actual: Ambito, global: Ambito, ast: AST) {
        
        switch(this.tipo_valor) {
            case "integer" :
                {
                    this.tipo = new Tipo(TipoPrimitivo.Integer);
                    return parseInt(this.valor);
                }
            case "string" :
                {
                    this.tipo = new Tipo(TipoPrimitivo.String);
                    return this.valor;
                }
            case "double" :
                {
                    this.tipo = new Tipo(TipoPrimitivo.Double);
                    return parseFloat(this.valor);
                }
            case "char" :
                {
                    this.tipo = new Tipo(TipoPrimitivo.Char);
                    return this.valor;
                }
            case "true" :
                {   
                    this.tipo = new Tipo(TipoPrimitivo.Boolean);
                    return true;
                }
            case "false" :
                {
                    this.tipo = new Tipo(TipoPrimitivo.Boolean);
                    return false;
                }
        }
    }

}