export abstract class Nodo {
    
    public linea:       number;
    public columna:     number;

    constructor(linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
    }
}