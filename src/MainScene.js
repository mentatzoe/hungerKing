var g_groundHeight = 57;
var g_runnerStartX = 80;

var MainScene = cc.Scene.extend({
    space: null,
    // init space of chipmunk
    initPhysics:function() {
        //1. new space object
        this.space = new cp.Space();
        //2. setup the  Gravity
        this.space.gravity = cp.v(0, 0);

        // 3. set up Walls
       /* var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_groundHeight),// start point
            cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallBottom);*/
    },
    update: function(dt){
        cc.log("Updating");
        //update step chipmunk
        this.space.step(dt);
        //update recursive(can I call this recursive?
        this.getChildByTag(0).update();
    },
    onEnter:function () {
        this._super();
        this.initPhysics();

        this.addChild(new BackgroundLayer());
        this.addChild(new AnimationLayer(this.space), 0, 0);
        this.scheduleUpdate();

        console.log(this);
    }
});

