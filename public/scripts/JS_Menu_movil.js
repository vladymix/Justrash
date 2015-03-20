// JavaScript Crear menu MOvil

var htmlMenu='<div id="content_menuMovil" class="content_menuMovil"><div onClick="open_close_Menu_movil()" id="btnMenu" style=" padding-top:15px;" ><img class="imagenMenu" src="icons/btnMenu.png"></div><div id="menuMovil" class="collapse" style="align-content:center; text-align:center; background-color:#2D3639;"> <a class="active"  href="index.html">       <div><img class="imagenMenu" src="icons/btnMap.png"></div></a><a  href="settings.html"><div><img class="imagenMenu" src="icons/btnSettings.png"></div> </a> <a href="people.html" ><div> <img class="imagenMenu" src="icons/btnPeople.png"></div>   </a> <a href="estadisticas.html"> <div><img class="imagenMenu" src="icons/btnChar.png"></div> </a> <a href="puntos_limpios.html"><div><img class="imagenMenu" src="icons/btnPuntos.png"></div></a> <a href="developers.html"><div><img class="imagenMenu" src="icons/btnDevelopers.png"></div></a></div> </div>';
function open_close_Menu_movil(){
	if($("#menuMovil").hasClass("collapse")){
		$("#menuMovil").removeClass("collapse");
		$("#menuMovil").addClass("visible");
		}
		else{
			$("#menuMovil").removeClass("visible");
			$("#menuMovil").addClass("collapse");
			}
		}
function loadmenumovil(){	
	if(window.innerWidth<=480){
		$("body").html($("body").html()+htmlMenu);
		$(".Menu").width('0px');
		$(".Menu").addClass("collapse");
		try{$(".ListaDistritos").removeClass("position");}catch(err){}
			}	
	}
$(function()
{
 loadmenumovil();

}//End Function loadPage
);	