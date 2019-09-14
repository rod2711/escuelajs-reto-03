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

// fetchData(API, function (error1, data1) {
//   console.log('entered Callback');
//   if (error1) return console.error('Error' + ' ' + error1);
  
//   fetchData(API + data1.results[0].id, function (error2, data2) {
//     if (error2) return console.error(error1);
  
//     fetchData(data2.origin.url, function (error3, data3) {
//       if (error3) return console.error(error3);
  
//       console.log('Personajes:' + ' ' + data1.info.count);
//       console.log('Primer Personaje:' + ' ' + data2.name);
//       console.log('Dimensión:' + ' ' + data3.dimension);
//     });
//   });
// });

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

