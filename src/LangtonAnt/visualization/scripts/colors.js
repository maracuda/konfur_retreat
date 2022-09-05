function getColor(i, count) {
    const colors = [
        color(0, 0, 0),
        color(255, 0, 0),
        color(255, 128, 0),
        color(255, 255, 0),
        color(128, 255, 0),
        color(0, 255, 0),
        color(0, 255, 80),
        color(0, 255, 255),
        color(0, 128, 255),
        color(0, 0, 255),
        color(128, 0, 255),
        color(255, 0, 255),
        color(255, 0, 128)
    ]

    return count > 13
        ? lerpColor(color(20,20,20), color(255,40,40), i / count)
        : colors[i];
}

const ANT_COLOR = 'white';