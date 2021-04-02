
var platform
var player
var jump =0
var spike, spikeWall1, spikeWall2
var bat1, bat2
var batFly
var brickAB = 0
var gameState = 1
var brickImg
var brickPFImg, brickPFImg2
var doorImg
var wallImg1, wallImg2, roofImg, floorImg
var lavaImg1, lavaImg2

function preload(){
  batFly = loadAnimation('images/bat1.png','images/bat2.png','images/bat3.png','images/bat4.png');

  spikeImg1 = loadImage('images/spike.png');
  spikeImg2 = loadImage('images/spikeSide.png');
  spikeImg3 = loadImage('images/spikeSide.png');

  brickImg = loadImage('images/brick-item.png')
  playerImg = loadImage('images/player.png')

  brickPFImg = loadImage('images/brick-platform.png')
  brickPFImg2 = loadImage('images/brick-platform.png')

  wallImg1 = loadImage('images/brick-platform1.png')
  wallImg2 = loadImage('images/brick-platform1.png')
  roofImg = loadImage('images/brick-platform1.png')
  floorImg = loadImage('images/brick-platform1.png')

  doorImg = loadImage('images/door.jpg')

  lavaImg1 = loadImage('images/lava.gif')
  lavaImg2 = loadImage('images/lava.gif')

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  platform1 = createSprite(150, height-120, 50, 22);
  platform2 = createSprite(width/4+20, height-200, 50, 22);
  platform3 = createSprite(width/2, height-280, 70, 22);
  platform4 = createSprite(3*width/4, height-360, 50, 22);
  platform5 = createSprite(width -150, height-440, 50, 22);

  platform1.addImage(brickPFImg);
  platform2.addImage(brickPFImg);
  platform3.addImage(brickPFImg2);
  platform4.addImage(brickPFImg);
  platform5.addImage(brickPFImg);

  brickPFImg.resize(50,22)
  brickPFImg2.resize(70,22)


  player = createSprite(150, height-100, 10, 20);
  player.addImage(playerImg);
  //player.resize()
  player.debug=true

  wall1 = createSprite(50, height/2, 20, height-100);
  wall2 = createSprite(width-50, height/2, 20, height-100);
  roof = createSprite(width/2, 50, width-80, 20);
  floor = createSprite(width/2, height-50, width-80, 20);
  
  wall1.addImage(wallImg1)
  wall2.addImage(wallImg2)
  roof.addImage(roofImg)
  floor.addImage(floorImg)

  wallImg1.resize(20, height-100)
  wallImg2.resize(20, height-100)
  roofImg.resize(width-80, 20)
  floorImg.resize(width-80, 20)

  bat1 = createSprite(3*width/8, height-280, 20, 20);
  bat2 = createSprite(5*width/8,height-280,20,20);

  bat1.addAnimation ( 'bat1an',batFly )
  bat2.addAnimation ( 'bat2an',batFly )

  bat1.scale = 0.3
  bat2.scale = 0.3

  bat1.velocityY = 2
  bat2.velocityY = -2

  invisWall1 = createSprite(3*width/8, height-280+100, 20, 20);
  invisWall2 = createSprite(3*width/8, height-280-100, 20, 20);
  invisWall3 = createSprite(5*width/8, height-280+100, 20, 20);
  invisWall4 = createSprite(5*width/8, height-280-100, 20, 20);

  invisWall1.visible = false
  invisWall2.visible = false
  invisWall3.visible = false
  invisWall4.visible = false

  spike = createSprite(width/2, height-300,10,20);
  spikeWall1 = createSprite(width/4-15, height-200,20,10);
  spikeWall2 = createSprite(3*width/4-35, height-360,20,10);

  
//spikeWall1.debug=true
//spikeWall2.debug=true

  spike.addImage(spikeImg1);
  spikeWall1.addImage(spikeImg2);
  spikeWall2.addImage(spikeImg3);
  
  spike.scale = 0.3
  spikeWall1.scale = 0.3
  spikeWall2.scale = 0.3

  door = createSprite(width-55, height/2,20,30);
  door.addImage(doorImg)
  doorImg.resize(20,30)

  lavaTop = createSprite(width-80, height/2-30,45,10)
  lavaSide = createSprite(width-98, height/2-6,10,40)

  lavaTop.addImage(lavaImg1);
  lavaSide.addImage(lavaImg2);
  lavaImg1.resize(45,10)
  lavaImg2.resize(10,40)

  brickItem = createSprite(width -150, height-470,10,10);
 // brickItem = createSprite(width -150, height-100,10,10); 
  brickItem.addImage(brickImg);
  brickImg.resize(10,10)
  
 
  
}

function draw() {
  background(70);  
  


if(gameState === 2){
  fill(0,255,0)
  textSize(40)
  text("you win!!!",width/2,height/2)
  player.setVelocity(0,0)
}
if(gameState===1){
  fill(0,0,255)
  text("use mouse to position and click to place platform",width -340, height-490)
  
  interaction()
  batMovement()
  playerMovement()
  drawSprites();
}
}

function playerMovement(){
  if(keyDown('space')&& jump >=1){
    jump = jump -1 
    player.velocityY = -10
  }

  if(jump == 0 &&
  (
    player.collide(floor)|| 
    player.collide(platform1)||
    player.collide(platform2)||
    player.collide(platform3)||
    player.collide(platform4)||
    player.collide(platform5) || 
    player.collide(brickItem)

  )
  ){
    jump = jump +1
  }
  
  if(keyDown('a')||keyDown('left')){
    player.x = player.x -10
  }
  
  if(keyDown('d')||keyDown('right')){
    player.x = player.x + 10
  }
  

  player.velocityY = player.velocityY + 0.5
  
  player.collide(floor)
  player.collide(wall1)
  player.collide(wall2)
  player.collide(roof)
  player.collide(platform1)
  player.collide(platform2)
  player.collide(platform3)
  player.collide(platform4)
  player.collide(platform5)
  player.collide(brickItem)
}

function batMovement(){
  
  bat1.bounceOff(invisWall1)
  bat1.bounceOff(invisWall2)
  bat2.bounceOff(invisWall3)
  bat2.bounceOff(invisWall4)

}

function interaction(){
  if(player.isTouching(bat1) || player.isTouching(bat2) 
  || player.isTouching(spike) || player.isTouching(spikeWall1) || player.isTouching(spikeWall2)
  || player.isTouching(lavaSide) || player.isTouching(lavaTop)){
    player.x = 150
    player.y = height-100  
 
  }

  if(player.isTouching(brickItem) && brickAB !==2){
    brickAB = 1;
    brickImg.resize(20,20)
  }

  if(brickAB === 1){
    brickItem.x = mouseX;
    brickItem.y = mouseY;
    if(mouseIsPressed){
      brickAB = 2;
    }
  }
  
if(player.isTouching(door)){
  gameState = 2
}

  
}
