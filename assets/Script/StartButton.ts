const {ccclass, property} = cc._decorator;

@ccclass
export default class StartButton extends cc.Component {
	onClickButton(){
		cc.director.loadScene("GameScene");
	}
}
