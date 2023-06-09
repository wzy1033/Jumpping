const { ccclass, property } = cc._decorator;

@ccclass
export default class PlatfromScript extends cc.Component {
    // onLoad () {}

    start() {

    }

    //检测到碰撞，执行消失动画，小鸟的销毁函数在动画里
    onBeginContact(contact, selfc, other) {//contact 碰撞类 self 碰撞体自己 other 其他碰撞体
        let ani = this.getComponent(cc.Animation);
        if (other.tag == 0){
            ani.play("Disapper");
        }
    }
    update (dt) {
		if(this.node.position.y<0){
			this.destroy();
		}
        let targetPosition = this.node.position;
        targetPosition.y -= 25 * dt;
        this.node.position = targetPosition;
	}
}
