// CANVAS AND CTX DECLARATION
var canvas = document.querySelector(".park-the-boat");
var ctx = canvas.getContext("2d");

var boatImg = new Image();
boatImg.src = "./images/boat.png";

// var portImg = new Image();
// portImg.src ="./images/port.jpg";
var sandImg = new Image();
sandImg.src ="./images/sand.png";

var seaImg = new Image();
seaImg.src = "./images/topseaview.jpg";
var rockImg = new Image();
rockImg.src = "./images/rock2.png";
var digueImg = new Image();
digueImg.src = "./images/pebble3.png";


// CLASS DECLARATION
// -----------------
//-- Building (x, y, width, height)
class Build {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this. height;
    this.coord = [  {x: this.x,               y: this.y},
                    {x: this.x + this.width,  y: this.y},
                    {x: this.x + this.width,  y: this.y + this.height},
                    {x: this.x,               y: this.y + this.height}
                ];
  }

  drawMe () {
    // ctx.fillStyle = "#7e7e7e";
    ctx.drawImage (rockImg, this.x, this.y, this.width, this.height);
    // ctx.fillRect (this.x, this.y, this.width, this.height);
  }
}

class Digue {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this. height;
    this.coord = [  {x: this.x,               y: this.y},
                    {x: this.x + this.width,  y: this.y},
                    {x: this.x + this.width,  y: this.y + this.height},
                    {x: this.x,               y: this.y + this.height}
                ];
  }

  drawMe () {
    // ctx.fillStyle = "#7e7e7e";
    ctx.drawImage (digueImg, this.x, this.y, this.width, this.height);
    // ctx.fillRect (this.x, this.y, this.width, this.height);
  }
}


//-- Finishline (x, y)
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
    ctx.fillStyle = "white";
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
    this.isCrashed = false;
  }

  drawMe () {
    
    // ----------------------------------------------------------------------
    // Acceleration/ décélération et friction
    if (this.setSpeed === 0) {
       this.speed *= 0.998
    }

    else if (this.setSpeed > 0) {
      if (this.speed < this.setSpeed) {
        this.speed += this.setSpeed * 0.003;
      }
      else if (this.speed > this.setSpeed) {
        this.speed *= 0.998;
      }
    }

    else if (this.setSpeed < 0) {
      if (this.speed > this.setSpeed) {
        this.speed += this.setSpeed * 0.003;
      }
      else if (this.speed < this.setSpeed) {
        this.speed *= 0.998;
      }
    }
    if (this.isCrashed=== true) {
      this.speed=0;
    }
    
// Set angle
  this.angle += this.setAngle * 0.0025 * this.speed;
      
// ROTATION DU BATEAU (fonction de l'angle donnée à l'objet bateau)
    var rad = this.angle * Math.PI / 180;
    this.x += (this.speed * Math.cos (rad) /10 );
    this.y += (this.speed * Math.sin (rad) /10 );
//  Set the origin to the center of the boat
    ctx.translate(this.x + this.width /2, this.y + this.height / 2);

    
    
// Rotate the canvas around the boat
    ctx.rotate(rad);
   
// draw the image  
    // ctx.fillStyle = "#000000";  
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
  
// GETTING BOAT ROTATED VERTICE COORD (for collision testing purpose)
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
  new Digue (480, 250, 700, 50),
];
 var boat1 = new Boat (0, 340, 0, 0);

 var finishLine1 = new FinishLine (950,200);

// -------------------------------------------------------------------------------------------------
// /!\/!\/!\/!\/!\/!\/!\   COLLISION TESTING FUNCTIONS /!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\
// --------------------------------------------------------------------------------------------------

