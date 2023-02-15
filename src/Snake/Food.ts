class Food {
  // 定义一个属性表示食物对应的元素
  element: HTMLElement;
  maxArea: number;
  constructor(maxArea: number = 290) {
    // 获取页面中的food元素
    this.element = document.getElementById('food')!;
    this.maxArea = maxArea;
  }
  // 获取食物X轴坐标
  get X() {
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }

  // 改变食物的位置
  // 食物X轴最小为0，最大为290
  // 蛇移动一次为一格，一格是10，所以每次移动都是10的倍数
  change() {
    const number = Math.round((Math.random() * this.maxArea) / 10) * 10;
    this.element.style.left = `${number}px`;
    this.element.style.top = `${number}px`;
  }
}
export default Food;
