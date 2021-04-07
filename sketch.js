var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0
var highDistance = 0
var stone, grass
var stoneImage, grassImage
var girl, boy
var oponent1Image, oponent2Image;
var moneyImage, money;
var highDistance = 0
var coinBell
var mainRacerStop;
var gameOverImage, gameOver
var restartImage, restart;
var click

function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  stoneImage = loadImage("stones.png");
  grassImage = loadImage("bush.png");
  oponent1Image = loadImage("bull.png");
  oponent2Image = loadImage("girl.png");
  moneyImage = loadImage("money.png");
  coinBell = loadSound("coin.mp3");
  mainRacerStop = loadAnimation("images/mainPlayer1.png");
  gameOverImage = loadImage("Over.png")
  restartImage = loadImage("roll.png");
  over = loadSound("over.ogg")
  click = loadSound("click.mp3")
}

function setup() {

  createCanvas(570, 300);
  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist = createSprite(250, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.05;


  oponentGroup = new Group();
  obstacleGroup = new Group();
  moneyGroup = new Group();




  gameOver = createSprite(300, 100, 20, 20)
  gameOver.addImage(gameOverImage)
  gameOver.visible = false;
  restart = createSprite(300, 200, 50, 50);
  restart.addImage(restartImage)
  restart.scale = 0.3;
  restart.visible = false;
}

function draw() {
  background(0);

  if (gameState === PLAY) {
    createStone();
    createGrass();
    ///score=score+Math.round(getFrameRate()/20);
    distance = distance + Math.round(getFrameRate() / 40)
    if (frameCount % 200 == 0) {
      path.velocityX = path.velocityX - 2
      obstacleGroup.velocityX = obstacleGroup.velocityX - 4
    }
    if (distance > highDistance) {
      highDistance = distance;
    }
    if (distance % 100 == 0 && distance > 0) {
      coinBell.play();
    }
    mainCyclist.y = mouseY;
    mainCyclist.x = mouseX;


    edges = createEdgeSprites();
    mainCyclist.collide(edges);


    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }
    oponent1();
    oponent2();



  }
  if (mainCyclist.isTouching(oponentGroup)) {
    over.play();
    obstacleGroup.destroyEach();
    gameState = END;
    mainCyclist.changeAnimation("SahilStop", gameOverImage)
    oponentGroup.destroyEach();

  }


  if (mainCyclist.isTouching(obstacleGroup)) {
    over.play();
    obstacleGroup.destroyEach();
    gameState = END;
    mainCyclist.changeAnimation("SahilStop", gameOverImage)
    oponentGroup.destroyEach();
  }

  if (gameState == END) {

    path.velocityX = 0;
    gameOver.visible = true;
    restart.visible = true;

    mainCyclist.visible = false;
    if (mousePressedOver(restart)) {
      reset();
      click.play();

    }




  }
  drawSprites();
  textSize(20);
  fill("aqua");
  text("Distance: " + distance, 375, 30);
  text("High Distance : " + highDistance, 20, 30)



}

function reset() {
  gameState = PLAY;
  obstacleGroup.destroyEach();
  oponentGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  mainCyclist.visible = true;
  distance = 0;





}














function createStone() {
  if (frameCount % 100 == 0) {
    stone = createSprite(600, Math.round(random(20, 300)), 50, 50);
    stone.addImage(stoneImage);
    stone.velocityX = -9;
    stone.scale = 0.2;
    obstacleGroup.add(stone)
    stone.lifetime = 75;
  }
}

function createGrass() {
  if (frameCount % 150 == 0) {
    grass = createSprite(600, Math.round(random(20, 300)), 50, 50)
    grass.addImage(grassImage);
    grass.velocityX = -9
    grass.scale = 0.2;
    obstacleGroup.add(grass)
    grass.lifetime = 75;

  }
}
/*
function createMoney(){
  if(frameCount%150==0){
  money=createSprite(600,Math.round(random(20,300)),20,20)
  money.addImage(moneyImage);
  money.scale=0.2;
    money.velocityX=-9
  moneyGroup.add(money)
  }
}*/

function oponent1() {
  if (frameCount % 225 == 0) {

    girl = createSprite(600, Math.round(random(20, 300)), 20, 20)
    girl.addImage(oponent2Image)
    girl.scale = 0.4;
    //girl.debug=true;
    girl.setCollider('rectangle', 0, 25, 150, 175);
    oponentGroup.add(girl);
    girl.velocityX = -5;
    girl.lifetime = 150;

  }
}

function oponent2() {
  if (frameCount % 125 == 0) {




    boy = createSprite(600, Math.round(random(20, 300)), 20, 20);
    boy.addImage(oponent1Image)
    boy.scale = 0.3;

    ///boy.debug=true;
    boy.setCollider('rectangle', 0, 25, 225, 250);
    oponentGroup.add(boy);

    boy.velocityX = -5;
    boy.lifetime = 150;

  }
}