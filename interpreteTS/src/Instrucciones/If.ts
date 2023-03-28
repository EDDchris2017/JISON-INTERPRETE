import exp from "constants";
import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class If extends Instruccion {
    
    exp_condicion   : Expresion;
    sentencias      : Nodo[];
    sentencias_else : Nodo[];

    constructor(exp_condicion :Expresion, sentencias :Nodo[], sentencias_else :Nodo[], linea :number, columna :number) {
        super(linea, columna);
        this.exp_condicion = exp_condicion;
        this.sentencias = sentencias;
        this.sentencias_else = sentencias_else;
    }
    
    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        // Condicion
        let condicion = this.exp_condicion.getValor(actual, global, ast);

        // Verificar tipo booleano
        if(this.exp_condicion.tipo.getPrimitivo() != TipoPrimitivo.Boolean) {
            // * ERROR * 
            return
        }

        if ( condicion ){
            // Crear ambito nuevo
            let ambito_if = new Ambito(actual);

            for(let sentencia of this.sentencias){
                if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_if, global, ast);
                if(sentencia instanceof Expresion) sentencia.getValor(ambito_if, global, ast);
            }
        }else {
            let ambito_else = new Ambito(actual);
            for(let sentencia of this.sentencias_else){
                if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_else, global, ast);
                if(sentencia instanceof Expresion) sentencia.getValor(ambito_else, global, ast);
            }
        }
    }

}