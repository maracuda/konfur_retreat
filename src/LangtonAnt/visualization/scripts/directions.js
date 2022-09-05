const Directions = {
    Up: "U",
    Down: "D",
    Right: "R",
    Left: "L",
    UpLeft: "UL",
    UpRight: "UR",
    DownLeft: "DL",
    DownRight: "DR"
};

function directionToAngleSquare(direction) {
    let dirNumber = 0;
    switch (direction) {
        case Directions.Up:
            dirNumber = 3;
            break;
        case Directions.Down:
            dirNumber = 1;
            break;
        case Directions.Left:
            dirNumber = 2;
            break;
        case Directions.Right:
            dirNumber = 0;
            break;        
    }
    return  (0.5 * dirNumber + 0.5) * PI;
}

function directionToAngleHex(direction) {
    let dirNumber = 0;
    switch (direction) {
        case Directions.Up:
            dirNumber = 5;
            break;
        case Directions.Down:
            dirNumber = 2;
            break;
        case Directions.UpLeft:
            dirNumber = 4;
            break;
        case Directions.UpRight:
            dirNumber = 0;
            break; 
        case Directions.DownLeft:
            dirNumber = 3;
            break;
        case Directions.DownRight:
            dirNumber = 1;
            break;       
    }
    
    return (dirNumber * (1/3) + (1/3)) * PI;
}