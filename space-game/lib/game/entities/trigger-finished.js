ig.module
(
	'game.entities.trigger-finished'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    EntityTriggerFinished = ig.Entity.extend(
	{
	    size: { x: 16, y: 16 },
	    gravityFactor: 0,
	    type: ig.Entity.TYPE.NONE,
	    checkAgainst: ig.Entity.TYPE.A,

	    _wmScalable: true,
	    _wmDrawBox: 'rgba(0, 128, 128, 0.5)',

	    level: 0,

	    check: function (other)
	    {
	        if (other instanceof EntityPlayer)
	        {
	            ig.system.setGame(Finished);
	        }
	    },

	    kill: function ()
	    {
	    }
	});
});