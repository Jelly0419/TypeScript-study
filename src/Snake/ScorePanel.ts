class ScorePanel {
  score = 0; // 记录分数
  level = 1; // 记录等级
  ScoreEle: HTMLElement; // 分数元素
  LevelEle: HTMLElement; // 等级元素

  // 设置变量限制等级
  maxLevel: number;
  upScore: number;
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.ScoreEle = document.getElementById('score')!;
    this.LevelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }
  // 设置加分函数
  addScore() {
    this.ScoreEle.innerHTML = ++this.score + '';
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // 等级提升
  levelUp() {
    if (this.level < this.maxLevel) {
      this.LevelEle.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel;
