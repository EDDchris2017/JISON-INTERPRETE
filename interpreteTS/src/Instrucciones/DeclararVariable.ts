import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Variable } from "../Entorno/Simbolos/Variable";

export class DeclararVariable extends Instruccion{
    

    tipo:   Tipo;
    id:     string;
    exp:    Expresion;

    constructor(tipo: Tipo, id: string, exp: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.exp = exp;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        
        // Verificar que no exista variable
        console.log(actual.existeVariable(this.id));
        if( actual.existeVariable(this.id) ) {
            // * ERROR *
            throw new Error("Variable ya se encuentra definida en el entorno actual: " + this.linea + " , " + this.columna);
        }

        let res
        if(this.exp != undefined) {
            res = this.exp.getValor(actual, global, ast);
            if(this.tipo.getPrimitivo() != this.exp.tipo.getPrimitivo()) {
                // * ERROR *
                throw new Error("Tipo de variable declarada no es igual al tipo de la expresion: " + this.linea + " , " + this.columna);
            }
        } else 
        {
            if(this.tipo.getPrimitivo() === TipoPrimitivo.Integer){
                res = 0;
            }else if(this.tipo.getPrimitivo() === TipoPrimitivo.Double){
                res = 0.0;
            } else if(this.tipo.getPrimitivo() === TipoPrimitivo.String) {
                res = "";
            } else if(this.tipo.getPrimitivo() === TipoPrimitivo.String) {
                res = "";
            }
        }

        let nueva_var = new Variable(this.tipo, this.id, res);
        actual.insertarVariable(this.id,nueva_var);

    }
}
