// JavaScript Document
var globalSettings = {	// Configuraciones comunes a todas las gráficas
	scaleLineColor: "rgb(157, 162, 171)",
	scaleGridLineColor: "rgba(157, 162, 171, .2)",
	scaleFontFamily: "'FiraSansOT-Light', Arial",
	datasetFill: false
};

var n, m = 0;	// Iteradores bucles

var xhr = new XMLHttpRequest();
var url;
var xmlDoc = new Array;

/*
	GRÁFICAS POR DISTRITO
		Genera una gráfica de barras con las papeleras vacías, medias, llenas y averiadas, organizadas por distritos.

		Entrada (input): matriz bidimensional con los datos de cada distrito, en el formato:
			- 0: nombre del distrito
			- 1: número entero de papeleras llenas en ese distrito
			- 2: número entero de papeleras a la mitad en ese distrito
			- 3: número entero de papeleras vacias en ese distrito
			- 4: número entero de papeleras averiadas en ese distrito

*/

function GraficaPorDistrito(momento) {	// Entrada: matriz bidimensional con los datos de cada distrito
	var canvas = document.getElementById("distrito").getContext("2d");	// Canvas donde ubicar la gráfica
	var data = { labels: [], datasets: [] };

	var pLL = new Array;	// Vector de papeleras llenas, ordenadas por distrito
	var pMI = new Array;	// Vector de papeleras a la mitad, ordenadas por distrito
	var pVA = new Array;	// Vector de papeleras vacías, ordenadas por distrito
	var pAV = new Array;	// Vector de papeleras averiadas, ordenadas por distrito

	for(n = 0; input[n] != undefined; n++) {
		data.labels[n] = input[n][0];	// Lectura de los nombres de distrito (eje X)
		// Almacenamiento de los vectores (eje Y)
		pLL[n] = input[n][1];
		pMI[n] = input[n][2];
		pVA[n] = input[n][3];
		pAV[n] = input[n][4];
	}
	
		data.datasets[0] = { label: "Llenas", fillColor: "rgba(255, 0, 0, 0.6)", strokeColor: "red", data: pLL};
		data.datasets[1] = { label: "Mitad", fillColor: "rgba(240, 192, 0, 0.6)", strokeColor: "rgb(240, 192, 0)", data: pMI};
		data.datasets[2] = { label: "Vacías", fillColor: "rgba(95, 218, 79, 0.6)", strokeColor: "rgb(95, 218, 79)", data: pVA};
		data.datasets[3] = { label: "Averiadas", fillColor: "rgba(132, 132, 130, 0.6)", strokeColor: "rgb(85, 85, 85)", data: pAV};

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

	for(n = 0; n < fases; n++) {
		// Recogida de datos
		url = "./files/"+ distrito + n + ".xml";	// Composición de la URL local, en formato [DISTRITO][número].xml
		console.log("Abriendo " + url);	// DEBUG
		xhr.open("GET", url, false);
		xhr.send();

		xmlDoc[n] = xhr.responseXML;	// Almacenamiento de la información en un array
	}

	console.log("xmlDoc completo: " + xmlDoc);	// DEBUG

	var posicionTemporal;
	var papelera;
	var estadoPapelera;

	var pLL = new Array;	// Vector de papeleras llenas, ordenadas por marca temporal
	var pMI = new Array;	// Vector de papeleras a la mitad, ordenadas por marca temporal
	var pVA = new Array;	// Vector de papeleras vacías, ordenadas por marca temporal
	var pAV = new Array;	// Vector de papeleras averiadas, ordenadas por marca temporal


	for(n = 0; xmlDoc[n] != undefined; n++) {
		data.labels.push("Momento " + n);	// Adición de la marca temporal como etiqueta (eje X)
		posicionTemporal = xmlDoc[n].getElementsByTagName("Papeleras")[0];

		// Inicialización a 0 de los arrays de valores de papeleras, para que el programa sepa que son enteros, y por qué valor emperzar
		pLL[n] = 0;
		pMI[n] = 0;
		pVA[n] = 0;
		pAV[n] = 0;

		for(m = 0; (papelera = posicionTemporal.getElementsByTagName("Papelera")[m]) != undefined; m++) {
			estadoPapelera = papelera.getElementsByTagName("Estado")[0].childNodes[0].nodeValue;
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
		data.datasets[0] = { label: "Llenas", fillColor: "rgba(255, 0, 0, 0.6)", strokeColor: "red", data: pLL};
		data.datasets[1] = { label: "Mitad", fillColor: "rgba(240, 192, 0, 0.6)", strokeColor: "rgb(240, 192, 0)", data: pMI};
		data.datasets[2] = { label: "Vacías", fillColor: "rgba(95, 218, 79, 0.6)", strokeColor: "rgb(95, 218, 79)", data: pVA};
		data.datasets[3] = { label: "Averiadas", fillColor: "rgba(132, 132, 130, 0.6)", strokeColor: "rgb(85, 85, 85)", data: pAV};
	}
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
		for(n = 0; n < nFicheros; n++) {
			// Recogida de datos
			url = "./files/"+ distrito + n + ".xml";	// Composición de la URL local, en formato [DISTRITO][número].xml
			xhr.open("GET", url, false);
			xhr.send();

			xmlDoc[n] = xhr.responseXML;	// Almacenamiento de la información en un array
		}

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
			registro.fecha = "2015-03-" + (n + 1);	// Guardado de la fecha en el registro
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

		console.log("Revisión: " + rev);	// DEBUG

		url += "?rev=" + rev;	// Adición de la ultima revisión a la URL (requisito de Cloudant)

		// Inserción de datos en la BD
		xhr.open("PUT", url, false);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.send(JSON.stringify(content));
}

$(function() {
    // COMIENZO VARIABLES DE PRUEBA
    var distr1 = [ "Arganzuela", 10, 20, 30, 5 ];
    var distr2 = [ "Carabanchel", 4, 27, 3, 5 ];
    var distr3 = [ "Centro", 4, 65, 8, 5 ];
    var distr4 = [ "Chamartín", 52, 78, 5, 5 ];

    var param = [distr1, distr2, distr3, distr4];
    // FIN DE VARIABLES DE PRUEBA

    GraficaPorDistrito(param);

    GraficaPorTiempo("Moncloa", 7);

    CargaBD("Moncloa", 7, 84);
}
);