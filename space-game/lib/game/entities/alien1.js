ig.module
(
	'game.entities.alien1'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    EntityAlien1 = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/alien1.png', 16, 16),
	    size: { x: 10, y: 10 },
	    offset: { x: 3, y: 3 },
	    collides: ig.Entity.COLLIDES.ACTIVE,
	    type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
	    health: 10,
	    zIndex: 80,

	    speed: 22,
	    maxVel: { x: 90, y: 90 },
        friction: { x: 20, y: 20 },

	    angle: 0.0,

	    screen_x: 0,
	    screen_y: 0,

	    target: null,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.addAnim('idle', 1, [0]);
	        this.addAnim('walk', 0.2, [1, 2]);
	    },

	    check: function(other)
	    {
	        other.receiveDamage(5);
	    },

	    update: function ()
	    {
	        this.parent();

	        if (this.target)
	        {
	            var d = this.distanceTo(this.target)
	            if (d < 64 && d > 8)
	            {
	                this.currentAnim = this.anims.walk;
	                this.angle = this.angleTo(this.target);
	                this.accel.x = this.speed * Math.cos(this.angle);
	                this.accel.y = this.speed * Math.sin(this.angle);
	            }
	            else
	            {
	                this.currentAnim = this.anims.idle;
	                this.vel.x = 0;
	                this.vel.y = 0;
	                this.accel.x = 0;
	                this.accel.y = 0;
	            }
	        }
	        else
	        {
	            this.target = global.player;
	        }

	        this.currentAnim.angle = this.angle;
	    },
	});
});