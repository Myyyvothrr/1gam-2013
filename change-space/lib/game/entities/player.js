ig.module
(
    'game.entities.player'
)
.requires
(
	'impact.entity',
    'game.entities.laser'
)
.defines(function ()
{
    EntityPlayer = ig.Entity.extend(
    {
        font: new ig.Font('media/04b03.font.png'),
        animSheet: new ig.AnimationSheet('media/player.png', 8, 8),
        size: { x: 8, y: 8 },
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.NONE,
        zIndex: 20,
        maxVel: { x: 100, y: 100 },

        health: 10,
        score: 0,
        bonus: 1,
        bonus_counter: 0,

        dir: 1,
        n: 0,
        speed: 30,

        sound_laser: new ig.Sound('media/laser1.*'),
        sound_hit: new ig.Sound('media/player_hit.*'),
        sound_explosion: new ig.Sound('media/player_explosion.*'),

        shoot_timer: 0,

        color: true,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);
            
            this.addAnim('color1', 0.2, [2, 0], true);
            this.addAnim('color2', 0.2, [2, 1], true);

            this.shoot_timer = new ig.Timer(0.5);
        },

        update: function ()
        {
            this.parent();

            this.vel.x = ((ig.input.state('right') ? 1 : 0) - (ig.input.state('left') ? 1 : 0));

            if (this.vel.x != 0 || this.vel.y != 0)
            {
                this.n = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
                this.vel.x = (this.vel.x / this.n) * this.speed;
                this.vel.y = (this.vel.y / this.n) * this.speed;
            }

            if (this.pos.x < 0)
                this.pos.x = 0;
            else if (this.pos.x > ig.system.width - this.size.x)
                this.pos.x = ig.system.width - this.size.x;

            if (this.pos.y < 0)
                this.pos.y = 0;
            else if (this.pos.y > ig.system.height - this.size.y)
                this.pos.y = ig.system.height - this.size.y;

            if (ig.input.pressed('shoot') && this.shoot_timer.delta() >= 0)
            {
                this.shoot_timer.reset();
                this.sound_laser.play();
                ig.game.spawnEntity(EntityLaser, this.pos.x, this.pos.y - 1, { up: true, color: this.color, owner: this});
                ig.game.spawnEntity(EntityLaser, this.pos.x + this.size.x - 1, this.pos.y - 1, { up: true, color: this.color, owner: this });
            }

            if (ig.input.pressed('color'))
            {
                this.color = !this.color;
                this.currentAnim = this.color ? this.anims.color1.rewind() : this.anims.color2.rewind();

                this.bonus = 1;
                this.bonus_counter = 0;
            }
        },

        draw: function()
        {
            this.parent();

            this.font.draw("ENERGY: " + this.health, 10, 10, ig.Font.ALIGN.LEFT);
            this.font.draw("SCORE: " + this.score + " (x" + this.bonus + ")", 502, 10, ig.Font.ALIGN.RIGHT);
        },

        check: function (other)
        {
        },

        receiveDamage: function(amount, from)
        {
            this.sound_hit.play();
            this.parent(amount, from);
        },

        kill: function()
        {
            ig.game.gameover(this.score);

            this.sound_explosion.play();

            this.parent();        
        },

        enemy_killed: function(enemy)
        {
            this.score += enemy.points * this.bonus;

            this.bonus_counter += 1;
            if (this.bonus_counter >= 10)
            {
                this.bonus_counter = 0;
                this.bonus += 1;
            }
        },

        check_color: function(other_color)
        {
            return true;
        }
    });
});