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
        let valido = false;
        try{
            let valido:boolean = parser.parse(this.entrada);
            console.log(valido);
            return valido;
        }catch(e){
            console.log(e);
            return false;
        }
    }
}