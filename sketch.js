const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;

var engine;
var world;
var star;
var starGroup;
var fairy;

var groundImg;
var fairyImg;
var starImage;
var invisiblehand;
var leftcolem;
var rightcolem;
var sound;

var Play=1;
var End=0;
var gamestate=Play;

function preload(){
   //preload the images here
sound=loadSound("JoyMusic.mp3");

 groundImg=loadImage("starnight.png");

 fairyImg=loadAnimation("fairy1.png","fairy2.png");

 starImage=loadImage("star.png");

 fairyChange=loadImage("fairy.png");


}

function setup() {
 var canvas = createCanvas(500, 500);
  
 engine=Engine.create();

 world=engine.world;



 invisiblehand=createSprite(250,330,50,50);

 leftcolem=createSprite(0,250,20,500);

 rightcolem=createSprite(495,250,20,500);


 ground=createSprite(250,250,70,70);
 ground.addImage("ground",groundImg);
 ground.scale=0.5



 fairy=createSprite(150,330,70,70);
 fairy.addAnimation("fairy",fairyImg)
 fairy.scale=0.2;
 fairy.setCollider("rectangle",0,0,1000,800)
 fairy.debug=false



 fairy.addImage("fairy2",fairyChange);


 starspawn();

 starGroup = new Group();

 sound.play();
}

function draw() {
 
  background(200);

 Engine.update(engine);

 if(gamestate===Play){
rectMode(CENTER);



starspawn();

invisiblehand.x=fairy.x+100;

rect(star.position.x,star.position.y,20,20);

rect(ground.position.x,ground.position.y,70,70);

rect(fairy.position.x,fairy.position.y,70,50);


if(keyDown("right")){
  fairy.x=fairy.x+6;
 // invisiblehand.x=invisiblehand.x+6;
}

if(keyDown("left")){
  fairy.x=fairy.x-6;
  //invisiblehand.x=invisiblehand.x-6;
}

fairy.bounceOff(leftcolem);
fairy.bounceOff(rightcolem);

if(invisiblehand.isTouching(star)){
  gamestate=End;

}



}

if(gamestate===End){
  fairy.changeImage("fairy2");
  star.velocityY=0;

}

starGroup.add(star);

drawSprites();

}



function starspawn(){

if(frameCount%100===0){
  star=createSprite(Math.round(random(50,450)),0,20,20)
  star.scale=0.3;
  star.addImage("star",starImage);
  star.velocityY=3;
  star.lifeTime=100;
 }
}
