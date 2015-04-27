var g_groundHeight = 57;
var g_runnerStartX = 80;

// collision type for chipmunk
if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.bar = 1;
    SpriteTag.enemy = 2;
    SpriteTag.weapon = 3;
}

if(typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.animation = 1;
    TagOfLayer.status = 2;
};

var MainScene = cc.Scene.extend({
    space: null,
    animationLayer: null,
    removeList :[],
    // init space of chipmunk
    initPhysics:function() {
        //1. new space object
        this.space = new cp.Space();
        //2. setup the  Gravity
        this.space.gravity = cp.v(10, -10);

        this.space.addCollisionHandler(SpriteTag.bar, SpriteTag.enemy, this.collisionDeathBegin.bind(this),null, null);
        this.space.addCollisionHandler(SpriteTag.weapon, SpriteTag.enemy, this.collisionEnemyBegin.bind(this),null, null);
        this.space.addCollisionHandler(SpriteTag.weapon, SpriteTag.bar, false, false, false);
    },
    collisionEnemyBegin: function (arbiter, space){
        var shapes = arbiter.getShapes();
        var result = shapes[1].parent.feed(shapes[0].parent.type.dmg);
        if (result && !(this.removeList.indexOf(shapes[1].parent) > -1)) this.removeList.push(shapes[1].parent);
        if (!(this.removeList.indexOf(shapes[0].parent) > -1)) this.removeList.push(shapes[0].parent);
        //console.log(shapes[1]);
        //cc.director.pause();
    },
    collisionDeathBegin: function (arbiter, space){
        cc.log("IMPACT");
        cc.log(arbiter);
        cc.log(space);
        cc.director.pause();
        this.addChild(new GameOverLayer());
    },
    update: function(dt){
        //update step chipmunk
        this.space.step(dt);
        //update recursive(can I call this recursive?

        this.getChildByTag(TagOfLayer.animation).update();
        for(var i = 0; i < this.removeList.length; i++){
            console.log("removing");
            this.removeList[i].remove();
        }
        this.removeList = [];

    },
    onEnter:function () {
        this._super();
        this.removeList = [];

        this.initPhysics();
        this.animationLayer = new AnimationLayer(this.space);
        this.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.addChild(this.animationLayer, 0, TagOfLayer.animation);
        this.addChild(new StatusLayer(), 0, TagOfLayer.status);
        this.scheduleUpdate();
    }
});

