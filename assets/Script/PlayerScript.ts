const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerScript extends cc.Component {
    @property
    speed: number;

    Jump() {
        let rbody = this.getComponent(cc.RigidBody);

        rbody.linearVelocity = cc.v2(0, 3000);
    }

    move(event) {
        const delta = event.getDelta();
        let ani = this.getComponent(cc.Animation);
        let pos = new cc.Vec2(this.node.position.x + this.speed * delta.x, this.node.position.y);

        if (delta.x < 0) {
            this.node.scaleX = -2;
        } else {
            this.node.scaleX = 2;
        }


        this.node.setPosition(pos);
    }

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;//开启物理效果
    }

    start() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.move, this);
    }

    update(dt) {
        let ani = this.getComponent(cc.Animation);
        let rbody = this.getComponent(cc.RigidBody);

        if (rbody.linearVelocity.y < 0) {
            ani.play("PlayerDown");
        }
        if (rbody.linearVelocity.y > 0) {
            ani.play("PlayerJump");
        }

    }



    onBeginContact(contact, selfc, other) {//contact 碰撞类 self 碰撞体自己 other 其他碰撞体
        this.Jump();
    }


}
