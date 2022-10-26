class Game {
  constructor(map) {
    this.map = new Map(map);
  }
  init() {
    this.map.init();
    window.addEventListener("keypress", this.inputHandler);
    this.winLoop();
  }
  inputHandler = ({ key }) => {
    this.map.player.move(key);
  };
  winLoop = () => {
    let win = false;
    const resultArr = this.map.crates.map((crate) => {
      if (this.map.layout[crate.y][crate.x] === 3) {
        return true;
      } else {
        return false;
      }
    });
    if (resultArr.includes(false)) {
      requestAnimationFrame(this.winLoop);
    } else {
      console.log("win");
    }
  };
}
