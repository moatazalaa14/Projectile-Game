//velocity and angle degree
let $v = document.querySelector(".velocity"),
  $degree = document.querySelector(".degree");

//Start with canvas
var theCanvas = document.getElementById("theCanvas");
var theContext = theCanvas.getContext("2d");
var grd = theContext.createLinearGradient(0,0,0,400);


//determine the start point
var x = 0;
var y = 650;

//convert angle degree from rad to deg
function sinDegrees(angleDegrees) {
  return Math.sin((angleDegrees * Math.PI) / 180);
}
function cosDegrees(angleDegrees) {
  return Math.cos((angleDegrees * Math.PI) / 180);
}
//add gradient background

function changeGradientBackground(){
  grd.addColorStop(0," #68bde1");
  grd.addColorStop(1,"#f5c16c");
  theContext.fillStyle = grd;
  theContext.fillRect(0,0,1100,650);
}


changeGradientBackground()


//target is the place of enemy
let target = {
  x,
  y,
};


//it is a random point that enempy place on it
function drawRandom() {
  theContext.beginPath();
  target.x = Math.floor(Math.random() * (1000 - 500)) + 500;
  target.y = 640;
  theContext.arc(target.x, target.y, 5, 0, 2 * Math.PI);
  theContext.fillStyle = "black";
  theContext.fill();
}

//draw the tank
function drawTank() {
  theContext.beginPath();
  theContext.moveTo(0, 650);
  theContext.lineTo(
    50 * cosDegrees($degree.value),
    650 - 50 * sinDegrees($degree.value)
  );
  theContext.lineWidth = 20;
  theContext.strokeStyle = "#00541a";
  theContext.stroke();
}

//draw the projectile
function drawProjectile() {
  theContext.beginPath();
  theContext.arc(x, y, 5, 0, 2 * Math.PI);
  theContext.fillStyle = "#838383";
  theContext.fill();
}
//intialize time which projectile take it to arrive the target point
let t = 0;
//animation for projectile 
function moveProjectile() {
  
  if (y <= 650) {
    let v_d = $v.value * sinDegrees($degree.value) * t - 0.5 * 9.8 * t * t;
    document.querySelector(".h-d").innerHTML = "X: " + Math.ceil(x) * 10;
    document.querySelector(".v-d").innerHTML =
      Math.ceil(v_d) <= 0 ? "Y: " + 0 : "Y: " + Math.ceil(v_d);
    y = 650 - v_d / 10;
    x = (0 + $v.value * cosDegrees($degree.value) * t) / 10;
    var range =
      (2 *
        Math.pow($v.value, 2) *
        sinDegrees($degree.value) *
        cosDegrees($degree.value)) /
      9.8;
    t = t + 0.1;
  }
  drawProjectile();
  //window.requestAnimationFrame(moveProjectile)

  y <= 650 ? window.setTimeout(moveProjectile, 1) : isCompelete();
  window.clearInterval(moveProjectile);
}

//which display if the mission is complete 
function isCompelete() {
  if (Math.abs(x - target.x) <= 50) {
    console.log("done");
    document.querySelector(".container__mission").style.display = "flex";
  } else {
    console.log("is not");
    console.log(x);
  }
}
//whaen click on fire button to fire the projectile
document.querySelector(".fire").addEventListener("click", (event) => {
  event.preventDefault();
  console.log(
    (0.5 *
      $v.value *
      $v.value *
      sinDegrees($degree.value) *
      sinDegrees($degree.value)) /
      9.8
  );
  console.log((2 * $v.value * sinDegrees(30)) / 9.8, "T");
  console.log(
    (2 *
      Math.pow($v.value, 2) *
      sinDegrees($degree.value) *
      cosDegrees($degree.value)) /
      9.8,
    "Range"
  );
  moveProjectile();
  timerCount();
});

//reset the values
document.querySelector(".reset").addEventListener("click", (event) => {
  event.preventDefault();
  theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
  x = 0;
  y = 650;
  t = 0;
  document.querySelector(".timer").innerHTML = "Time";
  document.querySelector(".enemy").disabled = false;
  changeGradientBackground()
});
//guide the tank with the right angle
document.querySelector(".ready").addEventListener("click", (event) => {
  event.preventDefault();

  drawTank();
});
//to play again if you finished the mission
document.querySelector(".play").addEventListener("click", () => {
  document.querySelector(".container__mission").style.display = "none";
});
//Show the place of enemy 
document.querySelector(".enemy").addEventListener("click", (event) => {
  event.preventDefault();
  drawRandom();
  document.querySelector(".x").innerHTML =
    "The automated assisant warns you!! the enemy at distance " +
    `<span>${target.x * 10}</span>` +
    " m on the ground";
  document.querySelector(".enemy").disabled = true;
});
//calculate the time
let timerCount = () => {
  var x = setInterval(function () {
    document.querySelector(".timer").innerHTML = "Time: " + Math.round(t) + "S";
  }, 10);
};
