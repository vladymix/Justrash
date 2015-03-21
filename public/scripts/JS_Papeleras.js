// JavaScript Papeleras
// Mis papelera
/*
driving: (predeterminado) proporciona rutas estándar para llegar en coche a través de la red de carreteras.
walking: solicita rutas a pie a través de aceras y rutas peatonales (según disponibilidad).
bicycling: solicita rutas para llegar en bicicleta a través de carriles bici y vías preferenciales para bicicletas (según disponibilidad).
transit: solicita indicaciones a través de rutas de transporte público (según disponibilidad).
*/
var tipoRuta = 'WALKING';
var nPapelerasLlenas=0;
var nPapelerasMedio=0;
var nPapelerasVacias =0;
var nPapelerasAveriadas =0;
var PLL = new Array;
var PM = new Array;
var PV = new Array;
var PA = new Array;
var total = 0;
var RutaPM = "#FFBF00";
var RutaPLL = "#DF0101";
var RutaPV ="#3ADF00";
var RutaPA = "#585858";
var imagenPLL = 'icons/iconsMap/32x32PLL.png';
var imagenPM = 'icons/iconsMap/32x32PM.png';
var imagenPV = 'icons/iconsMap/32x32PV.png';
var imagenPA = 'icons/iconsMap/32x32PA.png';
var imagenPC = 'icons/iconsMap/32x32PC.png';
var fileMoncloa = 'files/28045.xml';

var _TRASHS_CAN = new Array; 


function rutaCoche()
{
	tipoRuta='driving';
	$("#btn1").addClass("btnActived");
	$("#btn2").removeClass("btnActived");
}
function rutaPie()
{
	tipoRuta='WALKING';
	$("#btn2").addClass("btnActived");
	$("#btn1").removeClass("btnActived");
}



function CargarPapeleras(urlfile)
{

//Inicializo variables globales del distrito correspondiente
	nPapelerasLlenas=0;
	nPapelerasMedio=0;
	nPapelerasVacias =0;
	nPapelerasAveriadas =0;
	PLL = new Array;
	PM = new Array;
	PV = new Array;
	PA = new Array;
	total = 0;				 
	
	var xhr = new XMLHttpRequest();	 
	 	
		xhr.open("GET", urlfile, false);	// Preparación de la solicitud
		
		xhr.send();	// Realización de la petición GET al servidor
	
		// Muestreo del estado en la cabecera		
	   xmlDoc = xhr.responseXML;	// Variable qu almacena la respuesta
	   //Etiqueta XML "Temperaura minima"   
	    		
	  var xmlPapeleras= xmlDoc.getElementsByTagName("Papeleras");
	  var nPapeleras= xmlDoc.getElementsByTagName("Papeleras")[0].getElementsByTagName("Papelera").length;
	 
	  total = nPapeleras;
	  console.log("DEBUG: Hemos encontrado "+total +" papeleras");   
		
		
	for(var i =0; i < nPapeleras;i++ )
	 {	 
	try{
		
	 var papelera = xmlPapeleras[0].getElementsByTagName("Papelera")[i];
	 
	  if(papelera != null){
		//Papelera averiada  
		if(papelera.getElementsByTagName("Estado")[0].childNodes[0].nodeValue=="11") 
		  {	
		  	  var lat = papelera.getElementsByTagName("Latitud")[0].childNodes[0].nodeValue;
		  	  var long = papelera.getElementsByTagName("Longitud")[0].childNodes[0].nodeValue;	
		  	  var name =  papelera.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
		  	  var postalAdress = papelera.getElementsByTagName("PostalAdress")[0].childNodes[0].nodeValue;		  
			  PA[nPapelerasAveriadas]= [lat, long, name, postalAdress ];
			  nPapelerasAveriadas++;	  
			}	
					
		// Media llena	
		else if (papelera.getElementsByTagName("Estado")[0].childNodes[0].nodeValue=="01") 
		  {
			  var lat = papelera.getElementsByTagName("Latitud")[0].childNodes[0].nodeValue;
		 	  var long = papelera.getElementsByTagName("Longitud")[0].childNodes[0].nodeValue;
			  var name =  papelera.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
		  	  var postalAdress = papelera.getElementsByTagName("PostalAdress")[0].childNodes[0].nodeValue;
			  PM[nPapelerasMedio]= [lat, long, name, postalAdress ];
			  nPapelerasMedio++;
			  }
			  
		// LLena
		else if(papelera.getElementsByTagName("Estado")[0].childNodes[0].nodeValue=="10") 
		  {
		  	 var lat = papelera.getElementsByTagName("Latitud")[0].childNodes[0].nodeValue;
		  	 var long = papelera.getElementsByTagName("Longitud")[0].childNodes[0].nodeValue;
		  	 var name =  papelera.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
		  	 var postalAdress = papelera.getElementsByTagName("PostalAdress")[0].childNodes[0].nodeValue;
			  PLL[nPapelerasLlenas]= [lat, long, name, postalAdress ];
			  nPapelerasLlenas++; 
			  }
		//Vacia
		 else if(papelera.getElementsByTagName("Estado")[0].childNodes[0].nodeValue=="00") 
		  {
			 var lat = papelera.getElementsByTagName("Latitud")[0].childNodes[0].nodeValue;
		 	 var long = papelera.getElementsByTagName("Longitud")[0].childNodes[0].nodeValue;
		 	 var name =  papelera.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
		 	 var postalAdress = papelera.getElementsByTagName("PostalAdress")[0].childNodes[0].nodeValue;
			  PV[nPapelerasVacias]= [lat, long, name, postalAdress ];
			  nPapelerasVacias++;
			  		  }

		}//If
	}
	catch(err){alert(err);}
    }//For
	
	odenardescendente();
	$("#totalPA").html(nPapelerasAveriadas);
	$("#totalPLL").html(nPapelerasLlenas);
	$("#totalPM").html(nPapelerasMedio);
	$("#totalPV").html(nPapelerasVacias);	  
	GraficaDatosPapelera(nPapelerasLlenas,nPapelerasMedio,nPapelerasVacias,nPapelerasAveriadas);
	
}
function MostrarOnlyPapeleras(coordenadas)
{

	try{
		map = new GMaps({  // Creo un mapa en [lat, lng]
              el: '#map',
			  zoom:14,
			  disableDefaultUI: true,
              lat: coordenadas[0],
              lng: coordenadas[1]});
		for (var i=0; i<PLL.length; i++){	
		 map.addMarker({
		 lat: PLL[i][0], 
		 lng: PLL[i][1], 
		 icon: imagenPLL}
		 		 ); 
		}
		for (var i=0; i<PA.length; i++){	
	map.addMarker({
		 lat: PA[i][0], 
		 lng: PA[i][1], 
		 icon: imagenPA}
		 		 ); 
		}
		
	for (var i=0; i<PM.length; i++){	
	map.addMarker({
		 lat: PM[i][0], 
		 lng: PM[i][1], 
		 icon: imagenPM}
		 		 ); 
		}
	for (var i=0; i<PV.length; i++){	
	map.addMarker({
		 lat: PV[i][0], 
		 lng: PV[i][1], 
		 icon: imagenPV}
		 		 ); 
		}

		
		
		}
		catch(err)
		{
			alert(err);
		}
}
function MostrarPapelerasRuta(_LS_POS, ColorR, icoPapelera)
{
 nMarcadores=_LS_POS.length;//Sireve para continuar dibujadno la ruta
// alert("En esta ruta hay "+nMarcadores+" papeleras");
					
map = new GMaps({  // Creo un mapa en [lat, lng]
              el: '#map',
			  disableDefaultUI: true,
              lat: _LS_POS[0][0],
              lng: _LS_POS[0][1]
            });
			
for (var i=0; i<_LS_POS.length; i++){
	
	map.addMarker({
		 lat: _LS_POS[i][0], 
		 lng: _LS_POS[i][1], 
		 icon: icoPapelera}
		 		 ); 
	//If para dibujar hasta el ultimo marcador porque osino me paso del array
	if((i+1)<_LS_POS.length){

			map.drawRoute({
          origin: [_LS_POS[i][0], _LS_POS[i][1]],
          destination: [_LS_POS[i+1][0], _LS_POS[i+1][1]],	
          travelMode: tipoRuta,
          strokeColor: ColorR,
          strokeOpacity: 0.8,
          strokeWeight: 4
        });
		}
	}
	 lat = _LS_POS[_LS_POS.length-1][0];  // guarda coords en lat y lng
     lng = _LS_POS[_LS_POS.length-1][1];
	 
}

	
//Funcion crear html
function crearHTML(srcimagen, Name, direccion){
		var miItem = ' <div class="itemPapelera"><div class="imagenhojaPapelera"><img src='+srcimagen+'></div><divclass="descripPapelera"><h4>'+Name+'</h4><span>'+direccion+'</span></div></div>';
		return miItem;
		}
	
