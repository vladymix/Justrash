// JavaScript Document
var globalSettings = {	// Configuraciones comunes a todas las gráficas
	scaleLineColor: "rgb(157, 162, 171)",
	scaleGridLineColor: "rgba(157, 162, 171, .2)",
	scaleFontFamily: "'FiraSansOT-Light', Arial",
	datasetFill: false
};

// Listado de distritos (actualmente no permite tildes)
var distritos = [ "Arganzuela", "Barajas", "Carabanchel", "Centro", "Chamartin", "Chamberi", "CiudadLineal", "Fuencarral", "Hortaleza", "Latina", "Moncloa", "Moratalaz", "PuenteDeVallecas", "Retiro", "Salamanca", "SanBlas", "Tetuan", "Usera", "Vicalvaro", "VillaDeVallecas", "Villaverde" ];
// Listado de códigos postales
var codigos = [ 28001, 28002, 28007, 28008, 28010, 28013, 28020, 28021, 28022, 28025, 28026, 28029, 28030, 28031, 28032, 28037, 28038, 28042, 28043, 28044, 28045 ];

var n, m, l, k;	// Iteradores bucles

var xhr = new XMLHttpRequest();
var url;
var xmlDoc = new Array;


var pLL = new Array;	// Vector de papeleras llenas, ordenadas por distrito
var pMI = new Array;	// Vector de papeleras a la mitad, ordenadas por distrito
var pVA = new Array;	// Vector de papeleras vacías, ordenadas por distrito
var pAV = new Array;	// Vector de papeleras averiadas, ordenadas por distrito


/*
	GRÁFICAS POR DISTRITO
		Genera una gráfica de barras con las papeleras vacías, medias, llenas y averiadas, organizadas por distritos.

		Entrada:
			- momento: referencia temporal que leer (ej.: 2015-03-01) [cadena]
*/

function GraficaPorDistrito(momento) {
	var canvas = document.getElementById("distrito").getContext("2d");	// Canvas donde ubicar la gráfica
	var data = { labels: [], datasets: [] };

	var serverData;
	var estadoPapelera;

	for(n = 0; codigos[n] != undefined; n++) {
		data.labels[n] = codigos[n];	// Lectura de los nombres de distrito (eje X)
		url = "https://yagogg.cloudant.com/papeleras_justrash/" + codigos[n];

		// Inicialización a 0 de los arrays de valores de papeleras, para que el programa sepa que son enteros, y por qué valor emperzar
		pLL[n] = 0;
		pMI[n] = 0;
		pVA[n] = 0;
		pAV[n] = 0;

		xhr.open("GET", url, false);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send();

		serverData = JSON.parse(xhr.responseText);

		for(m = 0; serverData.registrosTemporales[m] != undefined; m++) {
			if(serverData.registrosTemporales[m].fecha == momento) {
				for(l = 0; l < serverData.totalPapeleras; l++) {
					estadoPapelera = serverData.registrosTemporales[m].papeleras[l].estado;
					switch(estadoPapelera) {
						case "00": 	// Vacía
							pVA[n]++;
							break;
						case "01": 	// Mitad
							pMI[n]++;
							break;
						case "10": 	// Llena
							pLL[n]++;
							break;
						case "11": 	// Averiada
							pAV[n]++;
							break;
					}
				}	
			}
		}	

		data.datasets[0] = { label: "Llenas", fillColor: "rgba(255, 0, 0, 0.6)", strokeColor: "red", data: pLL};
		data.datasets[1] = { label: "Mitad", fillColor: "rgba(240, 192, 0, 0.6)", strokeColor: "rgb(240, 192, 0)", data: pMI};
		data.datasets[2] = { label: "Vacías", fillColor: "rgba(95, 218, 79, 0.6)", strokeColor: "rgb(95, 218, 79)", data: pVA};
		data.datasets[3] = { label: "Averiadas", fillColor: "rgba(132, 132, 130, 0.6)", strokeColor: "rgb(85, 85, 85)", data: pAV};

	} 
		var GraficaDistrito = new Chart(canvas).Bar(data, globalSettings);	// Generación de la gráfica en cuestión

}

