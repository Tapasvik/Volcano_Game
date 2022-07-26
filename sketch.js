 var  platform_img, sky, block, platform, blocks_group, obstacle_img, obstacle, obstacles_group
 var block1, block2
 var collide_sound
 var lives = 3; 
 var liner
 var diamond_img, diamond, diamond_group
 var score = 0
 var gameState = "INSTRUCTIONS"

//load img//
 function preload(){
 
platform_img = loadImage("platform.png")
  sky = loadImage("Sky.jpeg")
  obstacle_img = loadImage("obstacles.png")
  collide_sound = loadSound("collided.wav")
  diamond_img = loadImage("diamond.png")

 }



 function setup(){
createCanvas(1000,1000);
      //rect(40,50,140,40)



sky_bg = createSprite(500,250,1000,500)
sky_bg.addImage(sky)
sky_bg.scale = 1

platform = createSprite(500,660)
platform.addImage(platform_img)
platform.scale = 0.3

liner = createSprite(500, 690, 1000, 5)
liner.shapeColor = 'red'


obstacles_group = new Group()
blocks_group = new Group()
diamond_group = new Group()
score = 0 




 }

 function blocks(){
       if(frameCount % 40 == 0){
      block = createSprite(40,50,100,40)
      block.shapeColor = 'Aqua'
     // block.velocityY = 2
     block.velocityY = (6 + 3*score/100)
      block.x = random(10,900)
      
    blocks_group.add(block)
   
       }
 }
 function diamonds(){
       if(frameCount % 500 ==0){
             diamond = createSprite(random(10,900),0)
             diamond.addImage(diamond_img)
             diamond.scale = 0.1
             diamond.velocityY = 24
      
      diamond_group.add(diamond)

       }
 }

function obstacles(){
  if(frameCount % 40 == 0){
    obstacle = createSprite(random(10,900),0)
    obstacle.addImage(obstacle_img)
    obstacle.scale = 0.05
    obstacle.velocityY = (6 + 3*score/50)

    obstacles_group.add(obstacle)
  }
 }

function gameOver(){
      swal({
            title: `Game Over!`,
            text: `Better Luck Next Time ${"\n"} Your Score Was: ${score}`,
            confirmButtonText : "Play Again"
      },
            function(isConfirm){
                  if(isConfirm){
             location.reload()
                  }
            }

           
      )
}

function greatJob(){
      swal({
            title: `Awesome Work!`,
            text: `You caught the diamond ${"\n"} Your Score Was: ${score}`,
            confirmButtonText : "Play Again"
      },
            function(isConfirm){
                  if(isConfirm){
             location.reload()
                  }
            }

           
      )
   
}

function instructions(){
      swal({
            title: `Instructions`,
            text: ` To win collect the diamond ${"\n"} You loose if you miss the blocks, be careful!${"\n"} You have three lives only if you collide with the obstacles, use them wisely.`,
            confirmButtonText : "Start"
      },
      function(isConfirm){
            if(isConfirm){
       gameState = "PLAY"
            }
      }
      
      )
}

 function draw(){


background('white')
drawSprites()
fill('white')
rect( 25, 30, 100,30)
 rect( 25, 80, 100,30)

textSize(20)
fill('black')
text("Score: "+ score,30,50)




text('Lives: ' + lives, 30,100)

if(gameState === "INSTRUCTIONS"){
      instructions()
      
}

if(gameState === "PLAY" ){
      
      platform.x = mouseX
      blocks()
      obstacles()
      diamonds()


      //score = score + Math.round(getFrameRate()/60)
     
     platform.overlap(blocks_group, function(collector, collected) {
      score = score+10
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
     
      //collected.position.x= mouseX
       
      
    });

    platform.overlap(diamond_group, function(collector, collected) {
      
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
      gameState = "WIN"
      //collected.position.x= mouseX
      
    });

    platform.overlap(obstacles_group, function(collector, collected) {
      lives = lives-1
      //collected is the sprite in the group collectibles that triggered
      //the event
      collide_sound.play()
      collected.remove();
      //collected.position.x= mouseX

      
    });
  

      if(lives == 0 ){
 gameState = "END"
 }

            if(blocks_group.isTouching(liner)){
      gameState = "END"
      //console.log("ENDSTATE")
      lives = 0 
     }

     if(blocks_group.isTouching(obstacles_group)){
    console.log('working')    
    blocks_group.setVelocityYEach(7) 
     }
}


else if(gameState === "WIN"){
      greatJob()     
}

else if(gameState === "END"){
      
 //console.log("END")
gameOver()


      
 
}




 }

 