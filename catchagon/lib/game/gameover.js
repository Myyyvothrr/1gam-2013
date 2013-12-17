ig.module
( 
	'game.gameover' 
)
.requires
(
	'impact.game',
	'impact.font'
)
.defines(function()
{
	Gameover = ig.Game.extend(
	{
		font: new ig.Font('media/04b03.font.png'),
		bg: new ig.Image('media/title.png'),	
		
		init: function()
		{
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

			this.font.draw("YOUR SCORE: " + ig.global.score + "\n\n\nClick to retry", 90, 160, ig.Font.ALIGN.CENTER);
		}
	});
});
