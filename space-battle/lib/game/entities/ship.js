ig.module
(
	'game.entities.ship'
)
.requires
(
	'impact.entity',
    'game.entities.laser'
)
.defines(function ()
{
    EntityShip = ig.Entity.extend(
    {
        shield_img: new ig.Image('media/shield.png'),

        sound_explosion: new ig.Sound('media/explosion.ogg'),
        sound_hit: new ig.Sound('media/hit.ogg'),
        sound_laser: new ig.Sound('media/laser.ogg'),
        sound_shield: new ig.Sound('media/shield.ogg'),

        animSheet: new ig.AnimationSheet('media/ship1.png', 32, 32),
        size: { x: 96, y: 64 },
        offset: { x: -32, y: -16 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        health: 2,
        zIndex: 180,

        maxVel: { x: 50, y: 50 },

        power: 1,

        speed: 10,
        dir: 1,

        can_shoot: false,
        shoot_timer: 0,
        shoot_delay: 2,

        player_id: 0,

        shield_timer: 0,
        shield_duration: 3,
        shield_active: false,

        laser_pos:
        [
            { x: 48, y: 17 },
            { x: 48, y: 47 },
        ],

        ai: false,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
            this.currentAnim.flip.x = this.dir < 1;

            this.shoot_timer = new ig.Timer(0);
            this.shield_timer = new ig.Timer(0);
        },

        update: function ()
        {
            this.parent();

            if (this.shoot_timer.delta() > 0)
                this.can_shoot = true;

            if (this.shield_timer.delta() > 0)
                this.shield_active = false;

            if (this.ai)
            {
                if (ig.game.ai_action())
                {
                    if (this.can_shoot && Math.random() > 0.3)
                    {
                        if (Math.random() > 0.5)
                        {
                            this.shoot();
                        }
                        else
                        {
                            this.shield();
                        }
                    }
                }
            }
            else
            {
                if (this.can_shoot && ig.input.released('click') && ig.input.mouse.x >= this.pos.x && ig.input.mouse.x <= this.pos.x + this.size.x && ig.input.mouse.y >= this.pos.y && ig.input.mouse.y <= this.pos.y + this.size.y)
                {
                    this.shoot();
                }

                if (this.can_shoot && ig.input.released('click2') && ig.input.mouse.x >= this.pos.x && ig.input.mouse.x <= this.pos.x + this.size.x && ig.input.mouse.y >= this.pos.y && ig.input.mouse.y <= this.pos.y + this.size.y)
                {
                    this.shield();
                }
            }

            if (this.accel.x == 0)
                this.accel.x = this.speed * this.dir;

            if (this.pos.x > ig.system.width)
                this.right();

            if (this.pos.x + this.size.x < 0)
                this.left();
        },

        shoot: function()
        {
            this.sound_laser.play();

            this.can_shoot = false;
            this.shoot_timer.set(this.shoot_delay);

            for (var i = 0, l = this.laser_pos.length; i < l; ++i)
                ig.game.spawnEntity(EntityLaser, this.pos.x + (this.laser_pos[i].x), this.pos.y + this.laser_pos[i].y, { dir: this.dir, player_id: this.player_id });
        },

        shield: function()
        {
            this.sound_shield.play();

            this.shield_active = true;
            this.shield_timer.set(this.shield_duration);

            this.can_shoot = false;
            this.shoot_timer.set(this.shoot_delay);
        },

        draw: function()
        {
            this.parent();

            if (this.shield_active)
                this.shield_img.draw(this.pos.x+24, this.pos.y+8);
        },

        left: function()
        {
            if (this.player_id == 0)
            {
                this.kill();
            }
            else
            {
                ig.game.players[0].healthpoints -= this.power;
                this.kill();
            }
        },

        right: function()
        {
            if (this.player_id == 1)
            {
                this.kill();
            }
            else
            {
                ig.game.players[1].healthpoints -= this.power;
                this.kill();
            }
        },

        receiveDamage: function(amount)
        {
            if (!this.shield_active)
            {
                this.sound_hit.play();
                this.parent(amount);
            }
        },

        kill: function()
        {
            this.sound_explosion.play();
            this.parent();
        },

        check: function (other)
        {
            if ((this.dir > 0 && this.pos.x <= other.pos.x)
                || (this.dir < 0 && this.pos.x >= other.pos.x))
            {
                this.accel.x = 0;
                this.vel.x = 0;
            }
        },
    });
});