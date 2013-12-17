ig.module
( 
	'game.game' 
)
.requires
(
	'impact.game',
	'impact.font',
	'game.entities.player',
	'game.entities.enemy'
)
.defines(function()
{
	Game = ig.Game.extend(
	{
		font: new ig.Font('media/04b03.font.png'),
		clearColor: '#000',
	
		enemy_timer: 0,
		game_timer: 0,

		init: function()
		{
			this.enemy_timer = new ig.Timer(1);
			this.game_timer = new ig.Timer();

			ig.global.score = 0;

			this.spawnEntity(EntityPlayer, 10, 262);
		},
		
		update: function()
		{
			this.parent();

			if (this.enemy_timer.delta() > 0)
			{
				this.spawn();
				this.enemy_timer.set((2 - this.game_timer.delta() * 0.1) + Math.random() * 5);
			}
		},

		spawn: function()
		{
			var x = 0;
			var y = 0;
			var dir = 1;
			var speed = this.game_timer.delta() * 0.5;
			ig.log(speed);

			if (Math.random() > 0.7)
			{
				x = Math.random() * 102;

				if (Math.random() > 0.5)
				{
					y = -16;
					dir = 1;
				}
				else
				{
					y = 320;
					dir = -1;
				}
			}
			else
			{
				y = Math.random() * 304;

				if (Math.random() > 0.5)
				{
					x = -16;
					dir = 1;
				}
				else
				{
					x = 180;
					dir = -1;
				}
			}

			this.spawnEntity(EntityEnemy, x, y, { dir: dir, speed: speed });
		},

		gameover: function()
		{
			ig.system.setGame(Gameover);
		},
		
		draw: function()
		{
			this.parent();

			if (this.player)
				this.font.draw("SCORE: " + ig.global.score, 90, 10, ig.Font.ALIGN.CENTER);
		},
	});
});
