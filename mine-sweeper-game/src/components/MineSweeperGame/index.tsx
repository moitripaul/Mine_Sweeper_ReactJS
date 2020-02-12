import React from "react";
import "./index.scss"

class MineSweeperGame extends React.Component {
    state ={
        length:10,
        breadth:10,
        mines: 12
    }
    render(){
        return(
            <div className="game-container"> 
            </div>
        )
    }
}