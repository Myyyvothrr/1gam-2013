ig.module
(
	'game.piece-base'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    PieceBase = ig.Entity.extend(
	{
        dmg: 1,
	    hp: 1,
	    hp_max: 1,

	    animSheet: new ig.AnimationSheet('media/wizard.png', 16, 16),
	    size: { x: 16, y: 16 },

	    selected_img: new ig.Image('media/selected.png', 16, 16),
	    selected: false,

	    zIndex: 1,

	    color: 0,

        can_go: 0,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.addAnim('idle', 1, [this.color]);

	        if (this.color != 0)
	            for (var i = 0, l = this.can_go.length; i < l; ++i)
	                this.can_go[i].y *= -1;
	    },

	    draw: function ()
	    {
	        if (this.selected)
	            this.selected_img.draw(this.pos.x + 4, this.pos.y + 4);

	        this.parent();
	    },

	    toggle_selected: function()
	    {
	        this.selected = !this.selected;
	    },
	});
});
