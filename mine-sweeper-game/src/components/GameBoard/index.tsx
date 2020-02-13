import React from "react";
import "./index.scss";

interface IProps{
    length:number;
    breadth:number;
    mines: number;
}

class GameBoard extends React.Component<IProps> {
    render(){
        return(
            <div></div>
        )
    }
}
export default GameBoard