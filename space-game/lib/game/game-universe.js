ig.module
(
	'game.game-universe'
)
.requires
(
    'game.levels.universe',
	'game.entities.enemy-ship'
)
.defines(function ()
{
    GameUniverse = ig.Game.extend(
    {
        font: new ig.Font('media/04b03.font.png'),

        destination_timer: 0,

        spawn_timer: 0,
        max_spawn_time: 2,
        enemies: [EntityEnemyShip1, EntityEnemyShip2, EntityEnemyShip3, EntityEnemyShip4, EntityEnemyShip5, EntityEnemyShip6],

        init: function ()
        {
            this.spawn_timer = new ig.Timer(3);
            this.destination_timer = new ig.Timer(60);

            this.loadLevel(LevelUniverse);
        },

        update: function ()
        {
            this.parent();

            if (global.player)
            {
                ig.game.screen.x = global.player.screen_x;
                ig.game.screen.y = global.player.screen_y;

                if (this.spawn_timer.delta() > 0)
                {
                    this.spawn_timer.set(1 + Math.random() * this.max_spawn_time);

                    ig.game.spawnEntity(this.enemies[(Math.random() * this.enemies.length).floor()], global.player.pos.x - 64 + 128 * Math.random(), global.player.pos.y - 96);
                }

                if (this.destination_timer.delta() > 0)
                {
                    ig.system.setGame(Game);
                }
            }
        },

        draw: function ()
        {
            this.parent();

            if (global.player)
            {
                this.font.draw("H" + global.player_data.health, 1, 1);
                this.font.draw((-1*this.destination_timer.delta()).floor(), 64, 1, ig.Font.ALIGN.CENTER);
            }
        },
    });
});