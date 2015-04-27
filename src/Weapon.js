if(typeof WeaponType == "undefined") {
    var WeaponType = {};
    WeaponType.soda = {
        'id': 0,
        'dmg': 5,
        'sprite': res.soda
    };
    WeaponType.fries = {
        'id': 1,
        'dmg': 10,
        'sprite': res.fries
    };
    WeaponType.burger = {
        'id': 2,
        'dmg': 30,
        'sprite': res.burger
    };
};

var Weapon = cc.Class.extend({
    space : null,
    type : null,
    sprite: null,
    shape: null,
    body: null,
    ctor: function (type, space, position){
        this.space = space;
        this.type = type;
        switch (this.type) {
            case WeaponType.soda:
                break;
            case WeaponType.fries:
                break;
            case WeaponType.burger:
                break;
        }
        console.log(position);
        this.sprite = new cc.PhysicsSprite(this.type.sprite);
        var contentSize = this.sprite.getContentSize();
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));

        this.body.p = cc.p(position.x, position.y);
        this.body.applyImpulse(cp.v(-300, 300), cp.v(-300, 300));//run speed
        this.shape = new cp.BoxShape(this.body, contentSize.width, contentSize.height);
        this.shape.setCollisionType(SpriteTag.weapon);
        this.shape.group = 1;

        this.shape.parent = this;

        this.sprite.setBody(this.body);
        this.space.addShape(this.shape);
        this.space.addBody(this.body);
    },
    update: function(dt){
        console.log("Updating");
    },
    remove: function(){
        this.space.removeBody(this.body);
        this.space.removeShape(this.shape);
        this.shape = null;
        console.log(this.sprite);
        this.sprite.removeFromParent();
        this.sprite = null;
    }

});