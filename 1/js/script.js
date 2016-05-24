var parent = document.getElementById("container");  
var children = document.getElementsByClassName("circle");

document.getElementById("red").value = 255;
document.getElementById("blue").value = 255;
document.getElementById("green").value = 255;

document.getElementById("quantityOfCircle").value = 20;
function makeCircle(quantity) {
    for (i = 0; i < quantity; i++ ) {
        addChild();
    }
}
function addChild(){
        var child = document.createElement("li");
        child.className = "circle";
        child.style.backgroundColor = setRandomColor();
        child.innerHTML = setRandomColor();
        child.onmouseover = changeColorOfAllCircle;
        parent.appendChild(child);  
}
function setRandomColor(){
    
    var maxBlue = parseInt(document.getElementById('blue').value);
    if((maxBlue<0)||(maxBlue>255)){
        maxBlue=255;
        document.getElementById('blue').value = 255;
    }
    var maxGreen = parseInt(document.getElementById('green').value);
    if((maxGreen<0)||(maxGreen>255)){
        maxGreen = 255;
        document.getElementById('green').value = 255;
    }
    var maxRed = parseInt(document.getElementById('red').value);
    if((maxRed<0)||(maxRed>255)){
        maxRed = 255;
        document.getElementById('red').value = 255;
    }
    
    var green = Math.floor(Math.random()*maxGreen); 
    var blue = Math.floor(Math.random()*maxBlue); 
    var red = Math.floor(Math.random()*maxRed); 
    return "rgb("+red+","+green+","+blue+")";
}

function changeQuantityOfCircle(){
    
    var quantity = parseInt(document.getElementById("quantityOfCircle").value);
    if(quantity!=children.length){
        if(quantity>children.length){
            for(;children.length<quantity;){
                addChild();
            }
        }else{
           for(;quantity<children.length;){
               children[children.length-1].remove();
           }
        }
          //var positionOfFirstRemovedElement = quantity+1;
         // var quantityOfRemovedElement = children.length-quantity;                      //Array.prototype.slice.call(children,positionOfFirstRemovedElement, quantityOfRemovedElement);
    }
}

function changeColorOfAllCircle(){
    for(var i = 0; i<children.length; i++){
     children[i].style.backgroundColor = setRandomColor();  
     children[i].innerHTML = setRandomColor();   
    }
}

makeCircle(20);
document.getElementById("quantityOfCircle").oninput = changeQuantityOfCircle;
document.getElementById("red").oninput = changeColorOfAllCircle;
document.getElementById("green").oninput = changeColorOfAllCircle;
document.getElementById("blue").oninput = changeColorOfAllCircle;