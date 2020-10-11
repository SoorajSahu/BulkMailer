const $ = require('jquery');


var url ='http://127.0.0.1:3001';
var url1 =url+'/session';
 fetch(url1).
 then(res=>res.json())
 .then(data=>{
   var a= data;

   var allData='';
   for (let i = 0; i < a.length; i++) {
               allData += '<tr><td>'+a[i].id+
               '</td><td>'+a[i].host_name+
               '</td><td>'+ '<button class="btn btn-warning" onclick="sessionLoginFun(`'+a[i].host_name+'`);">Login with This Host</button>';
   }
 document.getElementById('login').innerHTML = allData;
 });


function sessionLoginFun(host)
{
sessionStorage.setItem("hostname",host);
window.location="emailSenders.html";
}
var modal= document.getElementById('myModal');
function showMod() {
modal.style.display = "block";
}
function hideMod()
{
modal.style.display = "none";

}
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}
$(window).ready(()=>{
$('#addNewHost').submit(function(e){

e.preventDefault();
console.log($('#addNewHost').serializeArray())

$.ajax({
data:$('#addNewHost').serializeArray(),
url: url +'/sessionedit',
type:'POST',      
cache: false,      
success:function(data){console.log(data); }

});
location.reload();

});
});







