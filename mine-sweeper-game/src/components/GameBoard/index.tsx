import React from "react";
import "./index.scss";

interface IProps{
    length:number;
    breadth:number;
    mines: number;
}

class GameBoard extends React.Component<IProps> {
    state = {
        boardData: this.initBoardData(this.props.length, this.props.breadth, this.props.mines),
        gameWon: false,
        mineCount: this.props.mines,
    };
    initBoardData (height:number, width:number, mines:number) {
        let data :any= [];

        for (let i = 0; i < height; i++) {
            data.push([]);
            for (let j = 0; j < width; j++) {
                data[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    neighbour: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false,
                };
            }
        }
    }
    render(){
        const {mineCount, gameWon,boardData} = this.state
        return(
            <div className="board">
            <div className="game-info">
                <span className="info">mines: {mineCount}</span><br />
                <span className="info">{gameWon ? "You Win" : ""}</span>
            </div>
            
        </div>
        )
    }
}
export default GameBoard