var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();

  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";
  var hypnoticBallPosition = database.ref('ball/position'); 
  hypnoticBallPosition.on("value", readPosition, showError);
//We need to perform two operations on the data in our database: 
//1) read: read the changes in the data.
//2) write: overwrite the existing data.
//Reading can be performed by the on() or once() methods.
//The on() method is taking the event type as “value” and retrieves the data's snapshot.
//on() will be called each time someone updates the database. The updated data will be sent the database


}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){ 
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y 
     })
     }
      function readPosition(data){ position = data.val();
         console.log(position.x); 
         hypnoticBall.x = position.x;
          hypnoticBall.y = position.y; }
           function showError(){
          console.log("Error in writing to the database"); 
            }