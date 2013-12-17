ig.module( 'game.levels.universe' )
.requires( 'impact.image','game.entities.player-ship' )
.defines(function(){
LevelUniverse=/*JSON[*/{"entities":[{"type":"EntityPlayerShip","x":0,"y":0}],"layer":[{"name":"stars1","width":1,"height":1,"linkWithCollision":false,"visible":1,"tilesetName":"media/stars-bg-1.png","repeat":true,"preRender":true,"distance":"20","tilesize":96,"foreground":false,"data":[[1]]},{"name":"stars2","width":1,"height":1,"linkWithCollision":false,"visible":1,"tilesetName":"media/stars-bg-2.png","repeat":true,"preRender":true,"distance":"10","tilesize":96,"foreground":false,"data":[[1]]},{"name":"stars3","width":1,"height":1,"linkWithCollision":false,"visible":1,"tilesetName":"media/stars-bg-3.png","repeat":true,"preRender":true,"distance":"5","tilesize":96,"foreground":false,"data":[[1]]}]}/*]JSON*/;
LevelUniverseResources=[new ig.Image('media/stars-bg-1.png'), new ig.Image('media/stars-bg-2.png'), new ig.Image('media/stars-bg-3.png')];
});