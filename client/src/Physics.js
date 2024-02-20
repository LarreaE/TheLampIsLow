export default class Physics
{
    constructor(vLimit, aLimit , friction, jumpForce, omega, angle, xRotCenter, yRotCenter)
    {
        this.vx = 0;            //velocidad actual en el eje x
        this.vy = 0;            //velocidad actual ene l eje y
        this.vLimit = vLimit;   //velocidad maxima
        this.ax    = 0;
        this.ay    = 0;
        this.aLimit = aLimit;
        this.friction = friction;
        this.jumpForce = jumpForce;
        this.isOnGround = false;
        this.omega = omega;
        this.angle = angle;
        this.xRotCenter = xRotCenter;
        this.yRotCenter = yRotCenter;

    }
}