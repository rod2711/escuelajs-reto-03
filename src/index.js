var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

function fetchData(url_api) {
  return new Promise(function(resolve, reject) {
    xhttp.onreadystatechange = function (event) {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200)
          resolve(JSON.parse(xhttp.responseText));
        else return reject(url_api);
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
  });
};

var dataGlobal = Array();
fetchData(API).then(data1=>{
  //console.log(data1);
  dataGlobal.push(data1);
  return fetchData(API + data1.results[0].id)
}).then(data2=>{
  dataGlobal.push(data2);
  return fetchData(data2.origin.url)
}).then( data3=>{
  dataGlobal.push(data3);
  console.log('Personajes:' + ' ' + dataGlobal[0].info.count);
  console.log('Primer Personaje:' + ' ' + dataGlobal[1].name);  
  console.log('Dimensión:' + ' ' + dataGlobal[2].dimension);
});




async function fetchAllData(){
try{
  let  data1 = await fetchData(API);
  let data2 = await fetchData(API + data1.results[0].id);
  let data3 = await fetchData(data2.origin.url);
  console.log('//////let-await////');
  console.log('Personajes:' + ' ' + data1.info.count);
  console.log('Primer Personaje:' + ' ' + data2.name);  
  console.log('Dimensión:' + ' ' + data3.dimension);
}catch(error){
  errorCallBack(error);
}
  

}
fetchAllData();