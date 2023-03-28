import { Ambito } from "./Ambito";
import { AST } from "./AST";
import { Nodo } from "./Nodo";
import { Tipo } from "./Simbolos/Tipo";

export abstract class Expresion extends Nodo{

    public tipo         : Tipo;


    constructor(linea:number,columna:number)
    {
        super(linea,columna);
        this.tipo = undefined;
    }

    public abstract getValor(actual: Ambito, global: Ambito, ast: AST) : any;
}