ig.module( 'game.levels.station1' )
.requires( 'impact.image','game.entities.levelchanger','game.entities.coin','game.entities.player' )
.defines(function(){
LevelStation1=/*JSON[*/{"entities":[{"type":"EntityLevelchanger","x":256,"y":128,"settings":{"size":{"x":64,"y":64},"level":"Station2"}},{"type":"EntityCoin","x":116,"y":20},{"type":"EntityCoin","x":196,"y":292},{"type":"EntityPlayer","x":63,"y":275}],"layer":[{"name":"stars","width":1,"height":1,"linkWithCollision":false,"visible":1,"tilesetName":"media/stars-bg-1.png","repeat":true,"preRender":true,"distance":"30","tilesize":96,"foreground":false,"data":[[1]]},{"name":"stars2","width":1,"height":1,"linkWithCollision":false,"visible":1,"tilesetName":"media/stars-bg-2.png","repeat":true,"preRender":true,"distance":"10","tilesize":96,"foreground":false,"data":[[1]]},{"name":"map","width":20,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"media/tiles.png","repeat":false,"preRender":true,"distance":"1","tilesize":16,"foreground":false,"data":[[0,0,14,25,25,25,25,25,14,0,0,14,25,25,25,25,25,14,0,0],[0,0,24,10,10,10,10,10,24,0,0,24,10,10,10,10,10,24,0,0],[0,0,24,10,10,10,10,10,24,0,0,24,10,10,10,10,10,24,0,0],[0,0,24,10,10,10,10,10,24,0,0,24,10,10,10,10,10,24,0,0],[0,0,14,25,14,10,14,25,14,0,0,14,25,14,10,14,25,14,0,0],[0,0,0,0,24,10,24,0,0,0,0,0,0,24,10,24,0,0,0,0],[0,0,0,0,24,10,24,0,0,0,0,0,0,24,10,24,0,0,0,0],[0,0,0,0,24,10,24,0,0,0,0,0,0,24,10,24,0,0,0,0],[14,25,25,25,14,10,14,25,25,25,25,25,25,14,10,14,25,25,25,25],[24,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[24,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[14,25,25,25,14,10,14,25,25,25,25,25,25,14,10,14,25,25,25,25],[0,0,0,0,24,10,24,0,0,0,0,0,0,24,10,24,0,0,0,0],[0,0,0,0,24,10,24,0,0,0,0,0,0,24,10,24,0,0,0,0],[0,0,0,0,24,10,24,0,0,0,0,0,0,24,10,24,0,0,0,0],[0,0,14,25,14,10,14,25,14,0,0,14,25,14,10,14,25,14,0,0],[0,0,24,10,10,10,10,10,24,0,0,24,10,10,10,10,10,24,0,0],[0,0,24,10,10,10,10,10,24,0,0,24,10,10,10,10,10,24,0,0],[0,0,24,10,10,10,10,10,24,0,0,24,10,10,10,10,10,24,0,0],[0,0,14,25,25,25,25,25,14,0,0,14,25,25,25,25,25,14,0,0]]},{"name":"collision","width":20,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0],[0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0],[0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0],[0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0],[0,0,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,0,0],[0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0],[0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0],[0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0],[1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1],[0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0],[0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0],[0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0],[0,0,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,0,0],[0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0],[0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0],[0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0],[0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0]]}]}/*]JSON*/;
LevelStation1Resources=[new ig.Image('media/stars-bg-1.png'), new ig.Image('media/stars-bg-2.png'), new ig.Image('media/tiles.png')];
});