var AnimationLayer = cc.Layer.extend({
    enemyGenerators: [],
    space: null,

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
    },
    update:function(){
        this.enemyGenerators.forEach(function(gen){
            gen.enemies.forEach(function(enemy){
                enemy.move();
            })
        })
    },
    init:function (){
        this._super();
        var size = cc.winSize;
        var spritePJ = new cc.Sprite(res.pj_img);
        spritePJ.attr({x:300, y:30});

        var spriteEnemy = new cc.Sprite(res.g1_img);
        spriteEnemy.attr({x:200, y:20});

        var bar = new cc.Sprite(res.bar_img);
        bar.attr({
            x: (size.width / 2) + 15,
            y: (size.height/2) - 147,
            rotation: 337
        });

        var contentSize = bar.getContentSize();
        var barBody = new cp.Body(1, cp.momentForBox(contentSize.width, contentSize.height));
        barBody.p = cc.p((size.width / 2) + 15, (size.height/2) - 147);
        this.space.addBody(this.body);
        var shape = new cp.BoxShape(body, contentSize.width, contentSize.height);
        this.space.addShape(this.shape);
        bar.setBody(body);

        this.addChild(bar);

        this.enemyGenerators.push(new EnemyGenerator(100, 400));
        this.enemyGenerators[0].spawn();
        this.addChild(this.enemyGenerators[0].enemies[0].sprite);



    }
});

var EnemyGenerator = function(posX, posY) {
    this.enemies = [];
    this.position = {
        x: posX,
        y: posY
    };
};

EnemyGenerator.prototype.spawn = function(){
    var enemyType = getRandomInt(0, 3);
    this.enemies.push(new Enemy(enemyType, this.position));
};

//TODO
//Add sprites depending of type
//Animation controller etc
var Enemy = function(enemyType, position){
    switch (enemyType) {
        case 0:
            this.hunger = 5;
            break;
        case 1:
            this.hunger = 15;
            break;
        case 2:
            this.hunger = 30;
            break;
        default:
            this.hunger = Math.random()*10;
            break;
    }
    this.sprite = new cc.Sprite(res.g1_img);
    this.sprite.attr({x : position.x, y: position.y});
};

Enemy.prototype.move = function(){
    var actionMove = new cc.MoveBy(1, cc.p(1,-1));
    this.sprite.runAction(new cc.Sequence(actionMove));
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}