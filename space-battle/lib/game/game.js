ig.module
( 
	'game.game' 
)
.requires
(
	'impact.game',
	'impact.font',
	'game.entities.ship-spawner',
	'game.entities.ship'
)
.defines(function()
{
	Game = ig.Game.extend(
	{	
		autoSort: true,
		sortBy: ig.Game.SORT.Z_INDEX,
		clearColor: null,

		ai_spawn_timer: 0,
		ai_spawn_ready: true,
		ai_action_timer: 0,
		ai_action_ready: true,

		players:
		[
			{
				healthpoints: 10,
			},
			{
				healthpoints: 10,
			},
		],

		show_results: false,

		font: new ig.Font('media/04b03.font.png'),
		stars_img: new ig.Image('media/stars.png'),

		init: function()
		{
			for (var i = 0; i < 5; ++i)
			{
				this.spawnEntity(EntityShipSpawner, 0, 96 * i, { player_id: 0, dir: +1, ai: false });
				this.spawnEntity(EntityShipSpawner, 544, 96 * i, { player_id: 1, dir: -1, ai: true });
			}

			this.ai_action_timer = new ig.Timer(1);
			this.ai_spawn_timer = new ig.Timer(1);
		},
		
		update: function()
		{
			if (!this.show_results)
			{
				this.parent();

				if (this.ai_spawn_timer.delta() > 0)
					this.ai_spawn_ready = true;

				if (this.ai_action_timer.delta() > 0)
					this.ai_action_ready = true;

				if (this.players[0].healthpoints <= 0 || this.players[1].healthpoints <= 0)
					this.show_results = true;	
			}
			else
			{
				if (ig.input.released('click'))
					ig.system.setGame(Game);
			}	
		},
		
		draw: function()
		{
			this.stars_img.draw(0, 0);

			if (this.show_results)
			{				
				this.font.draw((this.players[0].healthpoints <= 0 ? 'YOU LOST' : 'YOU WON'), ig.system.width * 0.5, ig.system.height * 0.5, ig.Font.ALIGN.CENTER);
			}
			else
			{
				this.parent();

				this.font.draw(this.players[0].healthpoints, ig.system.width * 0.5 - 20, 10, ig.Font.ALIGN.RIGHT);
				this.font.draw('-', ig.system.width * 0.5, 10, ig.Font.ALIGN.CENTER);
				this.font.draw(this.players[1].healthpoints, ig.system.width * 0.5 + 20, 10, ig.Font.ALIGN.LEFT);
			}
		},

		ai_action: function()
		{
			if (!this.ai_action_ready)
				return false;

			this.ai_action_timer.set(0.5);
			this.ai_action_ready = false;
			return true;
		},

		ai_spawn: function()
		{
			if (!this.ai_spawn_ready)
				return false;

			this.ai_spawn_timer.set(1);
			this.ai_spawn_ready = false;
			return true;
		}
	});
});