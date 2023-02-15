class Snake {
  element: HTMLElement;
  head: HTMLElement;
  bodies: HTMLCollection;
  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake>div')!;
    this.bodies = document.getElementById('snake')?.getElementsByTagName('div')!;
  }

  // 获取蛇头的坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇的坐标
  set X(val: number) {
    if (this.X === val) {
      return;
    }
    // X值的合法范围 0-290之间
    if (val < 0 || val > 290) {
      // 抛出异常
      throw new Error('蛇撞墙了!');
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
      console.log('掉头了');

      // 如果发生掉头，蛇应该向反方向继续移动
      if (val > this.X) {
        // 如果新值大于旧值，则蛇向右走，此时发生掉头，蛇应该继续向左走
        val = this.X - 10;
      } else {
        val = this.X + 10;
      }
    }

    this.moveBody();
    this.head.style.left = val + 'px';
    this.checkHeadBody()
  }
  set Y(val: number) {
    if (this.Y === val) {
      return;
    }
    // Y的合法范围0-290之间
    if (val < 0 || val > 290) {
      throw new Error('蛇撞墙了');
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
      if (val > this.Y) {
        // 如果新值大于旧值，则蛇向右走，此时发生掉头，蛇应该继续向左走
        val = this.Y - 10;
      } else {
        val = this.Y + 10;
      }
    }

    this.moveBody();
    this.head.style.top = val + 'px';
    this.checkHeadBody()
  }

  // 蛇增加身体的方法
  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>');
  }
  // 蛇身体移动的方法
  moveBody() {
    /**
     * 将后面蛇的身体往前移
     * 举例子：第四节身体等于第三节，第三节等于第二节，第二节等于蛇头的位置，蛇头往前移动一格
     */
    // 遍历获取所有位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 前边身体位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }
  // 检查蛇头是否撞到身体
  checkHeadBody() {
    // 获取所有身体，检查是否和蛇头坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 进入判断则游戏结束
        throw new Error('蛇撞到自己了！')
      }
    }
  }
}

export default Snake;
