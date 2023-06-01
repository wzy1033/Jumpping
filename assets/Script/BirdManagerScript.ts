const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    BirdPre: cc.Prefab;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

	start() {
		// this.schedule(() => {
		// 	//创建实例
		// 	let bird = cc.instantiate(this.BirdPre);
		// 	let sceneRoot = cc.director.getScene();
		// 	let allNode = sceneRoot.getChildByName("All");
		// 	//设置父节点
		// 	bird.setParent(allNode);
		// 	//设置位置
		// 	bird.y = this.node.y;
		// 	bird.x = Math.random() * 500 + 12;
		// 	// console.log(this.node.position.y);
			
		// }, 0.1);
	}

    // update (dt) {}
}
