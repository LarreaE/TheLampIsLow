//variables globales

import {Game} from './constants.js';

export default {
    
    //Acceso al canvas y context

    canvas: {},
    ctx: {},
    canvasHUD: {},
    ctxHUD: {},
    

    //DATOS DE IMAGEN (TILESET)
    tileSet: {},

    //variables para gestionar la carga de activos
    assetsToLoad: [],
    assetsLoaded: 0,
    
    //array con datos de los sprites
    sprites: [],
    
    objects: [],

    tileSets: [],
    
    sounds: [],

    musics: [],

    
    //estado del juego inicializamos INVALID   
    gameState: Game.INVALID,

    //tiempo de ciclo anterior (milliseconds)
    previousCycleMilliseconds: -1,

    //tiempo de ciclo de juego real (seconds)
    deltaTime: 0,
    cycleRealTime: 0,

    //tiempo de ciclo objetivo(Seconds, constante)
    frameTimeObj: 0,

    //Caja de texto para mostrar datos de depuracion
    txtPruebas: {},

    //datos del nivel
    level: [],

    unableToChangeDownLvl: [],
    unableToChangeUpLvl: [],


    //nivelActual
    currentLevel: 0,
    //cantidad de enemigos por nivel
    enemyCuantity: 0,
    //cantidad de enemigos spawneados
    enemyCounter: 10,
    //booleano si ha pasado el evento de horda
    eventHappened: false,

    //accion del enemigo
    enemyAction: null,

    //enemyTimer
    //temporizador de nivel
    levelTime: {},
    
    //demo timer
    demoTime: {},

    //temporizador de fuego
    fireTime: {},

    //temporizador de actualizacion de enemigos
    hordeTimer: {},
    
    //weedTimer
    weedTimer: {},
    
    //LOADING TIMER
    loadingItem: 0.1,

    //levelChangeTimer
    levelChangeTimer: {},

    //freeze Timer:
    freezeTimer: {},
    
    //highscoresTimer
    highscoresTimer: {},

    keyPressed: false,
    
    //angulo de lampara
    lampAngle: 20,

    //OBJETO QUE GUARDA EL ESTADO DE LA TECLA PULSADA
    action: {},

    //player previous state
    previousState: 0,

    //life
    life: 0,
    
    //score
    score: 0,

    movePx: 10,
    
    //highScore
    highscore: ["KAZ",0],
    
    //array de particulas
    particles: [],

    //para selecionar y navegar el menu
    selectedOption: 1,

    //highscore actual
    currentScore: 0,

    selectedHighscore: 0,   

    highscoreArray: [],

    //letra actual
    currentLetterPos: [0,1],

    selectedLetter: "",

    nameProgress: 0,

    loadProgress: 0,

    letter1: "",
    letter2: "",
    letter3: "",

    currentName: "___",

    postedScores: false,
    requestdedScores: false,
    

    //valor del ciclo anterior para navegar por el menu
    previousMenuUp: false,

    previousMenuDown: false,

    previousMenuRight: false,

    previousMenuLeft: false,

    previousMenuEjec: false,

    previousBBChange: false,
    
    previousEscape: false,
    
    showStoryScale: false,
    
    transition: 200,

    currentSound: -1,
    currentMusic: -1,
    
    boomboxPlaying: false,

    //volumen de la musica
    volume_music: 0.5,
    volume_sfx: 0.3,
 
    letters: [],
}