/*
	GRÁFICAS POR TIEMPO
		Genera una gráfica lineal con el progreso a lo largo del tiempo de las papeleras de un distrito en concreto. 

		Entrada:
			- distrito: nombre del distrito a leer [cadena]
			- fases: número de tomas de datos a leer [entero]
*/
function GraficaPorTiempo(distrito, fases) {
	var canvas = document.getElementById("tiempo").getContext("2d");	// Canvas donde ubicar la gráfica
	var data = { labels: [], datasets: [] };

	var serverData;
	var estadoPapelera;

	url = "https://yagogg.cloudant.com/papeleras_justrash/" + distrito;
	xhr.open("GET", url, false);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();

	serverData = JSON.parse(xhr.responseText);
	
	for(n = 0; serverData.registrosTemporales[n] != undefined; n++) {
		data.labels[n] = serverData.registrosTemporales[n].fecha;	// Lectura de los nombres de distrito (eje X)
		// Inicialización a 0 de los arrays de valores de papeleras, para que el programa sepa que son enteros, y por qué valor emperzar
		pLL[n] = 0;
		pMI[n] = 0;
		pVA[n] = 0;
		pAV[n] = 0;

		for(m = 0; m < serverData.totalPapeleras; m++) {
			estadoPapelera = serverData.registrosTemporales[n].papeleras[m].estado;
			switch(estadoPapelera) {
				case "00": 	// Vacía
					pVA[n]++;
					break;
				case "01": 	// Mitad
					pMI[n]++;
					break;
				case "10": 	// Llena
					pLL[n]++;
					break;
				case "11": 	// Averiada
					pAV[n]++;
					break;
			}	
		}
	}	

		data.datasets[0] = { label: "Llenas", fillColor: "rgba(255, 0, 0, 0.6)", strokeColor: "red", data: pLL};
		data.datasets[1] = { label: "Mitad", fillColor: "rgba(240, 192, 0, 0.6)", strokeColor: "rgb(240, 192, 0)", data: pMI};
		data.datasets[2] = { label: "Vacías", fillColor: "rgba(95, 218, 79, 0.6)", strokeColor: "rgb(95, 218, 79)", data: pVA};
		data.datasets[3] = { label: "Averiadas", fillColor: "rgba(132, 132, 130, 0.6)", strokeColor: "rgb(85, 85, 85)", data: pAV};

	var GraficaTiempo = new Chart(canvas).Line(data, globalSettings);	// Generación de la gráfica en cuestión
}

/*
	CARGA BASE DE DATOS
		Parsea los ficheros XML locales y los sube a la base de datos en formato JSON

		Entrada:
			- distrito: nombre del distrito a leer [cadena]
			- nFicheros: número de tomas de datos a leer [entero]
			- totPapDistrito: número total de papeleras en todo el distrito [entero]	
*/
function CargaBD(distrito, nFicheros, totPapDistrito) {
	var content = {};
	var papelera = {};
	var papeleras = [];
	var registro = {};
	var regTemp = [];

	// Lectura de datos de los ficheros

			// Recogida de datos
			url = "./files/"+ distrito + ".xml";	// Composición de la URL local, en formato [DISTRITO][número].xml
			console.log(url);
			xhr.open("GET", url, false);
			xhr.send();

			xmlDoc[0] = xhr.responseXML;	// Almacenamiento de la información en un array

		content.totalPapeleras = totPapDistrito;	//Número de papeleras en Moncloa

		for(n = 0; xmlDoc[n] != undefined; n++) {
			for(m = 0; m < totPapDistrito; m++) {
				// Toma de valores del XML
				papelera.nombre = xmlDoc[n].getElementsByTagName("Papeleras")[0].getElementsByTagName("Papelera")[m].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
				papelera.direccion = xmlDoc[n].getElementsByTagName("Papeleras")[0].getElementsByTagName("Papelera")[m].getElementsByTagName("PostalAdress")[0].childNodes[0].nodeValue;
				papelera.longitud = xmlDoc[n].getElementsByTagName("Papeleras")[0].getElementsByTagName("Papelera")[m].getElementsByTagName("Longitud")[0].childNodes[0].nodeValue;
				papelera.latitud = xmlDoc[n].getElementsByTagName("Papeleras")[0].getElementsByTagName("Papelera")[m].getElementsByTagName("Latitud")[0].childNodes[0].nodeValue;
				papelera.estado = xmlDoc[n].getElementsByTagName("Papeleras")[0].getElementsByTagName("Papelera")[m].getElementsByTagName("Estado")[0].childNodes[0].nodeValue;

				papeleras.push(papelera);	// Almacenamiento de la papelera en el array de papeleras
				papelera = {};	// Reseteo para la siguiente vuelta
			}
			registro.fecha = "2015-03-0" + (n + 1);	// Guardado de la fecha en el registro
			registro.papeleras = papeleras;	// Guardado de las papeleras en el el registro
			papeleras = [];	// Reseteo para la siguiente vuelta
			regTemp.push(registro);	// Guardado del registro en el array de registros
			registro = {};	// Reseteo para la siguiente vuelta
		}

	if(regTemp[0] != undefined) {	// La lectura ha ido bien
		// Preparación de la información para enviarla al servidor
		content.totalPapeleras = totPapDistrito;
		content.registrosTemporales = regTemp;

		// Lectura de la revisión
		url = "https://yagogg.cloudant.com/papeleras_justrash/" + distrito;

		xhr.open("GET", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				dbSender(content);
			}
		}; 
		xhr.send();
	} else {
		console.error("FATAL: regTemp está vacío.");
	}
}

function dbSender(content) {
		var obj = JSON.parse(xhr.responseText);	// Objeto JSON con la respuesta del servidor
		var rev = obj._rev;	// Revisión del documento (versión de la última modificación, requisito de Cloudant)

		url += "?rev=" + rev;	// Adición de la ultima revisión a la URL (requisito de Cloudant)

		// Inserción de datos en la BD
		xhr.open("PUT", url, false);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.send(JSON.stringify(content));
}

function toggleInfobox() {
	var ibox = document.getElementById("ibox");
	if(ibox.className == "infoopen") {	// Close ibox
		ibox.className = "infoclosed";
	} else {	// Open ibox
		ibox.style.display = "block";
		ibox.className = "infoopen";
	}

}

$(function() {
	GraficaPorDistrito("2015-03-01");
	GraficaPorTiempo("Moncloa", 7);
});