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
        animSheet: new ig.AnimationSheet('media/laser.png', 2, 1),
        size: { x: 2, y: 1 },
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        health: 1,
        zIndex: 20,

        maxVel: { x: 200, y: 50 },

        speed: 200,
        dir: 1,

        player_id: 0,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
            this.currentAnim.flip.x = this.dir < 1;

            this.vel.x = this.speed * this.dir;
        },

        update: function ()
        {
            this.parent();

            if (this.pos.x > ig.system.width)
                this.kill();

            if (this.pos.x + this.size.x < 0)
                this.kill();
        },

        receiveDamage: function(amount)
        {
        },

        kill: function()
        {
            this.parent();
        },

        check: function (other)
        {
            if (this.player_id != other.player_id)
            {
                other.receiveDamage(1);
                this.kill();
            }
        },
    });
});