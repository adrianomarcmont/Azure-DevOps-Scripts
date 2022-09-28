//***************************************************
// Script: 		AzureDevOps Projects URL List Generator
// Versão:		1.0
// Author: 		Adriano Marcio Monteiro
// E-mail: 		adriano@brztec.com
// Site: 		www.brztec.com
//***************************************************

// *************************
// ***** Modo de usar: *****
// *************************
// Usando o Google Chrome.
// Acesse a página: https://YOUR_AZURE_DEVOPS/ORG_NAME/_apis/projects?api-version=5.0
// Pressione F12.
// Clique na aba console.
// Cole o codigo abaixo.
// Pressione Enter.
// Aguarde a finalização do script.

var hostName = document.location.host;
var proto = document.location.protocol;
var orgName = document.location.href.split("/",document.location.href.length)[3];
var projectName = "";
var projects = JSON.parse(document.body.innerText);
var projectsTotal = projects.count;
var resultWindow = window.open("", "resultWindow", "width=800,height=600");
for (let i = 0; i < projectsTotal; i++) {
	projectName = projects.value[i].name;
	var projectsURL = proto+"//"+hostName+"/"+orgName+"/"+projectName;
	resultWindow.document.write('<a href='+projectsURL+' target="_blank">'+projectsURL+'</a><br>');
}
resultWindow.document.write('<b>Total de Projetos: </b>'+projectsTotal+'<br>');
//[EoF]
