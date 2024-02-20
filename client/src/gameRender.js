import globals from "./globals.js";
import { Game, SpriteID, Tile, LEVELID, State, ParticleID, ParticleState, CurrentLEVEL } from "./constants.js";
import { level1 } from "./Level.js";
import HitBox from "./HitBox.js";
import { initBar, initSplash } from "./initialize.js";


//Funcion que renderiza los graficos
export default function render()
{

    //change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            //draw loading
                loadGame();
            break;

        case Game.PLAYING:
            
            drawGame();
            break;
        case Game.FREEZE:
            
            drawFreezeGame();
            break;

        case Game.NEW_GAME:
            newGame();
            break;

        case Game.GAME_OVER:
            gameOver();
            break;

        case Game.WRITE_NAME:
            writeName();
            break;

        case Game.YOU_WIN_1:
            youWin();
            break;
        case Game.START:
            drawStart();
            break;
        case Game.STORY:
            showStory();
            break;

        case Game.CONTROLS:
            showControls();
            break;
        
        case Game.HIGHSCORES:
            showHighscores();
            break;
        case Game.UPDATE_HIGHSCORES:
            showHighscores();
            break;
        case Game.NEW_HIGHSCORES:
        showHighscores();
        break;
        case Game.LOAD_HIGHSCORES:
        //draw loading
            loadGame();
        break;
        case Game.SENKYOU:
            showThanYou();
            break;
        case Game.DEMO:
            drawGame();
            break;
        

        default:
            console.error("Error: Game state invalid");

    }


}

