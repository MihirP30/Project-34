//Creating variables
var dog, dogImg, dogImg2, database, foodStock, foodS;
var gameState = "feed";
var food, foodImg;

function preload() {
  //Loading images
  dogImg = loadImage("dogImg.png");
  dogImg2 = loadImage("dogImg1.png");
  foodImg = loadImage("bowl.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  food = createSprite(190,300,10,10);
  food.addImage(foodImg);
  food.scale = 0.06;
  food.visible = false;

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);
  drawSprites();
  
  textSize(20)
  fill("red");
  text("Press the Up Arrow to feed your dog!", 90, 50);
  text("Food left : "+ foodS, 190, 100);

  feedDog();
}

function writeStock(x) {
 if(x<=0) {
  x=0;
 }
 else {
  x = x-1;
 }
  database.ref('/').set({Food:x})
}

function readStock(data) {
  foodS = data.val();
}

function feedDog() {
  if(keyWentDown(UP_ARROW) && gameState === "feed") {  
    writeStock(foodS);
    dog.addImage(dogImg2);
    food.visible = true;
  }

  if(keyWentUp(UP_ARROW)&& gameState=== "feed") {  
    //writeStock(foodS);
    dog.addImage(dogImg);
    food.visible = false;
  }

  if(foodS===0) {
  foodS = 10;
  }
}