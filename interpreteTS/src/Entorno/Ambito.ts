import { Funcion } from "./Simbolos/Funcion";
import { Variable } from "./Simbolos/Variable";

export class Ambito {

    anterior: Ambito;
    tabla_variables: Map<string,    Variable>;
    tabla_funciones: Map<string,   Funcion>;

    constructor(anterior: Ambito) {
        this.anterior = anterior;
        this.tabla_variables = new Map<string,   Variable>();
        this.tabla_funciones = new Map<string,   Funcion>();
    }

    public insertarVariable(id :string, variable :Variable) {
        this.tabla_variables.set(id, variable);
    }

    public insertarFuncion(id :string, funcion :Funcion) {
        this.tabla_funciones.set(id, funcion);
    }

    public getVariable(id :string): Variable {
        let e: Ambito = this;
        while (e != null) {
            try {
                const variable = e.tabla_variables.get(id);
                if (variable != null) {
                    return variable as Variable;
                }
            } catch (error) {
                console.log(error);
            }
            e = e.anterior;
        }
        return undefined;
    }

    public getFuncion(id :string): Funcion {
        return this.tabla_funciones.get(id);
    }

    public existeVariable(id :string) : boolean {
        return this.tabla_variables.get(id) != undefined;
    }
}