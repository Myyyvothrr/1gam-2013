ig.module
(
	'game.entities.enemy-ship'
)
.requires
(
	'impact.entity',
    'game.entities.laser-ship'
)
.defines(function ()
{
    EnemyShip = ig.Entity.extend(
    {
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        health: 2,
        zIndex: 180,

        timer: 0,

        shot_speed: 2,
        shot: EntityLaserShip,
        shot_anim: 0,
        shots_pos: [ 0, 0 ],

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
            
            this.timer = new ig.Timer(1);
        },

        update: function ()
        {
            this.parent();

            if (this.timer.delta() > 0)
            {
                this.timer.set(Math.random() * this.shot_speed);

                for (var i = 0, l = this.shots_pos.length; i < l; i+=2)
                {
                    ig.game.spawnEntity(this.shot, this.pos.x - this.offset.x + this.shots_pos[i], this.pos.y - this.offset.y + this.shots_pos[i+1], { anim_index: this.shot_anim });
                }
            }

            if (this.pos.y - ig.game.screen.y > 100)
                this.kill();
        },

        check: function (other)
        {
            if (other instanceof EntityPlayerShip)
            {
                other.receiveDamage(2);
                this.kill();
            }
        },
    });

    EntityEnemyShip1 = EnemyShip.extend(
    {
        shot_speed: 2,
        health: 2,
        animSheet: new ig.AnimationSheet('media/ship-enemy-1.png', 16, 16),
        offset: { x: 0, y: 8 },
        size: { x: 16, y: 8 },
        shot_anim: 1,
        shots_pos: [0, 16, 15, 16],
    });

    EntityEnemyShip2 = EnemyShip.extend(
    {
        shot_speed: 1,
        health: 2,
        animSheet: new ig.AnimationSheet('media/ship-enemy-2.png', 32, 32),
        offset: { x: 0, y: 16 },
        size: { x: 32, y: 16 },
        shot_anim: 2,
        shots_pos: [0, 31, 31, 31],
    });

    EntityEnemyShip3 = EnemyShip.extend(
    {
        shot_speed: 1,
        health: 6,
        animSheet: new ig.AnimationSheet('media/ship-enemy-3.png', 32, 32),
        offset: { x: 0, y: 16 },
        size: { x: 32, y: 16 },
        shot_anim: 3,
        shots_pos: [0, 31, 30, 31, 1, 31, 31, 31],
    });

    EntityEnemyShip4 = EnemyShip.extend(
    {
        shot_speed: 0.75,
        health: 4,
        animSheet: new ig.AnimationSheet('media/ship-enemy-4.png', 32, 32),
        offset: { x: 0, y: 16 },
        size: { x: 32, y: 16 },
        shot_anim: 4,
        shots_pos: [0, 31, 31, 31, 6, 29, 7, 29, 24, 29, 25, 29],
    });

    EntityEnemyShip5 = EnemyShip.extend(
    {
        shot_speed: 0.5,
        health: 8,
        animSheet: new ig.AnimationSheet('media/ship-enemy-5.png', 32, 32),
        offset: { x: 0, y: 16 },
        size: { x: 32, y: 16 },
        shot_anim: 5,
        shots_pos: [5, 31, 6, 31, 25, 31, 26, 31],
    });

    EntityEnemyShip6 = EnemyShip.extend(
    {
        shot_speed: 2,
        health: 2,
        animSheet: new ig.AnimationSheet('media/ship-enemy-6.png', 16, 16),
        offset: { x: 0, y: 8 },
        size: { x: 16, y: 8 },
        shot_anim: 6,
        shots_pos: [0, 16, 15, 16],
    });
});