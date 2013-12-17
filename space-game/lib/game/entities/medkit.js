ig.module
(
	'game.entities.medkit'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    EntityMedkit = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/medkit.png', 8, 8),
	    size: { x: 8, y: 8 },
	    offset: { x: 0, y: 0 },
	    collides: ig.Entity.COLLIDES.NEVER,
	    type: ig.Entity.TYPE.B,
	    checkAgainst: ig.Entity.TYPE.A,
	    zIndex: 20,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.addAnim('idle', 1, [0]);
	    },

	    check: function (other)
	    {
	        if (other instanceof EntityPlayer)
	        {
	            other.add_medkit();
	            this.kill();
	        }
	    },

	    receiveDamage: function (amount)
	    {
	    },
	});
});