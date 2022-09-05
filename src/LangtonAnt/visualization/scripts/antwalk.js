const HEX = "hex";
const SQUARE = "square";

class Antwalk {
    actionsPerDraw = 1;
    counter = 0;
    paused = true
    counterElement;
    enlargeCounter = 0
    drawer;
    walker;
    steps;

    constructor(grid, width, height, type, steps, init) {
        this.grid = init?.map || [];
        this.gridX = init?.map.length || grid;
        this.type = type;
        this.steps = steps;
       
        this.countLevels = new Set(steps.map(x => x.state)).size;

        if (this.type === HEX) {
            this.gridY = Math.round(3 * grid * height / 700);
            this.size = width / grid * 0.6;
            this.drawer = new HexDrawer(this.size, this.countLevels);
            this.walker = new HexWalker();
        } else if (this.type === SQUARE) {
            this.gridY = this.gridX;
            this.size = width / this.gridX;
            this.drawer = new SquareDrawer(this.size, this.countLevels);
            this.walker = new SquareWalker();
        }
        if (!init) {
            for (let x = 0; x < this.gridX; x++){
                let column = [];
                for(let y = 0; y < this.gridY; y++) {
                    column.push(0);
                }
                this.grid.push(column);
            }
        }

        this.x = init?.ant.x || Math.round(this.gridX / 2);
        this.y = init?.ant.y || Math.round(this.gridY / 2);
        this.prevX = this.x;
        this.prevY = this.y;
        this.dir = Directions.Up;

        if (this.counterElement == null) {
            this.counterElement = document.getElementById("counter");
        }

        this.drawGrid(this.grid, this.x, this.y, this.dir);
    }

    redraw(grid, antX, antY, dir) {
        clear();
        this.drawGrid(grid, antX, antY, dir);
    }

    drawGrid(grid, antX, antY, dir) {
        this.drawer.setShapeDrawingMode();
        for(let x = 0; x < grid.length; x++) {
            for(let y = 0; y < grid[0].length; y++) {
                this.drawer.drawShape(x, y, grid[x][y]);
            }
        }
        this.drawer.drawAnt(antX, antY, dir);
    }

    draw(){
        if (this.needsRedraw) {
            this.redraw(this.grid, this.x, this.y, this.dir);
            this.needsRedraw = false;
        }
        if (!this.paused) {
            for(let i = 0; i < this.actionsPerDraw; i++) {
                this.move();
            }
        }
    }

    move() {
        if (this.steps.length <= this.counter) {
            return;
        }
        this.moveAnt();
        if(!this.needsRedraw){
            this.drawer.drawPrevShape(this.prevX, this.prevY, this.grid[this.prevX][this.prevY]);
            this.drawer.drawCurrShape(this.x, this.y, this.dir, this.grid[this.x][this.y]);
        }
        this.counter += 1;
        this.counterElement.textContent = "Counter: " + this.counter;
    }

    moveAnt(){
        let result = this.walker.moveAnt(this.grid, this.x, this.y, this.steps[this.counter]);

        this.prevX = this.x;
        this.prevY = this.y;
        this.x = result[0];
        this.y = result[1];
        this.dir = result[2];

        if (!this.isInBounds(this.x, this.y)) {
            if (this.enlargeCounter < 5) {
                console.log("Enlarge on counter " + this.counter + " with x=" + this.x + ",y=" + this.y)
                this.needsRedraw = true;
                this.enlargeGrid();
            } else {
                this.paused = true;
            }
        }
    }

    enlargeGrid() {
        this.enlargeCounter++;
        const newGridX = this.gridX * 2;
        const newGridY = this.gridY * 2;

        const newGrid = [];
        for (let x = 0; x < newGridX; x++) {
            const column = [];
            for (let y = 0; y < newGridY; y++) {
                column.push(0);
            }
            newGrid.push(column);
        }

        const offsetX = Math.round(newGridX / 4);
        const offsetY = this.type === HEX
                        ? offsetX * 2
                        : offsetX;

        for(let x = 0; x < this.gridX; x++) {
            for(let y = 0; y < this.gridY; y++) {
                newGrid[x + offsetX][y + offsetY] = this.grid[x][y];
            }
        }

        this.gridX = newGridX;
        this.gridY = newGridY;
        this.size = 0.5 * this.size;
        this.drawer.size = this.size;
        this.grid = newGrid;

        this.x += offsetX;
        this.y += offsetY;
    }

    isInBounds(x, y) {
        return x >= 0 && x < this.gridX && y >= 0 && y < this.gridY;
    }
}