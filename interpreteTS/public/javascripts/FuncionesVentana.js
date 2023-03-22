
/*+++++++++++++++++++++++
+
+  Enviar  YABA (Alto Nivel) a Traducir
+
+++++++++++++++++++++++++*/
function traducirEntrada(cadena,archivo,callback){
    //Enviar cadena del Cliente
    let respuesta = "";
    jQuery.ajax({
        url: "/Traducir",
        type: "POST",
        data: 
        {
            entrada:    cadena, 
            archivo:    archivo   
        },
        dataType: "json",
        success: function(res) {
            respuesta = res.mensaje;
            callback(respuesta);
        },
        error : function(error){
            alert("ERROR DE ENVIO");
        }
      });
    callback(respuesta);
}


/*+++++++++++++++++++++++
+
+  Ejecutar Codigo Intermedio
+
+++++++++++++++++++++++++*/
var respuesta = "";
function ejecutarIntermedio(cadena,modo,lineas_bk,callback)
{
    var contenido = chunkString(cadena,1000);
    console.log(contenido);
//Enviar cadena del Cliente
    jQuery.ajax({
        url: "/CodInter",
        type: "POST",
        data:JSON.stringify({
            entrada : cadena
        }
        ),
        success: function(res) {
            respuesta = res
            //actualizarVista(respuesta);
        },
        error : function(error){
            alert("ERROR AL RECIBIR DEL SERVIDOR");
        }
      });
    callback(respuesta);
}

/*+++++++++++++++++++++++
+
+   Ejecutar Depuracion
+
+++++++++++++++++++++++++*/
function ejecutarDepuracion(cadena,modo,lineas_bk)
{
    let data = {
        entrada     : cadena,
        modo        : modo,
        breakpoint  : lineas_bk
    };
    socket.emit('reproducir',data);
}

/*+++++++++++++++++++++++
+
+   Actualizar vista del Cliente
+
+++++++++++++++++++++++++*/
function actualizarVista(info)
{
    actualizarStack(info.stack);
    actualizarHeap(info.heap);
    actualizarConsola(info.imprimir);
}

//Actualizar Stack
function actualizarStack(stack)
{
    let tabla=document.getElementById('tabla_stack');
    tabla.innerHTML = "";
    for(let x = 0; x < stack.length ; x++)
    {
        /*contenido += "<tr>";
        contenido += "<th scope='row'>" + x + "</th>";
        contenido += "<td>" + stack[x] + "</td>";
        contenido += "</tr>";*/
        let fila = tabla.insertRow(x);
        let col1 = fila.insertCell(0);
        let col2 = fila.insertCell(1);
        col1.innerHTML = x;
        col2.innerHTML = stack[x];
        
    }
}
//Actualizar Heap
function actualizarHeap(heap)
{
    let tabla=document.getElementById('tabla_heap');
    tabla.innerHTML = "";
    for(let x = 0; x < heap.length ; x++)
    {
        let fila = tabla.insertRow(x);
        let col1 = fila.insertCell(0);
        let col2 = fila.insertCell(1);
        col1.innerHTML = x;
        col2.innerHTML = heap[x];
        
    }
}

//Mostrar Consola
function actualizarConsola(imprimir)
{
    let consola = document.getElementById("consola");
    consola.value = imprimir;
}


/*++++++++++++++++++++++++
+
+   Abrir un Archivo del Escritorio
+
+++++++++++++++++++++++++*/
function abrirArchivo()
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 
        // getting a hold of the file reference
        var file = e.target.files[0]; 
        // setting up the reader
        var reader = new FileReader();
        reader.readAsArrayBuffer(file, 'UTF-8');
        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!

            var enc = new TextDecoder("utf-8");
            var contenido_archivo = enc.decode(content);

            //Crear nueva Tab en el IDE
            var nombre_archivo = file.name;
            nombre_archivo = nombre_archivo.replace(".j","");
            agregarTab(false,nombre_archivo,contenido_archivo);
        }
    }

    input.click();
}

