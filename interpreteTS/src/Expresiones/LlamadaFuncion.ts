import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Print } from "../Instrucciones/Print";

export class LlamadaFuncion extends Expresion {
    
    nombre  : string;
    lista_exp   : Expresion[];

    constructor(nombre :string, lista_exp :Expresion[], linea :number, columna :number){
        super(linea, columna);
        this.nombre = nombre;
        this.lista_exp = lista_exp;
    }

    public getValor(actual: Ambito, global: Ambito, ast: AST) {
        
        switch(this.nombre) {
            case "print":
                {
                    let print = new Print(this.lista_exp, this.linea, this.columna);
                    return print.ejecutar(actual, global, ast);
                }
            default:
                {
                    
                }
        }
    }

}