//constants

//Estados del juego

export const Game = {
    INVALID:   -1,
    LOADING:    0,
    PLAYING:    1,
    GAME_OVER:  2,
    NEW_GAME:   3,
    CONTROLS:   4,
    STORY:      5,
    HIGHSCORES: 6,
    FREEZE:     7,
    SENKYOU:    8,
    DEMO:       9,
    YOU_WIN_1:  10,
    YOU_WIN_2:  11,
    START:      12,
    WRITE_NAME: 13,
    LOAD_HIGHSCORES: 14,
    UPDATE_HIGHSCORES: 15,
    NEW_HIGHSCORES: 16,


};

//velocidad del juego

export const FPS = 60;

export const Sound = {
    NO_SOUND: -1,

    SFX_FIRE:   0,
    SFX_POTION: 1,
    SFX_WEED:   2,
    SFX_ENEMYDIE:   3,
    SFX_FIREBREATH:   4,
    SFX_JUMP:   5,
    SFX_KEY: 6,

}
export const MUSIC = {
    NO_SOUND: -1,
    MUSIC_MENU_1: 0,
    MUSIC_MENU_2: 1,
    MUSIC_MENU_3: 2,
    DANCE_HYMN_SOUL: 3,
    BELL_OF_BATTLE: 6,
    SOPHISTICATED_FIGHT: 16,
    MEGAMAN_OP: 12,
    FROGS_THEME: 8,
    BATTLE_B2: 5,
    REACH_SUMMIT: 13,
}
//identificador de tipo sprite(ID)
export const SpriteID = {

    // objects
    PLAYER: 0,
    LAMP: 1,
    KEY: 3,
    WEED:  5,
    POTION: 4,
    FIRE: 6,
    FIREBREATH: 7,
    ENEMY: 2,


    //HUD

    HUD_POTION: 8,
    HUD_POTION1: 9,
    HUD_POTION2: 10,
    HUD_POTION3: 11,
    HUD_ANGELO:  12,
    HUD_LAMP: 13,
    HUD_KEY: 14,

    

}
export const CurrentLEVEL = {
    
    LEVEL_0: 0,
    LEVEL_1: 1,
    LEVEL_2: 2,
    LEVEL_3: 3,
    LEVEL_4: 4,
    LEVEL_5: 5,
    LEVEL_6: 6,
    LEVEL_7: 7,
    LEVEL_8: 8,

}
//identificador de estado de sprite (direccion)
export const State = {
    //estados de player
    STILL_RIGHT:  0,
    STILL_LEFT: 1,
    MID_LEFT: 3,
    MID_RIGHT: 5,
    LEFT:   4,  
    RIGHT:  2,
    JUMP_RIGHT: 6,
    JUMP_LEFT: 7,
    

    //estados de LAMP 
    LAMP_ELIPTIC:           0,
    LAMP_THROW_RIGHT:       1,
    LAMP_THROW_LEFT:        2,
    LAMP_FIREBREATH_LEFT:   3,
    LAMP_FIREBREATH_RIGHT:  4,


    //TOKEN States
    ACTION_1: 0,
    ACTION_2: 1,

    //STILL
    STILL: 0,

    //estados de enemy
    ENEMY_STILL:        0,
    ENEMY_MOVE_LEFT:    1,
    ENEMY_MOVE_RIGHT:   2,
    ENEMY_ATTACK:       3,

    //fire state
    FIRE_ONFIRE: 0,

    //FIREBREATH STATES
    FIREBREATH_RIGTH: 0,
    FIREBREATH_LEFT:  1,



}

export const Key = {
    RIGHT:  100,
    LEFT:   97,
    JUMP:   32,

}

export const GRAVITY = 200;

export const LEVELID = {
    LEVEL_0: 1,
    LEVEL_1: 0,
}

export const Tile = {
    SIZE_32: 0, // sprites de 32x32
    SIZE_16: 1, // sprites de 16x16
    SIZE_64: 2, // sprites de 64x64
}
export const Collision = {

    NO_COLLISION:   -1,
    BORDER_UP:      0,
    BORDER_DOWN:    1,
    BORDER_LEFT:    2,
    BORDER_RIGHT:   3,
    
}
export const ParticleID = {
    EXPLOSION: 0,
    DUST: 1,
    SPLASH: 2,
    BAR: 3,
    SPARK: 4,
    ARROW: 5,
    ENEMY: 6,
    
}
export const ParticleState = {
    ON:     0,
    FADE:   1,
    OFF:    -1,

}
export const BLOCK = {

    EMPTY:                  0,
    ROOF_LEFT:              46,
    ROOF_MIDDLE:            47,
    ROOF_RIGHT:             48,
    CHISEL_BRICK_BROKEN:    58,
    CHISEL_BRICK_1:         57,
    CHISEL_BRICK:           84,
    MUD_BLOCK_1:            104,
    MUD_BLOCK_RIGHT:        38,
    WATER_LEFT:             129,
    WATER_MIDDLE: 130,
    WATER_RIGHT: 131,
    WATER_MIDDLE_GLOW_1: 135,
    WATER_2_LEFT: 133,
    WATER_2_MIDDLE: 134,
    WATER_2_RIGHT: 131,
    COLUMNA_AZUL_TOP: 60,
    COLUMNA_AZUL_MIDDLE: 71,
    COLUMNA_AZUL_BOTTOM: 82,
    COLUMNA_BOTTOM: 90,
    COLUMNA_MIDDLE: 79,
    COLUMNA_TOP: 68,
    COLUMNA_ROTA_TOP: 70,
    COLUMNA_ROTA_BOTTOM: 92,
    CHISEL_ARC_TOP_LEFT: 75,
    CHISEL_ARC_TOP_RIGHT: 76,
    CHISEL_ARC_MIDDLE_LEFT: 86,
    CHISEL_ARC_MIDDLE_RIGHT: 87,
    CHISEL_COLUMN_LEFT: 73,
    CHISEL_COLUMN_RIGHT: 74,
    GRASS_1: 20,
    GRASS_2: 18,
    GRASS_3: 19,
    GRASS_4: 21,
    PLATFORM_GRASS_LEFT: 11,
    PLATFORM_GRASS_MIDDLE: 12,
    PLATFORM_GRASS_RIGHT: 13,
    WOOD_BRIDGE_LEFT: 137,
    WOOD_BRIDGE_RIGHT: 138,
    WOOD_BRIDGE_SOPORTE: 142,
    DOOR_TOP: 27,
    DOOR_BOTTOM: 35,
    PATH_MUD_1: 40,
    PATH_WOOD_1: 45,
    PATH_BRICK_1: 51,
    PATH_BRICK_2: 52,
    PATH_BRICK_3: 53,
    PATH_BRICK_4: 54,





}