import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";

export class AccesoVariable extends Expresion{
    
    nombreVar  : string;

    constructor(nombreVar : string, linea : number, columna : number) {
        super(linea,columna);
        this.nombreVar = nombreVar;
    }
    
    public getValor(actual: Ambito, global: Ambito, ast: AST) {
        
        let variable = actual.getVariable(this.nombreVar);
        if(variable === undefined) {
            // * ERROR *
            throw new Error("Sintactico Error: No existe la variable " + this.nombreVar + " " + this.linea + ", " + this.columna);
        }

        let valor_var = variable.getValor();
        
        this.tipo = variable.getTipo();
        return valor_var;
    }

}