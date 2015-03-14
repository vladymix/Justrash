// JavaScript ZT Funciones

//Variables
var map;  



function initialiceMAPA (){
	map = new GMaps({  // Creo un mapa en [lat, lng]
              el: '#map',
			  disableDefaultUI: true,
              lat: 40.412187615201205,
              lng: -3.693137458214324 });
	}



$(function()
{

 initialiceMAPA();
//CargarPapeleras(fileMoncloa);
// MostrarOnlyPapeleras();

//Botones
$("#lbPLL").on("click",MostrarRutaLlenas);
$("#lbPV").on("click",MostrarRutaVacias);
$("#lbPM").on("click",MostrarRutaMediasLlenas);
$("#lbPA").on("click",MostrarRutaAveriadas);
	
	
	
}//End Function loadPage
);	