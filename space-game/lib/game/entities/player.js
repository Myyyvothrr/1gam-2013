ig.module
(
	'game.entities.player'
)
.requires
(
    'game.global',
	'impact.entity',
    'game.entities.laser'
)
.defines(function()
{
    EntityPlayer = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/player.png', 16, 16),
	    size: { x: 10, y: 10 },
	    offset: { x: 3, y: 3 },
	    collides: ig.Entity.COLLIDES.ACTIVE,
	    type: ig.Entity.TYPE.A,
	    health: 10,
	    zIndex: 100,

	    speed: 80,

	    angle: 0.0,

	    screen_x: 0,
	    screen_y: 0,

	    shot_delay: 0.15,
	    shot_timer: 0,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        global.player = this;

	        this.addAnim('idle', 1, [0]);
	        this.addAnim('walk', 1, [0]);

	        this.shot_timer = new ig.Timer(this.shot_delay);
	    },

	    add_coin: function()
	    {
	        global.player_data.ammo += 100;
	    },

	    add_medkit: function()
	    {
	        global.player_data.health += 10;
	    },

	    receiveDamage: function(amount)
	    {
	        global.player_data.health -= amount;

	        if (global.player_data.health <= 0)
	            this.kill();
	    },

	    kill: function()
	    {
	        ig.system.setGame(Empty3Game);
	    },

	    update: function ()
	    {
	        this.parent();

	        this.vel.x = ((ig.input.state('right') ? 1 : 0) - (ig.input.state('left') ? 1 : 0));
	        this.vel.y = ((ig.input.state('down') ? 1 : 0) - (ig.input.state('up') ? 1 : 0));

	        if (this.vel.x != 0 || this.vel.y != 0)
	        {
	            this.n = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
	            this.vel.x = (this.vel.x / this.n) * this.speed;
	            this.vel.y = (this.vel.y / this.n) * this.speed;

	            this.currentAnim = this.anims.walk;
	        }
	        else
	        {
	            this.currentAnim = this.anims.idle;
	        }

	        this.screen_x = this.pos.x + ((this.size.x - ig.system.width) * 0.5);
	        this.screen_y = this.pos.y + ((this.size.y - ig.system.height) * 0.5);
            	     
	        this.angle = Math.atan2((ig.input.mouse.y + this.screen_y) - (this.pos.y + this.size.y * 0.5), (ig.input.mouse.x + this.screen_x) - (this.pos.x + this.size.x * 0.5));

	        if (ig.input.state('shoot') && global.player_data.ammo > 0 && this.shot_timer.delta() > 0)
	        {
	            this.shot_timer.reset();
	            --global.player_data.ammo;
	            ig.game.spawnEntity(EntityLaser, (this.pos.x + this.size.x * 0.5) + (this.size.x * Math.cos(this.angle)), (this.pos.y - 1 + this.size.y * 0.5) + (this.size.y * Math.sin(this.angle)), { angle: this.angle, from_player: true });
	        }

	        this.currentAnim.angle = this.angle;
	    },
	});
});