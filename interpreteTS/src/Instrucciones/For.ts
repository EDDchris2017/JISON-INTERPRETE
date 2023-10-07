import exp from "constants";
import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { DeclararVariable } from "./DeclararVariable";

export class For extends Instruccion {

    instruccion:    Instruccion;
    exp_cond:       Expresion;
    asignacion:     Instruccion;
    sentencias:     Nodo[];

    constructor(instruccion: Instruccion, exp_cond: Expresion, asignacion: Instruccion, sentencias: Nodo[]
        , linea, columna){
            super(linea,columna);
            this.instruccion = instruccion;
            this.exp_cond = exp_cond;
            this.asignacion = asignacion;
            this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        
        let contexto: Ambito = new Ambito(actual);

        // Evaluar la sentencia de inicializacion del for
        this.instruccion.ejecutar(contexto, global, ast);

        // Evaluar la condicion del for
        let val_cond = this.exp_cond.getValor(contexto, global, ast);

        while(val_cond)
        {
            // Ejecutar setencias for
            for(let sentencia of this.sentencias){
                if(sentencia instanceof Instruccion) sentencia.ejecutar(contexto, global, ast);
                if(sentencia instanceof Expresion) sentencia.getValor(contexto, global, ast);
            }

            // Evaluar asignacion por iteracion del for
            this.asignacion.ejecutar(contexto, global, ast);
            // Evaluar condicion por iteracion
            val_cond = this.exp_cond.getValor(contexto, global, ast);
            // Iniciar nuevo contexto o entorno
            contexto = new Ambito(actual);
        }

        
    }

}