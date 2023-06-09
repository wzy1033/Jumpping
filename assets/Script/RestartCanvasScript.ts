import CanvasScript from "./CanvasScript";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Node)
	heightLabel:cc.Node = null;
	@property
	height: number = 0;
    start () {
		this.heightLabel.getComponent(cc.Label).string = `本局游戏最高跳跃距离${Math.floor(this.height)} 米`
    }

}
