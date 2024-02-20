

//clase que gestiona el tileset de un sprite
export default class ImageSet
{
    constructor(initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset)
    {
        this.initFil    = initFil;      //Fila de inicio de nuestro ImageSet
        this.initCol    = initCol;      //Columna de inicio de nuestro image set
        this.xSize      = xSize;        //tamaño en pixeles de la imagen (x)
        this.ySize      = ySize;        //tamaño en px de la imagen (Y)
        this.xOffset    = xOffset;      //Offset en X de comienzo del dibujo del personaje respecto a la rejilla
        this.yOffset    = yOffset;      //offset en Y de comienzo del dibujo del personaje respecto a la rejilla
        this.gridSize   = gridSize;     //tamaño en px de la rejilla contenedora de la imagen ( x and Y)
    }
}