function showHighscores()
{

    globals.highscoreArray = sortScoresArray(globals.highscoreArray);


    let namesArray = [];
    
    let scoresArray = [];
    

    for (let index = 0; index < globals.highscoreArray.length; index++) {
        
        namesArray.push(globals.highscoreArray[index][0]);
        scoresArray.push(globals.highscoreArray[index][1])
        
    }

    
    
    //borramos la pantalla entera
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height);
    
    let xNum = centerText(24,10,256);
    //draw Highscores
    globals.ctx.font = '24px Autum';
    globals.ctx.fillStyle = 'orange';
    globals.ctx.fillText("HIGHSCORES", xNum ,22);

    xNum = centerText(12, 19 , 256 );
    //draw Controls
    globals.ctx.font = '12px Autum';
    globals.ctx.fillStyle = 'cyan';
    globals.ctx.fillText("NAMES" + "         " + "SCORE", xNum ,52);
    let i = 94; 
    let j = 22;
    let z = 188;
    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'purple';
    globals.ctx.fillText( "HS " + namesArray[0] + "               " + scoresArray[0] , j ,74);
    for (let index = 0; index < 8; index++ ) {
        
        
        
            //draw name
            globals.ctx.font = '8px emulogic';
            if (globals.highscoresTimer.value % 2 != 0) {

                globals.ctx.font = '8.08px emulogic';

            }
            globals.ctx.fillStyle = 'lightblue';
            if (index === 0) {
            
                globals.ctx.fillStyle = 'purple';
                
            }
            if (namesArray[globals.selectedHighscore + index] != undefined) {
               
                globals.ctx.fillText(globals.selectedHighscore + 1 + index + " " + namesArray[globals.selectedHighscore + index] , j ,i);
                globals.ctx.fillText(scoresArray[globals.selectedHighscore + index],z,i);
            }
            
            i += 12;
        }
    
   

}
function showStory()
{
      //borramos la pantalla entera
      globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height);
      globals.ctx.save();
    if (globals.transition <= 0) {
        
    }
    else {

        moveCamera();

    }

    let xNum = centerText(16,5,256);
      //draw name
     globals.ctx.font = '16px Autum';
     globals.ctx.fillStyle = 'orange';
     globals.ctx.fillText("Story", xNum ,16);
     globals.ctx.font = '10px emulogic';
     globals.ctx.fillStyle = 'cyan';

     xNum = centerText(10,21,256);
     globals.ctx.fillText("Once Upon a Time...",xNum, 36);

     let i = 38;

      //draw name
      globals.ctx.font = '10px minecraft';
      globals.ctx.fillStyle = 'lightblue';
      i = 50
    
    const story = ". . . Angelo the herbalist was a strange man, he spent his days performing sinister experiments in his basement. Until one day, while wandering around the mansion with his trusty lamp, he tripped, and the oil he spilled caused a fire. That pyrotechnic show awakened something in both Angelo, and the lamp. but our villain couldn't stay in town any longer. Accused of property damage and murder, Angelo flees into the forest... ";
    //const story = ". . . Angelo "+ "the " + "herbalist "+  "was "+ "a "+ "strange "+ "man, "+ "he " +"spent "+ "his "+"days "+"performing "+"sinister "+"experiments "+"in "+"his "+"basement. "+"Until "+"one "+"day, "+"while "+"wandering "+"around "+"the "+"mansion "+"with "+"his "+"trusty "+"lamp, "+"he "+"tripped, "+"and "+"the "+"oil "+"he "+"spilled "+"caused "+"a "+"fire. "+"That "+"pyrotechnic "+"show "+"awakened "+"something "+"in "+"both "+"Angelo, "+"and "+"the "+"lamp. "+"but "+"our "+"villain "+"couldn't "+"stay "+"in "+"town "+"any "+"longer. "+"Accused "+"of "+"property "+"damage "+"and "+"murder, "+"Angelo "+"flees "+"into "+"the "+"forest... ";
    const storyWords = story.split(' ');
    wrapText(globals.ctx, story, 20, 56, 218,12)


      globals.ctx.font = '8px Autum';
      globals.ctx.fillText("Press ESC button to go back", 22 , 198);
    
    
    restoreCamera();

}
function wrapText(context, text, x, y, maxWidth, lineHeight)
{
   //Separaremos todo el texto en base a sus espacios y lo meteremos en un array que contendra cada palabra que se escribirá
   const textToType = text.split(' ');
   let line = '';
   //Recorre cada palabra del texto
   for (let i = 0; i < textToType.length; i++)
   {
    
       let testLine = line + textToType[i] + ' ';      //Escribimos una linea de prueba que contiene la palabra actual
       let metrics = context.measureText(testLine);    //Obtenemos los datos de la linea
       let testWidth = metrics.width;                  //Obtenemos el width de dicha linea

    
       //Si el width de la linea es mayor que el que hemos escogido nosotros y no estamos en la primera palabra, haremos el salto de linea
       if (testWidth > maxWidth && i > 0)
       {
           context.fillText(line, x, y);               //Dibuja la linea en las coordenadas que hemos indicado
           line = textToType[i] + ' ';                 //Reinicia la linea con la palabra actual y ajusta las coordenadas para la proxima linea
           y += lineHeight;                            //Incrementamos la coordenada Y (para que se escriba mas abajo que la linea actual)
       }
       else //Sino seguiremos construyendo la linea actual
       {
           line = testLine;                           
       }
   }


   context.fillText(line, x, y); //Dibuja la ultima linea o en caso de ser un texto muy corto la unica linea que haya
}
function gameOver()
{
        //borramos la pantalla entera
        globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height);
        let xNum = centerText(29,9,256);
        //draw GAMEOVER
        globals.ctx.font = '40px madlad1';
        globals.ctx.fillStyle = 'orange';
        globals.ctx.fillText("game over", xNum ,96);


        xNum = centerText(16,5,256);
        //draw SCORE
        globals.ctx.font = '16px emulogic';
        globals.ctx.fillStyle = 'lightblue';
        globals.ctx.fillText("SCORE", xNum ,16);

        let numnum = count(globals.score);
        xNum = centerText(16,numnum,256);
        


        globals.ctx.font = '16px emulogic';
        globals.ctx.fillStyle = 'white';
        globals.ctx.fillText(globals.score, xNum ,36);

        xNum = centerText(16,11,256);
        //draw name
        globals.ctx.font = '16px emulogic';
        if (globals.selectedOption === 6) {
        
            globals.ctx.fillStyle = 'purple';
            
         }
         else
         {
            globals.ctx.fillStyle = 'lightblue';
    
         }
        globals.ctx.fillText("INSERT NAME", xNum ,122);

        xNum =centerText(16,3,256);
        
        //draw return
        globals.ctx.font = '16px emulogic';
        globals.ctx.fillStyle = 'lightblue';
        
        globals.ctx.fillText(globals.currentName, xNum ,142);

        xNum = centerText(8,6,128);
        //draw return
        globals.ctx.font = '8px emulogic';
        if (globals.selectedOption === 7) {
        
            globals.ctx.fillStyle = 'purple';
            
         }
         else
         {
            globals.ctx.fillStyle = 'lightblue';
    
         }
        globals.ctx.fillText("RETURN", xNum ,176);

        xNum = centerText(8,10,128);
        //draw highscores
        globals.ctx.font = '8px emulogic';
        if (globals.selectedOption === 8) {
        
            globals.ctx.fillStyle = 'purple';
            
         }
         else
         {
            globals.ctx.fillStyle = 'lightblue';
    
         }

        globals.ctx.fillText("HIGHSCORES",+128 ,176);

        drawTriangle(globals.selectedOption);


}
function writeName()
{
      //borramos la pantalla entera
      globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height);
    
     
      

      let xposition = 10;
      let yPos      = 10;
       
      globals.ctx.font = '8px emulogic';
      globals.ctx.fillStyle = 'white';

      for (let index = 0; index < globals.letters.length; index++) {
          
          for (let j = 0; j < globals.letters[index].length; j++) {

            globals.ctx.fillStyle = 'white';

             if (globals.currentLetterPos[0] === index && globals.currentLetterPos[1] === j) {
                globals.ctx.fillStyle = "red";
                globals.ctx.fillText(globals.letters[index][j],58 + 16*j ,64+ 32*index);
               
             }
             else {

                globals.ctx.fillText(globals.letters[index][j],58 + 16*j ,64+ 32*index);

             }

          }
          
      }


        switch (globals.nameProgress) {
            case 0:
                globals.ctx.fillText(globals.letter1, 64 + 32*1,160);

                globals.ctx.fillStyle = "red";
                globals.ctx.beginPath();
                globals.ctx.rect(90, 170, 20, 10);
                globals.ctx.fill();
                if (globals.letter1 != "") {
                    
                    globals.nameProgress += 1;
                    
                }
                break;
            case 1:

            globals.ctx.fillText(globals.letter1, 64 + 32*1,160);
            globals.ctx.fillText(globals.letter2, 64 + 32*2,160);
            
                globals.ctx.fillStyle = "red";
                globals.ctx.beginPath();
                globals.ctx.rect(123, 170, 20, 10);
                globals.ctx.fill();
                if (globals.letter2 != "") {
                    
                    globals.nameProgress += 1;
                    
                }
                break;
            case 2:
            globals.ctx.fillText(globals.letter1, 64 + 32*1,160);
            globals.ctx.fillText(globals.letter2, 64 + 32*2,160);    
            globals.ctx.fillText(globals.letter3, 64 + 32*3,160);

                globals.ctx.fillStyle = "red";
                globals.ctx.beginPath();
                globals.ctx.rect(155, 170, 20, 10);
                globals.ctx.fill();
                if (globals.letter3 != "") {
                    
                    globals.nameProgress += 1;

                    
                }
                break;
            case 3:
                globals.ctx.fillText(globals.letter1, 64 + 32*1,160);
                globals.ctx.fillText(globals.letter2, 64 + 32*2,160);    
                globals.ctx.fillText(globals.letter3, 64 + 32*3,160);
    
                globals.ctx.fillStyle = "red";
                globals.ctx.beginPath();
                globals.ctx.rect(90, 170, 20, 10);
                globals.ctx.fill();

                globals.ctx.fillStyle = "red";
                globals.ctx.beginPath();
                globals.ctx.rect(123, 170, 20, 10);
                globals.ctx.fill();

                globals.ctx.fillStyle = "red";
                globals.ctx.beginPath();
                globals.ctx.rect(155, 170, 20, 10);
                globals.ctx.fill();
                
                   
                    break;
            default:
                break;
        }
       
        
}
function youWin()
{
        //borramos la pantalla entera
        globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height);
        let score = globals.score;
        let xNum = centerText(26,10,256);
        //draw GAMEOVER
        globals.ctx.font = '38px madlad1';
        globals.ctx.fillStyle = 'orange';
        globals.ctx.fillText("next stage", xNum ,globals.canvas.height/2);


        xNum = centerText(16,5,256);
        //draw SCORE
        globals.ctx.font = '16px emulogic';
        globals.ctx.fillStyle = 'lightblue';
        globals.ctx.fillText("SCORE", xNum ,26);

        let numnum = count(globals.score);
        xNum = centerText(16,numnum,256);

        globals.ctx.font = '16px emulogic';
        globals.ctx.fillStyle = 'white';
        globals.ctx.fillText(score, xNum ,56);


        xNum = centerText(8,26,256);
        //draw return
        globals.ctx.font = '8px emulogic';
        
        globals.ctx.fillText("press spacebar to continue", xNum ,176);


}
function drawStart()
{
    //borramos la pantalla entera
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height);

   let xNum = centerText(8,26,256);
    //draw return
    globals.ctx.font = '8px emulogic';
    
    globals.ctx.fillText("press spacebar to continue", xNum ,globals.canvas.height/2);
}
function count(number)
{
   
        let count = 0;
        if (number < 1000000) {
            count = 7;
        }
        if (number < 100000) {
            count = 6;
        }
        if (number < 10000) {
            count = 5;
        }
        if (number < 1000) {
            count = 3;
        }
        if (number < 100) {
            count = 2;
        }
        if (number < 10) {
            count = 1;
        }
        
        
        
        
        
      
        return count;
      
}
function showControls()
{
    //borramos la pantalla entera
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height);

    let xNum = centerText(24,8, 256);
    
    
    
    //draw Controls
    globals.ctx.font = '24px Autum';
    globals.ctx.fillStyle = 'orange';
    globals.ctx.fillText("CONTROLS", xNum ,26);

    xNum = centerText(16,8,256);

    globals.ctx.font = '16px emulogic';
    globals.ctx.fillStyle = 'cyan';
    globals.ctx.fillText("Movement", xNum ,56);
    
    //draw Controls
    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'lightblue';
    globals.ctx.fillText("W - Jump", 40 , 62+12);
    
     //draw Controls
    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'lightblue';
    globals.ctx.fillText("A - Left", 40 , 62+24);

     //draw Controls
    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'lightblue';
    globals.ctx.fillText("D - Right", 40 , 62+36);
    
    xNum = centerText(16,7,256);

    globals.ctx.font = '16px emulogic';
    globals.ctx.fillStyle = 'cyan';
    globals.ctx.fillText("Actions", xNum ,136);

     //draw Controls
    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'lightblue';
    globals.ctx.fillText("K - Throw far", 40 , 142+12);

    //draw Controls
    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'lightblue';
    globals.ctx.fillText("H - Use Potion", 40 , 142+24);

    //draw Controls
    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'lightblue';
    globals.ctx.fillText("J - Melee", 40 , 142+36);

    //draw Controls
    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'lightblue';
    globals.ctx.fillText("L - Throw close", 40 , 142+48);



}
function newGame()
{

    //borramos la pantalla entera
    globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height);

    //renderMap(globals.level[LEVELID.LEVEL_0]);
    renderMenuFire();

    let xNum = centerText(16,15,256);
    //draw name
     globals.ctx.font = '16px Autum';
     globals.ctx.fillStyle = 'orange';
     globals.ctx.fillText("THE LAMP IS LOW", xNum ,26);
    
    
    xNum = centerText(16,8,256);
    //draw new game
     globals.ctx.font = '16px emulogic';
     if (globals.selectedOption === 1) {
        
        globals.ctx.fillStyle = 'purple';
        
     }
     else
     {
        globals.ctx.fillStyle = 'lightblue';

     }
     globals.ctx.fillText("NEW GAME",xNum,40+32);
     
    xNum = centerText(8,5,256);
     //draw story
     globals.ctx.font = '8px emulogic';
     if (globals.selectedOption === 2) {
        
        globals.ctx.fillStyle = 'purple';
        
     }
     else
     {
        globals.ctx.fillStyle = 'lightblue';

     }
     globals.ctx.fillText("STORY",xNum,58+32);
     
     xNum = centerText(8,8,256);
     //draw controls
     globals.ctx.font = '8px emulogic';
     if (globals.selectedOption === 3) {
        
        globals.ctx.fillStyle = 'purple';
        
     }
     else
     {
        globals.ctx.fillStyle = 'lightblue';

     }
     globals.ctx.fillText("CONTROLS",xNum,76+32);

    xNum = centerText(8,10,256);
     //draw highscores
     globals.ctx.font = '8px emulogic';
     if (globals.selectedOption === 4) {
        
        globals.ctx.fillStyle = 'purple';
        
     }
     else
     {
        globals.ctx.fillStyle = 'lightblue';

     }
     globals.ctx.fillText("HIGHSCORES",xNum,94+32);

     xNum = centerText(8,4,256);
     //draw Demo
     globals.ctx.font = '8px emulogic';
     if (globals.selectedOption === 5) {
        
        globals.ctx.fillStyle = 'purple';
        
     }
     else
     {
        globals.ctx.fillStyle = 'lightblue';

     }
     globals.ctx.fillText("DEMO",xNum,114+32);


    xNum = centerText(8,18,256);
     //navegate menuj
     globals.ctx.font = '8px emulogic';
     globals.ctx.fillStyle = 'lightblue';
     globals.ctx.fillText("Navegate Menu With",xNum,140+32);


    xNum = centerText(5,34,256);
    globals.ctx.font = '5px emulogic';
    globals.ctx.fillText("ArrowUp, ArrowDown, Space and  ESC", xNum,150+32);

   drawTriangle(globals.selectedOption);
   renderParticles();
}
function renderMenuFire()
{
    renderSprite(globals.sprites[SpriteID.ENEMY]);
    renderSprite(globals.sprites[SpriteID.PLAYER]);
    renderSprite(globals.sprites[SpriteID.LAMP]);
}
function loadGame()
{
        //borramos la pantalla entera
        globals.ctx.clearRect(0,0, globals.canvas.width, globals.canvas.height);
        
    drawProgressBarCircle(globals.ctx,128,96,60, globals.loadingItem,100)

        
        if (globals.loadingItem > 1) {
            globals.loadingItem = 0;
        }   
}
function drawGame()
{
    //borramos la pantalla entera
    globals.ctx.clearRect(0,0,globals.canvas.width,globals.canvas.height);
    //dibujamos el fondo del mapa
    renderBackround();

      //dibujamos el mapa de hora si es 
      drawHordeTimer();

      drawEnemyCounter();

    //dibujamos el mapa (nivel)
    renderMap(globals.level[globals.currentLevel]);

    //dibujamos elementos
    drawSprites();
    
    //dibujamos particulas
    renderParticles();

    //dibujamos HUD
    renderHUD();
  

}
function drawFreezeGame()
{
    //borramos la pantalla entera
    globals.ctx.clearRect(0,0,globals.canvas.width,globals.canvas.height);
   

  
    //dibujamos particulas
    renderParticles();
    //dibujamos HUD

    let xNum;
    

    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);

    if (globals.currentLevel === 12) {
        
        globals.ctx.globalAlpha = 1.0;
        globals.ctx.font = '32px emulogic';
        globals.ctx.fillStyle = 'blue';
        xNum = centerText(32,1,256);
        globals.ctx.fillText(globals.freezeTimer.value,xNum,102+32);
        globals.ctx.globalAlpha = 0;
        
    }
    else
    {
        xNum = centerText(16,14,256);
        //draw new game
        globals.ctx.font = '16px emulogic';
        globals.ctx.fillStyle = 'red';
        globals.ctx.fillText("READY PLAYER 1",xNum,60+32);

        xNum = centerText(16,1,256);
        globals.ctx.fillText(globals.freezeTimer.value,xNum,100+32);
    }
    renderParticles();

}
function renderBackround()
{
    const background = new Image();
    background.src = "./images/spriteSheet.png";
    const x = 0;
    const y = 512+192;
    const xPos =  0;
    const yPos = 0;
    const ancho = 256;
    const alto = 180;

    globals.ctx.drawImage(background, x, y, ancho, alto,xPos,yPos,256,158);
}
function renderMap(level)
{
     const brickSize = level.imageSet.gridSize;
     const levelData = level.data;

     //dibujamos el mapa
     const num_fil = levelData.length;
     const num_col = levelData[0].length;
    

     for (let i = 0; i < num_fil; i++) {
        
         for (let j = 0; j < num_col; j++) {
            
             const xTile = (levelData[i][j] -1) * brickSize;
             const yTile = 0;
             const xPos = j * brickSize;
             const yPos = i * brickSize;

             //dibujamos el nuevo fotograma del sprite en la posicion adecuada
             globals.ctx.drawImage(
                 globals.tileSets[Tile.SIZE_16], //image file
                 xTile, yTile,                   //source x and y position
                 brickSize, brickSize,           //source height and width
                 xPos, yPos,                     //detination x and y position
                 brickSize, brickSize,           //destination height and width
             );

         }
        
     }
        
    
}
function drawSprites()
{
    for (let index = 0; index < globals.sprites.length; index++) {
        
        const sprite = globals.sprites[index];

        //TEST: dibuja un rectangulo al rededor del sprite

        renderSprite(sprite);
    }
}
function renderHUD()
{


//TEST: datos metidos en bruto
let time = globals.levelTime.value;
let highScore = globals.highscore[1];
let score = globals.score;
let life = globals.life;

let madness = globals.sprites[SpriteID.LAMP].oil;
let madTime = time/8;

// Draw madness
globals.ctx.font = '8px emulogic';
globals.ctx.fillStyle = 'purple';
globals.ctx.fillText("MADNESS", 108, 206);


drawRectangle(10,madTime, 172,197,"mediumorchid");
initBar(1); 
// Draw madness
globals.ctx.font = '8px emulogic';
globals.ctx.fillStyle = 'goldenrod';
globals.ctx.fillText("LAMP", 108, 188);

drawRectangle(10,madness,172,180,"gold")

// Draw high score
globals.ctx.font = '8px emulogic';
globals.ctx.fillStyle = 'darkorchid';
globals.ctx.fillText("HS", 218, 176);
globals.ctx.fillStyle = 'lightgray';
globals.ctx.fillText(" " + highScore, 198, 186);


// Draw score
globals.ctx.font = '8px emulogic';
globals.ctx.fillStyle = 'blueviolet';
globals.ctx.fillText("SCORE", 206, 196);
globals.ctx.fillStyle = 'lightgray';
globals.ctx.fillText(" " + score, 202, 206);



let xNum = centerText(8,4,178);
// Draw life 
globals.ctx.fillStyle = 'lightblue';
//globals.ctx.fillText("LIFE", xNum, 176);

drawProgressBarCircle(globals.ctx,xNum+12,194,12,life);


}
function drawHordeTimer()
{
    if (globals.currentLevel ===  CurrentLEVEL.LEVEL_8 && globals.gameState != Game.DEMO && globals.hordeTimer.value >= 0) {
        // Draw madness
        let numnum = 2;
        if (globals.hordeTimer.value <= 9) {
            numnum = 1;
        }
        let xNum = centerText(96,numnum,256);
            globals.ctx.font = '96px emulogic';
            globals.ctx.fillStyle = 'purple';
            globals.ctx.fillText(globals.hordeTimer.value, xNum, globals.canvas.height/2 + 20);
    }
}
function drawEnemyCounter()
{
    if (globals.currentLevel === 10 && globals.gameState != Game.DEMO && globals.enemyCounter >= 0) {
        // Draw madness
        let numnum = 2;
        if (globals.enemyCounter <= 9) {
            numnum = 1;
        }
        let xNum = centerText(96,numnum,256);
            globals.ctx.font = '96px emulogic';
            globals.ctx.fillStyle = 'cyan';
            globals.ctx.fillText(globals.enemyCounter, xNum, globals.canvas.height/2 -20);
    }
}
function renderSprite(sprite)
{
    const lamp = globals.sprites.find((Lamp) => Lamp.id === SpriteID.LAMP);


    //calculamos la posicion del tile de inicio
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

    //calculamos la posicion en el tiempo a dibujar
    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);
    if (sprite.rotating === true && sprite === lamp) {
       
        globals.ctx.save();

        rotateSprite(sprite,xTile,yTile);
    
        globals.ctx.restore(); 
    }
    else
    {
        renderImage(sprite,xTile,yTile,xPos,yPos);
    }


    
}
function renderImage(sprite,xTile,yTile,xPos,yPos)
{
    
        globals.ctx.drawImage(
            globals.tileSets[Tile.SIZE_32],                                //the image file
            xTile, yTile,                                   //the source x and y position
            sprite.imageSet.xSize, sprite.imageSet.ySize,   //the source height and width
            xPos, yPos,                                     //the destination x and y position
            sprite.imageSet.xSize, sprite.imageSet.ySize,   //the destination height and width
            
            );
}
function rotateSprite(sprite,xTile,yTile)
{
    const lamp = globals.sprites.find((Lamp) => Lamp.id === SpriteID.LAMP);

    if (sprite === lamp && sprite.rotating === true) 
    {
        
    let xPos = Math.floor(sprite.xPos) + (sprite.imageSet.xSize / 2);
    let yPos = Math.floor(sprite.yPos) + (sprite.imageSet.ySize / 2);

    //Nos desplazamos al centro del sprite
    globals.ctx.translate(xPos , yPos);

    //giramos 30grados
    globals.lampAngle;
    globals.lampAngle += 10 ;
    let angle_radians = globals.lampAngle * Math.PI / 180;
    globals.ctx.rotate(angle_radians);

        renderImage(sprite,xTile,yTile,0,0)
        //restauramos el contexto
       
    }
}
function drawSpriteRectangle(sprite)
{
    //datos del sprite
    const x1 = Math.floor(sprite.xPos);
    const y1 = Math.floor(sprite.yPos);
    const w1 = sprite.imageSet.xSize;
    const h1 = sprite.imageSet.ySize;

    globals.ctx.fillStyle = "green";
    globals.ctx.fillRect(x1,y1,w1,h1);

}
// Function to draw a single heart icon
function drawHeart(ctx , x, y, size) {

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + size * 0.3, y, x + size * 0.5, y - size * 0.1, x + size * 0.7, y);
    ctx.bezierCurveTo(x + size, y - size * 0.1, x + size * 0.8, y + size * 0.3, x + size * 0.5, y + size * 0.1);
    ctx.bezierCurveTo(x + size * 0.2, y + size * 0.3, x, y + size * 0.1, x, y);
    ctx.closePath();
  
    ctx.fillStyle = 'red';
    ctx.fill();
  }
  function drawProgressBarCircle(ctx, x, y, radius, progress) {
    // Clear the previous circle if needed
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  
    // Draw the fill portion of the circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, progress * 2 * Math.PI);
    ctx.fillStyle = 'green'; // Adjust this color as needed
    ctx.fill();
   
  }
  function centerText(charWidth, charNum, screen)
  {
    
    const totalWidth = charWidth * charNum;

    const screenCenter = screen / 2;

    return screenCenter - totalWidth/2;

  }
