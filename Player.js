class Player {
  constructor(x, y, currentMap) {
    this.x = x;
    this.y = y;
    this.element = new Image();
    this.element.src = "./assets/player.png";
    this.element.alt = "player sprite image";
    this.currentMap = currentMap;
    this.movement = {
      w: [-1, 0],
      a: [0, -1],
      s: [1, 0],
      d: [0, 1],
    };
    this.rotate = {
      w: 270,
      a: 180,
      s: 90,
      d: 0,
    };
  }

  draw(rotate) {
    this.element.remove();
    this.element.style.gridColumn = `${this.x + 1}`;
    this.element.style.gridRow = `${this.y + 1}`;
    this.element.style.transform = `rotate(${rotate}deg)`;
    document.querySelector("section").appendChild(this.element);
  }

  move(direction) {
    if (
      this.currentMap.collisionCheck(
        this.movement[direction],
        this.x,
        this.y,
        direction
      )
    ) {
      this.x += this.movement[direction][1];
      this.y += this.movement[direction][0];
    }
    this.draw(this.rotate[direction]);
  }
}
