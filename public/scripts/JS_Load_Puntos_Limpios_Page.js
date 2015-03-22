// JS_Load_Puntos_Limpios_Page
//funciones
/*

	LISTADO DE PUNTOS LIMPIOS DE MADRID
		Distrito de Arganzuela
			C/ Estrella Denebola, 5 28045 Madrid
			40.39419901357015 -3.6834210425750737
		Distrito de Barajas
			C/ Alhaurín, 5 28042 Madrid
			40.473907649051704 -3.5855350682202047
		Distrito de Carabanchel
			C/ Cidro, 5 28044 Madrid
			40.36815527702884 -3.7458547551539705
		Distrito de Chamartín
			Avda. Alfonso XIII, 128 28016 Madrid
			40.45887476564644 -3.6664670709154676
		Distrito de Ciudad Lineal
			Avda. Daroca, 104 28032 Madrid
			40.41826330408995 -3.630928382853009
		Distrito de Fuencarral-El Pardo
			C/ Ubeda, 6 28035 Madrid
			40.48225121586361 -3.71646391915977
		Distrito de Hortaleza
			C/ Tomás Redondo, 8 28033 Madrid
			40.47006424276577 -3.6277914577312402
		Distrito de Latina
			C/ Concejal Francisco José Jiménez Martín, 5 28047 Madrid
			40.4016757685611 -3.736372909535269
		Distrito de Moncloa-Ciudad Universitaria
			Paseo Senda del Rey 28040 Madrid
			40.4518145982551 -3.740033315744074
		Distrito de Moratalaz
			C/ Arroyo de la Media Legua, 72 28030 Madrid
			40.414609663505665 -3.6513204448781815
		Distrito de Puente de Vallecas
			C/ Jose Paulete, 43 28038 Madrid
			40.39406006570005 -3.654492342880955
		Distrito de San Blas-Callejas
			C/ San Romualdo, 20 28037 Madrid
			40.44011842579 -3.622772792777153
		Distrito de Usera
			C/ Cristo de la Victoria, 245 28026 Madrid
			40.37882471603663 -3.7096418581029984
		Distrito de Vicálvaro
			C/ Sepiolita, 6 28032 Madrid
			40.40676752985184 -3.598776933365321
		Distrito de Villa de Vallecas
			C/ Luis I, 36 28031 Madrid
			40.376205626276835 -3.6429637161883424
		Distrito de Villaverde
			C/ Bascuñuelos, 3 28021 Madrid
			40.33860368148312 -3.7103387295498003
*/

var map;
var puntos = [
	{
		distrito: "Arganzuela",
		direccion: "C/ Estrella Denebola, 5 28045 Madrid",
		latitud: 40.39419901357015,
		longitud: -3.6834210425750737
	},
	{
		distrito: "Barajas",
		direccion: "C/ Alhaurín, 5 28042 Madrid",
		latitud: 40.473907649051704,
		longitud: -3.5855350682202047
	},
	{
		distrito: "Carabanchel",
		direccion: "C/ Cidro, 5 28044 Madrid",
		latitud: 40.36815527702884,
		longitud: -3.7458547551539705
	},
	{
		distrito: "Chamartín",
		direccion: "Avda. Alfonso XIII, 128 28016 Madrid",
		latitud: 40.45887476564644,
		longitud: -3.6664670709154676
	},
	{
		distrito: "Ciudad Lineal",
		direccion: "Avda. Daroca, 104 28032 Madrid",
		latitud: 40.41826330408995,
		longitud: -3.630928382853009
	},
	{
		distrito: "Fuencarral-El Pardo",
		direccion: "C/ Ubeda, 6 28035 Madrid",
		latitud: 40.48225121586361,
		longitud: -3.71646391915977
	},
	{
		distrito: "Hortaleza",
		direccion: "C/ Tomás Redondo, 8 28033 Madrid",
		latitud: 40.47006424276577,
		longitud: -3.6277914577312402
	},
	{
		distrito: "Latina",
		direccion: "C/ Concejal Francisco José Jiménez Martín, 5 28047 Madrid",
		latitud: 40.4016757685611,
		longitud: -3.736372909535269
	},
	{
		distrito: "Moncloa-Ciudad Universitaria",
		direccion: "Paseo Senda del Rey 28040 Madrid",
		latitud: 40.4518145982551,
		longitud: -3.740033315744074
	},
	{
		distrito: "Moratalaz",
		direccion: "C/ Arroyo de la Media Legua, 72 28030 Madrid",
		latitud: 40.414609663505665,
		longitud: -3.6513204448781815
	},
	{
		distrito: "Puente de Vallecas",
		direccion: "C/ Jose Paulete, 43 28038 Madrid",
		latitud: 40.39406006570005,
		longitud: -3.654492342880955
	},
	{
		distrito: "San Blas-Callejas",
		direccion: "C/ San Romualdo, 20 28037 Madrid",
		latitud: 40.44011842579,
		longitud: -3.622772792777153
	},
	{
		distrito: "Usera",
		direccion: "C/ Cristo de la Victoria, 245 28026 Madrid",
		latitud: 40.37882471603663,
		longitud: -3.7096418581029984
	},
	{
		distrito: "Vicálvaro",
		direccion: "C/ Sepiolita, 6 28032 Madrid",
		latitud: 40.40676752985184,
		longitud: -3.598776933365321
	},
	{
		distrito: "Villa de Vallecas",
		direccion: "C/ Luis I, 36 28031 Madrid",
		latitud: 40.376205626276835,
		longitud: -3.6429637161883424
	},
	{
		distrito: "Villaverde",
		direccion: "C/ Bascuñuelos, 3 28021 Madrid",
		latitud: 40.33860368148312,
		longitud: -3.7103387295498003
	},
];


function initialiceMAPA (){
	map = new GMaps({  // Creo un mapa en [lat, lng]
              el: '#map',
			  zoom: 11,
			  disableDefaultUI: true,
              lat: 40.412187615201205,
              lng: -3.693137458214324 });
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

//Funcion loadPage
$(function()
{

	initialiceMAPA();
	var n;
	for(n = 0; puntos[n] != undefined; n++) {
		map.addMarker({
			lat: puntos[n].latitud,
			lng: puntos[n].longitud,
			icon: imagenPC,
			title: puntos[n].distrito,
			infoWindow: {
				content: "<b>Punto limpio de " + puntos[n].distrito + "</b><br><span>" + puntos[n].direccion + "</span>"
			}
		});
	}
});

