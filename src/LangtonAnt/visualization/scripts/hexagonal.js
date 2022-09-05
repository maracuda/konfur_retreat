class HexDrawer {
    constructor(size, countLevels){
        this.countLevels = countLevels;
        this.size = size;
    }

    drawShape(x, y, level) {
        const color = getColor(level, this.countLevels);
        fill(color);
        this.setShapeDrawingMode();
        
        let coords = this.getScreenPoint(x, y);
        this.polygon(coords[0], coords[1], this.size * 0.5, 6);
    }

    drawPrevShape(x, y, level) {
        this.setShapeDrawingMode();
        this.drawShape(x, y, level);
    }

    drawCurrShape(x, y, dir, level) {
        this.setShapeDrawingMode();
        this.drawShape(x, y, level);
        this.drawAnt(x, y, dir);
    }

    setShapeDrawingMode() {
        strokeWeight(0.01 * this.size);
        stroke(100);
    }

    polygon(x, y, radius, npoints) {
        let angle = TWO_PI / npoints;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius;
            let sy = y + sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    drawAnt(x, y, dir) {
        strokeWeight(0);
        fill(ANT_COLOR);

        const coords = this.getScreenPoint(x, y);

        translate(coords[0], coords[1]);
        rotate(directionToAngleHex(dir));

        const x1 = 0;
        const y1 = -0.3 * this.size;
        const x2 = this.size / 4;
        const y2 = this.size / 5;
        const x3 = -this.size / 4;
        const y3 = this.size / 5;

        triangle(x1, y1, x2, y2, x3, y3);
        resetMatrix();
    }

    getScreenPoint(x, y) {
        let newX = y % 2 === 0 ? x + 0.4 : x + 0.9;
        newX *= this.size * 1.6;

        let newY = y + 1.5;
        newY *= (this.size * 0.45);

        return [newX, newY];
    }
}

class HexWalker {
    moveAnt(grid, x, y, step) {
        grid[x][y] = step.state;
        let newX = x, newY = y;

        switch(step.direction) {
            case Directions.Down:
                newY = y + 2;
                break;
            case Directions.Up:
                newY = y - 2;
                break;
            case Directions.UpRight:
                newY = y - 1;
                if (y % 2 === 1) {
                    newX = x + 1;
                }
                break;
            case Directions.DownLeft:
                newY = y + 1;
                if (y % 2 === 0) {
                    newX = x - 1;
                }
                break;
            
            case Directions.DownRight:
                newY = y + 1;
                if (y % 2 === 1) {
                    newX = x + 1;
                }
                break;               
            case Directions.UpLeft:
                newY = y - 1;
                if (y % 2 === 0) {
                    newX = x - 1;
                }
                break;
        }

        return [newX, newY, step.direction];
    }
}