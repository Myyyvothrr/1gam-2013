ig.module
(
    'game.entities.laser'
)
.requires
(
	'impact.entity',
    'impact.entity-pool'
)
.defines(function ()
{
    EntityLaser = ig.Entity.extend(
    {
        animSheet: new ig.AnimationSheet('media/laser.png', 1, 2),
        size: { x: 1, y: 2 },
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.BOTH,
        zIndex: 60,
        maxVel: { x: 100, y: 100 },
        health: 1,

        up: true,
        color: true,

        owner: 0,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);
            
            this.addAnim('color1', 1, [0]);
            this.addAnim('color2', 1, [1]);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
            
            this.vel.y = this.up ? -80 : 80;

            this.currentAnim.flip.y = !this.up;

            this.currentAnim = this.color ? this.anims.color1 : this.anims.color2;
        },

        update: function ()
        {
            this.parent();

            if (this.pos.y < 0 || this.pos.y > ig.system.height)
            {
                this.kill();
            }
        },

        check: function (other)
        {
            if (other.check_color(this.color))
                other.receiveDamage(1, this.owner);
            
            this.receiveDamage(1, other);
        },

        receiveDamage: function(amount, from)
        {
            this.parent(amount, from);
        },

        kill: function()
        {
            this.parent();
        },

        check_color: function(other_color)
        {
            return true;
        }
    });

    ig.EntityPool.enableFor(EntityLaser);
});