export let newPlayers = () => {
    return ['blue', 'green', 'red', 'yellow', 'orange', 'pink'];
}

export let nextPlayerIndex = (list, current) => {
    let ci = list.indexOf(current);
    if (ci === -1 || list.length === 0) {
        return -1;
    } else if (ci === list.length - 1) {
        return 0;
    } else {
        return ci + 1;
    }
}

export let newBox = () => {
    let defBox = [];
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(
        x => {
            let row = [];
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(
                y => {
                    let cell = {};
                    cell.x = x;
                    cell.y = y;
                    cell.element = '';
                    row.push(cell);
                }
            )
            defBox.push(row);
        }
    )
    return defBox;
}