class Map {
  constructor({ layout, crates, playerPosition }) {
    this.layout = layout;
    this.cratePositions = crates;
    this.crates = [];
    this.playerPosition = playerPosition;
    this.player = null;
    this.assets = ["empty", "wall", "floor", "dot"];
  }
  init() {
    this.layout.map((row, y) => {
      row.map((asset, x) => {
        this.draw(asset, x, y);
      });
      document.querySelector(
        "section"
      ).style.gridTemplateColumns = `repeat(${row.length}, 3vw)`;
    });
    this.crates = this.cratePositions.map((coords) => {
      const crate = new Crate(coords[1], coords[0], this);
      crate.draw();
      return crate;
    });
    this.player = new Player(
      this.playerPosition[1],
      this.playerPosition[0],
      this
    );
    this.player.draw();
  }
  draw(asset, x, y) {
    const tile = new Image();
    tile.src = `./assets/${this.assets[asset]}.png`;
    tile.alt = `${this.assets[asset]} tile in position ${y}${x}`;
    tile.style.gridRow = y + 1;
    tile.style.gridColumn = x + 1;
    document.querySelector("section").appendChild(tile);
  }
  collisionCheck(directions, x, y, direction, isCrate) {
    if (this.layout[y + directions[0]][x + directions[1]] === 1) return false;
    for (let crate of this.crates) {
      if (
        crate.x === x + directions[1] &&
        crate.y === y + directions[0] &&
        !isCrate
      ) {
        return crate.move(direction);
      } else if (
        crate.x === x + directions[1] &&
        crate.y === y + directions[0] &&
        isCrate
      ) {
        return false;
      }
    }
    return true;
  }
}
