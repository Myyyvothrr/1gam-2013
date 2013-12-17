ig.module
(
	'game.main' 
)
.requires
(
    'game.global',
	'impact.game',
	'impact.font',
   // 'impact.debug.debug',
    'game.game',
    'game.game-universe',
    'game.finished'
)
.defines(function ()
{
    Empty3Game = ig.Game.extend(
    {
        font: new ig.Font('media/04b03.font.png'),

        bg: new ig.Image('media/stars-bg-1.png'),

        init: function()
        {
            ig.input.bind(ig.KEY.A, 'left');
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');

            ig.input.bind(ig.KEY.D, 'right');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

            ig.input.bind(ig.KEY.S, 'down');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

            ig.input.bind(ig.KEY.W, 'up');
            ig.input.bind(ig.KEY.UP_ARROW, 'up');

            ig.input.bind(ig.KEY.MOUSE1, 'shoot');
            ig.input.bind(ig.KEY.SPACE, 'shoot');

            global.init_player_data();
        },

        update: function ()
        {
            this.parent();

            if (ig.input.pressed('shoot'))
                ig.system.setGame(Game);
        },

        draw: function ()
        {
            this.parent();
            this.bg.draw(0, 0);
            this.font.draw('#1GAM May\nby Daniel Baumartz\nonegameamonth.com\n/Myyyvothrr\n\nWASD - Move\nLMB / SPACE - Shoot\n\nShoot to start', 64, 8, ig.Font.ALIGN.CENTER);
        },
    });

    if (ig.ua.mobile)
        ig.Sound.enabled = false;

    ig.Sound.use = [ig.Sound.FORMAT.OGG];

    // ig.main('#canvas', Empty3Game, 60, 256, 192, 4);
    ig.main('#canvas', Empty3Game, 60, 128, 96, 8);
});