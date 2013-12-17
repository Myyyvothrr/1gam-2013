ig.module
(
	'game.global'
)
.requires
(
)
.defines(function()
{
    global =
    {
        player: 0,

        player_data: 0,

        init_player_data: function()
        {
            global.player_data =
            {
                health: 100,
                ammo: 100,
                planet: 0,
            };
        },
    };
});