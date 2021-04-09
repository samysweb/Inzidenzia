
const toReplaceList = [
	"Unabhängig von der (Wochen)?(7[ -]Tage[ -])?Inzidenz",
	"Unabhängig vom Inzidenzwert",
	"Unabhängig von Inzidenzwerten", 
	"Unabhängig von Inzidenz",
]

function replaceTextOnPage(from, to){
	var nodes = getAllTextNodes();
	for(var i = 0; i < nodes.length; i++){
		for (var j = 0; j<from.length; j++) {
			  nodes[i].nodeValue = nodes[i].nodeValue.replace(new RegExp(from[j], 'ig'), to);
		}
	}
  
	function getAllTextNodes(){
	  var result = [];
  
	  (function scanSubTree(node){
		if(node.childNodes.length) {
		  for(var i = 0; i < node.childNodes.length; i++) { 
			scanSubTree(node.childNodes[i]);
		  }
		}else if(node.nodeType == Node.TEXT_NODE) {
		  result.push(node);
		}
	  })(document.getElementsByTagName("body")[0]);
  
	  return result;
	}
  
	function quote(str){
	  return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
	}
}

function doReplacement() {
	console.log("Replacement")
	replaceTextOnPage(toReplaceList,"Unabhängig vom gesunden Menschenverstand")
}

//window.setInterval(function() {doReplacement()}, 1000)
// Create an observer instance linked to the callback function
const observer = new MutationObserver(doReplacement);
const config = { attributes: true, childList: true, subtree: true };
// Start observing the target node for configured mutations
observer.observe(document, config);
