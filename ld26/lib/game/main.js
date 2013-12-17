ig.module
(
	'game.main' 
)
.requires
(
 //   'impact.debug.debug',
	'impact.game',
	'impact.font',
    'game.levels.map',
    'game.levels.empty',
    'game.entities.king',
    'game.entities.wizard',
    'game.entities.knight',
    'game.entities.archer'
)
.defines(function ()
{
    LudumDare26Game = ig.Game.extend(
    {
        clearColor: '#111111',
        autoSort: true,
        sortBy: ig.Game.SORT.Z_INDEX,

        bg_music: new ig.Sound('media/music1.ogg'),

        sound_moved: new ig.Sound('media/piece_moved.ogg'),
        sound_killed: new ig.Sound('media/piece_killed.ogg'),
        sound_won: new ig.Sound('media/game_won.ogg'),
        sound_lost: new ig.Sound('media/game_lost.ogg'),

        font: new ig.Font('media/04b03.font.png'),
        font_player:
        [
            new ig.Font('media/04b03_b.font.png'),
            new ig.Font('media/04b03_r.font.png')
        ],

        target_img: new ig.Image('media/target.png', 16, 16),

        cam_offset: { x: -4, y: -4, },
        winner: -1,
        turn: 1,
        turn_player: 0,
        selected_piece: 0,        
        players: 0,
        menu: true,
        
        new_game: function()
        {
            this.clearColor = '#006680';
            this.winner = -1;
            this.turn = 1;
            this.turn_player = 0;
            this.selected_piece = 0;

            this.loadLevel(LevelMap);
            ig.game.screen.x = this.cam_offset.x;
            ig.game.screen.y = this.cam_offset.y;

            this.players =
                [
                    {
                        id: 0,
                        name: '1',
                        king: ig.game.spawnEntity(EntityKing, 48, 96, { color: 0 }),
                        wizard: ig.game.spawnEntity(EntityWizard, 64, 96, { color: 0 }),
                        knight: ig.game.spawnEntity(EntityKnight, 16, 96, { color: 0 }),
                        archer: ig.game.spawnEntity(EntityArcher, 96, 96, { color: 0 }),
                    },
                    {
                        id: 1,
                        name: '2',
                        king: ig.game.spawnEntity(EntityKing, 48, 0, { color: 1 }),
                        wizard: ig.game.spawnEntity(EntityWizard, 32, 0, { color: 1 }),
                        knight: ig.game.spawnEntity(EntityKnight, 80, 0, { color: 1 }),
                        archer: ig.game.spawnEntity(EntityArcher, 0, 0, { color: 1 }),
                    }
                ];
        },
	
	    init: function ()
	    {
	        ig.music.add(this.bg_music);
	        ig.music.play();

	        ig.input.bind(ig.KEY.MOUSE1, 'click');
	    },
	
	    update: function ()
	    {
		    this.parent();
		
		    if (this.winner >= 0 || this.menu)
		    {
		        if (ig.input.pressed('click'))
		        {
		            this.menu = false;
		            this.new_game();
		        }

		        return;
		    }

		    if (ig.input.pressed('click'))
		    {
		        var pieces = ig.game.getEntitiesByType(PieceBase);

		        var tile_x = Math.floor((ig.input.mouse.x + this.cam_offset.x) / 16);
		        var tile_y = Math.floor((ig.input.mouse.y + this.cam_offset.y) / 16);

		        if (tile_x >= 0 && tile_x <= 6
                    && tile_y >= 0 && tile_y <= 6)
		        {
		            if (this.selected_piece)
		            {
		                var tx = 0;
		                var ty = 0;

		                for (var i = 0, l = this.selected_piece.can_go.length; i < l; ++i)
		                {
		                    var taken = false;
		                    var attacked = false;

		                    tx = Math.floor((this.selected_piece.pos.x + 4 + this.selected_piece.can_go[i].x * 16) / 16);
		                    ty = Math.floor((this.selected_piece.pos.y + 4 + this.selected_piece.can_go[i].y * 16) / 16);
                            
		                    if (tile_x == tx && tile_y == ty)
		                    {
		                        for (var j = 0, k = pieces.length; j < k; ++j)
		                        {
		                            var piece = pieces[j];

		                            if (piece.pos.x >= tx * 16 + this.cam_offset.x && piece.pos.x <= tx * 16 + this.cam_offset.x + 16
                                        && piece.pos.y >= ty * 16 + this.cam_offset.x && piece.pos.y <= ty * 16 + this.cam_offset.x + 16)
		                            {
		                                taken = true;

		                                if (piece.color != this.selected_piece.color)
		                                {
		                                    this.sound_killed.play();
		                                    attacked = true;
		                                    piece.hp -= this.selected_piece.dmg;
		                                    if (piece.hp <= 0)
		                                    {
		                                        ig.game.removeEntity(piece);
		                                        taken = false;
		                                    }
		                                }

		                                break;
		                            }
		                        }

		                        if (!taken)
		                        {
		                            this.selected_piece.pos.x = tx * 16;
		                            this.selected_piece.pos.y = ty * 16;

                                    if (!attacked)
    		                            this.sound_moved.play();
		                        }

		                        if (!taken || attacked)
                                {
		                            this.turn_player = this.turn_player == 0 ? 1 : 0;

		                            if (this.players[this.turn_player].king.hp <= 0)
		                            {
		                                this.winner = this.turn_player == 0 ? 1 : 0;
		                                this.clearColor = this.winner == 0 ? '#006680' : '#804055';
		                                this.loadLevelDeferred(LevelEmpty);
		                                this.sound_won.play();
		                            }
		                            else
		                            {
		                                this.turn++;
		                                this.clearColor = this.turn_player == 0 ? '#006680' : '#804055';
		                            }
		                        }

		                        break;
		                    }
		                }

		                this.selected_piece.toggle_selected();
		                this.selected_piece = 0;
		            }
		            else
		            {
		                for (var i = 0, l = pieces.length; i < l; ++i)
		                {
		                    var piece = pieces[i];

		                    if (piece.color != this.turn_player)
		                        continue;

		                    if (piece.pos.x >= tile_x * 16 + this.cam_offset.x && piece.pos.x <= tile_x * 16 + this.cam_offset.x + 16
                                && piece.pos.y >= tile_y * 16 + this.cam_offset.x && piece.pos.y <= tile_y * 16 + this.cam_offset.x + 16)
		                    {
		                        this.selected_piece = piece;
		                        piece.toggle_selected();
		                    }
		                }
		            }
		        }
		    }
	    },
	
	    draw: function ()
	    {
	        this.parent();
            
	        if (this.menu)
	        {
	            this.font.draw('LUDUM DARE 26\n\nMINIMALISM\n\nGAME BY\nDANIEL BAUMARTZ\nWWW.MYYYVOTHRR.DE', 80, 24, ig.Font.ALIGN.CENTER);
	            this.font.draw('CLICK TO PLAY HOTSEAT', 80, 104, ig.Font.ALIGN.CENTER);
	            return;
	        }

	        if (this.winner >= 0)
	        {
	            this.font_player[this.winner].draw('PLAYER\n' + this.players[this.winner].name + "\nHAS WON!", 80, 16, ig.Font.ALIGN.CENTER);
	            this.font_player[this.winner].draw('YOU ANNIHILATED\nYOUR OPPONENT IN\n' + this.turn + '\nTURNS', 80, 56, ig.Font.ALIGN.CENTER);
	            this.font_player[this.winner].draw('CLICK FOR REVENGE', 80, 104, ig.Font.ALIGN.CENTER);
	        }
	        else
	        {
	            var p = this.players[this.turn_player];
	            this.font_player[this.turn_player].draw('TURN', 118, 4, ig.Font.ALIGN.LEFT);
	            this.font_player[this.turn_player].draw(this.turn, 156, 4, ig.Font.ALIGN.RIGHT);
	            this.font_player[this.turn_player].draw('PLAYER', 118, 12, ig.Font.ALIGN.LEFT);
	            this.font_player[this.turn_player].draw(p.name, 156, 12, ig.Font.ALIGN.RIGHT);
	            this.font_player[this.turn_player].draw('KING', 118, 24, ig.Font.ALIGN.LEFT);
	            this.font_player[this.turn_player].draw(p.king.hp > 0 ? p.king.hp + '/' + p.king.hp_max : 'KIA', 156, 30, ig.Font.ALIGN.RIGHT);
	            this.font_player[this.turn_player].draw('WIZARD', 118, 38, ig.Font.ALIGN.LEFT);
	            this.font_player[this.turn_player].draw(p.wizard.hp > 0 ? p.wizard.hp + '/' + p.wizard.hp_max : 'KIA', 156, 44, ig.Font.ALIGN.RIGHT);
	            this.font_player[this.turn_player].draw('KNIGHT', 118, 52, ig.Font.ALIGN.LEFT);
	            this.font_player[this.turn_player].draw(p.knight.hp > 0 ? p.knight.hp + '/' + p.knight.hp_max : 'KIA', 156, 58, ig.Font.ALIGN.RIGHT);
	            this.font_player[this.turn_player].draw('ARCHER', 118, 66, ig.Font.ALIGN.LEFT);
	            this.font_player[this.turn_player].draw(p.archer.hp > 0 ? p.archer.hp + '/' + p.archer.hp_max : 'KIA', 156, 72, ig.Font.ALIGN.RIGHT);

	            if (this.selected_piece)
	            {
	                if (this.selected_piece.can_go)
	                {
	                    var tx = 0;
	                    var ty = 0;
	                    var tile_x = 0;
	                    var tile_y = 0;

	                    for (var i = 0, l = this.selected_piece.can_go.length; i < l; ++i)
	                    {
	                        tx = this.selected_piece.pos.x + 4 + this.selected_piece.can_go[i].x * 16;
	                        ty = this.selected_piece.pos.y + 4 + this.selected_piece.can_go[i].y * 16;

	                        tile_x = Math.floor(tx / 16);
	                        tile_y = Math.floor(ty / 16);

	                        if (tile_x < 0 || tile_x > 6
                                || tile_y < 0 || tile_y > 6)
	                            continue;

	                        this.target_img.draw(tx, ty);
	                    }
	                }
	            }
	        }
	    }
    });

    if (ig.ua.mobile)
        ig.Sound.enabled = false;

    ig.Sound.use = [ ig.Sound.FORMAT.OGG ];

    ig.main('#canvas', LudumDare26Game, 60, 160, 120, 4);
});
