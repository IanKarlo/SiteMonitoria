/*=================================== LOAD FILES ==========================================*/
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        processXml(this);
    }
};
xhttp.open("GET", "https://raw.githubusercontent.com/Valgueiro/SiteMonitoria/master/arquivos.xml", true);
xhttp.send();

function addAcordion(name, sub){
	var txt = "";
	txt += '<div class="panel-heading opcaoArquivos"  data-toggle="collapse" data-parent="#accordion" href="#' + name + '" > ';
    txt += '<h4 class="panel-title"><span class = "glyphicon glyphicon-chevron-right" aria-hidden="true"></span> '+ name  +' </h4></div>';
    txt += '<div id="' + name + '" class="panel-collapse collapse">';
    txt += '<div class="panel-body">';
    if(sub){
    	txt += '<div class="panel-group container" id="sub' + name + '">';
   		txt += '<div class="panel panel-transparent">';
    }
    return txt;
}

function processXml(req){
	var xml = req.responseText, xmldoc = $.parseXML(xml), $xml = $(xmldoc);
	var txt = '';
	txt += '<div class="panel panel-transparent">';
	txt += addAcordion("Mini-Provas", true);
	$xml.find("mini-provas").find("semestre").each(function(){
	    var name =  $(this).attr('id'), id = "mini-provas" +  name.replace(".", "-");
	    
    	txt += '<div class="panel-heading opcaoArquivos " data-toggle="collapse" data-parent="#subMini-Provas" href="#' + id + '">';
		txt += '<h6 class="panel-title"><span class = "glyphicon glyphicon-chevron-right" aria-hidden="true"></span> ' + name + '</h6> </div>';

		txt += '<div id="' + id + '" class="panel-collapse collapse">';
   		txt += '<div class="panel-body">';
   		txt += '<ul class="list-group">';

		$(this).find('arquivo').each(function(){
			var link = $(this).find('caminho').text();
			txt += '<li class="list-group-item justify-content-between" onclick="window.open(\'' + link + '\');">' + $(this).find('nome').text() + '</li>';
		});
		txt += '</ul></div></div>'
	});
	txt += '</div></div></div></div>';

	txt += addAcordion("Provas", true);
	$xml.find("provas").find("semestre").each(function(){
		var name =  $(this).attr('id'), id = "provas" + name.replace(".", "-");
	    
    	txt += '<div class="panel-heading opcaoArquivos" data-toggle="collapse" data-parent="#subProvas" href="#' + id + '">';
		txt += '<h6 class="panel-title"><span class = "glyphicon glyphicon-chevron-right" aria-hidden="true"></span> ' + name + '</h6> </div>';

		txt += '<div id="' + id + '" class="panel-collapse collapse">';
   		txt += '<div class="panel-body">';
   		txt += '<ul class="list-group">';

		$(this).find('arquivo').each(function(){
			var link = $(this).find('caminho').text();
			txt += '<li class="list-group-item justify-content-between" onclick="window.open(\'' + link + '\');">' + $(this).find('nome').text() + '</li>';
		});
		txt += '</ul></div></div>';
	});
	txt += '</div></div></div></div>';

	txt += addAcordion("Material", true);
	$xml.find("material").find("assunto").each(function(){
		var name =  $(this).attr('id'), id = "material" + name.replace(/[\s[\135]/g, "-");
    	txt += '<div class="panel-heading opcaoArquivos" data-toggle="collapse" data-parent="#subMaterial" href="#' + id + '">';
		txt += '<h6 class="panel-title"><span class = "glyphicon glyphicon-chevron-right" aria-hidden="true"></span> ' + name + '</h6> </div>';

		txt += '<div id="' + id + '" class="panel-collapse collapse">';
   		txt += '<div class="panel-body">';
   		txt += '<ul class="list-group">';

		$(this).find('arquivo').each(function(){
			var link = $(this).find('caminho').text();
			txt += '<li class="list-group-item justify-content-between" onclick="window.open(\'' + link + '\');">' + $(this).find('nome').text() + '</li>';
		});
		txt += '</ul></div></div>';
	});
	txt += '</div></div></div></div>';
	txt += '</ div>';
	document.getElementById("accordion").innerHTML = txt;
	
	$(".opcaoArquivos").click(function() {
		var $at = $(this);
		if($at.data('clicked') == true)
			return;
		
		$at.data('clicked', true);
    	window.setTimeout(function(){
        	$at.data('clicked', false);
    	 }, 300);
		
		if(!$at.find(".panel-title").find("span").hasClass("glyphicon-chevron-down")){
			var par = $at.attr('data-parent');
			$('div[data-parent="'+par+'"]').find(".panel-title").find("span").removeClass("glyphicon-chevron-down");
			$('div[data-parent="'+par+'"]').find(".panel-title").find("span").addClass("glyphicon-chevron-right");
		}
		
		$at.find(".panel-title").find("span").toggleClass("glyphicon-chevron-right");
		$at.find(".panel-title").find("span").toggleClass("glyphicon-chevron-down");
		
		if($at.find(".panel-title").find("span").hasClass("glyphicon-chevron-down")){
			$at.css('background', 'rgba(122, 130, 136, 0.5)!important');
		}
		else{
			$at.css('background', 'rgba(122, 130, 136, 0.2)!important');
		}
		
	});
}

/*=========================================================================================*/