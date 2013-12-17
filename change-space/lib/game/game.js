ig.module
(
	'game.game'
)
.requires
(
    'impact.game',
    'impact.font',
    'game.entities.player',
    'game.entities.asteroid',
    'game.entities.enemy',
    'game.entities.star'
)
.defines(function ()
{
    Game = ig.Game.extend(
    {
        font: new ig.Font('media/04b03.font.png'),

        autoSort: true,
        sortBy: ig.Game.SORT.Z_INDEX,
        gravity: 0,

        asteroids_timer: 0,
        enemy_timer: 0,
        star_timer: 0,

        is_gameover: false,
        score: 0,

        init: function ()
        {
            this.is_gameover = false;

            this.asteroids_timer = new ig.Timer(0);
            this.enemy_timer = new ig.Timer(0);
            this.star_timer = new ig.Timer(0);

            this.spawnEntity(EntityPlayer, ig.system.width * 0.5, ig.system.height - 32);
        },

        update: function ()
        {
            this.parent();

            if (!this.is_gameover)
            {
                if (this.asteroids_timer.delta() > 0)
                {
                    this.asteroids_timer.set(Math.random() * 10);
                    this.spawnEntity(EntityAsteroid, -8 + Math.random() * ig.system.width, -8);
                }

                if (this.enemy_timer.delta() > 0)
                {
                    this.enemy_timer.set(Math.random() * 5);
                    this.spawnEntity(EntityEnemy1, -8 + Math.random() * ig.system.width, -8);
                }


                if (this.star_timer.delta() > 0)
                {
                    this.star_timer.set(Math.random());
                    this.spawnEntity(EntityStar, -1 + Math.random() * ig.system.width, -1);
                }
            }
            else
            {
                if (ig.input.pressed('shoot'))
                    ig.system.setGame(Game);
            }
        },

        draw: function ()
        {
            this.parent();

            if (this.is_gameover)
                this.font.draw('Your ship exploded :(\n\n\nSCORE: ' + this.score + '\n\n\nThanks for playing!', 256, 128, ig.Font.ALIGN.CENTER);
        },

        gameover: function (player_score)
        {
            this.is_gameover = true;
            this.score = player_score;
        },
    });
});