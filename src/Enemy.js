
//TODO
//Add sprites depending of type
//Animation controller etc
var Enemy = function(enemyType, position, space){
    this.space = space;
    switch (enemyType) {
        case 0:
            this.hunger = 5;
            this.sprite = new cc.PhysicsSprite(res.g2_img);
            break;
        case 1:
            this.hunger = 15;
            this.sprite = new cc.PhysicsSprite(res.g3_img);
            break;
        case 2:
            this.hunger = 30;
            this.sprite = new cc.PhysicsSprite(res.g1_img);
            break;
        default:
            this.hunger = Math.random()*10;
            break;
    }


    var contentSize = this.sprite.getContentSize();
    this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
    this.body.p = cc.p(position.x, position.y);
    this.body.applyImpulse(cp.v(1, -1), cp.v(0, 0));//run speed
    this.shape = new cp.BoxShape(this.body, contentSize.width, contentSize.height);
    this.shape.setCollisionType(SpriteTag.enemy);
    this.shape.parent = this;
    this.sprite.setBody(this.body);
    this.space.addShape(this.shape);
    this.space.addBody(this.body);
};

Enemy.prototype.move = function(){
    //var actionMove = new cc.MoveBy(1, cc.p(1,-1));
    //this.sprite.runAction(new cc.Sequence(actionMove));
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Enemy.prototype.feed = function(amount){
    this.hunger -= amount;
    return this.hunger <= 0 ? true : false;
};

Enemy.prototype.remove = function(){
    this.space.removeBody(this.body);
    this.space.removeShape(this.shape);
    this.shape = null;
    this.sprite.removeFromParent();
    this.sprite = null;
};