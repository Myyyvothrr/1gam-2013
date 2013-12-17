ig.module
(
	'game.entities.king'
)
.requires
(
	'game.piece-base'
)
.defines(function ()
{
    EntityKing = PieceBase.extend(
	{
	    hp: 2,
	    hp_max: 2,

	    zIndex: 10,

	    animSheet: new ig.AnimationSheet('media/king.png', 16, 16),

	    can_go:
        [
            { x: 0, y: -1, },
            { x: -1, y: 0, },
            { x: 1, y: 0, },
            { x: 0, y: 1, },
            { x: 1, y: -1, },
            { x: -1, y: 1, },
            { x: 1, y: 1, },
            { x: -1, y: -1, },
        ],

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);
	    },
	});
});
