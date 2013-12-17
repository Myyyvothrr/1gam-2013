ig.module
(
	'game.entities.player-ship-big'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    EntityPlayerShipBig = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/ship-player-big.png', 100, 100),
	    size: { x: 50, y: 50 },
	    offset: { x: 15, y: 15 },
	    collides: ig.Entity.COLLIDES.NEVER,
	    type: ig.Entity.TYPE.NONE,
	    checkAgainst: ig.Entity.TYPE.A,
	    health: 10,
	    zIndex: 200,

	    speed: 130,

	    angle: 0.0,

        trigger: 1,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.addAnim('idle', 1, [0]);
	    },

	    update: function ()
	    {
	        this.parent();

	        this.currentAnim.angle = this.angle;
	    },

	    check: function (other)
	    {
	        if (!this.trigger)
	            return;

	        if (other instanceof EntityPlayer)
	        {
	            global.player_data.planet = 1;
	            ig.system.setGame(GameUniverse);
	        }
	    },
	});
});