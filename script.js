function setDate (){
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();

godzina.innerHTML = hour;
if(min < 10){
    minuta.innerHTML = "0" + min;
}
    else{
        minuta.innerHTML = min;
    }

}
setInterval(setDate, 1000);
setDate();


var temp;

$(document).ready(function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
           var latitude = position.coords.latitude;
           var longitude = position.coords.longitude;
           var url = "https://fcc-weather-api.glitch.me/api/current?" + "lat=" + latitude + "&" + "lon=" + longitude;
        
            $.ajax({
                url: url,
                success: function(result){
                $("#lokalizacja").html(result.name);
                $(".temperatura").html((result.main.temp)+ " " +'&#186' + "C" );
                $(".kindOf").html(result.weather[0].main);
                var wether = result.weather[0].main;
                changeImg(wether);
                $(".btn").css("display","block");
                temp = result.main.temp;
            }
            });
        });
    }
});
    

function toggle(){
   var button = document.getElementById('button');
    if(button.className === "btn btn-primary btn-lg celsious"){
        var cel = parseFloat(temp);
        var far = Math.round(32 + (5/9) * cel);
        $(".temperatura").html(far + " F");
        button.className = "btn btn-primary btn-lg farenheit";
    }
    else{
        cel = temp;
        $(".temperatura").html(cel + " " +'&#186' + "C");
        button.className = "btn btn-primary btn-lg celsious";
    }
}

function changeImg(wether){
    wether = wether.toLowerCase();
    var img = $("img");
    switch(wether){
        case 'clear' :
            img.attr("src","pic/sun.png") ;
            break;
         case 'fog' :
         case 'mist' :
            img.attr("src","pic/fog.png") ;
            break;
         case 'rain' :
         case 'drizzle' :
            img.attr("src","pic/rain.png") ;
            break;
        case 'snow' :
            img.attr("src","pic/snowy.png") ;
            break;
        case 'thunderstom' :
            img.attr("src","pic/thunderstorm.png") ;
            break;
        case 'clouds' :
            img.attr("src","pic/clouds.png") ;
            break;
        default: 
            img.attr("src","pic/thermometer.png") ;
            break;
            
    }
}