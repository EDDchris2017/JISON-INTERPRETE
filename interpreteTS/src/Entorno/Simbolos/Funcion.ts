import { Parametro } from "../../Instrucciones/Parametro";
import { Nodo } from "../Nodo";

export class Funcion {

    nombre:         string;
    parametros:     Parametro[];
    sentencias:     Nodo[];

    constructor(nombre: string, parametros: Parametro[], sentencias: Nodo[]) {
        this.nombre = nombre;
        this.parametros = parametros;
        this.sentencias = sentencias;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getParametros(): Parametro[] {
        return this.parametros;
    }
}