import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";

export class Print extends Instruccion
{

    lista_exp   : Expresion[];

    constructor(listaexp : Expresion[], linea: number, columna :number) {
        super(linea, columna);
        this.lista_exp = listaexp;
    }


    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        if(this.lista_exp.length == 1) {

            let exp: Expresion = this.lista_exp[0];
            let res = exp.getValor(actual, global, ast);
            ast.escribirConsola(res.toString());
        } else 
        {
            //TODO COLOCAR ERROR
        }
    }
    
}