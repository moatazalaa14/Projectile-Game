let $v=document.querySelector('.v'),
$degree=document.querySelector('.degree');
var theCanvas = document.getElementById("theCanvas");
var theContext = theCanvas.getContext("2d");
var x=0
var y=650
function drawProjectile() {    
    theContext.beginPath();
    
    theContext.arc(x, y, 5, 0, 2*Math.PI);
    theContext.fillStyle = "#e94560";
    theContext.fill();
    
    }
    function sinDegrees(angleDegrees) {
        return Math.sin(angleDegrees*Math.PI/180);
    };
    function cosDegrees(angleDegrees) {
        return Math.cos(angleDegrees*Math.PI/180);
    };
    //let k=false
    let t=0

    function moveProjectile() {
    //if(y>=250 &&k==false){
        //}
        //y--
        //x++
        if(y<=650){
        let v_d=$v.value*sinDegrees($degree.value)*t-0.5*9.8*t*t
        document.querySelector('.h-d').innerHTML=Math.ceil(x*10)
        document.querySelector('.v-d').innerHTML=Math.ceil(v_d)<=0?0:Math.ceil(v_d)
        y=650-v_d/10
        x=(0+$v.value*cosDegrees($degree.value)*t)/10
        var range=(2*Math.pow($v.value,2)*sinDegrees($degree.value)*cosDegrees($degree.value))/9.8
       t=t+0.1
        }
    drawProjectile();
    //window.requestAnimationFrame(moveProjectile)
    
        y<=650?window.setTimeout(moveProjectile, 10):window.clearInterval(moveProjectile)
  
    }
    /*function moveProjectileDown() {
        k=true
        y++
        x++
       
    
    drawProjectile();
        window.setTimeout(moveProjectileDown, 1000/30);
  
    }*/

function fireProjectile() {
    x = 0;
    y = earthRadius + mountainHeight;
    vx = Number(speedSlider.value);
    vy = 0;
    moveProjectile();
}
        

document.querySelector('.fire').addEventListener('click',(event)=>{
    event.preventDefault();
    console.log((.5*$v.value*$v.value*(sinDegrees($degree.value))*(sinDegrees($degree.value)))/9.8)
    console.log(((2*$v.value*sinDegrees(30))/9.8),'T')
    console.log((2*Math.pow($v.value,2)*sinDegrees($degree.value)*cosDegrees($degree.value))/9.8,'Range')
    moveProjectile()
    timerCount()
})
document.querySelector('.reset').addEventListener('click',(event)=>{
    event.preventDefault();
    theContext.clearRect(0,0,theCanvas.width,theCanvas.height)
    x=0;
    y=650;
    t=0;
    document.querySelector(".timer").innerHTML="Time"
})



let timerCount=()=>{
 


var x = setInterval(function() {

 
    document.querySelector(".timer").innerHTML = Math.round(t) +"S"
  
  }, 10);}