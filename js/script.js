// CANVAS AND CTX DECLARATION
var canvas = document.querySelector(".park-the-boat");
var ctx = canvas.getContext("2d");

var boatImg = new Image();
boatImg.src = "./images/boat.png";

var portImg = new Image();
portImg.src ="./images/port.jpg";

var seaImg = new Image();
seaImg.src = "./images/topseaview.jpg";
// CLASS DECLARATION

//-- Building (x, y, width, height)
class Build {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this. height;
  }

  drawMe () {
    ctx.fillStyle = "#7e7e7e";
    ctx.drawImage (portImg, this.x, this.y, this.width, this.height);
    // ctx.fillRect (this.x, this.y, this.width, this.height);

  }
}

// -- Finishline (x, y)
class FinishLine {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.height = 33;
    this.width = 120;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this. height;
  }

  drawMe() {
    ctx.strokeStyle = "white";
    ctx.strokeRect (this.x, this.y, this.width, this.height);
  }
}
    

  

// -- Boat (x, y, speed, angle)
class Boat {
  constructor (x, y, speed, angle) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 20;
    this.speed = speed;
    this.angle = angle;
    this.setSpeed = 0;
    this.setAngle = 0;
  }

  drawMe () {
    
    // ----------------------------------------------------------------------
    // Acceleration/ décélération et friction
    if (this.setSpeed === 0) {
       this.speed *= 0.995
    }

    else if (this.setSpeed > 0) {
      if (this.speed < this.setSpeed) {
        this.speed += this.setSpeed * 0.005;
      }
      else if (this.speed > this.setSpeed) {
        this.speed *= 0.995;
      }
    }

    else if (this.setSpeed < 0) {
      if (this.speed > this.setSpeed) {
        this.speed += this.setSpeed * 0.005;
      }
      else if (this.speed < this.setSpeed) {
        this.speed *= 0.995;
      }
    }
    
// Set angle
  this.angle += this.setAngle * 0.0025 * this.speed;
      
// ROTATION DU BATEAU (fonction de l'angle donnée à l'objet bateau)
    var rad = this.angle * Math.PI / 180;
    this.x += (this.speed * Math.cos (rad) /10 );
    this.y += (this.speed * Math.sin (rad) /10 );
//  Set the origin to the center of the boat
    ctx.translate(this.x + this.width /2, this.y + this.height / 2);

    
    
// Rotate the canvas around the origin
    ctx.rotate(rad);
   
// draw the image  
    ctx.fillStyle = "#000000";  
    // ctx.fillRect(this.width / 2 * (-1),this.height / 2 *(-1) ,this.width,this.height);
    
  
    ctx.drawImage (boatImg, this.width / 2 * (-1), this.height /2 * (-1), this.width, this.height);
    

//reset the canvas  
    ctx.rotate(rad * ( -1 ) );
    ctx.translate((this.x + this.width / 2) * (-1), (this.y + this.height / 2) * (-1));

// Collision testing
// POINT D'ORIGINE (x0 et y0 = coordonnées du centre)
    var x0 = this.x + this.width /2;
    var y0 = this.y + this.height /2;
    var x8 = this.x - this.width /2;
    var y8 = this.y - this.height /2;
    // var x9 = this.x + this.width;
    // var y9 = this.y + this.height/2;

  // Récupère le bon angle (opposé à l'angle de départ) 
      var rad2 = rad * (-1);
    // calcul des coordonnées translatées 
    // A
      var x2 = x0 + (this.x - x0)* Math.cos(rad2) + (this.y - y0)* Math.sin(rad2);
      var y2 = y0 - (this.x - x0)* Math.sin(rad2) + (this.y - y0)* Math.cos(rad2);
      // B
      var x3 = x0 - (this.x - x0)* Math.cos(rad2) + (this.y - y0)* Math.sin(rad2);
      var y3 = y0 + (this.x - x0)* Math.sin(rad2) + (this.y - y0)* Math.cos(rad2);
      // C
      var x4 = x0 + (this.x - x8)* Math.cos(rad2) + (this.y - y8)* Math.sin(rad2);
      var y4 = y0 - (this.x - x8)* Math.sin(rad2) + (this.y - y8)* Math.cos(rad2);
      //  D
      var x5 = x0 - (this.x - x8)* Math.cos(rad2) + (this.y - y8)* Math.sin(rad2);
      var y5 = y0 + (this.x - x8)* Math.sin(rad2) + (this.y - y8)* Math.cos(rad2);
  // ------------------ CERCLES DE TESTS ---------------------------------------------------------------------
  // ctx.beginPath();
  // ctx.arc(x2, y2 , 5, 0, 2*Math.PI);
  // ctx.fillStyle = "yellow";
  // ctx.fill();
  // ctx.closePath();
  // ctx.beginPath();
  // ctx.arc(x3, y3, 5, 0, 2*Math.PI);
  // ctx.fillStyle = "purple";
  // ctx.fill();
  // ctx.closePath();
  // ctx.beginPath();
  // ctx.arc(x4, y4, 5, 0, 2*Math.PI);
  // ctx.fillStyle = "red";
  // ctx.fill();
  // ctx.closePath();
  // ctx.beginPath();
  // ctx.arc(x5, y5, 5, 0, 2*Math.PI);
  // ctx.fillStyle = "blue";
  // ctx.fill();
  // ctx.closePath();
  // ----------------------------------------------------------------------------------
  // HUD WRITING 
      ctx.fillStyle ="white";
      ctx.font = "25px arial";
      ctx.fillText ("Thrust = " + this.setSpeed,1100 , 50);
      if (this.setAngle > 0)
        {ctx.fillText ("Starboard = " + this.setAngle,1100 , 70);}
  
      else if (this.setAngle < 0)
        {ctx.fillText ("Larboard = " + (-1) * this.setAngle,1100 , 70);}
  
      else {ctx.fillText ("No Angle", 1100 , 70);}

      this.coord = [  {x: x2, y: y2}, //A
                      {x: x3, y: y3}, //B
                      {x: x4, y: y4}, //C
                      {x: x5, y: y5}, //D
                    ];

      this.maxX = Math.max (this.coord[0].x, this.coord[1].x, this.coord[2].x, this.coord[3].x);
      this.minX = Math.min (this.coord[0].x, this.coord[1].x, this.coord[2].x, this.coord[3].x);
      this.maxY = Math.max (this.coord[0].y, this.coord[1].y, this.coord[2].y, this.coord[3].y);
      this.minY = Math.min (this.coord[0].y, this.coord[1].y, this.coord[2].y, this.coord[3].y);
      

    }

  }




