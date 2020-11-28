
var PLAY = 1;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var score;

function preload(){
  
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400, 400);
  var survivalTime=0;
  
   monkey=createSprite(80,320,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  ground = createSprite(200,370,500,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  //ground.visible=false;

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
  if(gameState === PLAY)
    
    if(ground.x<0) {
    ground.x=200;
  }
  
 if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
    //spawn clouds and spawn obstacles
    spawnFood();
    spawnObstacle();
  
   monkey.collide(ground);
  
  if(obstacleGroup.isTouching(monkey)){
      
   ground.velocityX = 0;
   monkey.velocityY = 0
  
   obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);   
      
   //set lifetime of the game objects so that they are never destroyed
   obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
 }

  stroke("black");
  textSize(15); 
  fill("black"); 
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50); 
  
  drawSprites();
  
  stroke("white");
  textSize(12); 
  fill("white");
  text("Score: "+ score, 300,30);

}

function spawnObstacle(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(600,357,10,40);
   obstacle.velocityX = (-3);
   obstacle.addImage(obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = (-6)
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    FoodGroup.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

