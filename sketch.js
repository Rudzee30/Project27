var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var dislpayWidth=1900;
var displayHeight=1000;
var canvas ,mo,mon,ba,banana,ro,rock,b1,back,ig,bagroup,rogroup,mon1,go,game;



function preload(){
  
  mon=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  mon1=loadAnimation("Monkey_01.png");
  banana = loadImage("banana.png");
  back=loadImage("jungle1.png");
  rock=loadImage("stone.png");
  game=loadImage("gameOver.png")
}


function setup() {
  canvas= createCanvas(dislpayWidth, displayHeight-150);
  
  b1=createSprite(dislpayWidth/2,(displayHeight-150)/2,5,5);
  b1.addImage(back);
  b1.x = b1.width /2;
  b1.scale=2;
  
  mo = createSprite(dislpayWidth/4, (displayHeight-150)-150,50,50);
  mo.addAnimation("running",mon);
  mo.addAnimation("collided",mon1);
  mo.scale=0.2;
  mo.setCollider("circle",0,0,200);
  //camera.position.x=mo.x;
  //camera.position.y=mo.y;
  
  ig = createSprite(dislpayWidth/2, 885,400,10);
  ig.visible=false;
  score = 0;
  
  go=createSprite(dislpayWidth/2,(displayHeight-150)/2,5,5);
  go.addImage(game);
  go.visible=false;
  
  rogroup=createGroup();
  bagroup=createGroup();
}

function draw() {
  background("White");
  
  if(gamestate===PLAY){
   b1.velocityX = -2;
   if (b1.x < 0){
     b1.x = b1.width/2;
   }
    
   if(keyDown("space")&& mo.y>=displayHeight-100 ){
      mo.velocityY = -12 ;
      
    }
  mo.velocityY = mo.velocityY + 0.8;
  mo.collide(ig);
  
  if(mo.isTouching(bagroup)){
    bagroup.destroyEach();
    score=score+2;
    
  }
  switch(score) {
      case 10: mo.scale=0.12;
              break;
      case 20: mo.scale=0.14;
              break;
      case 30: mo.scale=0.16;
              break;
      case 40: mo.scale=0.18;
              break;
      default: break;
    }
    if(mo.isTouching(rogroup) && mo.scale>0.1){
      mo.scale=0.1;
      rogroup.destroyEach();
      score=0;
    }
    if(mo.isTouching(rogroup) && mo.scale===0.1){
      gamestate=END;
    }
    
  }
  if (gamestate===END){
     b1.velocityX=0;
     mo.velocityY=0;
     bagroup.setVisibleEach(false);
     rogroup.setVisibleEach(false);
     b1.visible=false;
     mo.visible=false;
     go.visible=true;
     
  }
  

  ro1();
  ba1();
  drawSprites();
  fill("White");
  text("Score: "+ score, 300,500);
}
function ro1(){
  if (World.frameCount%200===0) {
    ro = createSprite(dislpayWidth, (displayHeight-150),5,5);
    ro.addImage(rock);
    ro.scale=0.8; 
    ro.velocityX=-6;
    ro.lifetime=475;
    ro.setCollider("rectangle",0,0,100,300);
    rogroup.add(ro);
    
    
  }
}
function ba1(){
  if (World.frameCount% 80===0) {
    ba = createSprite(dislpayWidth,0,5,5);
    ba.y=random(((displayHeight-150)/2)-30,((displayHeight-150)/2)+30);
    ba.scale=0.1;
    ba.addImage(banana);
    ba.velocityX=-8;
    ba.lifetime=475;
    bagroup.add(ba);
  }
}
