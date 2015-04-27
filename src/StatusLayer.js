var StatusLayer = cc.Layer.extend({
    lShakes:null,
    lFries:null,
    lBurger:null,
    shakes:15,
    fries:15,
    burgers:15,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();

        //this.lShakes = new cc.LabelTTF("Shakes: 15", "Helvetica", 20);
        //this.lShakes.setColor(cc.color(0,0,0));//black color
        //this.lShakes.setPosition(cc.p(180, 60));
        //this.addChild(this.lShakes);
        //
        //this.lFries = new cc.LabelTTF("Fries: 15", "Helvetica", 20);
        //this.lFries.setColor(cc.color(0,0,0));//black color
        //this.lFries.setPosition(cc.p(180, 40));
        //this.addChild(this.lFries);
        //
        //this.lBurger = new cc.LabelTTF("Burgers: 15", "Helvetica", 20);
        //this.lBurger.setColor(cc.color(0,0,0));//black color
        //this.lBurger.setPosition(cc.p(180, 20));
        //this.addChild(this.lBurger);

        this.lShakes = new cc.Sprite(res.soda);
        this.lShakes.setPosition(cc.p(110, 15));
        this.addChild(this.lShakes);

        this.lFries = new cc.Sprite(res.fries);
        this.lFries.setPosition(cc.p(130, 15));
        this.addChild(this.lFries);

        this.lBurger = new cc.Sprite(res.burger);
        this.lBurger.setPosition(cc.p(150, 15));
        this.addChild(this.lBurger);
    },
    updateShakes: function(num){
        this.shakes = num;
        this.lShakes.setString("Shakes:" + this.shakes);
    },
    updateFries: function(num){
        this.fries = num;
        this.lFries.setString("Fries:" + this.fries);
    },
    updateBurger: function(num){
        this.burger = num;
        this.lBurger.setString("Burgers:" + this.burger);
    }


});