import globals from "./globals.js";
import { Game, FPS, SpriteID, State, ParticleState, ParticleID, CurrentLEVEL, Sound, GRAVITY } from "./constants.js";
import Sprite, { Enemy, Fire, Lamp, Token, Weed } from './Sprite.js';
import ImageSet from './imageSet.js'
import Frames from './Frames.js'
import { Level, level0, level1, level10, level11, level12, level13, level14, level15, level16, level17, level18, level19, level2, level20, level21, level22, level23, level24, level25, level26, level27, level28, level29, level3, level30, level31, level32, level33, level34, level35, level36, level4, level5, level6, level7, level8, level9 } from "./Level.js";
import Timer from "./Timer.js";
import Physics from "./Physics.js";
import { KeydownHandler, KeyupHandler ,updateMusic} from "./events.js";
import HitBox from "./HitBox.js";
import {ExplosionParticle , Dust, Splash, Bar, Spark, Arrow, EnemyParticle} from "./Particle.js";
import { findVariable } from "./collisions.js";
import Score from "./scoresData.js";
import { sortScoresArray } from "./gameRender.js";

//funcion que inicializa los elementos HTML
function initHTMLelements()
{
    //canvas
    globals.canvas = document.getElementById('gameScreen');

    //context
    globals.ctx = globals.canvas.getContext('2d');

    
    //eliminacion del anti-aliasing
    globals.ctx.imageSmoothingEnabled = false;

    //caja de texto de pruebas
    globals.txtPruebas = document.getElementById('txtPruebas');

}

//funcion que inicializa las variables del juego
function initVars()
{
    //inicializamos las variables de gestion de tiempo
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS;  //frame time in seconds

    //inicializamos el estado de juego
    globals.gameState = Game.LOADING;

    //inicializamos los estados de las acciones
    globals.action = {

        moveLeft: false,
        moveRight: false,
        jump: false,
        throw: false,
        firebreath: false,
        drink: false,
        menuUp: false,
        menuDown: false,
        menuLeft: false,
        menuRight: false,
        menuEjec: false,
        menuReturn: false,
        boomBoxChange: false,


    }

    globals.letters = [["Q","W","E","R","T","Y","U","I","O","P"],
                      ["A","S","D","F","G","H","J","K","L","Ñ"],
                      ["Z","X","C","V","B","N","M","X","X","X"],
                      ];
    
    
    scoresAJAXRequest();
    sortScoresArray(globals.highscoreArray);
    //variables de logica de juego
    globals.life = 1;
    globals.currentLevel = 1;
    globals.currentSound = Sound.NO_SOUND;
    globals.unableToChangeDownLvl = [8,9,10,11];
    globals.unableToChangeUpLvl = [10];

}

