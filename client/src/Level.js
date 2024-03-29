
export class Level
{
    constructor(data, imageSet)
    {
        this.data       = data;     //array bidimensional de datos
        this.imageSet   = imageSet; //datos de las imagenes del mapa
    }
}
export const level0 =
[
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],  
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],

]

//datos level 1
export const level1 = 
[

    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [35,0,18,19,21,146,147,148,0,0,0,0,0,0,0,0,0,0],
    [40,40,40,40,38,137,45,138,51,52,53,54,51,52,51,52,53,54],
    [104,104,104,104,38,0,0,142,75,76,75,76,75,76,75,76,75,76],
    [104,104,104,104,38,0,0,142,86,87,86,87,86,87,86,87,86,87],
    [104,104,104,104,38,0,0,142,73,74,73,74,73,74,73,74,73,74],
    [104,104,104,104,38,129,130,131,133,134,135,134,134,135,134,131,129,130],

]

export const level2 = 
[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,46,47,48,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,57,58,84,0,0],
    [0,0,0,11,12,13,0,0,0,0,0,0,0,68,0,70,0,0],
    [0,0,0,0,0,0,0,0,0,27,0,0,0,79,0,0,0,0],
    [20,0,18,19,21,146,147,148,0,35,0,0,0,90,0,92,0,0],
    [40,40,40,40,38,137,45,138,51,52,53,54,51,52,51,52,53,54],
    [104,104,104,104,38,0,0,142,75,76,75,76,75,76,75,76,75,76],
    [104,104,104,104,38,0,0,142,86,87,86,87,86,87,86,87,86,87],
    [104,104,104,104,38,0,0,142,73,74,73,74,73,74,73,74,73,74],
    [104,104,104,104,38,129,130,131,133,134,135,134,134,135,134,131,129,130],
]

export const level3 =
[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,0,40],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,0,40],
    [40,40,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,40],
    [0,0,0,0,0,0,0,0,0,40,40,40,40,40,40,40,],
    [0,0,0,0,0,40,0,0,0,40,40,40,40,40,40,40,],
    [40,0,0,0,0,0,0,0,40,0,0,0,40,0,0,0,0,0],
    [40,0,0,40,0,0,300,0,0,0,0,0,0,0,0,40,0,0],  
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,0,0],
    [40,40,40,40,40,0,0,0,0,40,40,40,40,40,40,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
]

export const level4 =
[
    [0,0,0,0,0,0,0,0,0,0,0,0,40,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,40,40,40,40,40],
    [40,40,0,0,0,0,0,0,0,0,0,0,40,0,0,40,0,0],
    [40,0,0,0,0,40,0,0,40,0,0,0,40,0,0,40,0,0],
    [40,0,0,40,0,0,300,0,0,0,0,0,0,0,0,27,0,0],  
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0],
    [40,40,40,40,40,0,0,0,0,40,40,40,40,40,40,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
]

export const level5 =
[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,0,40],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,0,40],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,0,40],
    [0,0,0,0,0,0,0,0,0,0,0,40,40,40,40,40,],
    [40,0,0,0,0,40,0,0,0,0,40,40,40,40,40,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,0,0,0],  
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [40,40,40,40,40,0,0,0,0,40,40,40,40,40,40,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
]



export const level6 =
[
    [40,0,0,0,0,0,40,0,0,0,0,40,0,0,0,40,0,0],
    [40,0,0,0,0,0,40,0,0,0,0,40,0,0,0,40,0,0],  
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,0,0],  
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0],  
    [40,0,0,0,0,0,40,0,0,0,0,40,0,0,0,40,0,0],  
    [40,0,0,0,0,0,40,0,0,0,0,40,0,0,0,40],  
    [0,0,0,0,40,0,40,40,0,0,0,40,40,40,40,40],  
    [0,0,0,0,0,0,40,40,0,0,0,40,0,0,0,40],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
]

