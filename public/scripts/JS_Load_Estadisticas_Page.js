// JavaScript Document
var globalSettings = {	// Configuraciones comunes a todas las gráficas
	scaleLineColor: "rgb(157, 162, 171)",
	scaleGridLineColor : "rgba(157, 162, 171, .2)",
};

var n, m = 0;	// Iteradores bucles

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

function GraficaPorDistrito(input) {	// Entrada: matriz bidimensional con los datos de cada distrito

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
		data.datasets[3] = { label: "Averiadas", fillColor: "rgb(132, 132, 130)", strokeColor: "rgb(85, 85, 85)", data: pAV};

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

	var xhr = new XMLHttpRequest();
	var url;
	var xmlDoc = new Array;

	for(n = 0; n < fases; n++) {
		// Recogida de datos
		url = "./files/"+ distrito + n + ".xml";	// Composición de la URL local, en formato [DISTRITO][número].xml
		console.log("Abriendo " + url);	// DEBUG
		xhr.open("GET", url, false);
		xhr.send();

		xmlDoc[n] = xhr.responseXML;	// Almacenamiento de la información en un array
	}

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

		console.log(xmlDoc[n].getElementsByTagName("Papeleras")[0].getElementsByTagName("Papelera")[m]);	// DEBUG
		console.log(posicionTemporal.getElementsByTagName("Papelera")[m]);	// DEBUG

		for(m = 0; posicionTemporal.getElementsByTagName("Papelera")[m] != undefined; m++) {
			papelera = posicionTemporal.getElementsByTagName("Papelera")[m];
			estadoPapelera = papelera.getElementsByTagName("Estado")[0].childNodes[0].nodeValue;
			switch(estadoPapelera) {
				case 00: 	// Vacía
					pVA[n]++;
				case 01: 	// Mitad
					pMI[n]++;
				case 10: 	// Llena
					pLL[n]++;
				case 11: 	// Averiada
					pAV[n]++;
			}
		}
		data.datasets[0] = { label: "Llenas", fillColor: "rgba(255, 0, 0, 0.6)", strokeColor: "red", data: pLL};
		data.datasets[1] = { label: "Mitad", fillColor: "rgba(240, 192, 0, 0.6)", strokeColor: "rgb(240, 192, 0)", data: pMI};
		data.datasets[2] = { label: "Vacías", fillColor: "rgba(95, 218, 79, 0.6)", strokeColor: "rgb(95, 218, 79)", data: pVA};
		data.datasets[3] = { label: "Averiadas", fillColor: "rgb(132, 132, 130)", strokeColor: "rgb(85, 85, 85)", data: pAV};
	/*	FORMATO DE LECTURA
		xmlDoc[n].getElementsByTagName("Papeleras")[0].getElementsByTagName("Papelera")[m].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
	*/
		var GraficaTiempo = new Chart(canvas).Line(data, globalSettings);	// Generación de la gráfica en cuestión
	}
}


//Funcion loadPage
$(function()
{
                // COMIENZO VARIABLES DE PRUEBA
                var distr1 = [ "Arganzuela", 10, 20, 30, 5 ];
                var distr2 = [ "Carabanchel", 4, 27, 3, 5 ];
                var distr3 = [ "Centro", 4, 65, 8, 5 ];
                var distr4 = [ "Chamartín", 52, 78, 5, 5 ];

                var param = [distr1, distr2, distr3, distr4];
                // FIN DE VARIABLES DE PRUEBA

                GraficaPorDistrito(param);
				
				 GraficaPorTiempo("Moncloa", 7);
 
}//End Function loadPage
);