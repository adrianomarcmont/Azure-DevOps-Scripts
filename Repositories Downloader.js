//***************************************************
// Script: 		AzureDevOps Repositories Downloader
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

// Descompactar todos os arquivos cada um em sua pasta:
// "C:\Program Files\WinRAR\WinRAR.exe" x -ad -cfg- -ibck *.zip

//*********************
// ***** To Do's: *****
//*********************
// Melhorar a função de Delay.

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

var hostName = document.location.host;
var proto = document.location.protocol;
var orgName = document.location.href.split("/",document.location.href.length)[3];
var projectName = "";
var projectId = "";
var repositorieName = "";
var repositorieId = "";
var projects = JSON.parse(document.body.innerText);
var projectsTotal = projects.count;
for (let i = 0; i < projectsTotal; i++) {
	projectName = projects.value[i].name;
	projectId = projects.value[i].id;
	var repositoriesURL = proto+"//"+hostName+"/"+orgName+"/"+projectName+"/_apis/git/repositories?api-version=5.0-preview.1";
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
			var repositories = JSON.parse(this.responseText);
			var repositoriesTotal = repositories.count;
			console.log("Total de Projetos",projectsTotal);
			console.log("Total de Repositorios",repositoriesTotal);			
			for (let j = 0; j < repositoriesTotal; j++) {
				repositorieId = repositories.value[j].id;
				repositorieName = repositories.value[j].name;
				projectId = repositories.value[j].project.id;
				projectName = repositories.value[j].project.name;
				var sourceURLDownload = proto+'//'+hostName+'/'+orgName+'/'+projectId+'/_apis/git/repositories/'+repositorieId+'/Items?path=%2F&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=zip&api-version=5.0-preview.1';
				console.log("Baixando Projeto/Rep "+i+":"+j+"...:",projectName+' | '+projectId+' | '+repositorieName+' | '+repositorieId);
				const anchor = document.createElement("a");
				anchor.href = sourceURLDownload;
				anchor.download = sourceURLDownload;
				document.body.appendChild(anchor);
				anchor.click();
				if (anchor.childNodes.length){
					document.removeChild(anchor);
				}
				sleep(2000);
			}
		}
	};
	xhttp.open("GET", repositoriesURL);
	xhttp.send();
}
//[EoF]
