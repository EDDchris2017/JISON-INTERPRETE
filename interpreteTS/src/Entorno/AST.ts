import { Raiz } from "./Raiz";

export class AST {

    /*  Nodo Raiz de ejecucion */
    private raiz:   Raiz;

    private salida_cadena:  string;

    constructor (raiz:Raiz) {
        this.raiz = raiz;
        this.salida_cadena = "";
    }

    public ejecutar() {

        this.raiz.ejecutar(this);
    }


    public escribirConsola(cadena: string) {
        this.salida_cadena += cadena + "\n"; 
    }

    public getSalida() {
        return this.salida_cadena;
    }

}