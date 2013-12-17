ig.module
(
	'game.entities.player'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    EntityPlayer = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/hexagon.png', 16, 16),
	    size: { x: 12, y: 12 },
	    offset: { x: 2, y: 2 },
	    collides: ig.Entity.COLLIDES.NEVER,
	    type: ig.Entity.TYPE.A,
	    checkAgainst: ig.Entity.TYPE.B,
	    zIndex: 10,
	    maxVel: { x: 100, y: 100 },

		color: 0,
	    color_timer: 0,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        ig.game.player = this;

	        this.addAnim('idle', 6, [0, 1, 2, 3, 4, 5]);

	        this.color_timer = new ig.Timer(6);
	    },

	    update: function()
	    {
	    	if (this.color_timer.delta() > 0)
	    	{
	    		this.color = (this.color+1)%6;
	    		this.color_timer.reset();
	    	}

	    	this.pos.x = ig.input.mouse.x;
	    	this.pos.y = ig.input.mouse.y;

	    	if (this.pos.x < 0)
	    		this.pos.x = 0;
	    	else if (this.pos.x + this.size.x > ig.system.width)
	    		this.pos.x = ig.system.width - this.size.x;

	    	if (this.pos.y < 0)
	    		this.pos.y = 0;
	    	else if (this.pos.y + this.size.y > ig.system.height)
	    		this.pos.y = ig.system.height - this.size.y;

	    	this.parent();
	    },

	    draw: function ()
	    {
	        this.parent();
	    },

		check: function(other)
		{
			if (other instanceof EntityEnemy)
			{
				if (other.color == this.color)
				{
					other.kill();
					ig.global.score++;
				}
				else
				{
					ig.game.gameover();
				}
			}
		},
	});
});
