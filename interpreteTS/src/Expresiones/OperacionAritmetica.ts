import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class OperacionAritmetica extends Expresion {
    
    exp1    : Expresion;
    exp2    : Expresion;
    signo   : string;

    constructor(exp1 :Expresion, signo :string, exp2 :Expresion,linea :number, columna :number ) {
        super(linea, columna);
        this.exp1 = exp1;
        this.signo = signo;
        this.exp2 = exp2;
    }

    public getValor(actual: Ambito, global: Ambito, ast: AST) {
        let val1    = this.exp1.getValor(actual,global,ast);
        let tipo1   = this.exp1.tipo;
        let val2    = this.exp2.getValor(actual,global,ast);
        let tipo2   = this.exp2.tipo;

        switch(this.signo) {
            case "+" :
                {
                    return this.Suma(val1, tipo1, val2, tipo2, actual, global, ast);
                }
            case "-" :
                {
                    return this.Resta(val1, tipo1, val2, tipo2, actual, global, ast);
                }
            case "*" :
                {
                    return this.Multiplicacion(val1, tipo1, val2, tipo2, actual, global, ast);
                }
            case "/" :
                {
                    return this.Division(val1, tipo1, val2, tipo2, actual, global, ast);
                }
        }
    }

    public Suma(val1:any,tipo1:Tipo,val2:any,tipo2:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        let prim2:TipoPrimitivo = tipo2.getPrimitivo();
        // TIPO DOUBLE
        if (
            (prim1 == TipoPrimitivo.Double && 
            (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double || prim2 == TipoPrimitivo.Char))
            || ( prim2 == TipoPrimitivo.Double &&
            (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double || prim1 == TipoPrimitivo.Char))
        ){
            this.tipo = new Tipo(TipoPrimitivo.Double);
            return val1 + val2;
        }
        // TIPO INTEGER
        else if (
            (prim1 == TipoPrimitivo.Integer && 
            (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double || prim2 == TipoPrimitivo.Char))
            || ( prim2 == TipoPrimitivo.Integer &&
            (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double || prim1 == TipoPrimitivo.Char))
        )
        {
            this.tipo = new Tipo(TipoPrimitivo.Integer);
            return val1 + val2;
        } 
        else if (prim1 == TipoPrimitivo.String || prim2 == TipoPrimitivo.String)
        {
            this.tipo = new Tipo(TipoPrimitivo.String);
            return val1.toString() + val2.toString();
        }
    }

    public Resta(val1:any,tipo1:Tipo,val2:any,tipo2:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        let prim2:TipoPrimitivo = tipo2.getPrimitivo();
        // TIPO DOUBLE
        if (
            (prim1 == TipoPrimitivo.Double && 
            (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double || prim2 == TipoPrimitivo.Char))
            || ( prim2 == TipoPrimitivo.Double &&
            (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double || prim1 == TipoPrimitivo.Char))
        ){
            this.tipo = new Tipo(TipoPrimitivo.Double);
            return val1 - val2;
        }
        // TIPO INTEGER
        else if (
            (prim1 == TipoPrimitivo.Integer && 
            (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double || prim2 == TipoPrimitivo.Char))
            || ( prim2 == TipoPrimitivo.Integer &&
            (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double || prim1 == TipoPrimitivo.Char))
        )
        {
            this.tipo = new Tipo(TipoPrimitivo.Integer);
            return val1 - val2;
        } 
    }

    public Multiplicacion(val1:any,tipo1:Tipo,val2:any,tipo2:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        let prim2:TipoPrimitivo = tipo2.getPrimitivo();
        // TIPO DOUBLE
        if (
            (prim1 == TipoPrimitivo.Double && 
            (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double || prim2 == TipoPrimitivo.Char))
            || ( prim2 == TipoPrimitivo.Double &&
            (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double || prim1 == TipoPrimitivo.Char))
        ){
            this.tipo = new Tipo(TipoPrimitivo.Double);
            return val1 * val2;
        }
        // TIPO INTEGER
        else if (
            (prim1 == TipoPrimitivo.Integer && 
            (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double || prim2 == TipoPrimitivo.Char))
            || ( prim2 == TipoPrimitivo.Integer &&
            (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double || prim1 == TipoPrimitivo.Char))
        )
        {
            this.tipo = new Tipo(TipoPrimitivo.Integer);
            return val1 * val2;
        } 
    }

    public Division(val1:any,tipo1:Tipo,val2:any,tipo2:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        let prim2:TipoPrimitivo = tipo2.getPrimitivo();
        // TIPO DOUBLE
        if (
            (prim1 == TipoPrimitivo.Double && 
            (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double || prim2 == TipoPrimitivo.Char))
            || ( prim2 == TipoPrimitivo.Double &&
            (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double || prim1 == TipoPrimitivo.Char))
        ){
            this.tipo = new Tipo(TipoPrimitivo.Double);
            return val1 / val2;
        }
        // TIPO INTEGER
        else if (
            (prim1 == TipoPrimitivo.Integer && 
            (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double || prim2 == TipoPrimitivo.Char))
            || ( prim2 == TipoPrimitivo.Integer &&
            (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double || prim1 == TipoPrimitivo.Char))
        )
        {
            this.tipo = new Tipo(TipoPrimitivo.Integer);
            return val1 / val2;
        } 
    }

}