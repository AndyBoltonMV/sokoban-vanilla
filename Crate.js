class Crate {
  constructor(x, y, currentMap) {
    this.x = x;
    this.y = y;
    this.element = new Image();
    this.element.src = "./assets/crate.png";
    this.currentMap = currentMap;
    this.movement = {
      w: [-1, 0],
      a: [0, -1],
      s: [1, 0],
      d: [0, 1],
    };
  }
  draw() {
    this.element.remove();
    this.element.style.gridColumn = `${this.x + 1}`;
    this.element.style.gridRow = `${this.y + 1}`;
    document.querySelector("section").appendChild(this.element);
  }
  move(direction) {
    if (
      this.currentMap.collisionCheck(
        this.movement[direction],
        this.x,
        this.y,
        direction,
        true
      )
    ) {
      this.x += this.movement[direction][1];
      this.y += this.movement[direction][0];
      this.draw();
      return true;
    } else {
      return false;
    }
  }
}
