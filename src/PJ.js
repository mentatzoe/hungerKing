var PJ = function(space){
    this.spriteSheet=null;
    this.runningAction = null;
    this.sprite = null;
    this.space = space;
    this.currentWeapon = WeaponType.soda;
    this.sprite = new cc.Sprite(res.pj_img);
    this.sprite.attr({x:580, y:30});
    this.ammo = {
        '0': 15,
        '1': 15,
        '2': 15
    }

    cc.spriteFrameCache.addSpriteFrames(res.pj_plist);
};

PJ.prototype.shoot = function(){
   // if (this.ammo[this.currentWeapon.id] > 0){
     //   this.ammo[this.currentWeapon.id] --;
        new Weapon(this.currentWeapon, this.space, this.sprite.getPosition());
    //}
};

PJ.prototype.changeWeapon = function(){
    var wtypes = [WeaponType.soda, WeaponType.fries, WeaponType.burger];
    var numId = this.currentWeapon.id++;
    this.currentWeapon = numId > 2 ? wtypes[0]: wtypes[numId];
    console.log(this.currentWeapon);
};

PJ.prototype.move = function(direction) {
    var point = cc.p(0,0);
    if (direction === 'up') {
        point = cc.p(10,10);
    } else {
        point = cc.p(-10,-10);
    }
    var actionMove = new cc.MoveBy(0, point);
    this.sprite.runAction(new cc.Sequence(actionMove));
}
