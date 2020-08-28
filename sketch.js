var PLAY = 1;
var END = 0;
var gameState = PLAY
var monkey
var ground
var obstaclesGroup
var bananaGroup
var gameState 
var survivaltime
var banana,stone
var sceneimage,bananaimage,stoneimage,monkey_running,scene
function preload(){
monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 bananaimage = loadImage("banana.png");
 stoneimage = loadImage("stone.png");
 sceneimage= loadImage("jungle.jpg");  
}
function setup() {
  createCanvas(400, 400);
  scene=createSprite(200,200,400,400);
  scene.addImage(sceneimage);
  
   scene.x = scene.width/2;
  scene.velocityX = -4;
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2
  ground = createSprite(200,390,400,10);
  
   ground.visible = false;
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  survivaltime = 0;  
}

function draw() {
  background(220);
  monkey.collide(ground);
  
  monkey.velocityY = monkey.velocityY +0.5;
  
  spawnbanana();
  spawnobstacles();
  
  if(gameState === PLAY){
  if(keyDown("space") && monkey.y>320){
   monkey.velocityY = -10;
 }
  if(scene.x<0){
   scene.x = scene.width/2;
 }
   
 if(monkey.isTouching(obstaclesGroup) ){
   gameState = END;
 }
 
 if(monkey.isTouching(bananaGroup)){
   survivaltime = survivaltime +1;
   bananaGroup.destroyEach();
 }
 } else if(gameState ===END){
  obstaclesGroup.setVelocityXEach(0) ;
  bananaGroup.setVelocityXEach(0) ;
  obstaclesGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
   scene.velocityX = 0;
   monkey.velocityY = 0;
   monkey.pause();
   
   

 }
 
drawSprites();  

  fill("black");
   textSize(20);
   text("Survival time :" + survivaltime,150,50);
}
function spawnbanana(){
if(World.frameCount%80 === 0){
  banana = createSprite(430,200,10,10);
  banana.addImage(bananaimage);
  banana.scale = 0.05;
  banana.velocityX = -6;
  banana.y = random(170,250);
  bananaGroup.add(banana);
  banana.lifetime = 75;
}
}

function spawnobstacles(){
 if(World.frameCount%60 === 0) {
   stone = createSprite(435,365,10,10);
   stone.addImage(stoneimage);
   stone.scale = 0.2;
   stone.velocityX = -6;
   obstaclesGroup.add(stone);
   stone.lifetime = 75;
   stone.setCollider("circle",0,0,200);
}
}  
  
  
  
  
  
  
  
  