export const level7 =
[
    [40,0,0,0,0,0,40,0,0,0,0,40,0,0,0,0,0,0],
    [40,0,0,0,0,0,40,0,0,0,0,40,0,0,0,40,0,0],  
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,40,0,0],  
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,0,0],  
    [40,0,0,0,0,0,40,0,0,0,0,40,0,0,0,40,0,0],  
    [40,0,0,0,0,0,40,0,0,0,0,40,0,0,0,40],  
    [7,0,0,0,40,0,40,40,0,0,0,40,0,40,0,40],  
    [40,0,0,0,0,0,40,40,0,0,0,40,0,0,0,40],
    [6,0,0,0,0,0,40,40,0,0,0,40,0,0,0,40],
    [40,0,0,0,0,0,40,40,0,0,0,40,0,0,0,40],
]

export const level8 =
[
    [40,0,0,0,0,0,0,0,40,0,0,0,0,0,0,40,],
    [40,0,0,0,0,0,0,40,40,40,0,0,0,0,40,40,],
    [40,0,0,0,0,0,0,0,27,0,0,0,0,0,0,10,],
    [40,0,0,0,0,0,0,0,35,0,0,0,0,0,27,0,],
    [40,0,0,40,40,40,40,40,40,40,40,0,0,0,35,0,],
    [40,0,0,0,0,0,27,0,40,0,27,0,0,0,40,40,40,],
    [40,0,0,0,0,0,35,0,40,0,35,0,0,0,0,40,40,],
    [40,40,40,0,0,40,40,40,40,40,40,40,0,0,0,40,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,40,40,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,0,0,],

   
]
export const level9 = 
[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,46,47,48,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,57,58,84,0,0],
    [60,0,0,11,12,13,0,0,0,0,0,0,0,68,0,70,0,0],
    [71,0,0,0,0,0,0,0,0,0,0,0,0,79,0,0,0,0],
    [82,0,0,147,148,0,147,148,0,0,0,0,0,90,0,92,0,0],
    [51,52,53,54,51,52,51,52,53,54,51,52,53,54,51,52],
    [75,76,75,76,75,76,75,76,75,76,75,76,75,76,75,76],
    [86,87,86,87,86,87,86,87,86,87,86,87,86,87,86,87],
    [73,74,73,74,73,74,73,74,73,74,73,74,73,74,73,74],
    [129,130,131,133,134,135,134,134,135,134,131,129,130,129,130,131],
]

export const level10 = 
[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10],
    [11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
    [11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
    [11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
    [11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
    [51,52,53,54,51,52,51,52,53,54,51,52,53,54,51,52],
    [75,76,75,76,75,76,75,76,75,76,75,76,75,76,75,76],
    [86,87,86,87,86,87,86,87,86,87,86,87,86,87,86,87],
    [73,74,73,74,73,74,73,74,73,74,73,74,73,74,73,74],
    [129,130,131,133,134,135,134,134,135,134,131,129,130,129,130,131],
]

export const level11 = 
[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [51,52,53,54,51,52,0,0,0,0,0,0,53,54,51,52],
    [75,76,75,76,75,76,0,0,0,0,0,0,75,76,75,76],
    [86,87,86,87,86,87,0,0,0,0,0,0,86,87,86,87],
    [73,74,73,74,73,74,0,0,0,0,0,0,73,74,73,74],
    [129,130,131,133,134,135,134,134,135,134,131,129,130,129,130,131],
]
export const level12 =
[
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,0,0,0,40,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,40,40,40,],  
    [40,0,0,0,0,0,0,0,0,0,0,40,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]

export const level13 =
[
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,40,],
    [40,40,40,0,0,0,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,40,40,40,40,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]


export const level14 =
[
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,0,0,0,40,],
    [40,0,0,0,0,0,27,0,0,0,0,0,0,0,0,40,40,],
    [40,40,0,0,0,0,35,0,0,0,,0,0,0,40,0,40,],
    [40,0,0,0,40,40,40,40,40,0,40,40,40,40,0,40,40,],
    [0,0,0,0,40,4,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,40,40,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],

   
]

export const level15 =
[
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,0,0,0,40,],
    [40,0,0,0,0,0,27,0,0,0,0,0,0,0,0,40,40,],
    [40,40,0,0,0,0,35,0,0,0,,0,0,0,40,40,40,],
    [10,0,0,0,40,40,40,40,40,0,40,40,40,40,0,0,40,],
    [0,0,0,0,40,4,0,0,0,0,0,0,0,27,0,0,40,],
    [0,0,40,0,40,0,0,0,0,0,0,0,0,35,0,40,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],

   
]


export const level16 =
[
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,],
    [40,40,40,40,40,40,40,40,40,40,40,40,0,0,0,40,],
    [40,0,0,0,0,0,27,0,0,0,0,0,0,0,0,40,40,],
    [40,40,0,0,0,0,35,0,0,0,,0,0,0,40,0,40,],
    [0,0,0,0,40,40,40,40,40,0,40,40,40,40,0,40,40,],
    [0,0,0,0,40,4,0,0,0,0,0,0,0,0,0,40,40,],
    [40,40,40,0,40,0,0,0,0,0,0,0,0,0,0,40,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],

   
]