function drawTriangle(action)
{
    
    switch (action) {
        case 1:
            globals.ctx.beginPath();
            globals.ctx.moveTo(40, 60);
            globals.ctx.lineTo(60, 60);
            globals.ctx.lineTo(50 , 69);
            globals.ctx.closePath();

            globals.ctx.fillStyle = "blue";
            globals.ctx.fill();
            break;
        case 2:
            globals.ctx.beginPath();
            globals.ctx.moveTo(40, 82);
            globals.ctx.lineTo(60, 82);
            globals.ctx.lineTo(50 , 91);
            globals.ctx.closePath();

            globals.ctx.fillStyle = "blue";
            globals.ctx.fill();
        
            break;
        
        case 3: 

            globals.ctx.beginPath();
            globals.ctx.moveTo(40, 100);
            globals.ctx.lineTo(60, 100);
            globals.ctx.lineTo(50 , 109);
            globals.ctx.closePath();

            globals.ctx.fillStyle = "blue";
            globals.ctx.fill();
            break;
        
        case 4:

            globals.ctx.beginPath();
            globals.ctx.moveTo(40, 118);
            globals.ctx.lineTo(60, 118);
            globals.ctx.lineTo(50 , 127);
            globals.ctx.closePath();

            globals.ctx.fillStyle = "blue";
            globals.ctx.fill();

            break;

            case 5:

            globals.ctx.beginPath();
            globals.ctx.moveTo(40, 138);
            globals.ctx.lineTo(60, 138);
            globals.ctx.lineTo(50 , 147);
            globals.ctx.closePath();

            globals.ctx.fillStyle = "blue";
            globals.ctx.fill();

            break;

        case 7:

            globals.ctx.beginPath();
            globals.ctx.moveTo(50, 154);
            globals.ctx.lineTo(70, 154);
            globals.ctx.lineTo(60 , 163);
            globals.ctx.closePath();

            globals.ctx.fillStyle = "blue";
            globals.ctx.fill();
            break;
        
        case 8:

            globals.ctx.beginPath();
            globals.ctx.moveTo(160, 154);
            globals.ctx.lineTo(180, 154);
            globals.ctx.lineTo(170 , 163);
            globals.ctx.closePath();

            globals.ctx.fillStyle = "blue";
            globals.ctx.fill();
            break;
        
        case 6:

            globals.ctx.beginPath();
            globals.ctx.moveTo(15, 106);
            globals.ctx.lineTo(35, 106);
            globals.ctx.lineTo(25 , 115);
            globals.ctx.closePath();

            globals.ctx.fillStyle = "blue";
            globals.ctx.fill();
            break;

        default:
            console.log("error:numerin del triangulo mal");
            break;
    }
    

}
function drawRectangle(alto, ancho,xPos,yPos,color)
{
    globals.ctx.beginPath();
    globals.ctx.moveTo(xPos, yPos);
    globals.ctx.lineTo(xPos+ancho, yPos);
    globals.ctx.lineTo(xPos+ancho, yPos+alto);
    globals.ctx.lineTo(xPos, yPos+alto);
    globals.ctx.closePath();

    globals.ctx.fillStyle = color;
    globals.ctx.fill();
}
function drawHitBox(sprite)
{
    if (sprite.state != State.INVALID) {
        const x1 = Math.floor(sprite.xPos) + Math.floor(sprite.hitBox.xOffset);
        const y1 = Math.floor(sprite.yPos) + Math.floor(sprite.hitBox.yOffset);
        const w1 = sprite.hitBox.xSize;
        const h1 = sprite.hitBox.ySize;

        globals.ctx.strokeStyle = "blue";
        globals.ctx.strokeRect(x1,y1,w1,h1);
    }
    
}
function renderParticles()
{
    for (let index = 0; index < globals.particles.length; index++) {
        
        const particle = globals.particles[index];
        renderParticle(particle);

    }
}
function renderParticle(particle)
{
    const type = particle.id;

    switch (type) {
        case ParticleID.EXPLOSION:
            renderExplosionParticle(particle);
            break;
        case ParticleID.DUST:
            renderDustParticle(particle);
            break;
        case ParticleID.SPLASH:
            renderSplashParticle(particle);
            break;
        case ParticleID.BAR:
            renderBarParticle(particle);
            break;
        case ParticleID.SPARK:
            renderSparkParticle(particle);
            break;
        case ParticleID.ARROW:
            renderArrowParticle(particle);
            break;
        case ParticleID.ENEMY:
            renderDustParticle(particle);
            break;
        default:
            break;
    }
}
function renderExplosionParticle(particle)
{
    if (particle.state != ParticleState.OFF) 
    {
        globals.ctx.fillStyle = 'purple'
        globals.ctx.globalAlpha = particle.alpha; //set alpha
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0; //restore alpha    
    }
}
function renderDustParticle(particle)
{
    if (particle.state != ParticleState.OFF && globals.gameState === Game.PLAYING || globals.gameState === Game.DEMO) 
    {
        globals.ctx.fillStyle = particle.color;
        globals.ctx.globalAlpha = particle.alpha; //set alpha
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0; //restore alpha    
    }
}
function renderSplashParticle(particle)
{
    if (particle.state != ParticleState.OFF) 
    {
        if (particle.color === 1) {
            globals.ctx.fillStyle = 'red'
        }
        else if (particle.color === 0) {
            globals.ctx.fillStyle = 'yellow'
        }
        else {
            globals.ctx.fillStyle = 'orange'

        }
        globals.ctx.globalAlpha = particle.alpha; //set alpha
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0; //restore alpha    
    }
}
function renderBarParticle(particle)
{
    if (particle.state != ParticleState.OFF && globals.gameState === Game.PLAYING || globals.gameState === Game.DEMO) 
    {
        globals.ctx.fillStyle = particle.color;
        globals.ctx.globalAlpha = particle.alpha; //set alpha
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0; //restore alpha    
    }
}
function renderSparkParticle(particle)
{
    if (particle.state != ParticleState.OFF) 
    {
        globals.ctx.fillStyle = particle.color;
        globals.ctx.globalAlpha = particle.alpha; //set alpha
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0; //restore alpha    
    }
}
function renderArrowParticle(particle)
{
    if (particle.state != ParticleState.OFF) 
    {
        globals.ctx.fillStyle = particle.color;
        globals.ctx.globalAlpha = particle.alpha; //set alpha
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill()
        globals.ctx.globalAlpha = 1.0; //restore alpha    
    }
}
function moveCamera(){
    globals.ctx.translate(0,globals.transition);
    globals.transition -= 0.6;
}
function restoreCamera()
{
    globals.ctx.setTransform(1,0,0,1,0,0);
}
function showThanYou()
{
    globals.ctx.clearRect(0,0,globals.canvas.width,globals.canvas.height);
    
    renderBackround();
    //dibujamos el mapa (nivel)
    renderMap(globals.level[globals.currentLevel]);

    globals.ctx.save();

    if (globals.transition <= 0) {
        
    }
    else {

        moveCamera();

    }

    let i = 38;

    //draw name
    globals.ctx.font = '10px minecraft';
    globals.ctx.fillStyle = 'lightblue';
    i = 50
  
    const story = "After his adventure in the forest, Angelo encounters some children and feels the urge to make toys for them for some reason (remember our villain is kinda Crazy, things happen). What will the future hold for our villain? ... ";
    wrapText(globals.ctx, story, 20, 36, 218,12)
        
    let xNum = centerText(8,20,256);
      //draw name
     globals.ctx.font = '8px emulogic';
     globals.ctx.fillStyle = 'orange';
     globals.ctx.fillText("Thank You For Paying", xNum ,146);

     xNum = centerText(8,11,256);
     //draw name
    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'orange';
    globals.ctx.fillText("YOUR SCORE:", xNum ,160);

    xNum = centerText(8,5,256);

    globals.ctx.fillText(globals.score, xNum ,172);


     xNum = centerText(8,27,256);
     globals.ctx.fillText("Press ESC to return to menu", xNum ,196);


     restoreCamera();

     renderParticles();
}
function sortScoresArray(array)
{

    for (let index = 0; index < array.length - 1; index++) {
        
        for (let j = index+1; j < array.length; j++) {
            let num = Number(array[index][1]);
            let pos = Number(array[j][1]);
            if (num < pos) {
                const aux = array[index];
                array[index] = array[j];
                array[j] = aux;
            }
            
        }

    }
    return array;
}

export {
    sortScoresArray,
}