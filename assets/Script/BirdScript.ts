const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // onLoad () {}

    start() {

    }

    onBeginContact(contact, selfc, other) {//contact 碰撞类 self 碰撞体自己 other 其他碰撞体
        let ani = this.getComponent(cc.Animation);
        if (other.tag == 0) {
            ani.play("BirdDisapper");
        }
    }
    // update (dt) {}
}
