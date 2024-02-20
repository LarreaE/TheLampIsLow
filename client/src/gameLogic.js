import globals from './globals.js';
import { Game, State, SpriteID, GRAVITY, Collision , ParticleState, ParticleID, Key, CurrentLEVEL, Sound, MUSIC } from './constants.js';
import { detectCollisions, findRepeat, findVariable} from './collisions.js';
import { initEnemytree, initExplosion, initKey, initPotion, initWeed, initDust, initSplash, initBar, initSpark, initArrow, initEnemyParticle, scoresAJAXRequest } from './initialize.js';
import { sortScoresArray } from './gameRender.js';

export default function update()
{


    //musica
    playMusic();
    //sonidos
    playSound();
    manageBoomBox();
    //change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            console.log("Loading assets...");
            updateLoadGame();
            break;

        case Game.PLAYING:
            playGame();

            break;
        case Game.FREEZE:
            freezeGame();
    
            break;

        case Game.NEW_GAME:
            updateNewGame(globals.sprites[SpriteID.ENEMY], globals.sprites[SpriteID.LAMP], globals.sprites[SpriteID.PLAYER]);
            break;

        case Game.GAME_OVER:
            console.log("game over...");
            updateGameOver();
            break;

        case Game.YOU_WIN_1:
            console.log("you Win...");
            navegateYWMenu();
            returnToNewGame();
            break;
        
        case Game.START:
            startGame();
            break;

        case Game.STORY:
            console.log("showing story...");
            updateStory();
            returnToNewGame();

            break;

        case Game.CONTROLS:
            console.log("showing controls...");
            returnToNewGame();

            break;

        case Game.HIGHSCORES:
            console.log("showing highscores...");
            navegateHSmenu();
            returnToNewGame();

            break;
        case Game.NEW_HIGHSCORES:
            console.log("showing highscores...");
            navegateHSmenu();
            returnToNewGame();

            break;
        case Game.UPDATE_HIGHSCORES:
            console.log("showing highscores...");
            updateHighscoresMenu();
            returnToNewGame();

            break;
    
        case Game.LOAD_HIGHSCORES:
            console.log("loading highscores...");
            loadHighscores();

            break;

        case Game.SENKYOU:
            console.log("showing Thankyou...");
            updateThankYou();
            

            break;
        case Game.DEMO:
            updateDemo();
            

            break;
        case Game.WRITE_NAME:
            updateWriteName();
            break;  
        default:
            console.error("error:error")


    }


}
function startGame()
{
    if (globals.action.menuEjec && globals.previousMenuEjec === false) 
    {
        globals.gameState = Game.NEW_GAME;  
        
        //reprocir musica
        globals.currentMusic = MUSIC.MUSIC_MENU_1;


    }



        globals.previousMenuEjec    = globals.action.menuEjec;
}
function calculateCollisionWithFourBorders(sprite)
{

    if (sprite.xPos + sprite.imageSet.xSize > globals.canvas.width) {
        sprite.collisionBorder = Collision.BORDER_RIGHT;
        sprite.state = State.ENEMY_MOVE_LEFT;
    }
    else if (sprite.xPos < 0 ) {
        sprite.collisionBorder = Collision.BORDER_LEFT;
        sprite.state = State.ENEMY_MOVE_RIGHT;

    }
    else if (sprite.yPos < 0 ) {
        sprite.collisionBorder = Collision.BORDER_UP;
    }
    else if (sprite.yPos + sprite.imageSet.ySize > globals.canvas.height) {
        sprite.collisionBorder = Collision.BORDER_DOWN;
    }
    else
    {
        sprite.collisionBorder = Collision.NO_COLLISION;
    }
    let enemyPos = findIndex(globals.sprites,sprite);
    if (sprite.xPos > globals.canvas.width + 100) {
        
        globals.sprites.splice(enemyPos,1);
    }
    else if (sprite.xPos <  -100) {
        
        globals.sprites.splice(enemyPos,1);
    }
    else if (sprite.yPos > globals.canvas.height + 100) {
        
        globals.sprites.splice(enemyPos,1);
    }
    else if (sprite.xPos < -100) {
        
        globals.sprites.splice(enemyPos,1);
    }
}
function updateAnimationFrame(sprite)
{
    sprite.frames.frameChangeCounter++;
    //cambiamos de frame y reseteamos el contador de cambio de frame
    if (sprite.frames.frameChangeCounter === sprite.frames.speed) {
        sprite.frames.frameCounter++;
        sprite.frames.frameChangeCounter = 0;
    }

    //si hemos llegado al maximo de frames reiniciar el fontador
    if (sprite.frames.frameCounter === sprite.frames.framesPerState) {
        sprite.frames.frameCounter = 0;
    }
}
function readKeyboardAndAssignStatePlayer(sprite)
{
    
    let isOnGround = sprite.physics.isOnGround;
    
    if (isOnGround === false) {
        if (sprite.state === State.JUMP_LEFT) {
            
            if (isOnGround) 
            {
                sprite.state = State.STILL_LEFT;
            
            }
            
        }
        if (sprite.state === State.JUMP_RIGHT) {
            if (isOnGround) 
            {

                sprite.state = State.STILL_RIGHT;

            }
        }
        if (globals.action.moveLeft) {
            sprite.state = State.JUMP_LEFT;
            if (sprite.physics.vy === 0) {
                sprite.state = State.STILL_LEFT;
            }
        }
        if (globals.action.moveRight) {
            sprite.state = State.JUMP_RIGHT;
            if (sprite.physics.vy === 0) {
                sprite.state = State.STILL_RIGHT;
            }
        }

    }
    else {

        if (sprite.state === State.LEFT) {
            sprite.state = State.STILL_LEFT;
        }
        if (sprite.state === State.RIGHT) {
            sprite.state = State.STILL_RIGHT;
        }
        if (globals.action.moveLeft) {
            sprite.state = State.LEFT;
        }
        if (globals.action.moveRight) {
            sprite.state = State.RIGHT;
        }
        if (globals.action.jump) {
            if (sprite.physics.vx > 0) {
                sprite.state = State.JUMP_RIGHT;
            }
            else {
                sprite.state = State.JUMP_LEFT;

            };
        }
        if (globals.previousState === State.JUMP_LEFT) {
            sprite.state = State.STILL_LEFT;
        }
        if (globals.previousState === State.JUMP_RIGHT) {
            sprite.state = State.STILL_RIGHT;
            
        }
        
    }
    globals.previousState = sprite.state;
}
function readKeyboardLamp(sprite)
{
    
    const PLAYER = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    
    if (globals.action.firebreath && PLAYER.physics.vx < 0) 
    {
        
        sprite.state = State.LAMP_FIREBREATH_LEFT;
    } 
     if (globals.action.firebreath && PLAYER.physics.vx >= 0) 
    {
        sprite.state = State.LAMP_FIREBREATH_RIGHT;

    }
     if ( globals.action.throw && PLAYER.physics.vx < 0 && sprite.thrown === false) 
    {
        sprite.state = State.LAMP_THROW_LEFT;

    }
     if (globals.action.throw && PLAYER.physics.vx >= 0 && sprite.thrown === false) 
    {
        sprite.state = State.LAMP_THROW_RIGHT;

    }

    
}
function loadCurrentLevel(option)
{

    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    const lamp = globals.sprites.find((lamp) => lamp.id === SpriteID.LAMP);
    const fire = globals.sprites.find((fire) => fire.id === SpriteID.FIRE);
    globals.particles = [];
    

    if (option === 1) {
      
        globals.currentLevel += 1;
        fire.changingLevel = true;
        deleteEnemies();
        deleteItems();

        player.xPos = 1;
        player.hasKey = false;
    }
    else if (option === 2) {
        globals.currentLevel -= 1;
        deleteEnemies();
        deleteItems();
        player.xPos = 237;
    }
    else if (option === 3) {
        
        globals.currentLevel += 9;
        deleteEnemies();
        deleteItems();
        player.yPos = 0;

        if (globals.boomboxPlaying === false) {
                 //reprocir musica
         globals.musics[globals.currentMusic].pause();
         globals.musics[globals.currentMusic].currentTime = 0;
        }
    

    }

       
    switch (globals.currentLevel){
        case 1:

           
            break;
        case 2:
        

            initPotion();
            initKey();   
            break;
        case 3:
        
        
            initPotion();
            initKey();

            break;
        case 4:
        

            initPotion();

            break;

        case 5:
            
    
                initPotion();
                initKey();
                break;
        case 6:
            
    
                initPotion();
                initKey();

            break;
        case 8:
            
    
                initPotion();

            break;
        case 9:
            if (globals.gameState === Game.PLAYING) {
            globals.gameState = Game.YOU_WIN_1;
                
            }
            else {
                globals.gameState = Game.GAME_OVER;
                globals.selectedOption = 6;
            }
            
            break;
        
        case 10:

            globals.enemyCounter = 10;
            initPotion();
            
            break;
    
        case 11:

          
        
        break;
        case 12:

        initPotion();
        initKey();
        
        break;
        case 13:

            initPotion();
            
            break;
        case 14:
               

            initKey();
            initEnemytree();
                
                break;
         case 15:
            
            initPotion();
            initKey();
                
                break;
        case 16:

            initKey();
                
                break;
        case 18:

        initKey();
        
            break;
        case 19:
            
        initKey();
        initPotion();
    
            break;
        case 26:

        initPotion();
        
            break;
        case 23:

            initPotion();

            break;
        case 22:

        
            break;
        default:
            break;
    
    }
    
    fire.changingLevel = true;
    lamp.state = State.LAMP_ELIPTIC;
    

}
function updatePlayer(sprite)
{
         
    //lectura de teclado. asignamos direccion de tecla
    const isKeyPressed = globals.action.moveLeft || globals.action.moveRight || globals.action.jump;
    readKeyboardAndAssignStatePlayer(sprite);
    //aqui actualizaremos el estado de las variables de player
    sprite.physics.ay = GRAVITY;
    //maquina de estados de player
    if (sprite.isCollidingWithObstacleOnBottom) 
    {
        sprite.physics.isOnGround = true;    
    }
    // else
    // {
    //     sprite.physics.isOnGround = true;  
    // }
    if (sprite.hasPotionRed && globals.action.drink) 
    {
        globals.currentSound = Sound.SFX_POTION;
        globals.life += 0.3;
        if (globals.life > 1) {
            globals.life = 1;
        }    
        sprite.hasPotionRed = false;
    }
    const canChangeUp = buscarNumero(globals.unableToChangeUpLvl,globals.currentLevel)
    const canChangeDown = buscarNumero(globals.unableToChangeDownLvl,globals.currentLevel)
    if (sprite.xPos >= 238) {
        sprite.physics.vx = 0;
        if (canChangeUp) {
            loadCurrentLevel(1); 
        }
    }
    else if (sprite.xPos <= 0) {
        sprite.physics.vx = 0;
        if (canChangeDown) {
            loadCurrentLevel(2);
        }

    }
    else if (sprite.yPos >= globals.canvas.height) {
        sprite.physics.vy = 0;
        
            loadCurrentLevel(3);
        
    }
   
    switch (sprite.state) 
    {
        case State.RIGHT:
            
            //si se mueve a la derecha velX es positiva
            
            sprite.physics.vx = sprite.physics.vLimit;
            sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
           
          
            break;
    
        case State.LEFT:
         
            //si s emueve a la izquierda velX negativa
            sprite.physics.vx = -sprite.physics.vLimit;
            sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
            
            break;

        case State.STILL_LEFT:
            sprite.State = State.STILL_LEFT;
            sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
            break;
        
        case State.STILL_RIGHT:
            
            sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
           
            break;

        case State.JUMP_LEFT:
            sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
            
            if (globals.action.moveLeft) {
                
                sprite.physics.vx = -sprite.physics.vLimit;
                sprite.state = State.JUMP_LEFT;
               
            }
            else if (globals.action.moveRight) {
                
                sprite.physics.vx = sprite.physics.vLimit;
                sprite.state = State.JUMP_RIGHT;

            }
            
        break;

        case State.JUMP_RIGHT:
            sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
            
            if (globals.action.moveRight) {
                
                sprite.physics.vx = sprite.physics.vLimit;
                sprite.state = State.JUMP_RIGHT;
                

            }
            else if (globals.action.moveLeft) {
               
                sprite.physics.vx = -sprite.physics.vLimit;
                sprite.state = State.JUMP_LEFT;
                
            }
        break;

        default:
            
            break;

    }


    //sprite.physics.vx += sprite.physics.ax * globals.deltaTime;

     //aplicamos friccion en los cambios de direccion y cuando no haya teclas pulsadas
     if ((sprite.state === State.RIGHT   && sprite.physics.vx > 0) ||
         (sprite.state === State.LEFT && sprite.physics.vx < 0) ||
         (!isKeyPressed)) 
        {
            sprite.physics.vx *= sprite.physics.friction;
        }

        //limitamos a la velocidad maxima en direccion horizontal
        if (sprite.physics.vx > sprite.physics.vLimit) 
        {
            sprite.physics.vx = sprite.physics.vLimit;
        }
        else if (sprite.physics.vx < -sprite.physics.vLimit) 
        {
            sprite.physics.vx = -sprite.physics.vLimit;
        }

        //calculamos distancia que se mueve
        //xPos seguira un movimiento HZUA
    //MOVIMIENTO VERTICAL
    //Aceleracion en y , GRAVEDAD
    //no estamos en el suelo
    if (!sprite.physics.isOnGround) 
    {
        if (sprite.physics.vx > 0) {
            
            sprite.state = State.JUMP_RIGHT;
            
        }
        else if (sprite.physics.vx < 0) {
            
            sprite.state = State.JUMP_LEFT;
            
        }
        //calculamos la velocidad en y
        sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
        if (sprite.physics.vy > sprite.physics.vLimit) {
            sprite.physics.vy = sprite.physics.vLimit;
        }
    }
    else //estamos en el suelo
    {
        if (globals.action.jump) //pulsamos tecla de salto 
        {
            globals.currentSound = Sound.SFX_JUMP;

            sprite.physics.isOnGround = false;

            //asignamos velocidad del salto
            sprite.physics.vy += sprite.physics.jumpForce;

        }
    }

    //calculamos la distancia que se mueve(y=y0+vt)
    sprite.yPos += sprite.physics.vy * globals.deltaTime;
    sprite.xPos += sprite.physics.vx * globals.deltaTime;

    //COLISION CON EL SUELO
  

    //actualizar la animacion
    updateAnimationFrame(sprite);
    if (globals.currentLevel === 1 || globals.currentLevel === 7 || globals.currentLevel === 35 || globals.currentLevel === 28 ) {
        initArrow();
    }
    if (globals.hordeTimer.value === 0) {
        initKey();
        globals.hordeTimer.value = -1;
    }
    
}
function updateLamp(sprite)
{
    // if (sprite.physics.vy > sprite.physics.vLimit) {
    //     sprite.physics.vy = sprite.physics.vLimit;
    // }
    
    const PLAYER = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    const FIREBREATH = globals.sprites.find((Firebreath) => Firebreath.id === SpriteID.FIREBREATH);

    //aqui actualizaremos el estado de las variables de lamp
    readKeyboardLamp(sprite);
    
    if (sprite.state != State.INVALID) {
        
        initDust();
        
    }
    initBar(2);

      
     //maquina de estados de player
     switch (sprite.state) 
     {
    
        case "following":
             //si s emueve a la izquierda velX negativa
             sprite.xPos = PLAYER.xPos +5;
             sprite.yPos = PLAYER.yPos -10;

             break;
        case State.LAMP_ELIPTIC:

            sprite.rotating = false;
            sprite.thrown = false;
            sprite.thrownClose = false;


            globals.lampAngle = 0;
            FIREBREATH.state = State.INVALID;
            //actualizamos angulo de giro
            sprite.physics.angle += sprite.physics.omega * globals.deltaTime;

            //movimiento circular
            //x = xCenter + Acos(angle)
            //y = yCenter + Asin(angle)
            let xCenter = PLAYER.xPos + 10;
            let yCenter = PLAYER.yPos - 5 ;
            const radius = 10;
            sprite.xPos = xCenter + radius * Math.cos(sprite.physics.angle);
            sprite.yPos = yCenter + radius * Math.sin(sprite.physics.angle);

            //centramos el giro respecto del centro del sprite
            sprite.xPos -= sprite.imageSet.xSize/2;
            sprite.yPos -= sprite.imageSet.ySize/2;

            break;
        case State.LAMP_THROW_LEFT:

            sprite.physics.ay = GRAVITY;

            sprite.physics.vx = -sprite.physics.vLimit;
           
            if (sprite.thrownClose) {
                sprite.physics.vx = -60;

            }
            throwLampLeft(sprite);

            if (sprite.isCollidingWithObstacleOnBottom) {
                sprite.state = State.INVALID;
                sprite.physics.vy = 40;

               
                globals.currentSound = Sound.SFX_FIRE;
                

            }

        break;

        case State.LAMP_THROW_RIGHT:
            sprite.physics.ay = GRAVITY;

            sprite.physics.vx = sprite.physics.vLimit;
            
            if (sprite.thrownClose) {
                sprite.physics.vx = 60;

            }

            throwLampRight(sprite);
            if (sprite.isCollidingWithObstacleOnBottom) 
            {

                sprite.state = State.INVALID;
                sprite.physics.vy = 40;

                globals.currentSound = Sound.SFX_FIRE;
                

            }
        break;

        case State.LAMP_FIREBREATH_RIGHT:
            sprite.rotating = false;
            globals.lampAngle = 0;
            sprite.xPos = PLAYER.xPos + 20;
            sprite.yPos = PLAYER.yPos + 5;
            FIREBREATH.state = State.FIREBREATH_RIGTH;
            sprite.physics.vy = -30;
          
            sprite.haveCollided = false;
            break;

        case State.LAMP_FIREBREATH_LEFT:
            sprite.rotating = false;
            globals.lampAngle = 0;
            sprite.xPos = PLAYER.xPos - 5;
            sprite.yPos = PLAYER.yPos + 5;
            FIREBREATH.state = State.FIREBREATH_LEFT;
            sprite.physics.vy = -30;
            sprite.haveCollided = false;

        
            break;

         default:
             
             break;
 
     }
    updateOilLevels(sprite);

}
function throwLampRight(sprite)
{

    sprite.rotating = true;
    sprite.thrown = true;
    
    sprite.physics.vy += sprite.physics.ay * globals.deltaTime;

    sprite.oil -= 0.4;

    if (sprite.haveCollided) {
        sprite.physics.vx = 0;
    }

    sprite.yPos += sprite.physics.vy * Math.cos(45) * globals.deltaTime;
    sprite.xPos += sprite.physics.vx * Math.sin(45) * globals.deltaTime;

}
function throwLampLeft(sprite)
{
    initBar(2);
    sprite.rotating = true;
    sprite.thrown = true;

    sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
    
    sprite.oil -= 0.4;

    if (sprite.haveCollided) {
        sprite.physics.vx = 0;
    }

    sprite.yPos += sprite.physics.vy * Math.cos(45) * globals.deltaTime;
    sprite.xPos += sprite.physics.vx * Math.sin(45) * globals.deltaTime;
}
function updateEnemy(sprite)
{

    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    const lamp = globals.sprites.find((Lamp) => Lamp.id === SpriteID.LAMP);

    if (sprite.isCollidingWithObstacleOnBottom) 
    {
        sprite.physics.isOnGround = true;
        sprite.physics.vLimit = 10;
        sprite.physics.aLimit = 10;  
    }
    //aqui actualizaremos el estado de las variables de enemy
    sprite.physics.ay = GRAVITY;
    sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
    
    

     //maquina de estados de player
     switch (sprite.state) 
     {
         case State.ENEMY_ATTACK:
             
             //si se mueve a la derecha velX es positiva
             sprite.physics.vx = 0;

             break;
     
         case State.ENEMY_MOVE_LEFT:
             //si s emueve a la izquierda velX negativa
             sprite.physics.vx = -sprite.physics.vLimit;
             if (sprite.isCollidingWithObstacleOnLeft) 
            {
                sprite.state = State.ENEMY_MOVE_RIGHT;
            }

             break;

        case State.ENEMY_MOVE_RIGHT:
            //si s emueve a la izquierda velX negativa
            sprite.physics.vx = sprite.physics.vLimit;

            if (sprite.isCollidingWithObstacleOnRight) 
            {
                sprite.state = State.ENEMY_MOVE_LEFT;
                
            }

            break;

         case State.ENEMY_STILL:
            sprite.physics.vx = 0;
            break;
         default:
             break;
 
     }

     //calculamos distancia que se mueve (X= X0+ Vt)
     sprite.xPos += sprite.physics.vx * globals.deltaTime;
     sprite.yPos += sprite.physics.vy * globals.deltaTime;
 

     if (sprite.isCollidingWithFire) 
     {

       
        initEnemyParticle(sprite);
        let spritePos = findIndex(globals.sprites,sprite);
        if (lamp.state === State.INVALID) {
            sprite.burnProgress += 3;
        }
        else {
            sprite.burnProgress += 0.5;
            
        }
        if (sprite.burnProgress >= 20) {
            sprite.state = State.INVALID;
            enemyDead(sprite);
            globals.sprites.splice(spritePos,1);

        }
     }
     if (sprite.isCollidingWithPlayer) {
        player.isDamaged = true;
     }
     updateAnimationFrame(sprite);

     calculateCollisionWithFourBorders(sprite);

}
function updateFire(sprite)
{
    const LAMP = globals.sprites.find((Lamp) => Lamp.id === SpriteID.LAMP);
    //aqui actualizaremos el estado de las variables de fire
    sprite.state = State.FIRE_INVALID;
    
    
    if (LAMP.state === State.INVALID) {
        
        sprite.xPos = LAMP.xPos - 12;
        sprite.yPos = LAMP.yPos - 4;

        sprite.state = State.FIRE_ONFIRE;

        initSplash();  
            
        
        updateFireTimer();
        if (sprite.changingLevel) {
            globals.fireTime.value = 0;
        }

        if (globals.fireTime.value <= 0) 
        {
            LAMP.state = State.LAMP_ELIPTIC;

            sprite.state = State.INVALID;
            
            globals.fireTime.value = 4;   
            
            LAMP.physics.vy = -30
            LAMP.haveCollided = false;
        }
    }

    updateAnimationFrame(sprite);
   if (sprite.changingLevel) {
    updateLevelChangeTimer();
   
    if (globals.levelChangeTimer.value <= 0) {
        sprite.changingLevel = false;
        globals.levelChangeTimer.value = 0.2;
    }
   }
}
function updateFireTimer()
{
    //incrementamos el contador de cambio de valor
    globals.fireTime.timeChangeCounter += globals.deltaTime;
    //si ha pasado el timepo necesario, cambiamos el valor del timer
    if (globals.fireTime.timeChangeCounter > globals.fireTime.timeChangeValue) {
        
        globals.fireTime.value--;

        //reseteamos timeChangeCounter
       globals.fireTime.timeChangeCounter = 0;

    }

}
function updateFireBreath(sprite)
{


    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);


    //aqui actualizaremos el estado de las variables de lamp

    switch (sprite.state) 
    {
        case State.FIREBREATH_RIGTH:
            
            sprite.xPos = player.xPos + 25;
            sprite.yPos = player.yPos + 8;

            break;

        case State.FIREBREATH_LEFT:
            
            sprite.xPos = player.xPos - 35;
            sprite.yPos = player.yPos + 8;

            break;

        default:
            break;
    }
   


    updateAnimationFrame(sprite);

}
function updateKey(sprite)
{  
    moveToken(sprite);
    //aqui actualizaremos el estado de las variables de key
    //SWITCH INNCECESARIO LOL SE ASIGNA EN INITIALIZE XD
    switch (globals.currentLevel) 
    {
        case 0:
            
        let keyPos = findIndex(globals.sprites, sprite);
        globals.sprites.splice(keyPos,1);


            break;

        case 2:
            
            sprite.xPos = 60;

            break;
        case 3:
            
            sprite.xPos = 200;

            break;
        case 4:
            
            sprite.xPos = 160;

            break;
        case 4:
            
            sprite.xPos = 170;

            break;
        case 5:
            
            sprite.xPos = 200;

            break;
        case 6:
            
            sprite.xPos = 175;

            break;

        case 7:
            

            break;
        
        case 8:
            sprite.xPos = 25;
            

            break;
        case 12:
            

            break;
        case 13:
            

            break;
        case 14:
            

            break;
        case 15:
            

            break;
        case 16:
            

            break;

        default:
            break;
    }


    sprite.frames.frameCounter = 0;

}
function moveToken(sprite)
{
    switch (sprite.state) {
        case State.ACTION_1:

            moveTokenUp(sprite);
            globals.movePx -= 1;
            break;
        
        case State.ACTION_2:

            moveTokenDown(sprite);
            globals.movePx += 1;
            break;
    
        default:
            break;
    }
    if (globals.movePx === 0) {
        sprite.state = State.ACTION_2;
    }
    else if (globals.movePx === 60) {
        sprite.state = State.ACTION_1;
    }
}
function updatePotion(sprite)
{

    sprite.state = State.ACTION_1;
    //aqui actualizaremos el estado de las variables de potion
    switch (globals.currentLevel) {
        case 1:
   

            break;

        case 2:
            sprite.state = State.ACTION_1;
            sprite.xPos = 100;
            sprite.yPos = 60;

            break;

        case 3:
            
        sprite.state = State.ACTION_1;
        sprite.xPos = 120;
        sprite.yPos = 40;

            break;
        case 4:
                 sprite.state = State.ACTION_1;
            sprite.xPos = 100;
            sprite.yPos = 60;

            break;
        case 5:
                     sprite.state = State.ACTION_1;
            sprite.xPos = 120;
            sprite.yPos = 60;

            break;
        case 6:

            sprite.state = State.ACTION_1;
            sprite.xPos = 73;
            sprite.yPos = 80;

            break;
        case 7:

            sprite.state = State.ACTION_1;
            sprite.xPos = 73;
            sprite.yPos = 80;

            break;
        case 8:

            sprite.state = State.ACTION_1;
            sprite.xPos = 153;
            sprite.yPos = 90;

            break;

        case 8:

            sprite.state = State.ACTION_1;
            sprite.xPos = 153;
            sprite.yPos = 40;

            break;

        case 10:

            sprite.state = State.ACTION_1;
            sprite.xPos = 153;
            sprite.yPos = 40;

            break;
        case 11:

            sprite.state = State.ACTION_1;
            sprite.xPos = 153;
            sprite.yPos = 40;

            break;
        
        case 12:

            sprite.state = State.ACTION_1;
            sprite.xPos = 120;
            sprite.yPos = 80;

        break;
        case 13:

            sprite.state = State.ACTION_1;
            sprite.xPos = 120;
            sprite.yPos = 80;

        break;
        case 15:

            sprite.state = State.ACTION_1;
            sprite.xPos = 120;
            sprite.yPos = 80;

        break;
        case 19:

            sprite.state = State.ACTION_1;
            sprite.xPos = 120;
            sprite.yPos = 80;

        break;
        case 26:

            sprite.state = State.ACTION_1;
            sprite.xPos = 90;
            sprite.yPos = 140;

        break;
        case 23:

            sprite.state = State.ACTION_1;
            sprite.xPos = 90;
            sprite.yPos = 140;

        break;

        default:
            break;
    }
    switch(sprite.state)
    {
        case State.ACTION_1:
            //actualizamos angulo de giro
            sprite.physics.angle += sprite.physics.omega * globals.deltaTime;

            //movimiento circular
            //x = xCenter + Acos(angle)
            //y = yCenter + Asin(angle)
            let xCenter = sprite.xPos;
            let yCenter = sprite.yPos;
            const radius = 1;
            sprite.xPos = xCenter + radius * Math.cos(sprite.physics.angle);
            sprite.yPos = yCenter + radius * Math.sin(sprite.physics.angle);

            //centramos el giro respecto del centro del sprite
            sprite.xPos -= sprite.imageSet.xSize/2;
            sprite.yPos -= sprite.imageSet.ySize/2;
        
        break;
    }

    sprite.frames.frameCounter = 0;


}
function updateWeed(sprite)
{

    //aqui actualizaremos el estado de las variables de weed
    let weeds = findRepeat(globals.sprites, sprite);
    let weedPos = findIndex(globals.sprites,sprite);
    moveTokenUp(sprite);
    if (sprite.isCollidingWithPlayer) 
    {
        globals.currentSound = Sound.SFX_WEED;
        globals.score += 50;
        if (globals.score > globals.highscore) {
            globals.highscore = globals.score;
        }
        globals.sprites.splice(weedPos,1)
    }
    sprite.frames.frameCounter = 0;

    

}
function updateHUDAngelo(sprite)
{
    sprite.xPos = 0;
    sprite.yPos = 160;

    
    
    if (globals.levelTime.value <= 0) {
        sprite.frames.frameCounter += 2;
        if (sprite.frames.frameCounter === 2) {
            
            globals.levelTime.value = 180;
            
        }
        else if (sprite.frames.frameCounter === 4) {
            
            globals.levelTime.value = 120;
            
        }
        else if (sprite.frames.frameCounter === 6) {
            
            globals.levelTime.value = 80;
            
        }
    }
    sprite.state = State.STILL;
}
function updateHUDPotion(sprite)
{
    const player = globals.sprites.find((Potion) => Potion.id === SpriteID.PLAYER);

    sprite.xPos = 70;
    sprite.yPos = 168;
    sprite.alpha = 0.5;
    
    if (player.hasPotionRed) {
        sprite.state = State.STILL;
    }
    else
    {
        sprite.state = State.INVALID;
    }

    sprite.frames.frameCounter = 0;

}
function updateHUDPotion1(sprite)
{
    sprite.xPos = 78;
    sprite.yPos = 168;
    sprite.alpha = 0
    
    

    sprite.frames.frameCounter = 0;
    sprite.state = State.INVALID;


}
function updateHUDPotion2(sprite)
{
    sprite.xPos = 86;
    sprite.yPos = 168;
    sprite.alpha = 0
    
    

    sprite.frames.frameCounter = 0;
    sprite.state = State.INVALID;


}
function updateHUDPotion3(sprite)
{
    sprite.xPos = 94;
    sprite.yPos = 168;
    sprite.alpha = 0.5;
    
    

    sprite.frames.frameCounter = 0;
    sprite.state = State.INVALID;


}
function updateHUDLamp(sprite)
{
    sprite.xPos = 148;
    sprite.yPos = 177;
    sprite.alpha = 0.5;
    
    

    sprite.frames.frameCounter = 0;
    sprite.state = State.STILL;
}
function updateHUDKey(sprite)
{
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);

    sprite.xPos = 128;
    sprite.yPos = 162;
    sprite.alpha = 0.5;
    
    if (player.hasKey) {
        sprite.state = State.ACTION_1;
    }
    else {
        sprite.state = State.INVALID;
    }

    sprite.frames.frameCounter = 0;
    //INVALID PARA QUE NO APAREZCA

}
function updateNewGame(enemy, lamp, player)
{
    

    enemy.xPos = 10;
    enemy.yPos = 48 ;

    enemy.state = State.ENEMY_STILL;

    player.xPos = 206;
    player.yPos = 56;


    player.state = State.STILL_LEFT;

    lamp.xPos = 220;
    lamp.yPos = 50;

    lamp.state = State.STILL;

    globals.highscore = globals.highscoreArray[0];

    initSplash();
    updateParticles();
    //console.log(globals.action.menuUp + " " + globals.action.menuDown + " " + globals.action.menuEjec);
    updateLevelTime();
    updateSprites();
    navegateNGMenu();
    
    resetGlobals();
    

}
function resetGlobals(){

    //transicion de la camara history
    globals.transition = 200
    //timer de la horda
    globals.hordeTimer.value = 30;
    //valor del nivel actual al resetear el juego
    globals.currentLevel = 1;
    //booleano que dicta si ha pasado un evento(flag)
    globals.eventHappened = false;

    globals.selectedHighscore = 0;

    globals.currentName = "___";

    globals.postedScores = false;

    globals.requestdedScores = false;

    globals.highscoresTimer.value = 6;

    globals.letter1 = "";
    globals.letter2 = "";
    globals.letter3 = "";

    globals.score = 0;

    globals.currentLetterPos = [0,0];

    globals.nameProgress = 0;

    globals.boomboxPlaying = false;

    sortScoresArray(globals.highscoreArray);
}
function updateGameOver()
{
    navegateGOMenu();
    restartGame();

}
function restartGame()
{
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    const lamp = globals.sprites.find((lamp) => lamp.id === SpriteID.LAMP);
    const enemy = globals.sprites.find((enemy) => enemy.id === SpriteID.ENEMY);
    const angelo = globals.sprites.find((angelo) => angelo.id === SpriteID.HUD_ANGELO);
    
    const enemies = findRepeat(globals.sprites, enemy);

    for (let i = 0; i < enemies.length; i++) {
        
        let enemPos = findIndex(globals.sprites ,enemies[i]);
        
        globals.sprites.splice(enemPos,1);

    }
    
    globals.life = 1;
    globals.levelTime.value = 200;
    player.hasKey = false;
    player.hasPotionRed = false;
    globals.enemyCounter = 0;
    angelo.frames.frameCounter = 0;
    lamp.oil = 25; 
    globals.hordeTimer.value = 30;
    globals.currentLevel = 1;

    deleteItems();
    initEnemytree();
}
function navegateNGMenu()
{

    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);

    if (globals.selectedOption >= 2) {

        if (globals.action.menuUp && globals.previousMenuUp === false) {
            globals.selectedOption -= 1;
            globals.currentSound = Sound.SFX_WEED;
        }
    }
    if (globals.selectedOption <= 4) {

        if (globals.action.menuDown && globals.previousMenuDown === false) {
            globals.selectedOption += 1;
            globals.currentSound = Sound.SFX_WEED;
        }
    }
    
    if (globals.action.menuEjec && globals.previousMenuEjec === false) {

        switch (globals.selectedOption) {
        
            case 1:

                globals.gameState = Game.PLAYING;
                 //reprocir musica
                globals.musics[globals.currentMusic].pause();
                globals.musics[globals.currentMusic].currentTime = 0;

                globals.currentMusic = MUSIC.BELL_OF_BATTLE;
                

                break;
    
            case 2:
                
                globals.gameState = Game.STORY;

                break;
    
            case 3:

                globals.gameState = Game.CONTROLS;
                
                break;
    
            case 4:

                globals.gameState = Game.HIGHSCORES;
                
                break;
            
            case 5:

                globals.gameState = Game.DEMO;
                player.xPos = 103;
                player.yPos = 35;
                globals.currentLevel = 8;
                deleteEnemies();
                
                initPotion();
                initKey();

                  //reprocir musica
                  globals.musics[globals.currentMusic].pause();
                  globals.musics[globals.currentMusic].currentTime = 0;
  
                  globals.currentMusic = MUSIC.MUSIC_MENU_3;

                break;
        
            default:
                break;
        }
    }

        globals.previousMenuDown    = globals.action.menuDown;
        globals.previousMenuUp      = globals.action.menuUp;
        globals.previousMenuEjec    = globals.action.menuEjec;
   
}
function navegateHSmenu()
{
    if (globals.action.menuUp && globals.previousMenuUp === false && globals.selectedHighscore > 0) {
        globals.selectedHighscore -= 1;
        globals.keyPressed = true;
        globals.currentSound = Sound.SFX_WEED;
    }
    if (globals.action.menuDown && globals.previousMenuDown === false && globals.selectedHighscore < (globals.highscoreArray.length - 1)) {
        globals.selectedHighscore += 1;
        globals.keyPressed = true
        globals.currentSound = Sound.SFX_WEED;
    }
    if (globals.action.menuLeft  && globals.previousMenuLeft === false && globals.selectedHighscore > 9) {
        globals.selectedHighscore -= 10;
        globals.keyPressed = true
        globals.currentSound = Sound.SFX_WEED;
    }
    if (globals.action.menuRight  && globals.previousMenuRight === false && globals.selectedHighscore < (globals.highscoreArray.length - 10)) {
        globals.selectedHighscore += 10;
        globals.keyPressed = true
        globals.currentSound = Sound.SFX_WEED;
    }
        
    

    globals.previousMenuDown    = globals.action.menuDown;
    globals.previousMenuUp      = globals.action.menuUp;
    globals.previousMenuLeft    = globals.action.menuLeft;
    globals.previousMenuRight      = globals.action.menuRight;

}
function updateHighscoresMenu()
{
    console.log(globals.selectedHighscore);
    if (globals.currentName != "___") {
        
        
        let score = Number(globals.score);    
        let arrayScore = Number(globals.highscoreArray[globals.selectedHighscore][1]);
        let lastHighscore = Number(globals.highscoreArray[0][1]);


        if (globals.score >= lastHighscore) {
            globals.selectedHighscore = 1;
            globals.gameState = Game.NEW_HIGHSCORES;
            
        }
           if (globals.highscoreArray[globals.selectedHighscore][0] === globals.currentName && arrayScore === score) {
            
            initDust();
            globals.gameState = Game.HIGHSCORES;
           }
           else{
            globals.selectedHighscore += 1;
           }
             
    }
}
function updateWriteName()
{


    
    
    if (globals.currentLetterPos[0] < 2) {

        if (globals.action.menuDown && globals.previousMenuDown === false) {
            globals.currentLetterPos[0] += 1;
        }
    }
    if (globals.currentLetterPos[0] > 0) {

        if (globals.action.menuUp && globals.previousMenuUp === false) {
            globals.currentLetterPos[0] -= 1;
        }
    }
    if ((globals.currentLetterPos[0] === 0 && globals.currentLetterPos[1] < 9) || (globals.currentLetterPos[0] === 1 && globals.currentLetterPos[1] < 8) || (globals.currentLetterPos[0] === 2 && globals.currentLetterPos[1] < 6 )) {

        if (globals.action.menuRight && globals.previousMenuRight === false) {
            globals.currentLetterPos[1] += 1;
        }
    }
    if (globals.currentLetterPos[1] > 0 ) {

        if (globals.action.menuLeft && globals.previousMenuLeft === false) {
            globals.currentLetterPos[1] -= 1;
        }
    }

    
    if (globals.action.menuEjec && globals.previousMenuEjec === false) {

        globals.selectedLetter = globals.letters[globals.currentLetterPos[0]][globals.currentLetterPos[1]]
        if (globals.nameProgress === 0 ) {
            globals.letter1 = globals.selectedLetter;
        }
        else if (globals.nameProgress === 1 ) {
            globals.letter2 = globals.selectedLetter;
        }
        else if (globals.nameProgress === 2 ) {
            globals.letter3 = globals.selectedLetter;
        }

    }

    if (globals.action.menuEjec && globals.previousMenuEjec === false && globals.nameProgress === 3) {

        globals.currentName = globals.letter1 + globals.letter2 + globals.letter3;
        globals.gameState = Game.GAME_OVER;

    }

        globals.previousMenuEjec    = globals.action.menuEjec;
        globals.previousMenuDown    = globals.action.menuDown;
        globals.previousMenuUp      = globals.action.menuUp;
        globals.previousMenuLeft    = globals.action.menuLeft;
        globals.previousMenuRight   = globals.action.menuRight;
}
function stopMenuMusic()
{
    globals.musics[MUSIC.MUSIC_MENU_1].pause();
    globals.musics[MUSIC.MUSIC_MENU_1].currentTime = 0;

}
function navegateGOMenu()
{

    if (globals.selectedOption > 6) {

        if (globals.action.menuUp && globals.previousMenuUp === false) {
            globals.selectedOption -= 1;
        }
    }
    if (globals.selectedOption <= 7) {

        if (globals.action.menuDown && globals.previousMenuDown === false) {
            globals.selectedOption += 1;
        }
    }
    
    if (globals.action.menuEjec && globals.previousMenuEjec === false) {

        switch (globals.selectedOption) {
        

            case 6:
                
                globals.gameState = Game.WRITE_NAME;

                break;

            case 7:
                

                if (globals.gameState === Game.GAME_OVER && globals.currentName != "___") {
                    postScore();

                    globals.gameState = Game.NEW_GAME;
                    globals.score = 0; 
                    globals.selectedOption = 1;
      
                    //reprocir musica
                    globals.musics[globals.currentMusic].pause();
                    globals.musics[globals.currentMusic].currentTime = 0;
                    globals.currentMusic = MUSIC.DANCE_HYMN_SOUL;
                }
               
                break;
    
            case 8:
           
                if (globals.gameState === Game.GAME_OVER && globals.currentName != "___") {
                    
                    postScore();
                   
                
                    //reprocir musica
                    globals.musics[globals.currentMusic].pause();
                    globals.musics[globals.currentMusic].currentTime = 0;
                    globals.currentMusic = MUSIC.DANCE_HYMN_SOUL;
                    
                    globals.gameState = Game.LOAD_HIGHSCORES;
                        
                    
                        
                    
                }
                break;
    
        
            default:
                break;
        }
    }

        globals.previousMenuDown    = globals.action.menuDown;
        globals.previousMenuUp      = globals.action.menuUp;
        globals.previousMenuEjec    = globals.action.menuEjec;

   
}
function navegateYWMenu()
{
     //reprocir musica
     globals.musics[globals.currentMusic].pause();
     globals.musics[globals.currentMusic].currentTime = 0;

    if (globals.action.menuEjec && globals.previousMenuEjec === false) {
        if (globals.gameState === Game.YOU_WIN_1) {

            globals.currentLevel = 9;

            globals.gameState = Game.PLAYING;
        }
    }
    globals.previousMenuEjec = globals.action.menuEjec;
}
function returnToNewGame()
{
    if (globals.action.menuReturn) {
        globals.gameState = Game.NEW_GAME;
        globals.selectedOption = 1;

    }
}
function updateSprites()
{

    for (let index = 0; index < globals.sprites.length; index++) {
        
        const sprite = globals.sprites[index];
        switch (globals.gameState) {
            case Game.NEW_GAME:
                
            updateSpriteNewGame(sprite)
                
                break;
                
            case Game.PLAYING:
                
            updateSprite(sprite)
                
                break;
            
            case Game.DEMO:
                
            updateSprite(sprite)
                    
                break;
        
            default:
                break;
        }
        
    }
}
function updateSprite(sprite)
{
    const type = sprite.id;
    switch (type) {

        //caso del jugador
        case SpriteID.PLAYER:
            updatePlayer(sprite);
            break;

            //caso de lampara
        case SpriteID.LAMP:
            updateLamp(sprite)
            break;
            
        
        //caso del jugador
        case SpriteID.KEY:
            updateKey(sprite);
            break;

        //caso del enemy
        case SpriteID.ENEMY:
            updateEnemy(sprite);
            break;

        //caso del jugador
        case SpriteID.POTION:
            updatePotion(sprite);
            break;


        
        //caso del jugador
        case SpriteID.WEED:
            updateWeed(sprite);
            break;

            
        

        //caso del fuego
        case SpriteID.FIRE:
            updateFire(sprite);
            break;

        case SpriteID.FIREBREATH:
            updateFireBreath(sprite);
            break;
        //otros casos....


        //caso hud

        case SpriteID.HUD_POTION:
            updateHUDPotion(sprite);
            break;

        case SpriteID.HUD_POTION1:
            updateHUDPotion1(sprite);
            break;
        
        case SpriteID.HUD_POTION2:
            updateHUDPotion2(sprite);
            break;
        
        case SpriteID.HUD_POTION3:
            updateHUDPotion3(sprite);
            break;
        
        case SpriteID.HUD_ANGELO:
            updateHUDAngelo(sprite);
            break;
        case SpriteID.HUD_LAMP:
            updateHUDLamp(sprite);
            break;
        case SpriteID.HUD_KEY:
            updateHUDKey(sprite);
            break;
        default:
            break;
    }
}
function updateSpriteNewGame(sprite)
{
    const type = sprite.id;
    switch (type) {

        //caso del jugador
        case SpriteID.PLAYER:
            updatePlayerNG(sprite);
            break;

            //caso de lampara
        case SpriteID.LAMP:
            updateLamp(sprite)
            break;
        

        //caso del enemy
        case SpriteID.ENEMY:
            updateEnemyNG(sprite);
            break;  
        
        //caso del fuego
        case SpriteID.FIRE:
            updateFire(sprite);
            break;

        default:
            break;
    }
}
function updatePlayerNG(sprite)
{
    updateAnimationFrame(sprite);

}
function updateEnemyNG(sprite)
{
    updateAnimationFrame(sprite);
}
function updateLevelTime()
{
    //incrementamos el contador de cambio de valor
    globals.levelTime.timeChangeCounter += globals.deltaTime;
    
    //si ha pasado el timepo necesario, cambiamos el valor del timer
    if (globals.levelTime.timeChangeCounter > globals.levelTime.timeChangeValue) {
        
        globals.levelTime.value--;

        //reseteamos timeChangeCounter
        globals.levelTime.timeChangeCounter = 0;

    }

}
function updateTimer(timer)
{
     //incrementamos el contador de cambio de valor
     timer.timeChangeCounter += globals.deltaTime;
    
     //si ha pasado el timepo necesario, cambiamos el valor del timer
     if (timer.timeChangeCounter > timer.timeChangeValue) {
         
         timer.value--;
 
         //reseteamos timeChangeCounter
         timer.timeChangeCounter = 0;
 
     }
}