// Buildings array (buildings in a level) + Build our BOAT
// -------------------------------------------
// LEVEL 1
var buildStockLvl1 = [
  new Build (0, 0, 300, 300),
];
 var boat1 = new Boat (0, 340, 0, 0);

 var finishLine1 = new FinishLine (300,300);

// -------------------------------------------------------------------
// COLLISION TESTING FUNCTIONS

function isFinished (boat, finishLine) {
  
  if (boat.maxX <= finishLine.maxX && 
      boat.minX >= finishLine.x && 
      boat.maxY <= finishLine.maxY &&
      boat.minY >= finishLine.y &&
      boat.speed < 0.5 ) {
        console.log ("ON Y EST GARS !!!!");
        return true;
        
      }
  else return false;
}

// function isCrashed (boat, build) {
//   if (boat.maxX <= build.maxX && boat.minY <= build.maxY || boat.maxX >= build.x && ) {
//     console.log ("crashed !!!!");
//     return true;
//   }
// }


// DRAWING FUNCTIONS
// ----------------------------------------------

// Buildings in LVL array (WILL HAVE A COLLISION DETEC°)
// Si un des 4 coins est dans la surface -> collision
function createBuild (buildStock) {
  buildStock.forEach (function (oneBuild) {
    oneBuild.drawMe();
    // isCrashed (boat1,oneBuild);
  })
}

  //-- Decor
function createDecor () {

  //-- Arriere plan -- EAU
  ctx.fillStyle = "#00B2FF";
  // ctx.fillRect (0, 0, 1280, 720);
  ctx.drawImage (seaImg, 0, 0, 1280, 720);
}

// ---------------    GAMELOOP FUNCTION  ----------------------
function gameLoop () {
  ctx.clearRect (0, 0, 1280, 720);

  //  !!!!!! ALL ELEMENT DRAWING FUNCTION BELOW !!!!!!!

  createDecor();
  createBuild(buildStockLvl1);
  boat1.drawMe();
  finishLine1.drawMe();
  isFinished (boat1, finishLine1);
  
 

  // Request animation frame
  requestAnimationFrame( function () {
    gameLoop();
  })
};

// ----------- Initiate the loop -------------
gameLoop();



// EVENT LISTENER -----------> keyboard Click
document.onkeydown = function (event) {
  
    switch (event.keyCode) {
      case 37 : // left arrow
      if (boat1.setAngle === -13){break;}
      else {
        boat1.setAngle -= 1;
        break;
      }
  
      case 38 : // up arrow
      if (boat1.setSpeed === 4){break;}
      else{
        boat1.setSpeed += 1;
        break;}
  
      case 39 : // right arrow
      if (boat1.setAngle === 13){break;}
      else {
        boat1.setAngle += 1;
        break;
      }
  
      case 40 : // down arrow
      if (boat1.setSpeed === -3) {break;}
      else {
        boat1.setSpeed -= 1;
        break;
      }
    }
  }