ig.module
(
    'game.entities.star'
)
.requires
(
	'impact.entity',
    'impact.entity-pool'
)
.defines(function ()
{
    EntityStar = ig.Entity.extend(
    {
        animSheet: new ig.AnimationSheet('media/stars.png', 1, 1),
        size: { x: 1, y: 1 },
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        zIndex: 1,
        maxVel: { x: 0, y: 50 },
        health: 1,


        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
            
            this.addAnim('color1', 1, [Math.floor(Math.random() * 10)]);

            this.vel.y = 1 + Math.random() * 50;
        },

        update: function ()
        {
            this.parent();

            if (this.pos.y > ig.system.height)
            {
                this.kill();
            }
        },

        check: function (other)
        {
        },

        receiveDamage: function(amount, from)
        {
        },

        kill: function()
        {
            this.parent();
        },

        check_color: function(other_color)
        {
            return false;
        }
    });

    ig.EntityPool.enableFor(EntityStar);
});