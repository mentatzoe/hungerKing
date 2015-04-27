var EnemyGenerator = function(posX, posY, space) {
    this.space = space
    this.enemies = [];
    this.position = {
        x: posX,
        y: posY
    };
};

EnemyGenerator.prototype.spawn = function(){
    var enemyType = getRandomInt(0, 3);
    var e = new Enemy(enemyType, this.position, this.space);
    this.enemies.push(e);
    return e;
};
