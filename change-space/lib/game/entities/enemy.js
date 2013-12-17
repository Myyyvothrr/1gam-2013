ig.module
(
    'game.entities.enemy'
)
.requires
(
	'impact.entity',
    'impact.entity-pool'
)
.defines(function ()
{
    Enemy = ig.Entity.extend(
    {
        size: { x: 8, y: 8 },
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        zIndex: 10,
        maxVel: { x: 20, y: 100 },

        health: 2,
        points: 2,

        sound_explosion: new ig.Sound('media/enemy1_explosion.*'),
        sound_hit: new ig.Sound('media/enemy1_hit.*'),
        sound_laser: new ig.Sound('media/laser2.*'),

        dir: 1,

        from_last: 0,

        color: true,

        shoot_timer: 0,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);
            
            this.addAnim('color1', 1, [0]);
            this.addAnim('color2', 1, [1]);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
            
            this.timer = new ig.Timer(1);

            this.vel.x = 0;
            this.vel.y = 5 + Math.random() * 20;

            if (Math.random() > 0.5)
                this.dir = -1;

            if (Math.random() > 0.5)
                this.color = false;

            this.currentAnim = this.color ? this.anims.color1 : this.anims.color2;

            this.currentAnim.flip.y = true;

            this.shoot_timer = new ig.Timer(1 + Math.random() * 2);
        },

        update: function ()
        {
            this.parent();

            if (Math.random() > 0.5 && this.shoot_timer.delta() > 0)
            {
                this.shoot_timer.set(1 + Math.random() * 5);
                this.sound_laser.play();
                ig.game.spawnEntity(EntityLaser, this.pos.x, this.pos.y + this.size.y, { up: false, color: this.color, owner: this });
                ig.game.spawnEntity(EntityLaser, this.pos.x + this.size.x - 1, this.pos.y + this.size.y, { up: false, color: this.color, owner: this });
            }

            if (this.pos.y > ig.system.height)
            {
                this.kill();
            }
        },

        check: function (other)
        {
            other.receiveDamage(1, this);
            this.receiveDamage(1, other);
        },

        receiveDamage: function(amount, from)
        {
            this.from_last = from;

            this.parent(amount, from);

            this.sound_hit.play();
        },

        kill: function()
        {
            if (this.from_last instanceof EntityPlayer)
                this.from_last.enemy_killed(this);

            this.sound_explosion.play();

            this.parent();
        },

        check_color: function(other_color)
        {
            return (this.color == other_color);
        }
    });

    EntityEnemy1 = Enemy.extend(
    {
        animSheet: new ig.AnimationSheet('media/enemy1.png', 8, 8),
    });

    ig.EntityPool.enableFor(EntityEnemy1);
});