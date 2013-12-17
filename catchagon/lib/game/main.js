ig.module
( 
	'game.main' 
)
.requires
(
//	'impact.debug.debug',
	'impact.game',
	'impact.font',
	'game.game',
	'game.gameover'
)
.defines(function()
{
	OGAM9 = ig.Game.extend(
	{
		font: new ig.Font('media/04b03.font.png'),
		bg: new ig.Image('media/title.png'),	
		
		init: function()
		{
			ig.input.bind(ig.KEY.MOUSE1, 'click');
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

			this.bg.draw(0, 0);

			this.font.draw("Click to start", 90, 160, ig.Font.ALIGN.CENTER);
		}
	});

	ig.global.score = 0;

	ig.main('#canvas', OGAM9, 60, 180, 320, 2);
});
