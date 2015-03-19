//Load functions



function loadSliderValues(_min , _max){
var mySlideA = new Slider($('slider_minmax_gutter_m'),
 $('slider_minmax_minKnobA'),
 $('slider_bkg_img'),
 {
		start: 0,
		end: 100,
		offset:8,
		snap:false,
		onChange: function(pos){
			$('slider_minmax_min').setHTML('min '+pos.minpos);
			$('slider_minmax_max').setHTML('max '+pos.maxpos);
			changeValues(pos.minpos, pos.maxpos);
			}
		}, 
		$('slider_minmax_maxKnobA')).setMin(_min).setMax(_max);
	
	}
	
function changeValues(_min,_max)
{
	$("vEmpy").setHTML(_min);
	$("vSemi").setHTML(_max);
	
	$("vMax").setHTML(_max+1);
	document.getElementById("empy").height= _min+'px';
	document.getElementById("half").height = _max+'px';
	
	$("vMax").setHTML(document.getElementById("half").height);
	
}

//Funcion loadPage
$(function()
{

loadSliderValues(20,70);

 
}//End Function loadPage
);