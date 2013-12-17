ig.module
(
	'game.entities.laser'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    EntityLaser = ig.Entity.extend(
    {
        animSheet: new ig.AnimationSheet('media/laser1.png', 1, 2),
        size: { x: 1, y: 2 },
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.B,
        health: 10,
        zIndex: 190,

        angle: 0,

        speed: 250,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [settings.anim_index ? settings.anim_index : 0]);

            this.currentAnim.angle = this.angle + (90).toRad();

            this.vel.x = this.speed * Math.cos(this.angle);
            this.vel.y = this.speed * Math.sin(this.angle);
        },

        handleMovementTrace: function(res)
        {
            if (res.collision.x || res.collision.y)
                this.kill();
            else
                this.parent(res);
        },

        check: function(other)
        {
            other.receiveDamage(1);
            this.kill();
        },

        receivDamage: function(amount)
        {
            this.kill();
        },

        update: function ()
        {
            this.parent();
        },
    });
});