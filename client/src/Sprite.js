import Timer from "./Timer.js";
import { Collision } from "./constants.js";

//clase gestora de los sprites
export default class Sprite
{
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox)
    {
        this.id         = id;
        this.state      = state;
        this.xPos       = xPos;
        this.yPos       = yPos;
        this.imageSet   = imageSet;
        this.frames     = frames;
        this.physics    = physics;
        this.hitBox     = hitBox;   
        this.isCollidingWithPlayer = false;
        this.isCollidingWithObstacleOnTop = false;
        this.isCollidingWithObstacleOnLeft = false;
        this.isCollidingWithObstacleOnBottom = false;
        this.isCollidingWithObstacleOnRight = false;
        
    }
}

export class Enemy extends Sprite
{
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, action)
    {
        //llamamos al constructor de sprites
        super(id,state,xPos,yPos,imageSet,frames,physics, hitBox);

        this.collisionBorder = Collision.NO_COLLISION;
        this.enemyAction = action;
        this.isCollidingWithFire = false;
        this.burnProgress = 0;
        this.dead = false;
        this.enemyTimer = new Timer(8,1);
        this.actionTimer = new Timer(10,1);
    }
}

export class Lamp extends Sprite 
{
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, action, rotating)
    {
        super(id,state,xPos,yPos,imageSet,frames,physics, hitBox);

        this.collisionBorder = Collision.NO_COLLISION;
        this.lampAction = action;
        this.haveCollided = false;
        this.oil = 25;
        this.rotating = rotating;
        this.thrown = false;
        this.thrownClose = false;


    }
}

export class Player extends Sprite
{
    constructor(id, state, xPos, yPos, imageSet, frames, physics,hitBox,lifePoints)
    {
        super(id,state,xPos,yPos,imageSet,frames,physics,hitBox);

        this.lifePoints = lifePoints;
        this.isOnGround = false;
        this.isDamaged  = false;
        this.hasKey     = false;
        this.hasPotionRed = false;
        this.jumped     = false;
    }
}
export class Token extends Sprite
{
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox)
    {
        super(id,state,xPos,yPos,imageSet,frames,physics, hitBox);

       
    }
}

export class Fire extends Sprite
{
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox)
    {
        super(id,state,xPos,yPos,imageSet,frames,physics, hitBox);

        this.changingLevel = false;
       
    }
}

export class Weed extends Sprite
{
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox)
    {
        super(id,state,xPos,yPos,imageSet,frames,physics, hitBox);

        this.weedTimer = new Timer(8,1);
       
    }
}