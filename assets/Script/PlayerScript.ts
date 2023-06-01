import Canvas from "./CanvasScript";

const { ccclass, property } = cc._decorator;
@ccclass
export default class PlayerScript extends cc.Component {

    @property
    speed: number;

    @property
    jumpSpeed: number = 0;

    @property(cc.Sprite)
    health: cc.Sprite;

    //血量相关
    blood: number = 3;
    isInvincible: boolean = false; // 是否处于无敌状态
    invincibleDuration: number = 2; // 无敌持续时间

    // 闪烁动画相关
    blinkInterval: number = 2; // 闪烁时间
    blinkTimes: number = 14; // 闪烁次数
    originalOpacity: number = 255; // 角色原始的透明度

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;//开启物理效果
    }


    start() {
        
    }

    update(dt) {
        if (this.isPlayingHurtAnimation() != true) {
            this.playJumpAnimation();
        }
        if (this.node.position.y <= 100) {
            this.node.destroy();
            cc.director.loadScene("RestartScene");
        }
    }

    //检测是否死亡
    gameOverDetection() {
        if (this.node.position.y <= 100 ) {
            this.node.destroy();
            cc.director.loadScene("RestartScene");
        }
    }

    //碰撞物体检测函数
    onBeginContact(contact, self, other) {
        // 获取碰撞物体的标签
        let otherTag = other.node.getComponent(cc.PhysicsBoxCollider).tag;

        if (otherTag === 1) {
            this.jump();
        } else if (otherTag === 2) {
            if (this.health && !this.isInvincible) {

                // 爱心消失, 扣血
                let firstChild = this.health.node.children[0];
                if (firstChild) {
                    firstChild.destroy();
                    this.blood--;
                }

                // 施加向右上的冲量
                let rbody = this.getComponent(cc.RigidBody);
                let contactPoint = other.node.position;
                // console.log(contactPoint);
                let outwardDirection = contactPoint.sub(this.node.position);
                console.log(outwardDirection);
                let outwardForce:cc.Vec2;
                if (outwardDirection.x < 0) {
                    outwardForce = cc.v2(100, -100);
                } else {
                    outwardForce = cc.v2(-100, -100);
                }
                console.log(outwardForce);
                rbody.applyLinearImpulse(outwardForce, rbody.getWorldCenter(), true);
                
                //死亡掉落
                if (this.blood <= 0) {
                    this.fallAndEndGame();
                } else {
                    // //播放受伤动画并闪烁               
                    this.playHurtAnimation();
                    this.setInvincible();
                }
            }
        }
    }

    //游戏结束，角色掉落
    fallAndEndGame() {
        Canvas.stopMouseMove = true;
        let ani = this.node.getComponent(cc.Animation);
        ani.play("PlayerHurt");

        // cc.director.getPhysicsManager().enabled = false; // 关闭物理效果
        this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;// 关闭碰撞
        this.node.stopAllActions();

        let upRightPos: cc.Vec2 = cc.v2(this.node.position.x, this.node.position.y + 200);
        let endPos: cc.Vec2 = cc.v2(upRightPos.x, -1000);

        let uprightAction = cc.moveTo(0.5, upRightPos).easing(cc.easeSineOut()); // 使用 moveTo 动作将人物移动到指定位置
        let endAciton = cc.moveTo(0.80, endPos).easing(cc.easeSineIn());


        // this.node.runAction(cc.sequence(uprightAction, endAciton));
        this.node.runAction(uprightAction);
    }

    //跳跃，获取刚体，给刚体一个向上的linearVelocity
    jump() {

        let rbody = this.getComponent(cc.RigidBody);
        rbody.linearVelocity = cc.v2(0, this.jumpSpeed);
    }

    //切换跳跃动画
    playJumpAnimation() {
        let ani = this.getComponent(cc.Animation);
        let rbody = this.getComponent(cc.RigidBody);
        if (rbody.linearVelocity.y < 0) {
            ani.play("PlayerDown");
        }
        if (rbody.linearVelocity.y > 0) {
            ani.play("PlayerJump");
        }
    }

    // 播放受伤动画
    playHurtAnimation() {
        let ani = this.getComponent(cc.Animation);
        ani.play("PlayerHurt");
        this.scheduleOnce(() => {
            this.playJumpAnimation();
        }, 0.5);
    }

    // 是否正在播放受伤动画
    isPlayingHurtAnimation() {
        let ani = this.getComponent(cc.Animation);
        return ani.currentClip && ani.currentClip.name === "PlayerHurt";
    }

    //开启无敌
    setInvincible() {
        this.isInvincible = true;
        this.startBlinkAnimation();
        this.scheduleOnce(() => {
            this.isInvincible = false;
            this.stopBlinkAnimation();
        }, this.invincibleDuration);
    }

    // 开始闪烁动画
    startBlinkAnimation() {
        this.stopBlinkAnimation(); // 先确保停止之前的闪烁动画
        let blinkAction = cc.blink(this.blinkInterval, this.blinkTimes);
        this.node.runAction(blinkAction);
    }

    // 停止闪烁动画
    stopBlinkAnimation() {
        this.node.stopAllActions();
        this.node.opacity = this.originalOpacity; // 恢复角色原始的透明度
    }

    //手指移动
    // move(event) {
    //     const delta = event.getDelta();
    //     let ani = this.getComponent(cc.Animation);
    //     let pos = new cc.Vec2(this.node.position.x + this.speed * delta.x, this.node.position.y);

    //     if (delta.x < 0) {
    //         this.node.scaleX = -2;
    //     } else {
    //         this.node.scaleX = 2;
    //     }
    //     this.node.setPosition(pos);
    // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.move, this);
    // }


}
