var BackgroundLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        var winsize = cc.director.getWinSize();

        //Creating bg image and positioning
        var centerPos = cc.p(winsize.width / 2, winsize.height /2);
        var spriteBG = new cc.Sprite(res.background_img);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
    }
});