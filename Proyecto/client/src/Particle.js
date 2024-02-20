class Particle 
{
    constructor(id, state, xPos, yPos, radius, alpha, physics)
    {
        this.id = id;
        this.state = state;
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.alpha = alpha;
        this.physics = physics;
        
    }
}
class ExplosionParticle extends Particle
{
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade,color)
    {
        super(id, state, xPos, yPos, radius, alpha, physics);
        
        this.fadeCounter = 0;
        this.timeToFade = timeToFade;
        this.color = color;

    }
}

class Splash extends Particle
{
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade, extended)
    {
        super(id, state, xPos, yPos, radius, alpha, physics);

        this.fadeCounter = 0;
        this.timeToFade = timeToFade;
        this.angle = 0;
        this.color = 0;
        this.extended = extended;

    }
}
class Dust extends Particle
{
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade, color)
    {
        super(id, state, xPos, yPos, radius, alpha, physics);

        this.fadeCounter = 0;
        this.timeToFade = timeToFade;
        this.color = color;
    }
}

class Bar extends Particle
{
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade,color)
    {
        super(id, state, xPos, yPos, radius, alpha, physics);

        this.fadeCounter = 0;
        this.timeToFade = timeToFade;
        this.color = color

    }
}

class EnemyParticle extends Particle
{
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade,color)
    {
        super(id, state, xPos, yPos, radius, alpha, physics);

        this.fadeCounter = 0;
        this.timeToFade = timeToFade;
        this.color = color

    }
}

class Spark extends Particle
{
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade,color)
    {
        super(id, state, xPos, yPos, radius, alpha, physics);

        this.fadeCounter = 0;
        this.timeToFade = timeToFade;
        this.color = color

    }
}

class Arrow extends Particle
{
    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade,color,angle)
    {
        super(id, state, xPos, yPos, radius, alpha, physics);

        this.fadeCounter = 0;
        this.timeToFade = timeToFade;
        this.color = color
        this.angle = angle;

    }
}



export  {

    ExplosionParticle,
    Splash,
    Dust,
    Bar,
    Spark,
    Arrow,
    EnemyParticle,

}