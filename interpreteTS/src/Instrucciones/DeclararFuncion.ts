import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { DeclararVariable } from "./DeclararVariable";

export class DeclararFuncion extends Instruccion {
    
    tipo        : Tipo;
    nombre      : string;
    parametros  : DeclararVariable[];
    sentencias  : Nodo[];  

    constructor(tipo :Tipo,nombre : string, parametros :DeclararVariable[], sentencias: Nodo[], linea :number, columna :number) {
        super(linea, columna);
        this.nombre = nombre;
        this.parametros = parametros;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        throw new Error("Method not implemented.");
    }
}