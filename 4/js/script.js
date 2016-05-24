

     function draw(){
         alert("yes");
    var canvas = document.getElementById("canvas1");
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        /var x = 25;
        var y = 25;
        var constX = 25;
        ctx.fillStyle = "rgb(12,87,47)";
         function drawFractRectangle(centerx,centery,constX){
        var canvas = document.getElementById("canvas1");
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "red";
             alert("yes");
        var width = constX*2;
        var heigth = constX*2;
        var x = centerx-constX;
        var y = centery-constX;
     
         ctx.fillRect(x,y, width, heigth);
        }
        
        drawFractRectangle(50,50,25);
     
    }
}

draw();