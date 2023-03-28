import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";

export class While extends Instruccion{
    
    exp: Expresion;
    sentencias : Nodo[];

    constructor(exp: Expresion, sentencias : Nodo[], linea: number, columna: number){
        super(linea, columna);
        this.exp = exp;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
       let val_cond = this.exp.getValor(actual, global, ast);
       
       let ambito_local = new Ambito(actual);
       while(val_cond) 
       {
            for(let sentencia of this.sentencias){
                if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_local, global, ast);
                if(sentencia instanceof Expresion) sentencia.getValor(ambito_local, global, ast);
            }
            val_cond = this.exp.getValor(actual, global, ast);
       }
    }

}