let conteudoInputGet = document.querySelector('#inputget');
let buttonEnviaGet = document.querySelector('#enviaGet'); 

let conteudoInputPost = document.querySelector('#inputpost');
let buttonEnviaPost = document.querySelector('#enviaPost'); 

buttonEnviaGet.addEventListener('click', meunome);

function meunome  (){
  switch (conteudoInputGet.value){
    case '1':
      Get1(); break;

    case '2':  
      Get2(); break;

    case '3':  
      GetJson(); break;  

    default:
      GetDefault(conteudoInputGet.value); break;
  }
}

buttonEnviaPost.addEventListener('click', function(){
  console.log (conteudoInputPost.value)
  let conteudojson = JSON.parse(conteudoInputPost.value)
  if (conteudojson.cpf.substr(0,1) >= 0 && conteudojson.cpf.substr(0,1) <= 9 )
  {
  console.log (' CPF OK ')  
  Post1(conteudoInputPost.value);
  }
  else console.log ('CPF inconsistente')
});

async  function Get1(){  
  // let url =  new URL('http://localhost:3000/destino1');
  let response =  await fetch('http://localhost:3000/destino1');
  //console.log('Response completo', response);
  // console.log('Status response: ',response.status);
  console.log (await response.text())
}

async function Get2(){  
  let url =  new URL('http://localhost:3000/speedy');
  let response = await fetch(url);
  // console.log ('Status response: ',response.status);
  let data = await response.text();
  console.log ('Texto response: ',data)  
}

async function GetJson(){  
  let url =  new URL('http://localhost:3000/destino3');
  let response = await fetch(url);
  // console.log (response.status);
  let data = await response.json();
  console.log(data);
  for (i=0; i < data.length; i++){
    console.log (data[i].nome);
  }
}

async function GetDefault(parametro){  
  let url =  new URL('http://localhost:3000/destino4');
  url += `/?nome=${parametro}&laranja='123'`
  let response = await fetch(url);
  console.log ('Response Status: ',response.status);
  if (response.status==200) {
    console.log (`Nome ${parametro} localizado no servidor`);
  }
  else console.log (`Nome ${parametro} NÃO localizado no servidor`);
}

async function Post1 (parametro){
  let url =  new URL('http://localhost:3000');
  let response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: parametro
  })
  switch (response.status){
    case 201: 
      console.log ('Sucesso no envio do Json para o servidor'); break;
    case 400:
      console.log ('Corrija o dado enviado'); break;
    }
}

  //   jQuery AJAX - (A)synchronous (JA)vaScript and (X)ML
  function AJAX_Get2(){
  console.log('Via Ajax');
  let url = new URL('http://localhost:3000/destino2');
  $.get(url, function(result, status, response){
    console.log(response.status)
    let data = response.responseText
    console.log (data);
  });
}

function AJAX_GetJson(){
  console.log('Via Ajax');
  let url = new URL('http://localhost:3000/destino3');
  $.get(url, function(result, status, response){
    console.log(response.status)
    let data = response.responseJSON
    for (i=0; i<data.length; i++){
    console.log ('Nome: ', data[i].nome, '    CPF: ', data[i].cpf);
    }
  });
}

function AJAX_Post1(parametro){
  console.log('Via Ajax');
  let url = new URL('http://localhost:3000');
$.post({
      url: url,
      data: parametro,
      contentType: "application/json; charset=utf-8",
      dataType: "json"
  });
}
       