ig.module
(
    'game.entities.asteroid'
)
.requires
(
	'impact.entity',
    'impact.entity-pool'
)
.defines(function ()
{
    EntityAsteroid = ig.Entity.extend(
    {
        animSheet: new ig.AnimationSheet('media/asteroid.png', 8, 8),
        size: { x: 8, y: 8 },
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        zIndex: 10,
        maxVel: { x: 20, y: 100 },
        health: 1,

        points: 1,

        sound_explosion: new ig.Sound('media/asteroids_explosion.*'),

        dir: 1,

        from_last: 0,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);
            
            this.addAnim('idle', 1, [0]);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
            
            this.timer = new ig.Timer(1);

            this.vel.x = -3 + Math.random() * 6;
            this.vel.y = 5 + Math.random() * 20;

            if (Math.random() > 0.5)
                this.dir = -1;
        },

        update: function ()
        {
            this.parent();

            this.currentAnim.angle += this.dir * Math.random() * 0.05;

            if (this.pos.y > ig.system.height)
            {
                this.kill();
            }
        },

        check: function (other)
        {
            other.receiveDamage(1, this);
            this.receiveDamage(1, other);
        },

        receiveDamage: function(amount, from)
        {
            this.from_last = from;

            this.parent(amount, from);

            this.sound_explosion.play();
        },

        kill: function()
        {
            if (this.from_last instanceof EntityPlayer)
                this.from_last.enemy_killed(this);

            this.parent();
        },

        check_color: function(other_color)
        {
            return true;
        }
    });

    ig.EntityPool.enableFor(EntityAsteroid);
});