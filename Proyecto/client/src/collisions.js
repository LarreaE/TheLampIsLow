import globals from "./globals.js";
import { BLOCK, SpriteID, State } from "./constants.js";
import { level1, level2 } from "./Level.js";

//funcion que calcula si dos cuadrados interseccionan
function rectIntersect(x1,y1,w1,h1,x2,y2,w2,h2)
{
    let isOverlap;

    //check overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
        
        isOverlap = false;

    }
    else
    {
        isOverlap = true;
    }

    return isOverlap;
}

function detectCollisions()
{
    const enemy = globals.sprites.find((enemy) => enemy.id === SpriteID.ENEMY);
    let enemies = findRepeat(globals.sprites, enemy);
    //calculamos colision del player con cada sprite
    for (let index = 1; index < globals.sprites.length ; index++) {
        
        detectCollisionBetweenPlayerAndSprite(globals.sprites[index]);
        
    }
    for (let i = 0; i < enemies.length; i++) {
        
        detectCollisionBetweenEnemyAndMapObstacles(enemies[i]);
        detectCollisionBetweenEnemyAndFire(enemies[i]);
        
    }

    detectCollisionBetweenLampAndMapObstacles();
    detectCollisionBetweenPlayerAndMapObstacles6();
}

function detectCollisionBetweenPlayerAndSprite(sprite)
{
   
        //reset collision state
        sprite.isCollidingWithPlayer = false;

        //nuestro player esta en la posicion 0
        const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);


        //datos player
        const x1 = player.xPos + player.hitBox.xOffset;
        const y1 = player.yPos + player.hitBox.yOffset;
        const w1 = player.hitBox.xSize;
        const h1 = player.hitBox.ySize;

        //datos sprite
        const x2 = sprite.xPos + sprite.hitBox.xOffset;
        const y2 = sprite.yPos + sprite.hitBox.yOffset;
        const w2 = sprite.hitBox.xSize;
        const h2 = sprite.hitBox.ySize;
        
        const isOverlap = rectIntersect(x1,y1,w1,h1,x2,y2,w2,h2);

        if (isOverlap) {
            //colision existe
            sprite.isCollidingWithPlayer = true;
        }
    
}

function detectCollisionBetweenEnemyAndFire(enemy)
{
    
    let isOverlap = false;
    //nuestro enemy esta en la posicion 0
    const fire = globals.sprites.find((fire) => fire.id === SpriteID.FIRE);
    const firebreath = globals.sprites.find((firebreath) => firebreath.id === SpriteID.FIREBREATH);

    
        //reset collision state
    enemy.isCollidingWithFire = false;


    
    //datos enemy
    const x1 = enemy.xPos + enemy.hitBox.xOffset;
    const y1 = enemy.yPos + enemy.hitBox.yOffset;
    const w1 = enemy.hitBox.xSize;
    const h1 = enemy.hitBox.ySize;

    //datos sprite
    const x2 = fire.xPos + fire.hitBox.xOffset;
    const y2 = fire.yPos + fire.hitBox.yOffset;
    const w2 = fire.hitBox.xSize;
    const h2 = fire.hitBox.ySize;

    const x3 = firebreath.xPos + firebreath.hitBox.xOffset;
    const y3 = firebreath.yPos + firebreath.hitBox.yOffset;
    const w3 = firebreath.hitBox.xSize;
    const h3 = firebreath.hitBox.ySize;
    if (fire.state === State.FIRE_ONFIRE) {
       
        isOverlap = rectIntersect(x1,y1,w1,h1,x2,y2,w2,h2);
        if (isOverlap) {
            //colision existe
            enemy.isCollidingWithFire = true;
        }
    }
    
    

    if (firebreath.state === State.FIREBREATH_LEFT || firebreath.state === State.FIREBREATH_RIGTH ) {
       
        isOverlap = rectIntersect(x1,y1,w1,h1,x3,y3,w3,h3);
    
        if (isOverlap) {
            //colision existe
            enemy.isCollidingWithFire = true;
        }
    }
     
}

