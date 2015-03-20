

function loadSliderValues(_vmax,_vmin){
	
	var _vhalf = 100 -(Math.abs(_vmax)+Math.abs(_vmin));

	
	$("#vSEmpy").attr("max",100-_vmax);	
	$("#vSFull").attr("max",100-_vmin);
	
	$("#vSHalf").attr("min",Math.abs(_vmin) + Math.abs(1));
	$("#vSHalf").attr("max",(100-_vmax)-1);
	
	var valuemin= (_vmin/100)*180;
	var valuehalf= (_vhalf/100)*180;
	var valuemax = (_vmax/100)*180;

	//Actulizar sliders
	$("#vSEmpy").val(_vmin);
	$("#vSHalf").val(_vhalf);	
	$("#vSFull").val(_vmax);
	
	var hasta = (100-_vmax)-1; 		
	var desde = Math.abs(_vmin) + Math.abs(1);//Use Math.abs porque no me sumaba
		
	//Actualizar valores
	$("#vEmpy").html(_vmin);	
	$("#vHalf").html(desde + " - "+hasta);
	$("#vFull").html(100-_vmax);	

	//Actualizar tamaños
	$("#empy").height(valuemin+"px");
	$("#half").height(valuehalf+"px");
	$("#full").height(valuemax+"px");
	
	}

function changeValues(){		
	loadSliderValues($("#vSFull").val(),$("#vSEmpy").val());	
}
var vActual =0;
var	vAnterior = 0;

function changeValueshalf(){
	
	vActual = $("#vSHalf").val();
	if(vActual>=vAnterior){	
	var nuevoFull = $("#vSFull").val();	
		nuevoFull--;
		loadSliderValues(nuevoFull,$("#vSEmpy").val());	
		vAnterior = $("#vSHalf").val();
		}
	else
	{
		var nuevoEmpy = $("#vSEmpy").val();
		nuevoEmpy--;
	loadSliderValues($("#vSFull").val(),nuevoEmpy);	
	}

}

