//carga de activos:TILEMAPS, IMAGES, SOUNDS
function loadAssets()
{

    let tileSet;

    //load the tileset image
    tileSet = new Image();
    tileSet.addEventListener("load",loadHandler, false);
    tileSet.src = "./images/spriteSheet.png"; // ojo que la ruta es relativa al html, no al js
    globals.tileSets.push(tileSet)
    globals.assetsToLoad.push(tileSet);

    //load brick image
    tileSet = new Image();
    tileSet.addEventListener("load",loadHandler,false);
    tileSet.src = "./images/assetsFil.png";    // ojo que la ruta es relativa al html, no al js
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //Load Sounds
    let menuMusic1 = document.querySelector("#menuMusic1");
    menuMusic1.addEventListener("canplaythrough", loadHandler, false);
    menuMusic1.addEventListener("timeupdate", updateMusic, false);
    menuMusic1.load();
    globals.musics.push(menuMusic1);
    globals.assetsToLoad.push(menuMusic1);

    let menuMusic2 = document.querySelector("#menuMusic2");
    menuMusic2.addEventListener("canplaythrough", loadHandler, false);
    menuMusic2.addEventListener("timeupdate", updateMusic, false);
    menuMusic2.load();
    globals.musics.push(menuMusic2);
    globals.assetsToLoad.push(menuMusic2);

    let menuMusic3 = document.querySelector("#menuMusic3");
    menuMusic3.addEventListener("canplaythrough", loadHandler, false);
    menuMusic3.addEventListener("timeupdate", updateMusic, false);
    menuMusic3.load();
    globals.musics.push(menuMusic3);
    globals.assetsToLoad.push(menuMusic3);

    let menuMusic4 = document.querySelector("#menuMusic4");
    menuMusic4.addEventListener("canplaythrough", loadHandler, false);
    menuMusic4.addEventListener("timeupdate", updateMusic, false);
    menuMusic4.load();
    globals.musics.push(menuMusic4);
    globals.assetsToLoad.push(menuMusic4);

    
    let gameMusic = document.querySelector("#gameMusic");
    gameMusic.addEventListener("canplaythrough", loadHandler, false);
    gameMusic.addEventListener("timeupdate", updateMusic, false);
    gameMusic.load();
    globals.musics.push(gameMusic);
    globals.assetsToLoad.push(gameMusic);

    let gameMusic2 = document.querySelector("#gameMusic2");
    gameMusic2.addEventListener("canplaythrough", loadHandler, false);
    gameMusic2.addEventListener("timeupdate", updateMusic, false);
    gameMusic2.load();
    globals.musics.push(gameMusic2);
    globals.assetsToLoad.push(gameMusic2);

    let gameMusic3 = document.querySelector("#gameMusic3");
    gameMusic3.addEventListener("canplaythrough", loadHandler, false);
    gameMusic3.addEventListener("timeupdate", updateMusic, false);
    gameMusic3.load();
    globals.musics.push(gameMusic3);
    globals.assetsToLoad.push(gameMusic3);

    let gameMusic4 = document.querySelector("#gameMusic4");
    gameMusic4.addEventListener("canplaythrough", loadHandler, false);
    gameMusic4.addEventListener("timeupdate", updateMusic, false);
    gameMusic4.load();
    globals.musics.push(gameMusic4);
    globals.assetsToLoad.push(gameMusic4);

    let gameMusic5 = document.querySelector("#gameMusic5");
    gameMusic5.addEventListener("canplaythrough", loadHandler, false);
    gameMusic5.addEventListener("timeupdate", updateMusic, false);
    gameMusic5.load();
    globals.musics.push(gameMusic5);
    globals.assetsToLoad.push(gameMusic5);

    let gameMusic6 = document.querySelector("#gameMusic6");
    gameMusic6.addEventListener("canplaythrough", loadHandler, false);
    gameMusic6.addEventListener("timeupdate", updateMusic, false);
    gameMusic6.load();
    globals.musics.push(gameMusic6);
    globals.assetsToLoad.push(gameMusic6);

    let gameMusic7 = document.querySelector("#gameMusic7");
    gameMusic7.addEventListener("canplaythrough", loadHandler, false);
    gameMusic7.addEventListener("timeupdate", updateMusic, false);
    gameMusic7.load();
    globals.musics.push(gameMusic7);
    globals.assetsToLoad.push(gameMusic7);

    let gameMusic8 = document.querySelector("#gameMusic8");
    gameMusic8.addEventListener("canplaythrough", loadHandler, false);
    gameMusic8.addEventListener("timeupdate", updateMusic, false);
    gameMusic8.load();
    globals.musics.push(gameMusic8);
    globals.assetsToLoad.push(gameMusic8);

    let gameMusic9 = document.querySelector("#gameMusic9");
    gameMusic9.addEventListener("canplaythrough", loadHandler, false);
    gameMusic9.addEventListener("timeupdate", updateMusic, false);
    gameMusic9.load();
    globals.musics.push(gameMusic9);
    globals.assetsToLoad.push(gameMusic9);

    let gameMusic10 = document.querySelector("#gameMusic10");
    gameMusic10.addEventListener("canplaythrough", loadHandler, false);
    gameMusic10.addEventListener("timeupdate", updateMusic, false);
    gameMusic10.load();
    globals.musics.push(gameMusic10);
    globals.assetsToLoad.push(gameMusic10);

    let gameMusic11 = document.querySelector("#gameMusic11");
    gameMusic11.addEventListener("canplaythrough", loadHandler, false);
    gameMusic11.addEventListener("timeupdate", updateMusic, false);
    gameMusic11.load();
    globals.musics.push(gameMusic11);
    globals.assetsToLoad.push(gameMusic11);

    let gameMusic12 = document.querySelector("#gameMusic12");
    gameMusic12.addEventListener("canplaythrough", loadHandler, false);
    gameMusic12.addEventListener("timeupdate", updateMusic, false);
    gameMusic12.load();
    globals.musics.push(gameMusic12);
    globals.assetsToLoad.push(gameMusic12);

    let gameMusic13 = document.querySelector("#gameMusic13");
    gameMusic13.addEventListener("canplaythrough", loadHandler, false);
    gameMusic13.addEventListener("timeupdate", updateMusic, false);
    gameMusic13.load();
    globals.musics.push(gameMusic13);
    globals.assetsToLoad.push(gameMusic13);

    let boomBox1 = document.querySelector("#boomBox1");
    boomBox1.addEventListener("canplaythrough", loadHandler, false);
    boomBox1.addEventListener("timeupdate", updateMusic, false);
    boomBox1.load();
    globals.musics.push(boomBox1);
    globals.assetsToLoad.push(boomBox1);

    let boomBox2 = document.querySelector("#boomBox2");
    boomBox2.addEventListener("canplaythrough", loadHandler, false);
    boomBox2.addEventListener("timeupdate", updateMusic, false);
    boomBox2.load();
    globals.musics.push(boomBox2);
    globals.assetsToLoad.push(boomBox2);

    let boomBox3 = document.querySelector("#boomBox3");
    boomBox3.addEventListener("canplaythrough", loadHandler, false);
    boomBox3.addEventListener("timeupdate", updateMusic, false);
    boomBox3.load();
    globals.musics.push(boomBox3);
    globals.assetsToLoad.push(boomBox3);

    let boomBox4 = document.querySelector("#boomBox4");
    boomBox4.addEventListener("canplaythrough", loadHandler, false);
    boomBox4.addEventListener("timeupdate", updateMusic, false);
    boomBox4.load();
    globals.musics.push(boomBox4);
    globals.assetsToLoad.push(boomBox4);

    let boomBox5 = document.querySelector("#boomBox5");
    boomBox5.addEventListener("canplaythrough", loadHandler, false);
    boomBox5.addEventListener("timeupdate", updateMusic, false);
    boomBox5.load();
    globals.musics.push(boomBox5);
    globals.assetsToLoad.push(boomBox5);

    let boomBox6 = document.querySelector("#boomBox6");
    boomBox6.addEventListener("canplaythrough", loadHandler, false);
    boomBox6.addEventListener("timeupdate", updateMusic, false);
    boomBox6.load();
    globals.musics.push(boomBox6);
    globals.assetsToLoad.push(boomBox6);

    let boomBox7 = document.querySelector("#boomBox7");
    boomBox7.addEventListener("canplaythrough", loadHandler, false);
    boomBox7.addEventListener("timeupdate", updateMusic, false);
    boomBox7.load();
    globals.musics.push(boomBox7);
    globals.assetsToLoad.push(boomBox7);

    let boomBox8 = document.querySelector("#boomBox8");
    boomBox8.addEventListener("canplaythrough", loadHandler, false);
    boomBox8.addEventListener("timeupdate", updateMusic, false);
    boomBox8.load();
    globals.musics.push(boomBox8);
    globals.assetsToLoad.push(boomBox8);

    let boomBox9 = document.querySelector("#boomBox9");
    boomBox9.addEventListener("canplaythrough", loadHandler, false);
    boomBox9.addEventListener("timeupdate", updateMusic, false);
    boomBox9.load();
    globals.musics.push(boomBox9);
    globals.assetsToLoad.push(boomBox9);

    let boomBox10 = document.querySelector("#boomBox10");
    boomBox10.addEventListener("canplaythrough", loadHandler, false);
    boomBox10.addEventListener("timeupdate", updateMusic, false);
    boomBox10.load();
    globals.musics.push(boomBox10);
    globals.assetsToLoad.push(boomBox10);

    let boomBox11 = document.querySelector("#boomBox11");
    boomBox11.addEventListener("canplaythrough", loadHandler, false);
    boomBox11.addEventListener("timeupdate", updateMusic, false);
    boomBox11.load();
    globals.musics.push(boomBox11);
    globals.assetsToLoad.push(boomBox11);

    let boomBox12 = document.querySelector("#boomBox12");
    boomBox12.addEventListener("canplaythrough", loadHandler, false);
    boomBox12.addEventListener("timeupdate", updateMusic, false);
    boomBox12.load();
    globals.musics.push(boomBox12);
    globals.assetsToLoad.push(boomBox12);

    let boomBox13 = document.querySelector("#boomBox13");
    boomBox13.addEventListener("canplaythrough", loadHandler, false);
    boomBox13.addEventListener("timeupdate", updateMusic, false);
    boomBox13.load();
    globals.musics.push(boomBox13);
    globals.assetsToLoad.push(boomBox13);

    let boomBox14 = document.querySelector("#boomBox14");
    boomBox14.addEventListener("canplaythrough", loadHandler, false);
    boomBox14.addEventListener("timeupdate", updateMusic, false);
    boomBox14.load();
    globals.musics.push(boomBox14);
    globals.assetsToLoad.push(boomBox14);

    let boomBox15 = document.querySelector("#boomBox15");
    boomBox15.addEventListener("canplaythrough", loadHandler, false);
    boomBox15.addEventListener("timeupdate", updateMusic, false);
    boomBox15.load();
    globals.musics.push(boomBox15);
    globals.assetsToLoad.push(boomBox15);

    let boomBox16 = document.querySelector("#boomBox16");
    boomBox16.addEventListener("canplaythrough", loadHandler, false);
    boomBox16.addEventListener("timeupdate", updateMusic, false);
    boomBox16.load();
    globals.musics.push(boomBox16);
    globals.assetsToLoad.push(boomBox16);

    let boomBox17 = document.querySelector("#boomBox17");
    boomBox17.addEventListener("canplaythrough", loadHandler, false);
    boomBox17.addEventListener("timeupdate", updateMusic, false);
    boomBox17.load();
    globals.musics.push(boomBox17);
    globals.assetsToLoad.push(boomBox17);

    let boomBox18 = document.querySelector("#boomBox18");
    boomBox18.addEventListener("canplaythrough", loadHandler, false);
    boomBox18.addEventListener("timeupdate", updateMusic, false);
    boomBox18.load();
    globals.musics.push(boomBox18);
    globals.assetsToLoad.push(boomBox18);

    let boomBox19 = document.querySelector("#boomBox19");
    boomBox19.addEventListener("canplaythrough", loadHandler, false);
    boomBox19.addEventListener("timeupdate", updateMusic, false);
    boomBox19.load();
    globals.musics.push(boomBox19);
    globals.assetsToLoad.push(boomBox19);

    let boomBox20 = document.querySelector("#boomBox20");
    boomBox20.addEventListener("canplaythrough", loadHandler, false);
    boomBox20.addEventListener("timeupdate", updateMusic, false);
    boomBox20.load();
    globals.musics.push(boomBox20);
    globals.assetsToLoad.push(boomBox20);

    let boomBox21 = document.querySelector("#boomBox21");
    boomBox21.addEventListener("canplaythrough", loadHandler, false);
    boomBox21.addEventListener("timeupdate", updateMusic, false);
    boomBox21.load();
    globals.musics.push(boomBox21);
    globals.assetsToLoad.push(boomBox21);

    let boomBox22 = document.querySelector("#boomBox22");
    boomBox22.addEventListener("canplaythrough", loadHandler, false);
    boomBox22.addEventListener("timeupdate", updateMusic, false);
    boomBox22.load();
    globals.musics.push(boomBox22);
    globals.assetsToLoad.push(boomBox22);


    let fireSound = document.querySelector("#fireSound");
    fireSound.addEventListener("canplaythrough", loadHandler, false);
    fireSound.load();
    globals.sounds.push(fireSound);
    globals.assetsToLoad.push(fireSound);

    let potionSound = document.querySelector("#potionSound");
    potionSound.addEventListener("canplaythrough", loadHandler, false);
    potionSound.load();
    globals.sounds.push(potionSound);
    globals.assetsToLoad.push(potionSound);

    let weedSound = document.querySelector("#weedSound");
    weedSound.addEventListener("canplaythrough", loadHandler, false);
    weedSound.load();
    globals.sounds.push(weedSound);
    globals.assetsToLoad.push(weedSound);

    let dieSound = document.querySelector("#dieSound");
    dieSound.addEventListener("canplaythrough", loadHandler, false);
    dieSound.load();
    globals.sounds.push(dieSound);
    globals.assetsToLoad.push(dieSound);

    let firebreathSound = document.querySelector("#firebreathSound");
    firebreathSound.addEventListener("canplaythrough", loadHandler, false);
    firebreathSound.load();
    globals.sounds.push(firebreathSound);
    globals.assetsToLoad.push(firebreathSound);
    
    let jumpSound = document.querySelector("#jumpSound");
    jumpSound.addEventListener("canplaythrough", loadHandler, false);
    jumpSound.load();
    globals.sounds.push(jumpSound);
    globals.assetsToLoad.push(jumpSound);

    let keySound = document.querySelector("#keySound");
    keySound.addEventListener("canplaythrough", loadHandler, false);
    keySound.load();
    globals.sounds.push(keySound);
    globals.assetsToLoad.push(keySound);
}
//funcion que llama cada vez que se carga un activo
function loadHandler()
{
    globals.assetsLoaded++;
    globals.loadProgress += 0.15;
    //una vez se han cargado todos los activos pasamos
    if (globals.assetsLoaded === globals.assetsToLoad.length)
    {

            //remove the load event listener
        for (let i = 0; i < globals.tileSets.length; ++i) {
            
            globals.tileSets[i].removeEventListener("load", loadHandler, false);
            
        }
        
        for (let i = 0; i < globals.sounds.length; i++) {
            
            globals.sounds[i].removeEventListener("canplaythrough", loadHandler, false);
            
        }

        console.log("Assets finished loading");

        //start the game
        globals.gameState = Game.START;

    }

}
function initSprites()
{
    
    initPlayer();
    initLamp();
    initEnemytree();  

    initFire();
    initFireBreath();

    //hud
    initHUDPotion();
    initHUDPotion1();
    initHUDPotion2();
    initHUDPotion3();
    initHUDAngelo();
    initHUDLamp();
    initHUDKey();

}
function initEvents()
{
    //add the keyboard event listeners
    window.addEventListener("keydown",  KeydownHandler,  false);
    window.addEventListener("keyup",    KeyupHandler,    false);
    

}
function initPlayer()
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 21, 25, 32, 5, 7);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8,6);

    //creamos las fisicas del player con vlimit 50px/s
    const physics = new Physics(80,GRAVITY,0.7,-180);
    
    //inicializar hitbox
    const hitBox = new HitBox(12,20, 5, 4);
    //creamos nuestro sprite
    const player = new Sprite(SpriteID.PLAYER, State.STILL_RIGHT, 100, 70, imageSet, frames, physics, hitBox,100);
    player.yPos = 25;
    player.xPos = 119;
    player.hasKey = false;
    player.isDamaged = false;


    //añadimos player al array de sprites
    globals.sprites.push(player);

}
function initLamp()
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8, 0, 6, 13, 32, 12, 11);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);

    //valores iniciales para physics
    const initAngle = 90 * Math.PI / 180;
    const omega = 1.5;
    let xRotCenter = globals.sprites[SpriteID.PLAYER].xPos;
    let yRotCenter = globals.sprites[SpriteID.PLAYER].yPos;
    const physics = new Physics(200,GRAVITY,1,0,omega, initAngle, xRotCenter, yRotCenter);
    
    const hitBox = new HitBox(6,13, 0, 0);

    //creamos nuestro sprite
    const lamp = new Lamp(SpriteID.LAMP, State.STILL, 100, 70, imageSet, frames, physics, hitBox,  "eliptic", false);
    
    lamp.physics.vy = -40;
    lamp.rotating = false;
    //añadimos player al array de sprites
    globals.sprites.push(lamp);

}
function initEnemytree()
{
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(16, 0, 32, 32, 32, 0, 0);

    //creamos los datos de la animacion. 4 frames / state
    const frames = new Frames(6,7);

    const physics = new Physics(10,GRAVITY,0.7,-100);

    const hitBox = new HitBox(22,26, 6, 6);

    let action = Math.floor(Math.random() * 2);

    let enemy;
    if (action === 1) {
        
         enemy = new Enemy(SpriteID.ENEMY, State.ENEMY_MOVE_LEFT, 100, 59, imageSet, frames, physics,hitBox, "enemy_move_left");
        
    }
    else {


         enemy = new Enemy(SpriteID.ENEMY, State.ENEMY_MOVE_RIGHT, 100, 59, imageSet, frames, physics,hitBox, "enemy_move_left");

    }

    //creamos nuestro sprite
    enemy.xPos = 200 * Math.random();

    if (globals.gameState === Game.PLAYING) {
        
        enemy.yPos = 10;

        if (enemy.xPos - 100 < player.xPos && enemy.xPos + 100 > player.xPos) {
            let chance = Math.floor(Math.random()*2);
            if (chance === 0 && player.xPos >= 50) {
                enemy.xPos = 1;
            }
            else if (chance === 1 && player.xPos <= 170) {
                enemy.xPos = 200;
                
            }
            else {
                enemy.xPos = 120;
            }
            
        }
    }
    else {
        enemy.yPos = -30;

    }
    
    //añadimos enemy al array de sprites
    globals.sprites.push(enemy);
}
function initFire()
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(13, 0, 32, 17, 32, 0, 15);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(10,3);

    const hitBox = new HitBox(40,18 , -4 , 0);

    //creamos nuestro sprite
    const fire = new Fire(SpriteID.FIRE, State.STILL, 100, 70, imageSet, frames,0, hitBox);

    //añadimos player al array de sprites
    globals.sprites.push(fire);

}
function initFireBreath()
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(14, 0, 32, 13, 32, 1, 11);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(10,3);

    const hitBox = new HitBox(22, 12 , 2 , 0);

    //creamos nuestro sprite
    const fireBreath = new Sprite(SpriteID.FIREBREATH, State.INVALID, 100, 70, imageSet, frames,0, hitBox);

    //añadimos player al array de sprites
    globals.sprites.push(fireBreath);

}
function initPotion()
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8, 4, 7, 12, 32, 10, 10);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);

    const initAngle = 90 * Math.PI / 180;
    const omega = 3;
    let xRotCenter = 50;
    let yRotCenter = 30;
    const physics = new Physics(80,100,1,0,omega, initAngle, xRotCenter, yRotCenter);

    const hitBox = new HitBox(7,12 , 0 , 0);
    
    //creamos nuestro sprite
    const potion = new Token(SpriteID.POTION, State.ACTION_1, 100, 70, imageSet, frames, physics,hitBox);

    //añadimos player al array de sprites
    globals.sprites.push(potion);

}
function initKey()
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8, 1, 14, 15, 32, 9, 11);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);

    const physics = new Physics(3,1,1);

    const hitBox = new HitBox(14, 15 , 0 , 0);

    //creamos nuestro sprite
    const key = new Token(SpriteID.KEY, State.ACTION_1, 100, 70, imageSet, frames, physics, hitBox, "token_up");
    switch (globals.currentLevel) 
    {
        case 0:
            
        let keyPos = findIndex(globals.sprites, sprite);
        globals.sprites.splice(keyPos,1);


            break;

        case 2:
            
            key.xPos = 60;
            key.yPos = 50;

            break;
        case 3:
            
            key.xPos = 200;
            key.yPos = 105;

            break;
        case 4:
            
            key.xPos = 200;
            key.yPos = 20;

            break;
        case 5:
            
            key.xPos = 200;
            key.yPos = 20;

            break;
        case 6:
            
            key.xPos = 200;
            key.yPos = 40;

            break;
        case 7:
            
            key.xPos = 200;
            key.yPos = 40;

            break;

        case 8:

            key.xPos = 20;
            key.yPos = 136;

            break;
        
        case 12:

            key.xPos = 49;
            key.yPos = 112;

            break;
        case 13:

            key.xPos = 149;
            key.yPos = 112;

            break;
        case 14:

            key.xPos = 89;
            key.yPos = 118;

            break;       
        case 15:

            key.xPos = 49;
            key.yPos = 118;

            break;
        case 16:

            key.xPos = 79;
            key.yPos = 69;

        break;
        case 18:

            key.xPos = 29;
            key.yPos = 22;

        break;
        case 19:

            key.xPos = 29;
            key.yPos = 22;

        break;
        default:
            break;
    }
    //añadimos player al array de sprites
    globals.sprites.push(key);

}
function initHUDPotion()
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8, 4, 7, 12, 32, 10, 10);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);

    const hitBox = new HitBox(7,12 , 0 , 0);

    //creamos nuestro sprite
    const hudPotion = new Sprite(SpriteID.HUD_POTION, State.INVALID, 100, 70, imageSet, frames,0, hitBox);

   
    //añadimos player al array de sprites
    globals.sprites.push(hudPotion);

}
function initHUDPotion1()
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8, 5, 7, 12, 32, 10, 10);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);

    const hitBox = new HitBox(7,12 , 0 , 0);

    //creamos nuestro sprite
    const hudPotion = new Sprite(SpriteID.HUD_POTION1, State.INVALID, 100, 70, imageSet, frames,0, hitBox);

    //añadimos player al array de sprites
    globals.sprites.push(hudPotion);

}
function initHUDPotion2()
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8, 6, 7, 12, 32, 10, 10);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);

    const hitBox = new HitBox(7,12 , 0 , 0);

    //creamos nuestro sprite
    const hudPotion = new Sprite(SpriteID.HUD_POTION2, State.INVALID, 100, 70, imageSet, frames,0,hitBox);

    //añadimos player al array de sprites
    globals.sprites.push(hudPotion);

}
function initHUDPotion3()
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8, 7, 7, 12, 32, 10, 10);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);

    const hitBox = new HitBox(7,12 , 0 , 0);

    //creamos nuestro sprite
    const hudPotion = new Sprite(SpriteID.HUD_POTION3, State.INVALID, 100, 70, imageSet, frames,0, hitBox);

    //añadimos player al array de sprites
    globals.sprites.push(hudPotion);

}
function initWeed(sprite)
{

    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8, 3, 15, 16, 32, 8, 10);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);
    
    const physics = new Physics(3,1,1);

    const hitBox = new HitBox(15,16 , 0 , 0);

    //creamos nuestro sprite
    const weed = new Weed(SpriteID.WEED, State.STILL, 100, 70, imageSet, frames, physics,hitBox);
    
    weed.xPos = sprite.xPos;
    weed.yPos = sprite.yPos;

    //añadimos player al array de sprites
    globals.sprites.push(weed);

}
function initHUDAngelo()
{
    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(20, 0, 54, 61, 32, 5, 2);

    //creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    
    const hitBox = new HitBox(64,64 , 0 , 0);

    //creamos nuestro sprite
    const angelo = new Sprite(SpriteID.HUD_ANGELO, State.STILL, 100, 70, imageSet, frames,0 , hitBox);

    //añadimos player al array de sprites
    globals.sprites.push(angelo);
}
function initHUDLamp()
{
    //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(8, 0, 6, 13, 32, 12, 11);

    //creamos los datos de la animacion. 1 frames / state
    const frames = new Frames(1);

    const hitBox = new HitBox(6,13, 0, 0);

    //creamos nuestro sprite
    const HUDLamp = new Sprite(SpriteID.HUD_LAMP, State.STILL, 100, 70, imageSet, frames,0, hitBox);

    //añadimos player al array de sprites
    globals.sprites.push(HUDLamp);
}
function initHUDKey()
{
       //creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
       const imageSet = new ImageSet(8, 1, 14, 15, 32, 9, 11);

       //creamos los datos de la animacion. 8 frames / state
       const frames = new Frames(1);

       const hitBox = new HitBox(14, 15 , 0 , 0);
    
       //creamos nuestro sprite
       const HUDkey = new Sprite(SpriteID.HUD_KEY, State.INVALID, 100, 70, imageSet, frames,0, hitBox);
       
       
       //añadimos player al array de sprites
       globals.sprites.push(HUDkey); 
}
function initLevel0()
{
    //creamos las propiedades de las imagenes del mapa: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0,0,16,16,16,0,0);

    //creamos y guardamos nuestro nivel
    const level_0 = new Level(level0, imageSet);

    const level_1 = new Level(level1, imageSet);
    
    const level_2 = new Level(level2, imageSet);

    const level_3 = new Level(level3, imageSet);

    const level_4 = new Level(level4, imageSet);

    const level_5 = new Level(level5, imageSet);

    const level_6 = new Level(level6, imageSet);

    const level_7 = new Level(level7, imageSet);

    const level_8 = new Level(level8, imageSet);

    const level_9 = new Level(level9, imageSet);

    const level_10 = new Level(level10, imageSet);

    const level_11 = new Level(level11, imageSet);

    const level_12 = new Level(level12, imageSet);

    const level_13 = new Level(level13, imageSet);

    const level_14 = new Level(level14, imageSet);

    const level_15 = new Level(level15, imageSet);

    const level_16 = new Level(level16, imageSet);

    const level_17 = new Level(level17, imageSet);

    const level_18 = new Level(level18, imageSet);

    const level_19 = new Level(level19, imageSet);
    const level_20 = new Level(level20, imageSet);
    const level_21 = new Level(level21, imageSet);
    const level_22 = new Level(level22, imageSet);
    const level_23 = new Level(level23, imageSet);
    const level_24 = new Level(level24, imageSet);
    const level_25 = new Level(level25, imageSet);
    const level_26 = new Level(level26, imageSet);
    const level_27 = new Level(level27, imageSet);
    const level_28 = new Level(level28, imageSet);
    const level_29 = new Level(level29, imageSet);
    const level_30 = new Level(level30, imageSet);
    const level_31 = new Level(level31, imageSet);
    const level_32 = new Level(level32, imageSet);
    const level_33 = new Level(level33, imageSet);
    const level_34 = new Level(level34, imageSet);
    const level_35 = new Level(level35, imageSet);
    const level_36 = new Level(level36, imageSet);
  










    globals.level.push(level_0);
    globals.level.push(level_1);
    globals.level.push(level_2);
    globals.level.push(level_3);
    globals.level.push(level_4);
    globals.level.push(level_5);
    globals.level.push(level_6);
    globals.level.push(level_7);
    globals.level.push(level_8);
    globals.level.push(level_9);
    globals.level.push(level_10);
    globals.level.push(level_11);
    globals.level.push(level_12);
    globals.level.push(level_13);
    globals.level.push(level_14);
    globals.level.push(level_15);
    globals.level.push(level_16);
    globals.level.push(level_17);
    globals.level.push(level_18);
    globals.level.push(level_19);
    globals.level.push(level_20);
    globals.level.push(level_21);
    globals.level.push(level_22);
    globals.level.push(level_23);
    globals.level.push(level_24);
    globals.level.push(level_25);
    globals.level.push(level_26);
    globals.level.push(level_27);
    globals.level.push(level_28);
    globals.level.push(level_29);
    globals.level.push(level_30);
    globals.level.push(level_31);
    globals.level.push(level_32);
    globals.level.push(level_33);
    globals.level.push(level_34);
    globals.level.push(level_35);
    globals.level.push(level_36);
   










    globals.currentLevel = 1;

}
function initTimers()
{
    //creamos timer de valor 200, con cambios cada 0.5 segundos
    globals.levelTime   = new Timer(200, 1);
    globals.demoTime    = new Timer(180,1);
    globals.fireTime    = new Timer(4,1);
    globals.weedTimer   = new Timer (8,1);
    globals.levelChangeTimer   = new Timer (1,1);
    globals.freezeTimer = new Timer(3,1);
    globals.hordeTimer = new Timer(30,1);
    globals.highscoresTimer = new Timer(6,1);


}
function initParticles(){
    initBar();

}
function initExplosion(sprite,color)
{

    const numParticles = 20;
    const xInit = sprite.xPos + (sprite.hitBox.xSize/2);
    const yInit = sprite.yPos + (sprite.hitBox.ySize/2);
    const radius = 1;
    const timeToFadeMax = 0;
    const alpha = 1.0;


    for (let index = 0; index < numParticles; index++) 
    {
        const velocity = Math.random() * 15  + 5;
        const physics = new Physics(velocity);
        
        const timeToFade = timeToFadeMax * Math.random() + 1;
        const particle = new ExplosionParticle(ParticleID.EXPLOSION, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade, color);

        //asignamos velocidades segun angulo aleatorio
        const randomAngle = Math.random() * 2 * Math.PI*180;
        particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
        particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);

        globals.particles.push(particle);

    }
}
function initDust()
{
    const lamp = globals.sprites.find((Enemy) => Enemy.id === SpriteID.LAMP);
    const numParticles = 1;
    const xInit = lamp.xPos + (lamp.hitBox.xSize/2);
    const yInit = lamp.yPos + (lamp.hitBox.ySize/2);
    const radius = 1;
    const timeToFadeMax = 1;
    const alpha = 0.5;
    let colorParticle = Math.floor(Math.random()*2);
    let color;
    if (colorParticle === 0) {
        color = 'orange';
    }
    else {
        color = 'yellow';
    }
    for (let index = 0; index < numParticles; index++) 
    {
        const velocity = Math.random() * 10 + 1;
        const physics = new Physics(velocity);
        
        const timeToFade = timeToFadeMax * Math.random() + 1;
        const particle = new Dust(ParticleID.DUST, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade, color);

        //asignamos velocidades segun angulo aleatorio
        particle.physics.vx = particle.physics.vLimit * Math.random();
        particle.physics.vy = particle.physics.vLimit * Math.random();

        globals.particles.push(particle);

    }

}
function initSplash()
{
    const fire = globals.sprites.find((Enemy) => Enemy.id === SpriteID.FIRE);
    const isThereFire = findVariable(fire,globals.sprites);
    const numParticles = 2;

        let xInit;
        let yInit;
        const radius = 1;
        const timeToFadeMax = 1;
        const alpha = 1.0;
        const colorParticle = Math.floor(Math.random() * 3);
        let extended = false;
        let velocity;
        if (globals.gameState === Game.NEW_GAME || globals.gameState === Game.SENKYOU) {

            extended = true;
            
        }

    if (extended === false) {
         xInit = fire.xPos + Math.random() * fire.hitBox.xSize;
         yInit = fire.yPos + (fire.hitBox.ySize);
         velocity = Math.random() * 10 + 1;

    }
    else {
         xInit = Math.random() * 256;
         yInit = 188 + (fire.hitBox.ySize);
         velocity = Math.random() * 30 + 5;

    }
    for (let index = 0; index < numParticles; index++) 
    {
        const physics = new Physics(velocity);
        const timeToFade = timeToFadeMax * Math.random() + 1;
        const particle = new Splash(ParticleID.SPLASH, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade, extended);

        //asignamos velocidades segun angulo aleatorio
        particle.physics.vx = particle.physics.vLimit * Math.random();
        particle.physics.vy = particle.physics.vLimit * Math.random();
        if (particle.physics.vy > 0) {
            particle.physics.vy = -particle.physics.vy;
        }
        particle.color = colorParticle;
        globals.particles.push(particle);

    }

}
function initBar(option)
{
    const lamp = globals.sprites.find((Enemy) => Enemy.id === SpriteID.LAMP);
    const numParticles = 1;
    let xInit;
    let yInit;
    const radius = 1;
    const timeToFadeMax = 1;
    const alpha = 0.8;
    let color;

    if (option === 1) {
        xInit =  172 + (globals.levelTime.value/8);
        yInit =  197 + Math.random() * 9;
        color = "purple";
    }
    else {
        xInit =  172 + (lamp.oil)
        yInit =  180 + Math.random() * 9;
        color = "orange";
    }
    for (let index = 0; index < numParticles; index++) 
    {
        const velocity = Math.random() * 10 + 1;
        const physics = new Physics(velocity);
        
        const timeToFade = timeToFadeMax * Math.random();
        const particle = new Bar(ParticleID.BAR, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade, color);

        //asignamos velocidades segun angulo aleatorio
        particle.physics.vx = particle.physics.vLimit * Math.random();
        particle.physics.vy = particle.physics.vLimit * Math.random();

        globals.particles.push(particle);

    }

}
function initEnemyParticle(enemy)
{
    const numParticles = 3;
    let xInit = enemy.xPos + 10;
    let yInit = enemy.yPos + 5;
    const radius = 1;
    const timeToFadeMax = 1;
    const alpha = 0.8;
    let color;

{
        xInit +=  Math.random() * 10;
        yInit +=  Math.random() * 20;
        color = "brown";
    
    }
    for (let index = 0; index < numParticles; index++) 
    {
        const velocity = Math.random() * 10 + 1;
        const physics = new Physics(velocity);
        
        const timeToFade = timeToFadeMax * Math.random();
        const particle = new EnemyParticle(ParticleID.ENEMY, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade, color);

        //asignamos velocidades segun angulo aleatorio
        particle.physics.vx = particle.physics.vLimit * Math.random();
        particle.physics.vy = particle.physics.vLimit * Math.random();

        globals.particles.push(particle);

    }

}
function initSpark()
{
    const numParticles = 30;
    const xInit = Math.random() * globals.canvas.width;
    const yInit = Math.random() * globals.canvas.height;
    const radius = 1;
    const timeToFadeMax = 1;
    const alpha = 1.0;
    let colorParticle = Math.floor(Math.random()*8);
    let color;
    if (colorParticle === 0) {
        color = 'lightblue';
    }
    else if (colorParticle === 1){
        color = 'yellow';
    }
    else if(colorParticle === 2){
        color = 'blue';
    }
    else if(colorParticle === 3) {
        color = 'pink'
    }
    else if(colorParticle === 4) {
        color = 'cyan'
    }
    else if(colorParticle === 5) {
        color = 'violet'
    }
    else if(colorParticle === 6) {
        color = 'purple'
    }

    for (let index = 0; index < numParticles; index++) 
    {
        const velocity = Math.random() * 30 + 1;
        const physics = new Physics(velocity);
        
        const timeToFade = timeToFadeMax * Math.random() + 1;
        const particle = new Spark(ParticleID.SPARK, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade, color);

        const randomAngle = Math.random() * 2 * Math.PI;
        //asignamos velocidades segun angulo aleatorio
        particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
        particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);

        globals.particles.push(particle);

    }

}
function initArrow()
{
    arrow1();
    arrow2();
    arrow3();

    function arrow1()
    {
        const numParticles = 1;
        let xInit = 220;
        let yInit = 40;
        if (globals.currentLevel === CurrentLEVEL.LEVEL_7) {
            yInit = 5;
            xInit = 240;

        }
        const radius = 1;
        const timeToFadeMax = 1;
        const alpha = 0.5;
        let colorParticle = Math.floor(Math.random()*2);
        let color;
        let angle = -2;//in radians
        if (colorParticle === 0) {
            color = 'white';
        }
        else {
            color = 'purple';
        }
        for (let index = 0; index < numParticles; index++) 
        {
            const velocity = Math.random() * 10 + 1;
            const physics = new Physics(velocity);
            
            const timeToFade = timeToFadeMax * Math.random() + 1;
            const particle = new Arrow(ParticleID.ARROW, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade, color,angle);
    
            //asignamos velocidades segun angulo aleatorio
            particle.physics.vx = particle.physics.vLimit * Math.cos(particle.angle);
            particle.physics.vy = particle.physics.vLimit * Math.sin(particle.angle);
    
            globals.particles.push(particle);
    
        }
    }
    function arrow2()
    {
        const numParticles = 30;
        let xInit = 220;
        let yInit = 40;
        if (globals.currentLevel === CurrentLEVEL.LEVEL_7) {
            yInit = 5;
            xInit = 240;

        }
        const radius = 1;
        const timeToFadeMax = 1;
        const alpha = 0.50;
        let colorParticle = Math.floor(Math.random()*2);
        let color;
        let angle = 0;

        if (colorParticle === 0) {
            color = 'white';
        }
        else {
            color = 'purple';
        }
        for (let index = 0; index < numParticles; index++) 
        {
            const velocity = Math.random() * 30 + 1;
            const physics = new Physics(velocity);
            
            const timeToFade = timeToFadeMax * Math.random() + 1;
            const particle = new Arrow(ParticleID.ARROW, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade, color,angle);
    
            //asignamos velocidades segun angulo aleatorio
            particle.physics.vx = -particle.physics.vLimit * Math.cos(particle.angle);
            particle.physics.vy = -particle.physics.vLimit * Math.sin(particle.angle);
    
            globals.particles.push(particle);
    
        }
    }
    function arrow3()
    {
        const numParticles = 1;
        let xInit = 220;
        let yInit = 40;
        const radius = 1;
        if (globals.currentLevel === CurrentLEVEL.LEVEL_7) {
            yInit = 5;
            xInit = 240;
        }
        const timeToFadeMax = 1;
        const alpha = 0.50;
        let colorParticle = Math.floor(Math.random()*2);
        let color;
        let angle = 2;
        if (colorParticle === 0) {
            color = 'white';
        }
        else {
            color = 'purple';
        }
        for (let index = 0; index < numParticles; index++) 
        {
            const velocity = Math.random() * 10 + 1;
            const physics = new Physics(velocity);
            
            const timeToFade = timeToFadeMax * Math.random() + 1;
            const particle = new Arrow(ParticleID.ARROW, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade, color,angle);
    
            //asignamos velocidades segun angulo aleatorio
            particle.physics.vx = particle.physics.vLimit * Math.cos(particle.angle);
            particle.physics.vy = particle.physics.vLimit * Math.sin(particle.angle);
    
            globals.particles.push(particle);
    
        }
    }
}

