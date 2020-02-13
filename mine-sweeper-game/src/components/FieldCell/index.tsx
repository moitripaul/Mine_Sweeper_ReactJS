import React from "react";
import "./index.scss";
import { render } from "@testing-library/react";

interface IProps{
    value: any;
    onClick: any;
    cMenu: any;
}


class FieldCell extends React.Component <IProps>{
    getValue(){
        if (!this.props.value.isRevealed){
            return  null;
        }
        if (this.props.value.isMine) {
            return "💣";
        }
        if(this.props.value.neighbour === 0 ){
            return null;
        }
        return this.props.value.neighbour;
    }
    


    render(){
        let className = "cell" + (this.props.value.isRevealed ? "" : " hidden") + (this.props.value.isMine ? " is-mine" : "");
    return (
        <div ref="cell" onClick={this.props.onClick} className={className} onContextMenu={this.props.cMenu}>
            {this.getValue()}
        </div>
    )
    }
    
}
export default FieldCell