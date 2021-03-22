
var platform
var player
var jump =0

function setup() {
  createCanvas(windowWidth,windowHeight);
  platform1 = createSprite(150, height-120, 50, 20);
  platform2 = createSprite(width/4+20, height-200, 50, 20);
  platform3 = createSprite(width/2, height-280, 50, 20);
  platform4 = createSprite(3*width/4, height-360, 50, 20);
  platform5 = createSprite(width -150, height-440, 50, 20);

  player = createSprite(200, 200, 10, 20);
  
  wall1 = createSprite(50, height/2, 20, height-100);
  wall2 = createSprite(width-50, height/2, 20, height-100);
  roof = createSprite(width/2, 50, width-80, 20);
  floor = createSprite(width/2, height-50, width-80, 20);
  
}

function draw() {
  background(30);  
  console.log(jump)
  
  movement()
  drawSprites();
}

function movement(){
  /*if(keyDown('space')&&
  (
    player.collide(floor)|| 
    player.collide(platform1)||
    player.collide(platform2)||
    player.collide(platform3)||
    player.collide(platform4)||
    player.collide(platform5)
  )
  ){
    player.velocityY = -10
  }
*/

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
    player.collide(platform5)
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
}