function verListado(listaPapeleras, imagen){
	try{	
	var mihtml = "";
	for(i =0;i < listaPapeleras.length ;i++)
	{
		mihtml += crearHTML(imagen, listaPapeleras[i][2], listaPapeleras[i][3]);
	}		
	$("#panelPapelera").html(mihtml);
	}
catch(err)
		{
			alert(err)
		}
}



function MostrarRutaLlenas(){
		
	MostrarPapelerasRuta(PLL, RutaPLL, imagenPLL);
	//verListado(PLL, imagenPLL);
	}
function MostrarRutaVacias(){
		
	MostrarPapelerasRuta(PV, RutaPV,imagenPV);
	//verListado(PV, imagenPV);
	}
function MostrarRutaMediasLlenas(){
		
	MostrarPapelerasRuta(PM, RutaPM, imagenPM);
	//verListado(PM, imagenPM);	
	}
function MostrarRutaAveriadas(){
	MostrarPapelerasRuta(PA, RutaPA, imagenPA);
	//verListado(PA, imagenPA);
	}
	
function odenardescendente(){
		try{
			PLL.sort();
			PM.sort();
			PV.sort();
 			PA.sort();
		}
		catch(err){alert(err);}
	
	}
	
function itemCoredenadas(Longitud, Latitud)
	{
		return '<div class="itemPapelera">Long '+Longitud+' Lat '+Latitud+'</div>';
	}
	
	
//Grafico papeleras
var globales ={
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 50, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

}

function GraficaDatosPapelera(_full,_halft,_empty,_Damages) {	// Entrada: matriz bidimensional con los datos de cada distrito

	var canvas = document.getElementById("graficoPapeleras").getContext("2d");	// Canvas donde ubicar la gráfica
	$("#totalPapeleras").html(_full+_halft+_empty+_Damages)
	$("#porcentages").removeClass("collapse");
	$("#porcentages").addClass("visible");

var data = [
    {
        value: _full,
        color:colorFull,
        highlight: colorFull,
        label: "Full"
    },
    {
        value: _halft,
        color: colorHalf,
        highlight:colorHalf ,
        label: "Half"
    },
    {
        value: _empty,
        color: colorEmpty,
        highlight: colorEmpty,
        label: "Empty"
    },
	{
        value: _Damages,
        color: colorCrash,
        highlight: colorCrash,
        label: "Damaged"
    }
]

var myPieChart = new Chart(canvas).Pie(data,globales);

}











