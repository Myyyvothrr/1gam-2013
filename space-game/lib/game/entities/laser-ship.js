ig.module
(
	'game.entities.laser-ship'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    EntityLaserShip = ig.Entity.extend(
    {
        animSheet: new ig.AnimationSheet('media/laser1.png', 1, 2),
        size: { x: 1, y: 2 },
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        health: 10,
        zIndex: 190,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [ settings.anim_index ? settings.anim_index : 0 ]);
        },

        update: function ()
        {
            this.parent();

            if (this.from_player)
                this.pos.y -= 2;
            else
                this.pos.y += 1;

            if (this.pos.y - ig.game.screen.y > 96 || this.pos.y - ig.game.screen.y < 0)
                this.kill();
        },

        check: function (other)
        {
            if (this.from_player || other instanceof EntityPlayerShip)
            {
                other.receiveDamage(1);

                this.kill();
            }
        },
    });
});