function getMapTiledId(xPos,yPos)
{
    const brickSize = globals.level[0].imageSet.gridSize;
    const levelData = globals.level[globals.currentLevel].data;

    const fil = Math.floor(yPos / brickSize);
    const col = Math.floor(xPos / brickSize);
    let i = 9;
    
    if (globals.currentLevel === 8) {
        i = 10;
    }
    
    if (fil <= -1 || fil > i || col <=-1 || col > 18 ) 
    {
    return -1;    
    }
    return levelData[fil][col];
    
}
function isCollidingWithObstacleAt(xPos, yPos, obstaclesArray)
{
    let isColliding;

    const id = getMapTiledId(xPos, yPos);


    for(let i = 0; i < obstaclesArray.length; i++)
    {
        if (id === obstaclesArray[i])
        {
            isColliding = true;
            break;
        }
        else
        {
            isColliding = false;
        }
    }
    //Calculamos colisión con bloque de cristal 
    return isColliding;
}
function detectCollisionBetweenPlayerAndMapObstacles6()
{
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);


    let xPos;
    let yPos;
    
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isCollidingOnPos4;
    let isCollidingOnPos5;
    let isCollidingOnPos6;

    const brickSize = globals.level[2].imageSet.gridSize;

    //ID del objeto
    const obstacleId = [BLOCK.COLUMNA_AZUL_BOTTOM, BLOCK.COLUMNA_AZUL_MIDDLE, BLOCK.COLUMNA_AZUL_TOP, BLOCK.PATH_MUD_1,BLOCK.PATH_BRICK_1, BLOCK.PATH_BRICK_2, BLOCK.PATH_BRICK_3, BLOCK.PATH_BRICK_4, BLOCK.PATH_WOOD_1, BLOCK.WOOD_BRIDGE_LEFT, BLOCK.WOOD_BRIDGE_RIGHT, BLOCK.MUD_BLOCK_RIGHT, BLOCK.PLATFORM_GRASS_LEFT, BLOCK.PLATFORM_GRASS_MIDDLE, BLOCK.PLATFORM_GRASS_RIGHT];
    if (player.hasKey === false) {
        obstacleId.push(BLOCK.DOOR_TOP, BLOCK.DOOR_BOTTOM,);
    }


    //reset collision state 
    player.isCollidingWithObstacleOnBottom = false;
    player.isCollidingWithObstacleOnRight = false;
    player.isCollidingWithObstacleOnLeft = false;
    player.isCollidingWithObstacleOnTop = false;

    //colisiones en 6 puntos
    // 6---1
    // -----
    // 5---2
    // -----
    // 4---3

    let overlapX;
    let overlapY;

    //calculamos colisiones en 6 puntos

    if (player.physics.vx >= 0) 
    {
    //punto 6
        //primera colision en 
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        if (isCollidingOnPos6) //hay colision
        {
            //calculamos overlap en y
            overlapY = brickSize - Math.floor(yPos) % brickSize;

            //colision en eje y
            player.yPos += overlapY;
            player.physics.vy = 0;
            //player.isCollidingWithObstacleOnTop = true;
            
        }

    //punto 4
        //ultima colision en (xPos, yPos + ySize -1)
    xPos = player.xPos + player.hitBox.xOffset;
    yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

    if (isCollidingOnPos4) //colision en punto 4
    {
        overlapY = Math.floor(yPos) % brickSize + 1;

        //colision en eje y
        player.yPos -= overlapY;
        player.isCollidingWithObstacleOnBottom = true;
        player.physics.vy = 0;

    }

    //punto 2
    xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
    yPos = player.yPos + player.hitBox.yOffset + 10;
    isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

    if (isCollidingOnPos2) {
        overlapX = Math.floor(xPos) % brickSize + 1;
        
        player.xPos -= overlapX;
        player.physics.vx = 0;
        
    }

    //punto 1

    xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
    yPos = player.yPos + player.hitBox.yOffset;
    isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

    if (isCollidingOnPos1) //colision en punto 1
    {

        overlapX = Math.floor(xPos) % brickSize + 1;
        overlapY = brickSize - Math.floor(yPos) % brickSize;

        if (overlapX <= overlapY) 
        {
             //colision en eje x
            player.xPos -= overlapX;
            player.physics.vx = 0;

        }
        else
        {
            //colision en eje y

            if (player.physics.vy > 0) 
            {
                player.yPos += overlapY;
            }
            else
            {
                player.yPos += overlapY;
                player.physics.vy = 0;
            }
           
            
            
        }
        
    }

  //punto 3
  xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
  yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
  isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

        if (isCollidingOnPos3) 
        {
            
            overlapX = Math.floor(xPos) % brickSize + 1;
            overlapY = Math.floor(yPos) % brickSize + 1;
            if (overlapX <= overlapY) 
            {
                //colision en eje x
                player.xPos -= overlapX;
                
                player.physics.vx = 0;

            }
            else
            {
                //colision en eje y

                if (player.physics.vy > 0) 
                {
                    player.yPos -= overlapY;
                    player.isCollidingWithObstacleOnBottom = true;
                    player.physics.vy = 0;

                }
                else
                {
                    player.yPos -= overlapY;
                
                    player.physics.vy = 0;
                    player.isCollidingWithObstacleOnBottom = true;
                }
                
            }
        }
    }
    else //moviendo a izquierda
    {
        //punto 1
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize -1;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

        if (isCollidingOnPos1) 
        {
            overlapY = brickSize - Math.floor(yPos) % brickSize + 1;
            //solo existe overlapen vertical
            //calculamos overlap solo en Y
            player.yPos += overlapY;
            player.physics.vy = 0;
            //player.isCollidingWithObstacleOnTop = true;
            //ajustamos vy y isCollidingWithObstacleOnBottom

        }

       

        //punto 3
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);
        
        if (isCollidingOnPos3) 
        {
            
            overlapY = Math.floor(yPos) % brickSize + 1;

            //colision en eje y
            player.yPos -= overlapY;
            player.isCollidingWithObstacleOnBottom = true;
            player.physics.vy = 0;
        }

        //punto 5
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset + 10;
        isCollidingOnPos5 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

        if (isCollidingOnPos5) {
            overlapX = brickSize - Math.floor(xPos) % brickSize;
            
            player.xPos += overlapX;
            player.physics.vx = 0;
            
        }

        //punto 6
        //primera colision en 
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        if (isCollidingOnPos6) //colision en punto 6
    {

        overlapX = brickSize - Math.floor(xPos) % brickSize;
        overlapY = brickSize - Math.floor(yPos) % brickSize;

        if (overlapX <= overlapY) 
        {
             //colision en eje x
            player.xPos += overlapX;
            
            player.physics.vx = 0;

        }
        else
        {
            //colision en eje y

            if (player.physics.vy > 0) 
            {
                player.yPos += overlapY;
                player.physics.vy = 0;

            }
            else
            {
                player.yPos += overlapY;
                player.physics.vy = 0;
            }
            
        }
        
    }

    //punto 4
    xPos = player.xPos + player.hitBox.xOffset;
    yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

    if (isCollidingOnPos4) //colision en punto 4
    {

        overlapX = brickSize - Math.floor(xPos) % brickSize;
        overlapY = Math.floor(yPos) % brickSize + 1;
        //colision en eje y
        if (overlapX <= overlapY) 
        {
             //colision en eje x
            player.xPos += overlapX;
            
            player.physics.vx = 0;
  
        }
        else
        {
            //colision en eje y
  
            if (player.physics.vy > 0) 
            {
                player.yPos -= overlapY;
                player.isCollidingWithObstacleOnBottom = true;
                player.physics.vy = 0;


            }
            else
            {
                player.yPos -= overlapY;
                player.physics.vy = 0;
                player.isCollidingWithObstacleOnBottom = true;
            }
           
            
            
        }

    }
    }

    
}
function detectCollisionBetweenEnemyAndMapObstacles(enemy)
{

    let isThereEnemy = findVariable(globals.sprites, enemy);
   

    if (isThereEnemy) {
            let xPos;
            let yPos;
            
            let isCollidingOnPos1;
            let isCollidingOnPos2;
            let isCollidingOnPos3;
            let isCollidingOnPos4;
            let isCollidingOnPos5;
            let isCollidingOnPos6;
        
            const brickSize = globals.level[2].imageSet.gridSize;
        
            //ID del objeto
            const obstacleId = [BLOCK.PATH_MUD_1,BLOCK.PATH_BRICK_1, BLOCK.PATH_BRICK_2, BLOCK.PATH_BRICK_3, BLOCK.PATH_BRICK_4, BLOCK.PATH_WOOD_1, BLOCK.WOOD_BRIDGE_LEFT, BLOCK.WOOD_BRIDGE_RIGHT, BLOCK.MUD_BLOCK_RIGHT, BLOCK.PLATFORM_GRASS_LEFT, BLOCK.PLATFORM_GRASS_MIDDLE, BLOCK.PLATFORM_GRASS_RIGHT, BLOCK.DOOR_BOTTOM, BLOCK.DOOR_TOP];
                
            //reset collision state 
        enemy.isCollidingWithObstacleOnBottom = false;
        enemy.isCollidingWithObstacleOnRight = false;
        enemy.isCollidingWithObstacleOnLeft = false;
        enemy.isCollidingWithObstacleOnTop = false;

        //colisiones en 6 puntos
        // 6---1
        // -----
        // 5---2
        // -----
        // 4---3

        let overlapX;
        let overlapY;

        //calculamos colisiones en 6 puntos

        if (enemy.physics.vx >= 0) 
        {
            //punto 6
            //primera colision en 
            xPos = enemy.xPos + enemy.hitBox.xOffset;
            yPos = enemy.yPos + enemy.hitBox.yOffset;
            isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

            if (isCollidingOnPos6) //hay colision
            {
                //calculamos overlap en y
                overlapY = brickSize - Math.floor(yPos) % brickSize;

                //colision en eje y
                enemy.yPos += overlapY;
                enemy.physics.vy = 0;
                //enemy.isCollidingWithObstacleOnTop = true;
                
            }

        //punto 4
            //ultima colision en (xPos, yPos + ySize -1)
            xPos = enemy.xPos + enemy.hitBox.xOffset;
            yPos = enemy.yPos + enemy.hitBox.yOffset + enemy.hitBox.ySize - 1;
            isCollidingOnPos4 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

            if (isCollidingOnPos4) //colision en punto 4
        {
            overlapY = Math.floor(yPos) % brickSize + 1;

            //colision en eje y
            enemy.yPos -= overlapY;
            enemy.isCollidingWithObstacleOnBottom = true;
            enemy.physics.vy = 0;

            }

            //punto 2
            xPos = enemy.xPos + enemy.hitBox.xOffset + enemy.hitBox.xSize - 1;
            yPos = enemy.yPos + enemy.hitBox.yOffset + 10;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

            if (isCollidingOnPos2) {
                overlapX = Math.floor(xPos) % brickSize + 1;
                
                enemy.xPos -= overlapX;
                enemy.physics.vx = 0;
                enemy.isCollidingWithObstacleOnRight = true;
                
            }

            //punto 1

            xPos = enemy.xPos + enemy.hitBox.xOffset + enemy.hitBox.xSize - 1;
            yPos = enemy.yPos + enemy.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

            if (isCollidingOnPos1) //colision en punto 1
            {

                overlapX = Math.floor(xPos) % brickSize + 1;
                overlapY = brickSize - Math.floor(yPos) % brickSize;

                if (overlapX <= overlapY) 
                {
                    //colision en eje x
                    enemy.xPos -= overlapX;
                    enemy.physics.vx = 0;
                    enemy.isCollidingWithObstacleOnRight = true;

                }
                else
                {
                    //colision en eje y

                    if (enemy.physics.vy > 0) 
                    {
                        enemy.yPos += overlapY;
                    }
                    else
                    {
                        enemy.yPos += overlapY;
                        enemy.physics.vy = 0;
                    }
                
                    
                    
                }
                
            }

            //punto 3
            xPos = enemy.xPos + enemy.hitBox.xOffset + enemy.hitBox.xSize - 1;
            yPos = enemy.yPos + enemy.hitBox.yOffset + enemy.hitBox.ySize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

            if (isCollidingOnPos3) 
            {
                
                overlapX = Math.floor(xPos) % brickSize + 1;
                overlapY = Math.floor(yPos) % brickSize + 1;
                if (overlapX <= overlapY) 
                {
                    //colision en eje x
                    enemy.xPos -= overlapX;
                    
                    enemy.physics.vx = 0;
                    enemy.isCollidingWithObstacleOnRight = true;

                }
                else
                {
                    //colision en eje y

                    if (enemy.physics.vy > 0) 
                    {
                        enemy.yPos -= overlapY;
                        enemy.isCollidingWithObstacleOnBottom = true;
                        enemy.physics.vy = 0;

                    }
                    else
                    {
                        enemy.yPos -= overlapY;
                    
                        enemy.physics.vy = 0;
                        enemy.isCollidingWithObstacleOnBottom = true;
                    }
                    
                }
            }
        }
        else //moviendo a izquierda
        {
            //punto 1
            xPos = enemy.xPos + enemy.hitBox.xOffset + enemy.hitBox.xSize -1;
            yPos = enemy.yPos + enemy.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

            if (isCollidingOnPos1) 
            {
                overlapY = brickSize - Math.floor(yPos) % brickSize + 1;
                //solo existe overlapen vertical
                //calculamos overlap solo en Y
                enemy.yPos += overlapY;
                enemy.physics.vy = 0;
                //enemy.isCollidingWithObstacleOnTop = true;
                //ajustamos vy y isCollidingWithObstacleOnBottom

            }  

            //punto 3
            xPos = enemy.xPos + enemy.hitBox.xOffset + enemy.hitBox.xSize - 1;
            yPos = enemy.yPos + enemy.hitBox.yOffset + enemy.hitBox.ySize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);
            
            if (isCollidingOnPos3) 
            {
                
                overlapY = Math.floor(yPos) % brickSize + 1;

                //colision en eje y
                enemy.yPos -= overlapY;
                enemy.isCollidingWithObstacleOnBottom = true;
                enemy.physics.vy = 0;
            }

            //punto 5
            xPos = enemy.xPos + enemy.hitBox.xOffset;
            yPos = enemy.yPos + enemy.hitBox.yOffset + 10;
            isCollidingOnPos5 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

            if (isCollidingOnPos5) {
                overlapX = brickSize - Math.floor(xPos) % brickSize;
                
                enemy.xPos += overlapX;
                enemy.physics.vx = 0;
                enemy.isCollidingWithObstacleOnLeft = true;
                
            }

            //punto 6
            //primera colision en 
            xPos = enemy.xPos + enemy.hitBox.xOffset;
            yPos = enemy.yPos + enemy.hitBox.yOffset;
            isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

            if (isCollidingOnPos6) //colision en punto 6
        {

            overlapX = brickSize - Math.floor(xPos) % brickSize;
            overlapY = brickSize - Math.floor(yPos) % brickSize;

            if (overlapX <= overlapY) 
            {
                //colision en eje x
                enemy.xPos += overlapX;
                
                enemy.physics.vx = 0;
                enemy.isCollidingWithObstacleOnLeft = true;

            }
            else
            {
                //colision en eje y

                if (enemy.physics.vy > 0) 
                {
                    enemy.yPos += overlapY;
                    enemy.physics.vy = 0;

                }
                else
                {
                    enemy.yPos += overlapY;
                    enemy.physics.vy = 0;
                }
                
            }
            
            }

            //punto 4
            xPos = enemy.xPos + enemy.hitBox.xOffset;
            yPos = enemy.yPos + enemy.hitBox.yOffset + enemy.hitBox.ySize - 1;
            isCollidingOnPos4 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

            if (isCollidingOnPos4) //colision en punto 4
            {

                overlapX = brickSize - Math.floor(xPos) % brickSize;
                overlapY = Math.floor(yPos) % brickSize + 1;
                //colision en eje y
                if (overlapX <= overlapY) 
                {
                    //colision en eje x
                    enemy.xPos += overlapX;
                    
                    enemy.physics.vx = 0;
                    enemy.isCollidingWithObstacleOnLeft = true;
        
                }
                else
                {
                    //colision en eje y
        
                    if (enemy.physics.vy > 0) 
                    {
                        enemy.physics.vy = 0;
                        enemy.yPos -= overlapY;
                        enemy.isCollidingWithObstacleOnBottom = true;

                    }
                    else
                    {
                        enemy.yPos -= overlapY;
                        enemy.physics.vy = 0;
                        enemy.isCollidingWithObstacleOnBottom = true;
                    }
                
                    
                    
                }

            }
        }

}
}
function detectCollisionBetweenLampAndMapObstacles()
{
    const lamp = globals.sprites.find((Lamp) => Lamp.id === SpriteID.LAMP);
    const player = globals.sprites.find((Player) => Player.id === SpriteID.PLAYER);


    let xPos;
    let yPos;
    
    let isCollidingOnPos1;
    let isCollidingOnPos3;
    let isCollidingOnPos4;
    let isCollidingOnPos6;

    const brickSize = globals.level[2].imageSet.gridSize;

    //ID del objeto

    const obstacleId = [BLOCK.PATH_MUD_1,BLOCK.PATH_BRICK_1, BLOCK.PATH_BRICK_2, BLOCK.PATH_BRICK_3, BLOCK.PATH_BRICK_4, BLOCK.PATH_WOOD_1, BLOCK.WOOD_BRIDGE_LEFT, BLOCK.WOOD_BRIDGE_RIGHT, BLOCK.MUD_BLOCK_RIGHT, BLOCK.PLATFORM_GRASS_LEFT, BLOCK.PLATFORM_GRASS_MIDDLE, BLOCK.PLATFORM_GRASS_RIGHT];
    if (player.hasKey === false) {
        obstacleId.push(BLOCK.DOOR_TOP, BLOCK.DOOR_BOTTOM,);
    }


    //reset collision state 
    lamp.isCollidingWithObstacleOnBottom = false;
    lamp.isCollidingWithObstacleOnRight = false;
    lamp.isCollidingWithObstacleOnLeft = false;
    lamp.isCollidingWithObstacleOnTop = false;

    //colisiones en 6 puntos
    // 6---1
    // -----
    // 5---2
    // -----
    // 4---3

    let overlapX;
    let overlapY;

    //calculamos colisiones en 6 puntos
    if (lamp.state != State.LAMP_ELIPTIC) 
    {
        if (lamp.physics.vx >= 0) 
    {
    //punto 6
        //primera colision en 
        xPos = lamp.xPos + lamp.hitBox.xOffset;
        yPos = lamp.yPos + lamp.hitBox.yOffset;
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        if (isCollidingOnPos6) //hay colision
        {
            //calculamos overlap en y
            overlapY = brickSize - Math.floor(yPos) % brickSize;

            //colision en eje y
            lamp.yPos += overlapY;
            lamp.physics.vy = 0;
            lamp.isCollidingWithObstacleOnTop = true;
            
        }

    //punto 4
        //ultima colision en (xPos, yPos + ySize -1)
    xPos = lamp.xPos + lamp.hitBox.xOffset;
    yPos = lamp.yPos + lamp.hitBox.yOffset + lamp.hitBox.ySize - 1;
    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

    if (isCollidingOnPos4) //colision en punto 4
    {
        overlapY = Math.floor(yPos) % brickSize + 1;

        //colision en eje y
        lamp.yPos -= overlapY;
        lamp.isCollidingWithObstacleOnBottom = true;
        lamp.physics.vy = 0;

    }
    //punto 1

    xPos = lamp.xPos + lamp.hitBox.xOffset + lamp.hitBox.xSize - 1;
    yPos = lamp.yPos + lamp.hitBox.yOffset;
    isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

    if (isCollidingOnPos1) //colision en punto 1
    {

        lamp.isCollidingWithObstacleOnRight = true;
        lamp.haveCollided = true;

        overlapX = Math.floor(xPos) % brickSize + 1;
        overlapY = brickSize - Math.floor(yPos) % brickSize;

        if (overlapX <= overlapY) 
        {
             //colision en eje x
            lamp.xPos -= overlapX;
            
            lamp.physics.vx = 0;

        }
        else
        {
            //colision en eje y

            if (lamp.physics.vy > 0) 
            {
                lamp.yPos -= overlapY;
            }
            else
            {
                lamp.yPos += overlapY;
                lamp.physics.vy = 0;
            }
           
            
            
        }
        
    }

  //punto 3
  xPos = lamp.xPos + lamp.hitBox.xOffset + lamp.hitBox.xSize - 1;
  yPos = lamp.yPos + lamp.hitBox.yOffset + lamp.hitBox.ySize - 1;
  isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

  if (isCollidingOnPos3) 
  {
    lamp.isCollidingWithObstacleOnRight = true;
    lamp.haveCollided = true;
      overlapX = Math.floor(xPos) % brickSize + 1;
      overlapY = Math.floor(yPos) % brickSize + 1;
      if (overlapX <= overlapY) 
      {
           //colision en eje x
          lamp.xPos -= overlapX;
          
          lamp.physics.vx = 0;

      }
      else
      {
          //colision en eje y

          if (lamp.physics.vy > 0) 
          {
              lamp.yPos -= overlapY;
          }
          else
          {
              lamp.yPos -= overlapY;
              lamp.physics.vy = 0;
          }
         
          
          
      }
  }
    }
    else //moviendo a izquierda
    {
        //punto 1
        xPos = lamp.xPos + lamp.hitBox.xOffset + lamp.hitBox.xSize -1;
        yPos = lamp.yPos + lamp.hitBox.yOffset;
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

        if (isCollidingOnPos1) 
        {
            overlapY = brickSize - Math.floor(yPos) % brickSize;
            //solo existe overlapen vertical
            //calculamos overlap solo en Y
            lamp.yPos += overlapY;
            lamp.physics.vy = 0;
            lamp.isCollidingWithObstacleOnTop = true;
            //ajustamos vy y isCollidingWithObstacleOnBottom

        }

       

        //punto 3
        xPos = lamp.xPos + lamp.hitBox.xOffset + lamp.hitBox.xSize - 1;
        yPos = lamp.yPos + lamp.hitBox.yOffset + lamp.hitBox.ySize - 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);
        
        if (isCollidingOnPos3) 
        {
            
            overlapY = Math.floor(yPos) % brickSize + 1;

            //colision en eje y
            lamp.yPos -= overlapY;
            lamp.isCollidingWithObstacleOnBottom = true;
            lamp.physics.vy = 0;
        }
        
        //punto 6
        //primera colision en 
        xPos = lamp.xPos + lamp.hitBox.xOffset;
        yPos = lamp.yPos + lamp.hitBox.yOffset;
        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        if (isCollidingOnPos6) //colision en punto 6
    {
        lamp.isCollidingWithObstacleOnLeft = true;
        lamp.haveCollided = true;

        overlapX = brickSize - Math.floor(xPos) % brickSize;
        overlapY = brickSize - Math.floor(yPos) % brickSize;

        if (overlapX <= overlapY) 
        {
             //colision en eje x
            lamp.xPos += overlapX;
            
            lamp.physics.vx = 0;

        }
        else
        {
            //colision en eje y

            if (lamp.physics.vy > 0) 
            {
                lamp.yPos -= overlapY;
                lamp.physics.vy = 0;

            }
            else
            {
                lamp.yPos += overlapY;
                lamp.physics.vy = 0;
            }
           
            
            
        }
        
    }

    //punto 4
    xPos = lamp.xPos + lamp.hitBox.xOffset;
    yPos = lamp.yPos + lamp.hitBox.yOffset + lamp.hitBox.ySize - 1;
    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos,yPos,obstacleId);

    if (isCollidingOnPos4) //colision en punto 4
    {
        lamp.isCollidingWithObstacleOnLeft = true;
        lamp.haveCollided = true;

        overlapX = brickSize - Math.floor(xPos) % brickSize;
        overlapY = Math.floor(yPos) % brickSize + 1;
        //colision en eje y
        if (overlapX <= overlapY) 
        {
             //colision en eje x
            lamp.xPos += overlapX;
            
            lamp.physics.vx = 0;
  
        }
        else
        {
            //colision en eje y
  
            if (lamp.physics.vy > 0) 
            {
                lamp.yPos -= overlapY;
            }
            else
            {
                lamp.yPos -= overlapY;
                lamp.physics.vy = 0;
            }
           
            
            
        }

    }
    }
    }
    if (lamp.xPos + lamp.imageSet.xSize > globals.canvas.width && lamp.thrown) {
        lamp.state = State.LAMP_THROW_LEFT;
    }
    else if (lamp.xPos < 0 && lamp.thrown) {
        lamp.state = State.LAMP_THROW_RIGHT;

    }
    
}
function findVariable(array, variable) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === variable) {
        return true;
      }
    }
  
    return false;
  }

  function findRepeat(array, elemento) {
    // Crear un arreglo vacío para almacenar los elementos repetidos
    const repetidos = [];
    const isThereSprite = findVariable(globals.sprites,elemento);

    if (isThereSprite) {
          // Iterar sobre el array original
        for (let i = 0; i < array.length; i++) {
            // Si el elemento actual es igual al elemento buscado
            if (array[i].id === elemento.id) {
            // Agregar el elemento actual al arreglo de repetidos
            repetidos.push(array[i]);
            }
        }
        
        // Devolver el arreglo de repetidos
        return repetidos;
    }
    else return -1;
  
  }
export {

    detectCollisions,
    findVariable,
    findRepeat,

}