//playgame

function playGame()
{
    
    //fisica de sprites
    updateSprites();
    
    //tiempo

    updateTimer(globals.levelTime);
    updateTimer(globals.demoTime);


    if (globals.currentLevel === CurrentLEVEL.LEVEL_8) {
        
        updateTimer(globals.hordeTimer);
        
    }
    //colisiones
    detectCollisions();
    
    //particulas
    updateParticles();
    
    //sonidos
    playSound();

    //vida
    updateLife();

    //logica enemigos
    enemyLogic();

    //items
    updateItems();

    //gameover
    checkIfGameOver();
    //win
    checkWinConditions();

    eventManager();

    //.... A completar
}
function freezeGame(gameState)
{
    
   //tiempo
   updateFreezeTimer();
   
   //particulas
   updateParticles();

   const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    // if (globals.currentLevel === 11 && player.yPos >= 78) {

    //         globals.currentLevel += 1;
    //         player.xPos = 126;
    //         player.yPos = 14;

    //         deleteEnemies();
    //         deleteItems();
    //         initPotion();
    //         initKey();    

    // } 
   if (player.isDamaged) 
    {
        if (globals.currentLevel != 7) {
            player.xPos = 12;
            player.yPos = 5;
        }
        else {
            player.xPos = 1;
            player.yPos = 35;
        }
        
    }
    if (globals.freezeTimer.value <= 0) {
        player.isDamaged = false;
        globals.freezeTimer.value = 3;
        if (1 === 2) { // condicion imposible
            globals.gameState = Game.DEMO;
        }
        else {
            globals.gameState = Game.PLAYING;
        }
    }
   updateLife();
   
   //.... A completar
}
function updateLoadGame()
{
    
    updateLevelTime();
}
function moveTokenUp(sprite)
{

    sprite.physics.vy = -sprite.physics.vLimit;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;
       

}
function moveTokenDown(sprite)
{

        sprite.physics.vy = sprite.physics.vLimit;
        sprite.yPos += sprite.physics.vy * globals.deltaTime;
    

}
function updateLife()
{
        const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
        const enemy = globals.sprites.find((Player) => Player.id === SpriteID.ENEMY);
        const enemies = findRepeat(globals.sprites,enemy);
 
       for (let i = 0; i < enemies.length; i++) {
            
            if (player.isDamaged) {
                deleteEnemies();
                if (enemies[i].isCollidingWithPlayer) {
                    //si hay colision
                        globals.life = globals.life - 0.34;
                        globals.deltaTime = 0;
                        globals.enemyCounter = 0;
                        if (globals.life <= 0) {
                            globals.gameState = Game.GAME_OVER;
                        }
                        else {
                            globals.gameState = Game.FREEZE;

                        }
                }
            } 
        
       }
         
}
function deleteEnemies()
{
    const enemy = globals.sprites.find((enemy) => enemy.id === SpriteID.ENEMY);
    const enemies = findRepeat(globals.sprites, enemy);
  
    for (let i = 0; i < enemies.length; i++) {
        
        let enemPos = findIndex(globals.sprites ,enemies[i]);
        
        globals.sprites.splice(enemPos,1);

    }
    
}
function deleteItems()
{
    const weed = globals.sprites.find((weedy) => weedy.id === SpriteID.WEED);
    const potion = globals.sprites.find((potio) => potio.id === SpriteID.POTION);
    const key = globals.sprites.find((key) => key.id === SpriteID.KEY);


    const weeds = findRepeat(globals.sprites, weed);
    const keys = findRepeat(globals.sprites, key)   ;
    const potions = findRepeat(globals.sprites, potion);

  
    for (let i = 0; i < weeds.length; i++) {
        
        let enemPos = findIndex(globals.sprites ,weeds[i]);
        
        globals.sprites.splice(enemPos,1);

    }
    for (let i = 0; i < keys.length; i++) {
        
        let enemPos = findIndex(globals.sprites ,keys[i]);
        
        globals.sprites.splice(enemPos,1);

    }
    for (let i = 0; i < potions.length; i++) {
        
        let enemPos = findIndex(globals.sprites ,potions[i]);
        
        globals.sprites.splice(enemPos,1);

    }
    
}
function updateItems()
{

    let potionRed = globals.sprites.find((Potion) => Potion.id === SpriteID.POTION);
    let potionRed_HUD = globals.sprites.find((PotionHud) => PotionHud.id === SpriteID.HUD_POTION);
    const player = globals.sprites.find((Potion) => Potion.id === SpriteID.PLAYER);
    let weed = globals.sprites.find((weed) => weed.id === SpriteID.WEED);



    let key = globals.sprites.find((Key) => Key.id === SpriteID.KEY);
    let keyHud = globals.sprites.find((KeyHud) => KeyHud.id === SpriteID.HUD_KEY);

    let isThereKey = findVariable(globals.sprites, key);
    let isTherePotion = findVariable(globals.sprites, potionRed);
    let isThereWeed = findVariable(globals.sprites, weed);

            
        if (isTherePotion) {

            if (potionRed.isCollidingWithPlayer) {
                let potionPos = findIndex(globals.sprites , potionRed);
                //si hay colision
                potionRed.state = State.INVALID;
                    globals.sprites.splice(potionPos,1);
                potionRed_HUD.state = State.STILL;
                player.hasPotionRed = true;
            } 
        }
        if (isThereKey) {
             
            if (key.isCollidingWithPlayer) {
                
                let keyPos = findIndex(globals.sprites , key);

                //si hay colision
                key.state = State.INVALID;
                player.hasKey = true;

                globals.currentSound = Sound.SFX_KEY;

                    globals.sprites.splice(keyPos,1);

                keyHud.state = State.STILL;
            } 
        }
        if (isThereWeed) {
            let weeds = findRepeat(globals.sprites, weed);
            for (let i = 0; i < weeds.length; i++) {
                updateWeedTimer(weeds[i]);

                let weedPos = findIndex(globals.sprites , weeds[i]);
                if (weeds[i].isCollidingWithPlayer) {
                
                    globals.levelTime.value += 30;
                    if (globals.levelTime.value > 200) {
                        globals.levelTime.value = 200;
                    }
                }
                if (weeds[i].weedTimer.value <= 0) 
                {
                    weed.state = State.INVALID;
                    globals.sprites.splice(weedPos,1);
    
                }

            }
        }

}
function updateScore()
{
    globals.score += 100;
    if (globals.score > Number(globals.highscore[1])) {
        globals.highscore[1] = globals.score;
    }
}
function checkIfGameOver()
{
    const angelo = globals.sprites.find((angelo) => angelo.id === SpriteID.HUD_ANGELO);
    const player = globals.sprites.find((player) => player.id === SpriteID.PLAYER);


    //codiciones para finalizacion de partida
    if (globals.life <=  0) 
    {
        globals.gameState = Game.GAME_OVER;
        globals.selectedOption = 6;
        player.isDamaged = false;

            //reprocir musica
            globals.musics[globals.currentMusic].pause();
            globals.musics[globals.currentMusic].currentTime = 0;
            globals.currentMusic = MUSIC.SOPHISTICATED_FIGHT;


    }
    else if (globals.levelTime.value <= 0 && angelo.frames.frameCounter >= 6) {
        globals.gameState = Game.GAME_OVER;
        globals.selectedOption = 6;
        player.isDamaged = false;

            //reprocir musica
            globals.musics[globals.currentMusic].pause();
            globals.musics[globals.currentMusic].currentTime = 0;
            globals.currentMusic = MUSIC.SOPHISTICATED_FIGHT;

    }
}
function updateParticles()
{
    for (let index = 0; index < globals.particles.length; index++) {
        const particle = globals.particles[index];
        updateParticle(particle);
    }
}
function updateParticle(particle)
{

    const type = particle.id;

    switch (type) {
        case ParticleID.EXPLOSION:
            updateExplosionParticle(particle);            
            break;
     case ParticleID.DUST:
            updateDustParticle(particle);            
            break;
     case ParticleID.SPLASH:
            updateSplashParticle(particle);            
            break;
    case ParticleID.BAR:
            updateBarParticle(particle);            
            break;
    case ParticleID.SPARK:
            updateSparkParticle(particle);            
            break;
    case ParticleID.ARROW:
            updateArrowParticle(particle);            
            break;
    case ParticleID.ENEMY:
            updateBarParticle(particle);
            break;
        default:
            break;
    }

}
function updateExplosionParticle(particle)
{

    particle.fadeCounter += globals.deltaTime;

    //cogemos velocidades de los arrays
    switch (particle.state) {
        case ParticleState.ON:
            if (particle.fadeCounter > particle.timeToFade) 
            {
                particle.fadeCounter = 0;
                particle.state = ParticleState.FADE;    
            }
            break;

     case ParticleState.FADE:
        particle.alpha -= 0.35;

            if (particle.alpha <= 0) 
            {
                particle.state = ParticleState.OFF;    
            }
            break;
    case ParticleState.OFF:
        globals.particles.splice(0,1);
            break;
     
        default:
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;

}
function updateDustParticle(particle)
{

    particle.fadeCounter += globals.deltaTime;

    //cogemos velocidades de los arrays
    switch (particle.state) {
        case ParticleState.ON:
            if (particle.fadeCounter > particle.timeToFade) 
            {
                particle.fadeCounter = 0;
                particle.state = ParticleState.FADE;    
            }
            break;

     case ParticleState.FADE:
        particle.alpha -= 0.35;

            if (particle.alpha <= 0) 
            {
                particle.state = ParticleState.OFF;    
            }
            break;
    case ParticleState.OFF:
        globals.particles.splice(0,1);
            break;
     
        default:
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;

}
function updateSplashParticle(particle)
{

    particle.fadeCounter += globals.deltaTime;
    
    //cogemos velocidades de los arrays
    switch (particle.state) {
        case ParticleState.ON:
            if (particle.fadeCounter > particle.timeToFade) 
            {
                particle.fadeCounter = 0;
                particle.state = ParticleState.FADE;    
            }
            break;

     case ParticleState.FADE:
        particle.alpha -= 0.65;

            if (particle.alpha <= 0) 
            {
                particle.state = ParticleState.OFF;    
            }
            break;
    case ParticleState.OFF:
        globals.particles.splice(0,1);
            break;
     
        default:
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;

}
function updateBarParticle(particle)
{

    particle.fadeCounter += globals.deltaTime;
    
    //cogemos velocidades de los arrays
    switch (particle.state) {
        case ParticleState.ON:
            if (particle.fadeCounter > particle.timeToFade) 
            {
                particle.fadeCounter = 0;
                particle.state = ParticleState.FADE;    
            }
            break;

     case ParticleState.FADE:
        particle.alpha -= 0.65;

            if (particle.alpha <= 0) 
            {
                particle.state = ParticleState.OFF;    
            }
            break;
    case ParticleState.OFF:
        globals.particles.splice(0,1);
            break;
     
        default:
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;

}
function updateSparkParticle(particle)
{

    particle.fadeCounter += globals.deltaTime;
    
    //cogemos velocidades de los arrays
    switch (particle.state) {
        case ParticleState.ON:
            if (particle.fadeCounter > particle.timeToFade) 
            {
                particle.fadeCounter = 0;
                particle.state = ParticleState.FADE;    
            }
            break;

     case ParticleState.FADE:
        particle.alpha -= 0.65;

            if (particle.alpha <= 0) 
            {
                particle.state = ParticleState.OFF;    
            }
            break;
    case ParticleState.OFF:
        globals.particles.splice(0,1);
            break;
     
        default:
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;

}
function updateArrowParticle(particle)
{
    particle.fadeCounter += globals.deltaTime;
    
    //cogemos velocidades de los arrays
    switch (particle.state) {
        case ParticleState.ON:
            if (particle.fadeCounter > particle.timeToFade) 
            {
                particle.fadeCounter = 0;
                particle.state = ParticleState.FADE;    
            }
            break;

     case ParticleState.FADE:
        particle.alpha -= 0.90;

            if (particle.alpha <= 0) 
            {
                particle.state = ParticleState.OFF;    
            }
            break;
    case ParticleState.OFF:
        globals.particles.splice(0,1);
            break;
     
        default:
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;

}
function enemyDead(sprite)
{

    globals.currentSound = Sound.SFX_ENEMYDIE;

    initExplosion(sprite, "purple");
    let chance = Math.random() * 20;
    if (chance > 10) {
        
        initWeed(sprite);
        
    }
    if (globals.currentLevel === 10) {
        globals.enemyCounter -= 1;
    }
        
    updateScore();
}
function findIndex(array, element) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return i;
      }
    }
  
    return -1;
}
function enemyLogic()
{
    let maxEnemies = 1;
    
    const ENEMY = globals.sprites.find((Enemy) => Enemy.id === SpriteID.ENEMY);
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    let enemyCounter = globals.enemyCounter;
    const enemies = findRepeat(globals.sprites,ENEMY);
    const isThereEnemy = findVariable(globals.sprites,ENEMY);
    if (globals.gameState === Game.DEMO) {

        if (globals.score >= 200 && globals.levelTime.value < 1000 ) {
            maxEnemies = 2;
        }
        if (globals.score >= 1000 && globals.score < 3000 ) {
            maxEnemies = 3;
        }
        if (globals.score >= 3000 && globals.score < 5000 ) {
            maxEnemies = 4;
        }
        if (globals.score >= 5000 && globals.score < 10000 ) {
            maxEnemies = 6;
        }

    }
    else if (globals.gameState === Game.PLAYING) {

        if (globals.currentLevel >= 0 && globals.currentLevel < 9) {
           
            maxEnemies = 3;

  
        }
        else if (globals.currentLevel >= 9  && globals.currentLevel < 18) {
  
            maxEnemies = 6;
  
        }
        else if (globals.currentLevel >= 18  && globals.currentLevel < 27) {
    
            maxEnemies = 12;
          

        }
        else if (globals.currentLevel >= 27  && globals.currentLevel < 36) {
        
            maxEnemies = 18;

        }
    }

    if (globals.currentLevel === 10) {
        maxEnemies = 10
    }

    if (isThereEnemy && globals.currentLevel != CurrentLEVEL.LEVEL_7 && globals.currentLevel != 10) {
        
        for (let i = 0; i < enemies.length; i++) 
        {
            
            enemyTackle(enemies[i])
            if (enemies.length <= maxEnemies) 
            {
                spawnEnemy(enemies[i])
                updateEnemyTimer(enemies[i]);

            }
        }
        
    
    }
    else if (!isThereEnemy && globals.currentLevel != CurrentLEVEL.LEVEL_7 && globals.currentLevel != 10 && globals.currentLevel != 11) {
        
            
                initEnemytree();
            
    }
    else if (globals.currentLevel === 10 && player.xPos >= 110 && globals.eventHappened === false) {
        
        for (let i = 0; i < 10; i++) {
            
            initEnemytree();

        }
        globals.eventHappened = true;
    }
    
    updateLevelWithCurrentNum();
}
function spawnEnemy(enemy)
{
    if (enemy.enemyTimer.value <= 0) {
        initEnemytree();
        if (globals.currentLevel >= 0 && globals.currentLevel < 9) {

  
        }
        else if (globals.currentLevel >= 9  && globals.currentLevel < 18) {
  
            initEnemytree();

  
        }
        else if (globals.currentLevel >= 18  && globals.currentLevel < 27) {
    
            initEnemytree();
            initEnemytree();

          

        }
        else if (globals.currentLevel >= 27  && globals.currentLevel < 36) {
        
            initEnemytree();
            initEnemytree();
            initEnemytree();
            initEnemytree();


        }
        enemy.enemyTimer.value = 12;
    }
}
function enemyTackle(enemy)
{
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    if (globals.enemyAction === null) {
        globals.enemyAction = Math.floor(Math.random()*2);
    }
    let action = globals.enemyAction;

    if (enemy.actionTimer.value <= 0) {

    if (action === 1) {
        let reachXPos = player.xPos;
        enemy.physics.vLimit = 60;
        if (enemy.actionTimer.value <= -5 || enemy.xPos === reachXPos) 
        {
            enemy.physics.vLimit = 8;
            
            let tackleTime = Math.random() * 10 + 2;
            enemy.actionTimer.value = tackleTime;
            globals.enemyAction = null;
        }
    }
    else 
    {
        enemy.physics.vLimit = 70;
        enemy.physics.aLimit = 70;

        if (!enemy.physics.isOnGround) 
        {
            //calculamos la velocidad en y
            enemy.physics.vy += enemy.physics.ay * globals.deltaTime;
            if (enemy.physics.vy > enemy.physics.vLimit) {
                enemy.physics.vy = enemy.physics.vLimit;
            }
        }
        else //estamos en el suelo
        {
                enemy.physics.isOnGround = false;

                //asignamos velocidad del salto
                enemy.physics.vy += enemy.physics.jumpForce;
                enemy.actionTimer.value = Math.random() * 10 + 2;
                globals.enemyAction = null;
        }
    }
    }
    if ( enemy.yPos + 40 > player.yPos && enemy.yPos - 40 < player.yPos) 
    {
        updateTackleTimer(enemy);
        
    }
}
function enemyDemoLogic()
{
    const maxEnemies = 4;
    const ENEMY = globals.sprites.find((Enemy) => Enemy.id === SpriteID.ENEMY);
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    const enemies = findRepeat(globals.sprites,ENEMY);
    const isThereEnemy = findVariable(globals.sprites,ENEMY);


    if (isThereEnemy) {
        
        if (enemies.length <= maxEnemies) {
            for (let i = 0; i < enemies.length; i++) {
        
                updateEnemyTimer(enemies[i]);
                if (enemies[i].enemyTimer.value <= 0) {
                    initEnemytree();
                    enemies[i].enemyTimer.value = 10;
                }
        
            updateEnemyTimer(enemies[i]);   
        }
    }
    }
    else {
        
        initEnemytree();
    }
   
    
    updateLevelWithCurrentNum();

}
function updateTackleTimer(enemy)
{
    //incrementamos el contador de cambio de valor
    enemy.actionTimer.timeChangeCounter += globals.deltaTime;
    //si ha pasado el timepo necesario, cambiamos el valor del timer
    if (enemy.actionTimer.timeChangeCounter > enemy.actionTimer.timeChangeValue) {
        
        enemy.actionTimer.value--;

        //reseteamos timeChangeCounter
       enemy.actionTimer.timeChangeCounter = 0;

    }
}
function updateEnemyTimer(sprite)
{
    //incrementamos el contador de cambio de valor
    sprite.enemyTimer.timeChangeCounter += globals.deltaTime;
    //si ha pasado el timepo necesario, cambiamos el valor del timer
    if (sprite.enemyTimer.timeChangeCounter > sprite.enemyTimer.timeChangeValue) {
        
        sprite.enemyTimer.value--;

        //reseteamos timeChangeCounter
       sprite.enemyTimer.timeChangeCounter = 0;

    }
}
function updateWeedTimer(weed)
{
    //incrementamos el contador de cambio de valor
    weed.weedTimer.timeChangeCounter += globals.deltaTime;
    //si ha pasado el timepo necesario, cambiamos el valor del timer
    if (weed.weedTimer.timeChangeCounter > weed.weedTimer.timeChangeValue) {
        
        weed.weedTimer.value--;

        //reseteamos timeChangeCounter
       weed.weedTimer.timeChangeCounter = 0;

    }
}
function updateLevelChangeTimer()
{
    //incrementamos el contador de cambio de valor
    globals.levelChangeTimer.timeChangeCounter += globals.deltaTime;
    //si ha pasado el timepo necesario, cambiamos el valor del timer
    if (globals.levelChangeTimer.timeChangeCounter > globals.levelChangeTimer.timeChangeValue) {
        
        globals.levelChangeTimer.value--;

        //reseteamos timeChangeCounter
       globals.levelChangeTimer.timeChangeCounter = 0;

    }
}
function updateLevelWithCurrentNum()
{
    switch (globals.currentLevel) {
        case 0:
            globals.enemyCuantity = 3;

            break;
        
        case 1:
            globals.enemyCuantity = 5;

            break;

         case 2:
            globals.enemyCuantity = 6;

            break;

        case 3:
            globals.enemyCuantity = 10;

            break;

            
    
        default:
            break;
    }
}
function updateOilLevels(sprite)
{
    if (sprite.oil <= 0) {
        sprite.oil = 25;
        globals.levelTime.value -= 70
    }
}
function updateFreezeTimer()
{
    //incrementamos el contador de cambio de valor
    globals.freezeTimer.timeChangeCounter += globals.deltaTime;
    //si ha pasado el timepo necesario, cambiamos el valor del timer
    if (globals.freezeTimer.timeChangeCounter > globals.freezeTimer.timeChangeValue) {
        
        globals.freezeTimer.value--;

        //reseteamos timeChangeCounter
       globals.freezeTimer.timeChangeCounter = 0;

    }
}
function updateStory()
{
  
}
function checkWinConditions()
{
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);

    if (player.yPos >= 600 && globals.currentLevel === 0) 
    {
        globals.gameState = Game.SENKYOU;    
        
        //reprocir musica
        globals.musics[globals.currentMusic].pause();
        globals.musics[globals.currentMusic].currentTime = 0;
        globals.currentMusic = MUSIC.MUSIC_MENU_2;

    }
    if (globals.currentLevel === 36 ) {

        globals.gameState = Game.SENKYOU;

        //reprocir musica
        globals.musics[globals.currentMusic].pause();
        globals.musics[globals.currentMusic].currentTime = 0;
        globals.currentMusic = MUSIC.MUSIC_MENU_2;
    }
}
function updateThankYou()
{
    
    
    
        
        initSpark();
        
    
    
    updateParticles();

    updateLevelTime();

    if (globals.action.menuReturn && globals.previousEscape === false) {

        
        globals.gameState = Game.GAME_OVER;
        globals.selectedOption = 6;

    }

    globals.previousEscape = globals.action.menuReturn;
}
function updateDemo()
{
    globals.currentLevel = 8;

    //fisica de sprites
    updateSprites();
    
    //tiempo
    updateLevelTime();

    //colisiones
    detectCollisions();
    
    //particulas
    updateParticles();

    //vida
    updateLife();

    //logica enemigos
    enemyLogic();

    //items
    updateItems();

    //gameover
    checkIfGameOver();
    //win
    checkWinConditions();
    if (globals.score >= 10000) {
        
        globals.gameState = Game.SENKYOU;
        globals.score = 0;
    }
}
function playSound()
{
    //reproduciomos el sonido de la musica invocada

    if (globals.currentSound != Sound.NO_SOUND) {
        
        //reproduciomos currentsound
        globals.sounds[globals.currentSound].currentTime = 0;
        globals.sounds[globals.currentSound].play();

        //reseteamos current sound
        globals.currentSound = Sound.NO_SOUND;

    }
}

function eventManager()
{


    //HORDA NIVEL 10
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    if (globals.currentLevel === 10) {
        
        if (globals.enemyCounter <= 0) {
            initArrow();
        
        if ( player.xPos >= 200) {
            globals.currentLevel += 1;
        }
    }
}

    //CAMBIO DE NIVEL (11 FADE OUT)
    // if (globals.currentLevel === 11 && player.yPos >= 85) {

    //     globals.ctx.globalAlpha = 0
    //     globals.gameState = Game.FREEZE
    // }

    //cambio de musica por pasillo
    musicChange();
}
function playMusic()
{
    //reproduciomos el sonido de la musica invocada
   
    musicChange();

    if (globals.currentMusic != MUSIC.NO_SOUND) {
        
        //reproduciomos currentsound
        globals.musics[globals.currentMusic].volume = globals.volume_music;
        globals.musics[globals.currentMusic].play();

    }
}
function musicChange()
{
    if (globals.gameState === Game.PLAYING && globals.boomboxPlaying === false) {

        if (globals.currentLevel >= 0 && globals.currentLevel < 9) {

            //reprocir musica
           
  
            globals.currentMusic = MUSIC.BELL_OF_BATTLE;
  
        }
        else if (globals.currentLevel >= 9  && globals.currentLevel < 18) {
  
          //reprocir musica
         
          globals.currentMusic = MUSIC.MEGAMAN_OP;
  
        }
        else if (globals.currentLevel >= 18  && globals.currentLevel < 27) {
    
            //reprocir musica
        
            globals.currentMusic = MUSIC.REACH_SUMMIT;

        }
        else if (globals.currentLevel >= 27  && globals.currentLevel < 36) {
        
            //reprocir musica
        
            globals.currentMusic = MUSIC.BATTLE_B2;

        }
    }
    

}
function buscarNumero(array, numero) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === numero) {
        return false;
      }
    }
  
    return true;
}

