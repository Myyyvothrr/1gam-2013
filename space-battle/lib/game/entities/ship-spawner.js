ig.module
(
	'game.entities.ship-spawner'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    EntityShipSpawner = ig.Entity.extend(
    {
        font: new ig.Font('media/04b03.font.png'),

        size: { x: 96, y: 96 },
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        health: 2,
        zIndex: 380,

        dir: 1,

        player_id: 0,

        can_spawn: false,
        spawn_timer: 0,
        spawn_delay: 10,

        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255,0,255,0.5)',

        ai: false,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.spawn_timer = new ig.Timer(5);
        },

        update: function ()
        {
            this.parent();

            if (this.spawn_timer.delta() > 0)
                this.can_spawn = true;

            if (this.ai)
            {
                if (this.can_spawn)
                {
                    if (ig.game.ai_spawn())
                    {
                        if (Math.random() > 0.2)
                            this.spawn();
                    }
                }
            }
            else
            {
                if (this.can_spawn && ig.input.released('click') && ig.input.mouse.x >= this.pos.x && ig.input.mouse.x <= this.pos.x + this.size.x && ig.input.mouse.y >= this.pos.y && ig.input.mouse.y <= this.pos.y + this.size.y)
                {
                    this.spawn();
                }
            }
        },

        draw: function()
        {
            this.parent();

            if (!this.ai)
            {
                if (this.can_spawn)
                    this.font.draw("READY", this.pos.x + this.size.x * 0.5, this.pos.y + this.size.y * 0.5, ig.Font.ALIGN.CENTER);
                else
                    this.font.draw((-1 * this.spawn_timer.delta()).floor(), this.pos.x + this.size.x * 0.5, this.pos.y + this.size.y * 0.5, ig.Font.ALIGN.CENTER);
            }
        },

        spawn: function()
        {
            this.can_spawn = false;
            this.spawn_timer.set(this.spawn_delay);
            ig.game.spawnEntity(EntityShip, this.pos.x, this.pos.y + this.size.y * 0.5 - 32, { player_id: this.player_id, dir: this.dir, ai: this.ai });
        },
    });
});