const { ccclass, property } = cc._decorator; @ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    player: cc.Node = null;

    onLoad() {//绑定事件
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.mouseFun, this);
        //给canvas绑定事件
    }

    // mouseFun(event: cc.Event.EventTouch) {
    //     console.log('手指在屏幕上移动了速度是');
    //     //触摸点的世界坐标
    //     var pos = new cc.Vec2(event.getLocationX(), this.player.position.y);
    //     //将一个点转换到节点 (局部) 空间坐标系，这个坐标系以锚点为原点。
    //     //给要移动的物体赋值
    //     this.player.position = pos;
    //     console.log(this.player.getComponent(cc.RigidBody).linearVelocity.x);
    // }
}