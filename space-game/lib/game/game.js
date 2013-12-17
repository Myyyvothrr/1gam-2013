ig.module
(
	'game.game'
)
.requires
(
    'game.levels.station1',
    'game.levels.station2',
    'game.levels.station3',
    'game.levels.planet1',
    'game.levels.planet2'
)
.defines(function ()
{
    Game = ig.Game.extend(
    {
        font: new ig.Font('media/04b03.font.png'),

        init: function ()
        {
            if (global.player_data.planet == 0)
                this.loadLevel(LevelStation1);
            else
                this.loadLevel(LevelPlanet1);
        },

        update: function ()
        {
            this.parent();

            if (global.player)
            {
                ig.game.screen.x = global.player.screen_x;
                ig.game.screen.y = global.player.screen_y;
            }
        },

        draw: function ()
        {
            this.parent();

            if (global.player)
            {
                this.font.draw("H" + global.player_data.health, 1, 1);
                this.font.draw("A" + global.player_data.ammo, 127, 1, ig.Font.ALIGN.RIGHT);
            }
        },
    });
});