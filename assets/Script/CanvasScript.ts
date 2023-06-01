import PlayerScript from "./PlayerScript";

const { ccclass, property } = cc._decorator; @ccclass
export default class CanvasScript extends cc.Component {
	@property(cc.Node)
	player: cc.Node = null;
	@property(cc.Node)
	all: cc.Node = null;
	@property(cc.Node)
	background: cc.Node = null;
	@property(cc.Prefab)
	platformPre: cc.Prefab = null;
	static stopMouseMove = false;


	onLoad() {//绑定事件
		CanvasScript.stopMouseMove = false;
		this.node.on(cc.Node.EventType.TOUCH_MOVE, this.mouseMove, this);
		this.birdGenerator();
	}

	update(dt: number) {
		this.allNodeMove(dt);
		// console.log("player" + this.player.position.x + " " + this.player.position.y)
	}

	//生成踩踏板
	birdGenerator() {
		this.schedule(() => {
			//创建实例
			let platform = cc.instantiate(this.platformPre);
			let sceneRoot = cc.director.getScene();
			let allNode = sceneRoot.getChildByName("All");

			//设置位置
			platform.y = this.node.y + 200;
			platform.x = Math.random() * 500 + 12;
			platform.setParent(allNode);
			// platform.setParent(cc.director.getScene());

			// console.log("platform" + platform.position.x + " "+ platform.position.y);
		}, 0.1);
	}

	//人物移动
	mouseMove(event: cc.Event.EventTouch) {
		if (CanvasScript.stopMouseMove) {
			return;
		}
		//获取偏差
		const delta = event.getDelta();
		//更新位置，直接用speed加在player上
		let pos = new cc.Vec2(this.player.position.x + this.player.getComponent(PlayerScript).speed * delta.x, this.player.position.y);
		if (delta.x < 0) {
			this.player.scaleX = -2;
		} else {
			this.player.scaleX = 2;
		}
		this.player.setPosition(pos);
	}

	//所有元素移动
	allNodeMove(dt: number) {
		let deadZoneHeight = this.node.height*5 / 6;
		if (deadZoneHeight < this.player.y) {
			// let speed = (this.player.y - deadZoneHeight); // 移动的速度
			let speed = 100; // 移动的速度
			let deltaY = speed * dt; // 根据时间差计算Y轴移动的距离

			let parentPosition = this.all.position; // 更新父节点
			parentPosition.y -= deltaY;
			this.all.position = parentPosition;

			for (let i = 0; i < this.all.children.length; i++) {//所有子节点向下移动
				let childNode = this.all.children[i];
				if(childNode.name !="player"){
					let childPosition = childNode.position;
					childPosition.y -= deltaY;
					childNode.position = childPosition;
				}else{
					let childPosition = childNode.position;
					childPosition.y -= deltaY;
					childNode.position = childPosition;
				}
			}
		}
	}


}