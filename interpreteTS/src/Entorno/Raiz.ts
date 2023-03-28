import { DeclararFuncion } from "../Instrucciones/DeclararFuncion";
import { DeclararVariable } from "../Instrucciones/DeclararVariable";
import { Ambito } from "./Ambito";
import { AST } from "./AST";
import { Expresion } from "./Expresion";
import { Instruccion } from "./Instruccion";
import { Nodo } from "./Nodo";

export class Raiz {

    private sentencias:     Nodo[];

    constructor(sentencias : Nodo[]) {
        this.sentencias = sentencias;
    }

    public ejecutar(ast: AST) {
        try
        {
            let ambito_global:Ambito = new Ambito(undefined);
            let ambito_actual:Ambito = ambito_global;

            this.ejecutarDeclaracionesVar(ambito_actual, ambito_global, ast);
            this.ejecutarDeclaracionesFunciones(ambito_actual, ambito_global, ast);

            for(let x = 0; x < this.sentencias.length ; x++)
            {
                let sent = this.sentencias[x];
                if ( !(sent instanceof DeclararVariable) && !(sent instanceof DeclararFuncion))
                {
                    if(sent instanceof Instruccion) sent.ejecutar(ambito_actual, ambito_global, ast);
                    else if(sent instanceof Expresion) sent.getValor(ambito_actual, ambito_global, ast);
                }
            }  
        }catch(ex){
            ast.escribirConsola("ERROR => " + ex.message);
            console.log(ex);

        }
        
    }

    private ejecutarDeclaracionesVar(actual :Ambito, global :Ambito, ast:AST){
         for(let x = 0; x < this.sentencias.length ; x++)
         {
             let sent = this.sentencias[x];
             if ( sent instanceof DeclararVariable)
             {
                 sent.ejecutar(actual, global, ast);
             }
         }
    }

    private ejecutarDeclaracionesFunciones(actual :Ambito, global :Ambito, ast:AST){

        
        for(let x = 0; x < this.sentencias.length ; x++)
        {
            let sent = this.sentencias[x];
            if ( sent instanceof DeclararFuncion)
            {
                sent.ejecutar(actual, global, ast);
            }
        }
   }
}