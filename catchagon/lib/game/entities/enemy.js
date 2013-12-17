ig.module
(
	'game.entities.enemy'
)
.requires
(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function ()
{
    EntityEnemy = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/hexagon.png', 16, 16),
	    size: { x: 14, y: 14 },
	    offset: { x: 1, y: 1 },
	    collides: ig.Entity.COLLIDES.NEVER,
	    type: ig.Entity.TYPE.B,
	    checkAgainst: ig.Entity.TYPE.NONE,
	    zIndex: 5,
	    maxVel: { x: 200, y: 200 },

	    health: 1,

	    color: 0,

	    dir: 1,

	    speed: 0,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.reset(x, y, settings);
	    },

	    reset: function(x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.color = Math.floor(Math.random() * 6);

	        this.addAnim('idle', 1, [this.color]);

	        this.vel.x = Math.random() * this.speed * this.dir;
	        this.vel.y = Math.random() * this.speed * this.dir;
	    },
	});

	ig.EntityPool.enableFor(EntityEnemy);
});
