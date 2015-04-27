var AnimationLayer = cc.Layer.extend({
    enemyGenerators: [],
    enemies: [],
    space: null,
    player: null,
    step: 0,
    ctor:function (space) {
        this._super();
        this.enemyGenerators = [];
        this.enemies = [];
        this.space = space;
        this.player = new PJ(this.space);
        this.addChild(this.player.sprite);
        this.init();
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                var layer = event.getCurrentTarget();
                switch (keyCode){
                    case 87:
                        layer.player.move("up")
                        break;
                    case 65:
                        layer.player.move("down")
                        break;
                    case 83:
                        layer.player.move("down")
                        break;
                    case 68:
                        layer.player.move("up")
                        break;
                    case 16:
                        layer.player.changeWeapon();
                        break;
                    case 32:
                        layer.player.shoot();
                        break;
                    default:
                        break;
                }
            }
        }, this);
    },
    update:function(){
        this.enemyGenerators.forEach(function(gen){
            gen.enemies.forEach(function(enemy){
                enemy.move();
            })
        })
        this.step++;
        if (this.step == 200){
            this.step = 0;
            for (var i = 0; i<this.enemyGenerators.length; i++) {
                if (Math.random() > 0.25){
                    var e = this.enemyGenerators[i].spawn();
                    this.addChild(e.sprite);
                }
            }
        }
    },
    init:function (){
        this._super();
        var size = cc.winSize;


//Start enemy generation
        //POLISH!!!!
        this.enemyGenerators.push(new EnemyGenerator(150, 250, this.space));
        this.enemyGenerators.push(new EnemyGenerator(150, 400, this.space));
        this.enemyGenerators.push(new EnemyGenerator(200, 500, this.space));
        this.enemyGenerators.push(new EnemyGenerator(250, 600, this.space));
        //this.enemyGenerators.push(new EnemyGenerator(300, 600, this.space));


        for (var i = 0; i<this.enemyGenerators.length; i++) {
            if (Math.random() > 0.25) {
                var e = this.enemyGenerators[i].spawn();
                this.addChild(e.sprite);
            }
        }


        //Adding the bar
        var bar = new cc.PhysicsSprite(res.bar_img);
        var contentSize = bar.getContentSize();
        var barBody = new cp.StaticBody();
        barBody.setPos(cc.p((size.width / 2)+1,(size.height/2)));
        bar.setBody(barBody);
        var v = [300,-28,248,-11,-35,-250,50,-250];
        cp.convexHull(v);
        var barShape = new cp.PolyShape(barBody, v, cp.v(0,0));
        //var barShape = new cp.BoxShape(barBody, 300, 80);
        barShape.setCollisionType(SpriteTag.bar);
        barShape.group = 1;
        this.space.addStaticShape(barShape);

        this.addChild(bar);
        //end bar

    }
});

