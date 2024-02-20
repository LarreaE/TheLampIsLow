

export default class Frames
{
    constructor(framesPerState, speed)
    {
        this.framesPerState = framesPerState    // numero de frames por estado de animacion
        this.frameCounter   = 0;                // contador de frames
        this.speed          = speed;            //velocidad de cambio de frame(minimo 1 , a mayor numero, mas lento)
        this.frameChangeCounter = 0;        //contador de velocidad de cambio de frame
    }
}