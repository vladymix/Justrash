//Load functions

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

loadSliderValues(20,20);

}//End Function loadPage
);