ig.module
( 
	'game.main' 
)
.requires
(
	//'impact.debug.debug',
	'game.game'
)
.defines(function()
{
	OGAM11 = ig.Game.extend(
	{
		font: new ig.Font('media/04b03.font.png'),
	
		music: new ig.Sound('media/music1.*'),

		init: function()
		{
			ig.music.add(this.music);
			ig.music.loop = true;
			ig.music.volume = 0.5;
			ig.music.play();

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

            ig.input.bind(ig.KEY.MOUSE2, 'color');
            ig.input.bind(ig.KEY.CTRL, 'color');
            ig.input.bind(ig.KEY.ALT, 'color');
		},

		update: function()
		{
			this.parent();

            if (ig.input.pressed('shoot'))
                ig.system.setGame(Game);
		},

		draw: function()
		{
			this.parent();

            this.font.draw('#1GAM November\nCHANGE SPACE SHOOTER\n\nby Daniel Baumartz\nonegameamonth.com/Myyyvothrr\nMyyyvothrr.de\n\nA / ARROW LEFT: Move Left\nD / ARROR RIGHT: Move Right\nSPACE / MOUSE 1: Shoot Laser\nCTRL / ALT / MOUSE 2: Change Color\n\nChange your color to\nkill the enemies.\nBonus points for\nkilling more enemies\nwithout changing.', 256, 128, ig.Font.ALIGN.CENTER);
		}
	});

    if (ig.ua.mobile)
        ig.Sound.enabled = false;

	ig.Sound.use = [ ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.M4A ];

	ig.main('#canvas', OGAM11, 60, 512, 384, 2);

});