function manageBoomBox()
{
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    if (globals.gameState === Game.NEW_GAME && globals.action.menuEjec) {
        
    }
    

    if (globals.action.boomBoxChange && globals.previousBBChange === false) {
        globals.boomboxPlaying = true;
        initExplosion(player,"blue");

        globals.currentSound = Sound.SFX_WEED;

           //BOOMBOX FOR MUSIC
        globals.musics[globals.currentMusic].pause();
        globals.musics[globals.currentMusic].currentTime = 0;

        globals.currentMusic = Math.floor((Math.random() * 38));
        
        if (globals.currentMusic > 38) {
            globals.currentMusic = 1;
        }
        console.log("changeMusic: " + globals.currentMusic);

    }
    globals.previousBBChange = globals.action.boomBoxChange;
}
function postScore()
{
    if (globals.postedScores === false) {
          //Send data
     const objectToSend = {
        name:     globals.currentName,
        score:    globals.score,
    }

    //String data to send
    const dataToSend = '&name=' + objectToSend.name + '&score=' + objectToSend.score;

    console.log(dataToSend);

    //Ruta relativa al fichero que hace la petición (testAjax.php)
    const url =  "http://localhost:3000/server/routes/postClassic.php";
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function()
    {
        if(this.readyState == 4)
        {
            if(this.status == 200)
            {
                if(this.responseText != null)
                {
                    //console.log(this.responseText);
                    const resultJSON = JSON.parse(this.responseText);
                    //console.log(resultJSON);

                    //Meremos los datos en un array, ya que lo que nos devuelve la ruta es un objeto.
                    const arrayResult = [resultJSON];

                    //Iniciamos los datos
                    scoresAJAXRequest();
                }
                else
                    alert("Communication error: No data received");
            }
            else
                alert("Communication error: " + this.statusText);
        }
    }

    request.responseType = "text";
    request.send(dataToSend);
    

    }
   
}
function loadHighscores()
{
    globals.loadingItem += 0.01;

    if (globals.requestdedScores) {
        globals.selectedHighscore = 1;
        globals.gameState = Game.UPDATE_HIGHSCORES;

    }
    

}