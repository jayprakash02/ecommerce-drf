function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

var key = ""
var apiurl = ""
if ((window.location.href).includes("127.0.0.1"))
    apiurl = "http://127.0.0.1:8000/";
else apiurl = "https://ecommerce-drf.herokuapp.com/";

function getUser(key){
    $.post(apiurl+"customer/",{ key:key })
    .done(function() {
        alert( "second success" );
      })
}

$( document ).load(function() {

    key=$.cookie('eco_drf_key');
    if(key===undefined){
        key=$.cookie('eco_drf_key', uuidv4());
    }
    console.log(key)
    getUser(key)


});