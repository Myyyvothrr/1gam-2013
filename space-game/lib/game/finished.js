ig.module
(
	'game.finished'
)
.requires
(
	'impact.game'
)
.defines(function ()
{
    Finished = ig.Game.extend(
    {
        font: new ig.Font('media/04b03.font.png'),

        bg: new ig.Image('media/stars-bg-1.png'),

        init: function ()
        {
        },

        update: function ()
        {
            this.parent();

            if (ig.input.pressed('shoot'))
                ig.system.setGame(Empty3Game);
        },

        draw: function ()
        {
            this.parent();
            this.bg.draw(0, 0);
            this.font.draw('Thanks for playing!\n\nMyyyvothrr.de', 64, 8, ig.Font.ALIGN.CENTER);
        },
    });
});