export const level17 =
[
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,0,0,0,40,],
    [40,0,0,0,0,0,27,0,0,0,0,0,0,0,0,40,40,],
    [40,40,0,0,0,0,35,0,0,0,,0,0,0,40,0,40,],
    [27,0,0,0,40,40,40,40,40,0,40,40,40,40,0,40,40,],
    [35,0,0,0,40,4,0,0,0,0,0,0,0,0,0,40,40,],
    [40,40,40,0,40,0,0,0,0,0,0,0,0,0,0,40,40,],
    [40,40,40,40,40,40,40,40,40,40,40,0,0,40,40,40,],

   
]

export const level18 =
[
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,0,0,0,40,],
    [40,0,0,0,0,0,27,0,0,0,0,0,0,0,0,40,40,],
    [40,40,0,0,0,0,35,0,0,0,,0,0,0,40,0,40,],
    [40,0,0,0,40,40,40,40,40,0,0,0,40,40,0,0,0,],
    [40,0,0,0,40,4,0,0,40,0,0,0,0,0,0,0,0,],
    [40,40,0,0,40,0,0,0,40,40,0,0,0,0,0,40,40,],
    [40,40,0,0,40,40,40,40,40,40,40,40,40,40,40,40,],

   
]

export const level19 =
[
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,0,0,0,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,40,],
    [40,40,40,0,0,0,0,0,0,0,,0,0,0,40,0,40,],
    [0,0,27,0,40,40,40,40,40,0,0,40,40,40,0,40,40,],
    [0,0,35,0,40,4,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,0,40,0,0,0,0,40,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],

   
]

export const level20 =
[
    [40,0,0,0,0,0,0,0,40,0,0,0,0,0,0,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,0,0,0,40,40,40,40,40,40,40,40,0,0,0,40,],
    [40,0,0,0,0,0,27,0,40,0,27,0,0,0,0,40,40,],
    [40,40,0,0,0,0,35,0,40,0,35,0,0,0,40,0,40,],
    [40,40,0,0,0,40,40,40,40,0,40,40,40,40,0,40,40,],
    [0,0,0,0,40,40,40,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,40,40,40,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],

   
]

export const level21 =
[
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,40,40,40,0,0,40,40,40,40,40,40,40,],
    [0,0,0,0,40,0,40,0,0,27,0,0,0,0,0,0,],
    [0,0,40,40,40,0,40,40,0,35,0,0,0,0,0,0,],
    [40,40,40,0,0,0,40,40,40,40,0,0,0,0,0,0,],

]

export const level22 =
[
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level23 =
[
    [0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,0,0,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level24 =
[
    [0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level25 =
[
    [0,0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level26 =
[
    [0,0,0,0,40,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,40,40,40,40,0,0,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level27 =
[
    [40,0,0,0,0,40,0,0,0,0,0,0,0,0,0,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level28 =
[
    [0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level29 =
[
    [0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level30 =
[
    [0,0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level31 =
[
    [0,0,0,0,0,0,0,0,0,40,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level32 =
[
    [0,0,0,0,0,0,0,0,0,0,40,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level33 =
[
    [0,0,0,0,0,0,0,0,0,0,0,40,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,40,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]
export const level34 =
[
    [0,0,0,0,0,0,0,0,0,0,0,0,40,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,40,40,0,0,40,],
    [0,0,0,0,0,0,0,40,40,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,40,40,0,0,40,0,0,0,0,0,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],


]
export const level35 =
[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,40,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,40,0,40,0,40,0,0,40,40,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]





export const level36 =
[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,],
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

]