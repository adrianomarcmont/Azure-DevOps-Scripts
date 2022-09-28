//***************************************************
// Script: 		AzureDevOps Repositories URL List Generator
// Versão:		1.0
// Author: 		Adriano Marcio Monteiro
// E-mail: 		adriano@brztec.com
// Site: 		www.brztec.com
//***************************************************

// *************************
// ***** Modo de usar: *****
// *************************
// Usando o Google Chrome.
// Acesse a página: https://YOUR_AZURE_DEVOPS/DefaultCollection/_apis/projects?api-version=5.0
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
var repositoriesTotal = "";
var counter = 0;
console.log(projectsTotal);
for (let i = 0; i < projectsTotal; i++) {
	projectName = projects.value[i].name;
	var repositoriesURL = proto+"//"+hostName+"/"+orgName+"/"+projectName+"/_apis/git/repositories?api-version=5.0-preview.1";
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var repositories = JSON.parse(this.responseText);
			var repositoriesTotal = repositories.count;
			console.log(repositoriesTotal);
			for (let j = 0; j < repositoriesTotal; j++) {
				repositorieRemoteURL = repositories.value[j].remoteUrl;
				resultWindow.document.write('<a href='+repositorieRemoteURL+' target="_blank">'+repositorieRemoteURL+'</a><br>');
				counter = counter + 1;
				if(i == projectsTotal - 1 ){
					if(j == repositoriesTotal - 1){
						resultWindow.document.write('<b>Total de Repositorios: </b>'+counter+'<br>');
					}
				}
			}
		}	
	};
	xhttp.open("GET", repositoriesURL);
	xhttp.send();
}


