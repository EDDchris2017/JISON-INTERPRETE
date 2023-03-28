import { Ambito } from "./Ambito";
import { AST } from "./AST";
import { Nodo } from "./Nodo";

export abstract class Instruccion extends Nodo
{
    constructor(linea:number,columna:number)
    {
        super(linea,columna);
    }

    public abstract ejecutar(actual: Ambito, global: Ambito, ast: AST): any;
}
