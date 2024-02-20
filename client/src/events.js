import Sprite from "./Sprite.js";
import { State, SpriteID, Game, Sound } from "./constants.js";
import globals from "./globals.js";

export function KeydownHandler(event)
{

    const PLAYER = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);
    const lamp = globals.sprites.find((lamp) => lamp.id === SpriteID.LAMP);
    const FIREBREATH = globals.sprites.find((Fire) => Fire.id === SpriteID.FIREBREATH);
    
    switch (event.code) 
    {
        case "KeyD":
            globals.action.moveRight = true;
            break;
        case "KeyA":
            globals.action.moveLeft = true;
         
            break;

        case "KeyW":
            globals.action.jump = true;
            
            
            break;

        case "KeyK":

            globals.action.throw = true;
        
            if (PLAYER.state === State.STILL_LEFT) 
            {

                
            }
            else if (PLAYER.state === State.STILL_RIGHT) {


                
            }

            break;
        
        case "KeyL":
            globals.action.throw = true;
            lamp.thrownClose = true;

            break;
        
        case "Enter":
                globals.action.menuEjec = true;
                
            break;
        case "Space":

                globals.action.menuEjec = true;

            break;
        case "KeyJ":

            if (globals.gameState === Game.PLAYING || globals.gameState === Game.DEMO) {
                
                if (globals.sounds.currentTime === 0 ) {
                    
                    globals.currentSound = Sound.SFX_FIREBREATH;
                        
                    }
            
                globals.action.firebreath = true;

                if (PLAYER.state === State.STILL_LEFT) 
                {
                    
                    FIREBREATH.state = State.FIREBREATH_LEFT;
                    
                }
                else if (PLAYER.state === State.STILL_RIGHT) 
                {

                    FIREBREATH.state = State.FIREBREATH_RIGTH;
                    
                }
            }
            break;
         case "KeyH":
            globals.action.drink  = true;
            
            
            break;

        case "KeyQ":
            
            globals.action.changeDrink  = true;
            
            
            break;
        case "ArrowUp":
            globals.action.menuUp  = true;
            
            
            break;
        
        case "ArrowDown":

                globals.action.menuDown  = true;
                
                
                break;
        case "ArrowLeft":
            globals.action.menuLeft  = true;
            
            
            break;
        case "ArrowRight":
            globals.action.menuRight  = true;
            
            
            break;
        case "Escape":

                globals.action.menuReturn  = true;
                
                
                break;
        case "KeyP":

        globals.action.boomBoxChange  = true;
        
        
        break;


        default:

            break;
    }
}

export function KeyupHandler(event)
{
    const lamp = globals.sprites.find((Lamp) => Lamp.id === SpriteID.LAMP);

    switch (event.code) {
        case "KeyD":
            globals.action.moveRight = false;
            
            break;
        case "KeyA":
            globals.action.moveLeft = false;
  
            break;
        
        case "KeyW":
            globals.action.jump = false;
           
            break;

        case "KeyK":
            globals.action.throw = false;
            break;
        case "KeyL":
            globals.action.throw = false;

            break;
        case "Space":
            
            globals.action.menuEjec = false;
            break;
        case "KeyJ":
        
            globals.action.firebreath = false;
            lamp.state = State.LAMP_ELIPTIC;
            
        break;
        case "KeyH":
            
                globals.action.drink  = false;
                
                
                break;
        case "KeyQ":
            
                globals.action.changeDrink  = false;
                
                
                break;

        case "ArrowUp":
            globals.action.menuUp  = false;
            
            
            break;
        
        case "ArrowDown":

                globals.action.menuDown  = false;
                
                
                break;
        case "ArrowLeft":
            globals.action.menuLeft  = false;
            
            
            break;
        case "ArrowRight":
            globals.action.menuRight  = false;
            
            
            break;
        case "Escape":

                globals.action.menuReturn  = false;
                
                
                break;
        case "Enter":
            globals.action.menuEjec = false;
            
            break;

        case "KeyP":

            globals.action.boomBoxChange  = false;
        
        
            break;

        default:
            break;
    }
}

export function updateMusic()
{
    const buffer = 0.28;
    const music = globals.currentMusic;

    if (music.currentTime > music.duration - buffer) {
        
        music.currentTime = 0;
        music.play();
    }
}
