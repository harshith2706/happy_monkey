var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaI,stone,stoneI;
var END =0;
var PLAY =1;
var gameState = PLAY;
var gameOver,gameOverI;
var Score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaI = loadImage("banana.png");
  stoneI = loadImage("stone.png");
gameOverI = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  foodGroup=new Group();
  obsticlesGroup = new Group();
}

function draw() { 
  background(0);
  drawSprites();
  stroke("white");
   textSize(20); 
   fill("white");
 text("Score"+Score,550,50);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  spawnFood();
  spawnobsticles();
  
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    Score = Score+2;

  }

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
  if (obsticlesGroup.isTouching(player)){
    gameState = END;
  }
  if (gameState === END){
    player.visible = false;
    foodGroup.destroyEach();
    obsticlesGroup.destroyEach();
    stroke("white"); 
    textSize(20); 
    fill("white");
    text("Game Over",300,200);
    backgr.velocityX = 0;
  }
  }


 
}

function spawnFood(){
  if (frameCount%80 === 0){

    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaI);
    banana.scale = 0.05;
    banana . velocityX  = -4;
    banana.lifetime = 300;
    foodGroup.add(banana);
  }
}
function spawnobsticles(){
  if (frameCount%300 === 0){

      stone = createSprite(800,350,10,40)
    stone.addImage(stoneI);
    stone.scale = 0.2;
    stone . velocityX  = -4;
    stone.lifetime = 300;
    obsticlesGroup.add(stone);
  }
}