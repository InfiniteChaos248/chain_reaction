import React, { Component } from 'react';
import './App.css';
import { newPlayers, newBox, nextPlayerIndex } from './methods';

//TODO : Add animations; get number of players, size of grid, player colors, etc from user; Add online multiplayer opption

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            box: newBox(),
            player: 0,
            initial: newPlayers().length,
            msg: ""
        }
        this.players = newPlayers();
    }

    render() {

        let setElement = (x, y) => {
            let { box } = this.state;
            if ((x === 0 && y === 0) || (x === 0 && y === 9) || (x === 11 && y === 0) || (x === 11 && y === 9)) {
                //corner
                if (box[x][y].element === 1) {
                    box[x][y].element = ''
                    if (x === 0 && y === 0) {
                        setElement(x + 1, y)//down
                        setElement(x, y + 1)//right
                    } else if (x === 0 && y === 9) {
                        setElement(x, y - 1)//left
                        setElement(x + 1, y)//down
                    } else if (x === 11 && y === 0) {
                        setElement(x, y + 1)//right
                        setElement(x - 1, y)//up
                    } else if (x === 11 && y === 9) {
                        setElement(x - 1, y)//up
                        setElement(x, y - 1)//left
                    }
                } else {
                    box[x][y].element = 1
                }
            } else if (x === 0 || x === 11 || y === 0 || y === 9) {
                //edge
                if (box[x][y].element === 1) {
                    box[x][y].element = 2
                } else if (box[x][y].element === 2) {
                    box[x][y].element = ''
                    if (x === 0) {
                        //top edge
                        setElement(x, y - 1)//left
                        setElement(x + 1, y)//down
                        setElement(x, y + 1)//right
                    } else if (x === 11) {
                        //bottom edge
                        setElement(x - 1, y)//up
                        setElement(x, y - 1)//left
                        setElement(x, y + 1)//right
                    } else if (y === 0) {
                        //left edge
                        setElement(x - 1, y)//up
                        setElement(x + 1, y)//down
                        setElement(x, y + 1)//right
                    } else if (y === 9) {
                        //right edge
                        setElement(x - 1, y)//up
                        setElement(x + 1, y)//down
                        setElement(x, y - 1)//left
                    }
                } else {
                    box[x][y].element = 1
                }
            } else {
                //middle
                if (box[x][y].element === 1) {
                    box[x][y].element = 2
                } else if (box[x][y].element === 2) {
                    box[x][y].element = 3
                } else if (box[x][y].element === 3) {
                    box[x][y].element = ''
                    setElement(x + 1, y)
                    setElement(x - 1, y)
                    setElement(x, y + 1)
                    setElement(x, y - 1)
                } else {
                    box[x][y].element = 1
                }

            }
            let pl = this.state.player;
            box[x][y].col = this.players[pl]
            pl = nextPlayerIndex(this.players, box[x][y].col);
            this.setState({ box: box, player: pl })
        }

        let check = () => {

            let { box } = this.state;
            let temp = [];

            this.players.forEach(pl => {

                let present = false;
                box.forEach(x => {
                    x.forEach(y => {
                        if (y.col === pl) {
                            present = true;
                        }
                    })
                })

                if (present === true) {
                    temp.push(pl)
                } else if (this.state.initial > 0) {
                    let { initial } = this.state;
                    initial = initial - 1;
                    this.setState({ initial: initial })
                    temp.push(pl)
                }

            })
            this.players = temp;
            if (this.players.length === 1) {
                this.setState({ msg: this.players.pop() })
                return;
            }

        }

        return (
            <div>
                <div>{this.state.msg === "" ? this.players[this.state.player] + "'s turn" : ""}</div><br />
                {
                    this.state.box.map((x, index) => {
                        return (
                            <div key={index} className="board-row">
                                {
                                    x.map((y, index) => {
                                        return (
                                            <button key={index} style={{ color: y.col }}
                                                className="square"
                                                disabled={this.state.msg !== ""}
                                                onClick={() => {
                                                    if (y.col === this.players[this.state.player] || y.element === '') {
                                                        check();
                                                        setElement(y.x, y.y);
                                                        check();
                                                    }
                                                }} >
                                                {y.element}
                                            </button>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
                <br />
                <button onClick={() => {
                    this.setState({
                        box: newBox(),
                        player: 0,
                        initial: newPlayers().length,
                        msg: ""
                    })
                    this.players = newPlayers();
                }}>New Game</button>
                <br />
                <div>{this.state.msg !== '' ? this.state.msg + ' wins' : ""}</div>
            </div>
        );
    }
}


export default Game;