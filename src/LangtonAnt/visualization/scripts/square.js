class SquareDrawer {
    constructor(size, countLevels) {
        this.countLevels = countLevels;
        this.size = size;
    }

    drawShape(x, y, level) {
        const color = getColor(level, this.countLevels);
        fill(color);
        this.setShapeDrawingMode();
        rect(x * this.size, y * this.size, this.size, this.size);
    }

    drawPrevShape(x, y, level){
        this.setShapeDrawingMode();
        this.drawShape(x, y, level);
    }

    drawCurrShape(x, y, dir, level){
        this.setShapeDrawingMode();
        this.drawShape(x, y, level);
        this.drawAnt(x, y, dir);
    }

    setShapeDrawingMode() {
        strokeWeight(0.01 * this.size);
        stroke(100);
    }

    drawAnt(x, y, dir) {
        strokeWeight(0);
        fill(ANT_COLOR);

        translate((x + 0.5) * this.size, (y + 0.5) * this.size);
        rotate(directionToAngleSquare(dir));

        let x1 = 0;
        let y1 = -0.3 * this.size;
        let x2 = this.size / 4;
        let y2 = this.size / 3;
        let x3 = -this.size / 4;
        let y3 = this.size / 3;

        triangle(x1, y1, x2, y2, x3, y3);
        resetMatrix();
    }
}

class SquareWalker {
    moveAnt(grid, x, y, step) {
        grid[x][y] = step.state;
        let newX = x, newY = y;

        switch(step.direction){
            case Directions.Right:
                newX = x + 1
                break;
            case Directions.Down:
                newY = y + 1
                break;
            case Directions.Left:
                newX = x - 1
                break;
            case Directions.Up:
                newY = y - 1
                break;
        }

        return [newX, newY, step.direction]
    }
}