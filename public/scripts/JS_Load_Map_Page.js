// JavaScript ZT Funciones

//Variables
var map;  



function initialiceMAPA (){
	map = new GMaps({  // Creo un mapa en [lat, lng]
              el: '#map',
			  zoom:11,
			  disableDefaultUI: true,
              lat: 40.412187615201205,
              lng: -3.693137458214324 });
	}
function opencloseMenu()
{
	if($("#gridBtns").hasClass("onButtons")){
		$("#gridBtns").removeClass("onButtons");
		$("#gridBtns").addClass("offButtons");	
	}
	else
	{
		$("#gridBtns").removeClass("offButtons");
		$("#gridBtns").addClass("onButtons");
	}	
}
function openCloseDistritos(){
	if($("#distritos").hasClass("onButtons")){
		$("#distritos").removeClass("onButtons");
		$("#distritos").addClass("offButtons");	
	}
	else
	{
		$("#distritos").removeClass("offButtons");
		$("#distritos").addClass("onButtons");
	}	

}



$(function()
{

 initialiceMAPA ();
CargarPapeleras(fileMoncloa);
MostrarOnlyPapeleras();

//Botones
$("#lbPLL").on("click",MostrarRutaLlenas);
$("#lbPV").on("click",MostrarRutaVacias);
$("#lbPM").on("click",MostrarRutaMediasLlenas);
$("#lbPA").on("click",MostrarRutaAveriadas);

$("#btnMenu").on("click",opencloseMenu);
$("#btn1").on("click",rutaCoche);
$("#btn2").on("click",rutaPie);
	
	
}//End Function loadPage
);	