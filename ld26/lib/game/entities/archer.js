ig.module
(
	'game.entities.archer'
)
.requires
(
	'game.piece-base'
)
.defines(function ()
{
    EntityArcher = PieceBase.extend(
	{
	    hp: 3,
	    hp_max: 3,

	    zIndex: 1,

	    animSheet: new ig.AnimationSheet('media/archer.png', 16, 16),

	    can_go:
        [
            { x: -1, y: -1, },
            { x: 1, y: -1, },
            { x: -2, y: -2, },
            { x: 2, y: -2, },
            { x: -1, y: 1, },
            { x: 1, y: 1, },
        ],

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);
	    },
	});
});
