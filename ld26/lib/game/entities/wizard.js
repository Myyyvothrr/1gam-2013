ig.module
(
	'game.entities.wizard'
)
.requires
(
	'game.piece-base'
)
.defines(function()
{
    EntityWizard = PieceBase.extend(
	{
        dmg: 2,
	    hp: 1,
	    hp_max: 1,

	    zIndex: 5,

	    animSheet: new ig.AnimationSheet('media/wizard.png', 16, 16),

	    can_go:
        [
            { x: 0, y: -2, },
            { x: 0, y: -3, },
            { x: -2, y: 0, },
            { x: 2, y: 0, },
            { x: 0, y: 1, },
        ],

	    init: function(x, y, settings)
	    {
	        this.parent(x, y, settings);
	    },
	});
});
