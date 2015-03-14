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
var fileMoncloa = 'files/Moncloa.xml';

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
		 
	var url = urlfile;
	
	var xhr = new XMLHttpRequest();	 
	 	
		xhr.open("GET", url, false);	// Preparación de la solicitud
		
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
}
function MostrarOnlyPapeleras()
{
	try{
		map = new GMaps({  // Creo un mapa en [lat, lng]
              el: '#map',
			  disableDefaultUI: true,
              lat: 40.4348593513256,
              lng: -3.7193591331740663 });
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
	verListado(PLL, imagenPLL);
	}
	function MostrarRutaVacias(){
		
	MostrarPapelerasRuta(PV, RutaPV,imagenPV);
	verListado(PV, imagenPV);
	}
	function MostrarRutaMediasLlenas(){
		
	MostrarPapelerasRuta(PM, RutaPM, imagenPM);
	verListado(PM, imagenPM);	
	}
	function MostrarRutaAveriadas(){
	MostrarPapelerasRuta(PA, RutaPA, imagenPA);
	verListado(PA, imagenPA);
	}
	
	function odenardescendente()
	{
		try{
			PLL.sort();
			PM.sort();
			PV.sort();
 			PA.sort();
		}
		catch(err){alert(err);}
	
	}
	
	
//Funcion a probar no garantiza el 100% de nodos	
	function ordenarArray(miArray)
	{
		try{
			var mihtml = "Antes <br>";
			
			for (var i=0; i<miArray.length; i++){
				mihtml += itemCoredenadas(miArray[i][0],miArray[i][1] );
				}
			miArray.sort();
			mihtml += "Despues <br>"
			for (var i=0; i<miArray.length; i++){
				mihtml += itemCoredenadas(miArray[i][0],miArray[i][1] );
			}
			$("#panelPapelera").html(mihtml);
			}
		catch(err){alert(err);}
		
	}
	function itemCoredenadas(Longitud, Latitud)
	{
		return '<div class="itemPapelera">Long '+Longitud+' Lat '+Latitud+'</div>';
	}
	
	












