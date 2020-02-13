import React from "react";
import "./index.scss";
import GameBoard from "../GameBoard"

// interface IState{
//     length:number;
//     breadth:number;
//     mines:number;
// }

class MineSweeperGame extends React.Component{
    state={
        length:8,
        breadth:8,
        mines: 10
    }
    render(){
        const {length,breadth,mines} = this.state;
        return(
            <div className="game-container"> 
                <button>Start</button>
                <GameBoard length={length} breadth={breadth} mines={mines}/>
            </div>
        )
    }
}

export default MineSweeperGame