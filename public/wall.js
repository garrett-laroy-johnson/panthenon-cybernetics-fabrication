function initializeWall() {
  const w = {
    x: 0,
    y: height / 3,
    w: width,
    h: height / 3,

    isWithinBounds: function (x, y, r) {
      return (
        x - r >= this.x &&
        x + r <= this.x + this.w &&
        y - r >= this.y &&
        y + r <= this.y + this.h
      );
    },
  };

  return w;
}
