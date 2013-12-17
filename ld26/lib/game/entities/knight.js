ig.module
(
	'game.entities.knight'
)
.requires
(
	'game.piece-base'
)
.defines(function ()
{
    EntityKnight = PieceBase.extend(
	{
	    hp: 3,
	    hp_max: 3,

	    zIndex: 3,

	    animSheet: new ig.AnimationSheet('media/swordsman.png', 16, 16),

	    can_go:
        [
            { x: 0, y: -1, },
            { x: -1, y: -1, },
            { x: 1, y: -1, },
            { x: -1, y: 0, },
            { x: 1, y: 0, },
        ],

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);
	    },
	});
});
