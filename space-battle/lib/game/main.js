ig.module
( 
	'game.main' 
)
.requires
(
//	'impact.debug.debug',
	'impact.game',
	'game.game'
)
.defines(function()
{
	ig.ogam6_VERSION = 'v0.3';

	OGAM6 = ig.Game.extend(
	{
        font: new ig.Font('media/04b03.font.png'),

		init: function()
		{
			ig.input.bind(ig.KEY.MOUSE1, 'click');
			ig.input.bind(ig.KEY.MOUSE2, 'click2');
		},
		
		update: function()
		{
			this.parent();
			
			if (ig.input.pressed('click'))
				ig.system.setGame(Game);
		},

		draw: function()
		{
			this.parent();

			this.font.draw('ONE GAME A MONTH JUNE GAME\nby Daniel Baumartz\nMyyyvothrr.de\n\n\nleft click to spawn ships\nleft click on ship to shoot\nright click on shoot for shield\nget your ships to the other side', ig.system.width * 0.5, ig.system.height * 0.5, ig.Font.ALIGN.CENTER);
		},
	});

	ig.Sound.use = [ ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.M4A ];

	if(ig.ua.mobile)
		ig.Sound.enabled = false;

	ig.main('#canvas', OGAM6, 60, 640, 480, 1);
});