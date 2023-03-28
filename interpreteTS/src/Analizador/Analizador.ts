import { AST } from '../Entorno/AST';
import { Raiz } from '../Entorno/Raiz';
import Parser from './Parser';

export class Analizador
{
    entrada     :string;        // Entrada ha analizar
    archivo     :string;        // Archivo de la entrada

    constructor(entrada:string,archivo:string)
    {
        this.archivo = archivo;
        this.entrada = entrada;
        
    }

    public Analizar(): any 
    {
       // let parser:any = require("./Parser").parser;
       	let parser:any 	= Parser.parser;
        let arbol:AST   = undefined;

        try{
            let raiz:Raiz    = parser.parse(this.entrada);
            arbol = new AST(raiz);

            // Ejecutar
            arbol.ejecutar();

            return arbol;
        }catch(e){
            console.log(e);
            return false;
        }
    }
}