function scoresAJAXRequest()
{
     //Ruta o absoluta o relativa al fichero que hace la petición (html)
     const url = "http://localhost:3000/Proyecto/server/routes/getAllClassic.php";
     const request = new XMLHttpRequest();
    let arrayAsociativo = [];
     request.onreadystatechange = function()
     {
         if(this.readyState == 4)
         {
             if(this.status == 200)
             {
                 if(this.responseText != null)
                 {
                     const resultJSON = JSON.parse(this.responseText);
 
                     //INiciamos los datos del juego
                     createScore(resultJSON);
                     globals.requestdedScores = true;
                 }
                 else
                     alert("Communication error: no data received");
             }
             else
                 alert("Communication error: " + this.statusText);
         }
     }

     createScore(arrayAsociativo)
 
     request.open('GET', url, true);
     request.responseType = "text";
     request.send();

}
function createScore(data)
{
    let score = [];
    globals.highscoreArray = [];
    for (let i = 0; i < data.length; i++) {
        
        score = [data[i].name,data[i].score];

        globals.highscoreArray.push(score);
    }
}
//exportamos funciones
export {
    initHTMLelements,
    initVars,
    loadAssets,
    initSprites,
    initLevel0,
    initTimers,
    initEvents,
    initParticles,
    initExplosion,
    initDust,
    initSplash,
    initEnemytree,
    initWeed,
    initKey,
    initPotion,
    initBar,
    initSpark,
    initArrow,
    initEnemyParticle,
    scoresAJAXRequest,

}