// 引入其他类
import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';
// 游戏控制器
class GameControl {
  // 定义三个属性
  // 蛇
  snake: Snake;
  // 食物
  food: Food;
  // 计分牌
  scorePanel: ScorePanel;

  // 创建一个属性来存储蛇移动的方向
  direction: string = '';

  // 创建属性来记录游戏结束
  isLive: boolean = true;
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10,2);
  }

  init() {
    // 绑定键盘按下的时间
    document.addEventListener('keydown', e => this.keyDownHandler(e));
    this.run();
  }

  // 键盘按下的响应函数
  keyDownHandler(e: KeyboardEvent) {
    interface LegalKeyType {
      [index: string]: string;
    }
    const legalKey: LegalKeyType = {
      ArrowUp: 'up',
      w: 'up',
      ArrowDown: 'down',
      s: 'down',
      ArrowLeft: 'left',
      a: 'left',
      ArrowRight: 'right',
      d: 'right',
    };
    // 修改蛇的移动方向
    this.direction = legalKey[e.key] || '';
  }

  // 蛇移动方法
  run() {
    // 根据this.direction使蛇的位置发生改变

    //获取蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case 'up':
        Y -= 10;
        break;
      case 'down':
        Y += 10;
        break;
      case 'left':
        X -= 10;
        break;
      case 'right':
        X += 10;
        break;
    }

    // 检查蛇是否吃到了食物
    if (this.checkEat(X, Y)) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      alert(e.message + 'GAME OVER');
      // 游戏结束
      this.isLive = false;
    }

    // 开始定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  // 定义方法检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    let foodX = this.food.X;
    let foodY = this.food.Y;
    if (X === foodX && Y === foodY) {
      return true;
    }
  }
}

export default GameControl;
