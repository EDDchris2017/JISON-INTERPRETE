import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class OperacionRelacional extends Expresion {
    
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
            case ">" :
                {
                    return this.MayorQue(val1, tipo1, val2, tipo2, actual, global, ast);
                }
            case "<" :
                {
                    return this.MenorQue(val1, tipo1, val2, tipo2, actual, global, ast);
                }
            case ">=" :
                {
                    return this.MayorIgual(val1, tipo1, val2, tipo2, actual, global, ast);
                }
            case "<=" :
                {
                    return this.MenorIgual(val1, tipo1, val2, tipo2, actual, global, ast);
                }
            case "==" :
                {
                    return this.Igual(val1, tipo1, val2, tipo2, actual, global, ast);
                }
            case "!=" :
                {
                    return this.Diferente(val1, tipo1, val2, tipo2, actual, global, ast);
                }
        }
    }

    public MayorQue(val1:any,tipo1:Tipo,val2:any,tipo2:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        let prim2:TipoPrimitivo = tipo2.getPrimitivo();
        this.tipo = new Tipo(TipoPrimitivo.Boolean);
        if (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double || prim1 == TipoPrimitivo.Char) {
            if (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double || prim2 == TipoPrimitivo.Char) {
                
                return val1 > val2;
            }
            else {
                
            }
        }
    }

    public MenorQue(val1:any,tipo1:Tipo,val2:any,tipo2:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        let prim2:TipoPrimitivo = tipo2.getPrimitivo();
        this.tipo = new Tipo(TipoPrimitivo.Boolean);
        if (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double ) {
            if (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double ) {
            
                return val1 < val2;
            }else {

            }
        }

    }

    public MayorIgual(val1:any,tipo1:Tipo,val2:any,tipo2:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        let prim2:TipoPrimitivo = tipo2.getPrimitivo();
        this.tipo = new Tipo(TipoPrimitivo.Boolean);
        if (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double ) {
            if (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double ) {
            
                return val1 >= val2;
            }else {

            }
        }
    }

    public MenorIgual(val1:any,tipo1:Tipo,val2:any,tipo2:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        let prim2:TipoPrimitivo = tipo2.getPrimitivo();
        this.tipo = new Tipo(TipoPrimitivo.Boolean);
        if (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double ) {
            if (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double ) {
            
                return val1 <= val2;
            }else {

            }
        }
    }

    public Igual(val1:any,tipo1:Tipo,val2:any,tipo2:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        let prim2:TipoPrimitivo = tipo2.getPrimitivo();
        this.tipo = new Tipo(TipoPrimitivo.Boolean);
        if (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double ) {
            if (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double ) {
            
                return val1 === val2;
            }else {

            }
        } else if(prim1 == TipoPrimitivo.String && prim2 == TipoPrimitivo.String) {
            return val1.toString() === val2.toString();
        }
    }

    public Diferente(val1:any,tipo1:Tipo,val2:any,tipo2:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        let prim2:TipoPrimitivo = tipo2.getPrimitivo();
        this.tipo = new Tipo(TipoPrimitivo.Boolean);
        if (prim1 == TipoPrimitivo.Integer || prim1 == TipoPrimitivo.Double ) {
            if (prim2 == TipoPrimitivo.Integer || prim2 == TipoPrimitivo.Double ) {
                
                return val1 != val2;
            }else {

            }
        } else if(prim1 == TipoPrimitivo.String && prim2 == TipoPrimitivo.String) {
            return val1.toString() != val2.toString();
        }
    }

}