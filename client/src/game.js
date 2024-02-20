import globals from "./globals.js";
import {initHTMLelements, initVars, loadAssets, initSprites, initTimers, initEvents, initParticles, initLevel0, initPotion} from "./initialize.js";
import update from "./gameLogic.js";
import render from "./gameRender.js";
import { MUSIC } from "./constants.js";

/////////////////////////////////////////////////////////////////////////////////
//GAME INIT
/////////////////////////////////////////////////////////////////////////////////

window.onload = init;

function init()
{
    //inicializamos los elementos HTML: canvas, context caja de texto
    initHTMLelements();

    //Cargamos todos los archivos: TILESET, IMAGES, SOUNDS
    loadAssets();

    //inicializamos los sprites
    initSprites();
    
    //inicializacion de variables del juego
    initVars();

    //inicializamos el mapa del juego
    initLevel0();
    
    //iniciamos Events
    initEvents();

    //iniciamos timer
    initTimers();

    //iniciamos particulas
    initParticles();
    
    //Sart the first frame request
    window.requestAnimationFrame(gameLoop);

}


/////////////////////////////////////////////////////////////////////////////////
//GAME EXECUTE
/////////////////////////////////////////////////////////////////////////////////


//bucle principal de ejecucion
function gameLoop(timeStamp)
{
    //keep requesting new frames
    window.requestAnimationFrame(gameLoop, globals.canvas);

    //timepo real de ciclo de ejecucion
    const elapseCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000; // seconds

    //tiempo anterior de ciclo de ejecucion
    globals.previousCycleMilliseconds = timeStamp;

    //variable que corrige el tiempo de frame debido a retrasos con respecto al tiempo objetivo (frameTimeObj)
    globals.deltaTime += elapseCycleSeconds;

    globals.cycleRealTime += elapseCycleSeconds;


    if (globals.cycleRealTime >= globals.frameTimeObj)
    {

        //update the game logic
        update();
        //perform the drawing operation
        render();
        
        //corregimos los excesos de tiempo
        globals.cycleRealTime -= globals.frameTimeObj;
        globals.deltaTime = 0;
        //deltatime -= frametimeobj para estabilizar fps
    }



 
}
