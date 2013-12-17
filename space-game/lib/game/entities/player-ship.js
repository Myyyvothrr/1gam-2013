ig.module
(
	'game.entities.player-ship'
)
.requires
(
    'game.global',
	'impact.entity',
    'game.entities.laser-ship'
)
.defines(function ()
{
    EntityPlayerShip = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/ship-player.png', 16, 16),
	    size: { x: 16, y: 16 },
	    offset: { x: 0, y: 0 },
	    collides: ig.Entity.COLLIDES.NEVER,
	    type: ig.Entity.TYPE.A,
	    health: 10,
	    zIndex: 200,

	    speed: 30,

	    angle: 0.0,

	    screen_x: 0,
	    screen_y: 0,

	    time: 0,

        shot_delay: 0.75,
        shot_timer: 0,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        global.player = this;

	        this.addAnim('idle', 1, [0]);

	        this.shot_timer = new ig.Timer(this.shot_delay);
	    },

	    receiveDamage: function (amount)
	    {
	        global.player_data.health -= amount;

	        if (global.player_data.health <= 0)
	            this.kill();
	    },

	    kill: function ()
	    {
	        ig.system.setGame(Empty3Game);
	    },

	    update: function ()
	    {
	        this.parent();

	        this.time += ig.system.tick;

	        this.vel.x = ((ig.input.state('right') ? 1 : 0) - (ig.input.state('left') ? 1 : 0));

	        if (this.vel.x != 0 || this.vel.y != 0)
	        {
	            this.n = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
	            this.vel.x = (this.vel.x / this.n) * this.speed;
	            this.vel.y = (this.vel.y / this.n) * this.speed;
	        }

	        this.screen_x = this.pos.x + ((this.size.x - ig.system.width) * 0.5);
	        this.screen_y = this.pos.y - 77 + (Math.sin(this.time) * 2);

	        this.pos.x = this.pos.x % 1920;      // 96 * 20 (tilewidth * distance)
	        this.pos.y = (this.pos.y - 0.5) % 1920;

	        if (ig.input.state('shoot') && this.shot_timer.delta() > 0)
	        {
	            this.shot_timer.reset();
	            ig.game.spawnEntity(EntityLaserShip, this.pos.x, this.pos.y-1, { from_player: true });
	            ig.game.spawnEntity(EntityLaserShip, this.pos.x + 15, this.pos.y - 1, { from_player: true });
	        }
	    },
	});
});