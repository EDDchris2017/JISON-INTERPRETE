/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-sensitive

digit                       [0-9]
cor1                        "["
cor2                        "]"
esc                         "\\"
int                         (?:[0-9]|[1-9][0-9]+)
exp                         (?:[eE][-+]?[0-9]+)
frac                        (?:\.[0-9]+)

%%

\s+                             {/* skip whitespace */}
<<EOF>>                         {return 'EOF';}

/* COMENTARIOS */
"//".*                                 {/* IGNORE */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {/* IGNORE */}

/* =================== PALABRAS RESERVADAS =================== */
"true"                          {   return 'ttrue';     }
"false"                         {   return 'tfalse';    }
"int"                           {   return 'tinteger';  }
"boolean"                       {   return 'tboolean';  }
"double"                        {   return 'tdouble';   }
"String"                        {   return 'tstring';   }
"if"                            {   return 'tif';       }
"void                           {   return 'tvoid';     }
"return"                        {   return 'treturn';   }

/* =================== EXPRESIONES REGULARES ===================== */
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*             yytext = yytext.toLowerCase();          return 'id';
\"(?:[{cor1}|{cor2}]|["\\"]["bnrt/["\\"]]|[^"["\\"])*\"         yytext = yytext.substr(1,yyleng-2);     return 'cadena';
\'(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^"{esc}])\'    yytext = yytext.substr(1,yyleng-2);     return 'caracter'
{int}{frac}\b                                                                                           return 'decimal'
{int}\b                                                                                                 return 'entero'

/* ======================== SIGNOS ======================= */
"$"                             {return '$'};
"++"                            {return '++';}
"--"                            {return '--';}
"+"                             {return '+';}
"-"                             {return '-';}
"*"                             {return '*';}
"/"                             {return '/';}
"%"                             {return '%';}
"("                             {return '(';}
")"                             {return ')';}
"=="                            {return '==';}
"="                             {return '=';}
","                             {return ',';}
":"                             {return ':';}
";"                             {return ';';}
"||"                            {return '||';}
"&&"                            {return '&&';}
"!="                            {return '!=';}
"!"                             {return '!';}
"<="                            {return '<=';}
">="                            {return '>=';}
">"                             {return '>';}
"<"                             {return '<';}
"{"                             {return '{';}
"}"                             {return '}';}

.                               {}


/lex

/* ================= ASOCIATIVIDAD y PRECEDENCIA DE OPERADORES ===============
/*Operaciones logicas*/
%left '++' '--'
%left '^'
%left '||'
%left '&&'
%left '!=' '==' '==='
%left '>' '<' '<=' '>=' 

/*Operaciones numericas*/
%left '+' '-'
%left '*' '/' '%'
%right '^^' 
%right negativo '!' '(' 


%start INICIO

%% /* language grammar */

INICIO
    : SENTENCIAS EOF
    {
        console.log("Ingreso a validar codigo");
        $$ = true;
        return true;
    }
    ;

SENTENCIAS :    SENTENCIAS SENTENCIA
            |   SENTENCIA
;

BLOQUE_SENTENCAS : '{' SENTENCIAS '}'
                {
                       
                }
                |  '{' '}'
                {
                        
                }
;

SENTENCIA :     DECLARACION ';'
            |   FUNCION
            |   ASIGNACION
            |   IF
;

DECLARACION : TIPO  id  '=' EXP 
            | TIPO  id  
;

ASIGNACION :    id '=' EXP ';'
;

IF :    tif '(' EXP ')' BLOQUE_SENTENCAS
;

FUNCION:        TIPO    id '(' LISTA_PARAM ')' BLOQUE_SENTENCAS
            |   tvoid   id '(' LISTA_PARAM ')' BLOQUE_SENTENCAS
            |   TIPO    id '('  ')' BLOQUE_SENTENCAS
            |   tvoid   id '('  ')' BLOQUE_SENTENCAS
;


TIPO    :       tinteger
        |       tboolean
        |       tstring
        |       tdouble
; 

LISTA_PARAM :   LISTA_PARAM ',' TIPO id
            |   TIPO id
;

LISTA_EXP : LISTA_EXP ',' EXP
        |   EXP
;

EXP :   EXP '+' EXP                     
    |   EXP '-' EXP                     
    |   EXP '*' EXP                     
    |   EXP '/' EXP                     
    |   EXP '%' EXP                     
    |   '-' EXP %prec negativo          
    |   '(' EXP ')'                     
    |   EXP '=='  EXP                   
    |   EXP '===' EXP                   
    |   EXP '!='  EXP                   
    |   EXP '<'   EXP                   
    |   EXP '>'   EXP                   
    |   EXP '<='  EXP                   
    |   EXP '>='  EXP                   
    |   EXP '&&'  EXP                   
    |   EXP '||'  EXP 
    |   id
    |   id '(' LISTA_EXP ')'                
    |   entero                          
    |   decimal                         
    |   caracter                        
    |   cadena                          
    |   ttrue                           
    |   tfalse
;