function isUndefined(a) {
  return a === undefined;
}
function isCrashed (a, b) {
  var polygons = [a, b];
  var minA, maxA, projected, i, i1, j, minB, maxB;

  for (i = 0; i < polygons.length; i++) {

      // for each polygon, look at each edge of the polygon, and determine if it separates
      // the two shapes
      var polygon = polygons[i];
      for (i1 = 0; i1 < polygon.length; i1++) {

          // grab 2 vertices to create an edge
          var i2 = (i1 + 1) % polygon.length;
          var p1 = polygon[i1];
          var p2 = polygon[i2];

          // find the line perpendicular to this edge
          var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

          minA = maxA = undefined;
          // for each vertex in the first shape, project it onto the line perpendicular to the edge
          // and keep track of the min and max of these values
          for (j = 0; j < a.length; j++) {
              projected = normal.x * a[j].x + normal.y * a[j].y;
              if (isUndefined(minA) || projected < minA) {
                  minA = projected;
              }
              if (isUndefined(maxA) || projected > maxA) {
                  maxA = projected;
              }
          }

          // for each vertex in the second shape, project it onto the line perpendicular to the edge
          // and keep track of the min and max of these values
          minB = maxB = undefined;
          for (j = 0; j < b.length; j++) {
              projected = normal.x * b[j].x + normal.y * b[j].y;
              if (isUndefined(minB) || projected < minB) {
                  minB = projected;
              }
              if (isUndefined(maxB) || projected > maxB) {
                  maxB = projected;
              }
          }

          // if there is no overlap between the projects, the edge we are looking at separates the two
          // polygons, and we know there is no overlap
          if (maxA < minB || maxB < minA) {
              // console.log("polygons don't intersect!");
              return false;
          }
      }
  }
  return true;
};
// -----------------------------------
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




// DRAWING FUNCTIONS
// ----------------------------------------------


function createBuild (buildStock) {
  buildStock.forEach (function (oneBuild) {
  
  oneBuild.drawMe();

    
  });
}
   

  //-- Decor
function createDecor () {

  //-- Arriere plan -- EAU
  ctx.drawImage (seaImg, 0, 0, 1100, 720);
  // ctx.drawImage (sandImg, 0, 0, 1100,30);
  ctx.drawImage (rockImg, 480, 250, 700, 50);
  
}

// ---------------    GAMELOOP FUNCTION  ----------------------
function gameLoop () {
  ctx.clearRect (0, 0, 1100, 720);

  //  !!!!!! ALL ELEMENT DRAWING FUNCTION BELOW !!!!!!!
  
  createDecor();
  boat1.drawMe();
  createBuild(buildStockLvl1);
  for (var i=0; i< buildStockLvl1.length; i++) {
    if (isCrashed (boat1.coord, buildStockLvl1[i].coord)) {
      boat1.isCrashed = true;
      window.location.href = "index.html";
    };
  };

  finishLine1.drawMe();
  
  // ---------------------------------------  HUD WRITING  ----------------------------
  ctx.fillStyle ="white";
  ctx.font = "25px arial";
  ctx.fillText ("Thrust = " + boat1.setSpeed,boat1.x + 100, boat1.y + 50);
  if (boat1.setAngle > 0)
    {ctx.fillText ("Starboard = " + boat1.setAngle,1100 , 70);
  }

  else if (boat1.setAngle < 0)
    {ctx.fillText ("Larboard = " + (-1) * boat1.setAngle,1100 , 70);
  }

  else {ctx.fillText ("No Angle", 1100 , 70);
  }
  
  isFinished (boat1, finishLine1);
  // Request animation frame
  requestAnimationFrame( function () {
    gameLoop();
  })
};
  

// ----------- Initiate the loop ------------- TCHOUTCHOUuuuuuuuuu !!!
gameLoop();
  
// EVENT LISTENER -----------> keyboard Click
document.onkeydown = function (event) {
  
    switch (event.keyCode) {
      case 75 : // left arrow
      if (boat1.setAngle === -13){break;}
      else {
        boat1.setAngle -= 1;
        break;
      }
  
      case 79 : // up arrow
      if (boat1.setSpeed === 4){break;}
      else{
        boat1.setSpeed += 1;
        break;}
  
      case 77 : // right arrow
      if (boat1.setAngle === 13){break;}
      else {
        boat1.setAngle += 1;
        break;
      }
  
      case 76 : // down arrow
      if (boat1.setSpeed === -3) {break;}
      else {
        boat1.setSpeed -= 1;
        break;
      }
    }
  }

 
 