/*+++++++++++++++++++++++
+
+ Agregar Nueva Pestaña
+
+++++++++++++++++++++++++*/
var editores = [];
function agregarTab(nuevo_tab,nombre_tab,contenido)
{
    //var nextTab = $('#tabs li').length + 1;
    //Pedir nombre del Tab
    var nombre = "";
    if ( nuevo_tab === true )
    {
        nombre = prompt("Ingrese nombre de la pestaña");
    }else
    {
        nombre = nombre_tab;
    }
    let id_tab  = nombre + "-tab";
    let cad_tab = "";
    cad_tab =  '<li class="nav-item">';
    cad_tab += '<a class="nav-link" id=' + '"'+id_tab+'"' + ' data-toggle="tab" href='+'"#'+nombre +'"' + ' role="tab" aria-controls="'+nombre+'" aria-selected="false">'+nombre+'</a>';
    cad_tab += '</li>';

    // Agregar tab
    $(cad_tab).appendTo('#myTab');

    
    let cad_content = "";
    cad_content += '<div class="tab-pane fade" id="'+nombre+'" role="tabpanel" aria-labelledby="'+id_tab+'">';
    cad_content += '<textarea id="'+nombre+"_editor"+'"></textarea>';
    cad_content += '</div>';

    // agregar content
    //let tabContent = document.getElementById("myTabContent");
    //alert(tabContent.innerHTML);
    $(cad_content).appendTo("#myTabContent");

    // Crear editor
    var nuevo_editor = crearEditor(nombre+"_editor");
    nuevo_editor.setValue(contenido);
    editores[nombre+"_editor"] = nuevo_editor;
    
    
    /*// create the tab
    $('<li><a href="#'+nombre+'" data-toggle="tab">'+nombre+'</a></li>').appendTo('#tabs');

    // create the tab content
    $('<div class="tab-pane" id="'+nombre+'"></div>').appendTo('.tab-content');

    //Agregar un textarea al Tab
    var mi_tab = document.getElementById(nombre);
    mi_tab.innerHTML += '<textarea  id="'+nombre+'_editor"></textarea>';
    var nuevo_editor = crearEditor(nombre+"_editor");
    nuevo_editor.setValue(contenido);
    editores[nombre+"_editor"] = nuevo_editor;

    // make the new tab active
    //$('#tabs a:last').tab('show');*/
}

//Tab Proviene del Cliente
function agregarTabIDE()
{
    agregarTab(true,"","");
}

/*+++++++++++++++++++++++
+
+ Compilar Importacion de Entradas
+
+++++++++++++++++++++++++*/
function compilarDatos(nombre_tab,contenido_tab)
{
    //Enviar Request
    jQuery.ajax({
        url: "/Compilar",
        type: "POST",
        data: {
            nombre_tab      : nombre_tab,
            contenido_tab   : contenido_tab
        },
        success: function(res) {
            respuesta = res
            editor_medio.setValue(respuesta);
        },
        error : function(error){
            alert("ERROR AL RECIBIR DEL SERVIDOR");
        }
      });
      
}

/* +++++++++++++++++++++++
+
+   Guardar Archivo
+
+  +++++++++++++++++++++++*/
function guardarArchivo()
{
    // Nombre del Archivo
    var tabs_activo = document.getElementsByClassName("tab-pane fade active show");
    var tab_activo  = tabs_activo[0];
    var tab_id      = tab_activo.id
    var nombre_archivo              = tab_activo.id + ".j";
    var contenido_archivo           = editores[tab_id + "_editor"].getValue();

    // Guardar archivo
    descargarArchivo(nombre_archivo,contenido_archivo);

}

/* +++++++++++++++++++++++
+
+   Descargar Archivo
+
+  +++++++++++++++++++++++*/
function descargarArchivo(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

/* +++++++++++++++++++++++
+
+   Reporte de Errores
+
+  +++++++++++++++++++++++*/
function reporteErrores()
{
    window.open('/errores');
}

/* +++++++++++++++++++++++
+
+   Reporte de Simbolos
+
+  +++++++++++++++++++++++*/
function reporteSimbolos()
{
    window.open('/simbolos');
}

/* +++++++++++++++++++++++
+
+   Reporte de AST
+
+  +++++++++++++++++++++++*/
function reporteAST()
{
    window.open('/graficaast');
}


function chunkString(str, length) {
    return str.match(new RegExp('(.|[\r\n]){1,'+ length +'}', 'g'));
    //return str.match(new RegExp('.{1,' + length + '}', 'g'));
  }