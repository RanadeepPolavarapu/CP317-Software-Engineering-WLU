

function page(p){
	alert(p);
	$.mobile.changePage("file:///" + p, { transition: "slideup"});/*, {transition: "slide"}, true, true*/
}