import React from "react";
import "./index.scss";
import FieldCell from "../FieldCell"

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
                    isEmpty: false
                };
            }
        }
        data = this.mineDigging(data, height, width, mines);
        data = this.adjacentCells(data, height, width);
        console.log(data);
        return data;
    }
    
    returnMines(data:any) {
        let mineArray:any= [];

        data.map((datarow:any) => {
            datarow.map((dataitem:any) => {
                if (dataitem.isMine) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }


   
    hiddenFields(data:any) {
        let mineArray:any = [];

        data.map((datarow:any) => {
            datarow.map((dataitem:any) => {
                if (!dataitem.isRevealed) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    
    generateRandomNum(dimension:any) {
        return Math.floor((Math.random() * 1000) + 1) % dimension;
    }

    mineDigging(data:any, height:any, width:any, mines:any) {
        let randomx, randomy, minesPlanted = 0;

        while (minesPlanted < mines) {
            randomx = this.generateRandomNum(width);
            randomy = this.generateRandomNum(height);
            if (!(data[randomx][randomy].isMine)) {
                data[randomx][randomy].isMine = true;
                minesPlanted++;
            }
        }

        return (data);
    }

  
    adjacentCells(data:any, height:any, width:any) {
        let updatedData = data, index = 0;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (data[i][j].isMine !== true) {
                    let mine = 0;
                    const area = this.boardRange(data[i][j].x, data[i][j].y, data);
                    area.map(value => {
                        if (value.isMine) {
                            mine++;
                        }
                    });
                    if (mine === 0) {
                        updatedData[i][j].isEmpty = true;
                    }
                    updatedData[i][j].neighbour = mine;
                }
            }
        }

        return (updatedData);
    };

   
    boardRange(x:any, y:any, data:any) {
        const el = [];

    
        if (x > 0) {
            el.push(data[x - 1][y]);
        }

       
        if (x < this.props.length - 1) {
            el.push(data[x + 1][y]);
        }

       
        if (y > 0) {
            el.push(data[x][y - 1]);
        }

       
        if (y < this.props.breadth - 1) {
            el.push(data[x][y + 1]);
        }

        
        if (x > 0 && y > 0) {
            el.push(data[x - 1][y - 1]);
        }

       
        if (x > 0 && y < this.props.length - 1) {
            el.push(data[x - 1][y + 1]);
        }

        
        if (x < this.props.length - 1 && y < this.props.breadth - 1) {
            el.push(data[x + 1][y + 1]);
        }

   
        if (x < this.props.length - 1 && y > 0) {
            el.push(data[x + 1][y - 1]);
        }

        return el;
    }

   
    boardDisplay() {
        let updatedData = this.state.boardData;
        updatedData.map((datarow:any) => {
            datarow.map((dataitem:any) => {
                dataitem.isRevealed = true;
            });
        });
        this.setState({
            boardData: updatedData
        })
    }

  
    showEmptyCells(x:any, y:any, data:any) {
        let area = this.boardRange(x, y, data);
        area.map(value => {
            if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
                data[value.x][value.y].isRevealed = true;
                if (value.isEmpty) {
                    this.showEmptyCells(value.x, value.y, data);
                }
            }
        });
        return data;

    }

   

    onClickCell(x:any, y:any) {
        let win = false;

       
        if (this.state.boardData[x][y].isRevealed) return null;

        
        if (this.state.boardData[x][y].isMine) {
            this.boardDisplay();
            alert("game over");
        }

        let updatedData = this.state.boardData;
        updatedData[x][y].isFlagged = false;
        updatedData[x][y].isRevealed = true;

        if (updatedData[x][y].isEmpty) {
            updatedData = this.showEmptyCells(x, y, updatedData);
        }

        if (this.hiddenFields(updatedData).length === this.props.mines) {
            win = true;
            this.boardDisplay();
            alert("You Win");
        }

        this.setState({
            boardData: updatedData,
            mineCount: this.props.mines ,
            gameWon: win,
        });
        
    }

    contextMenuHandler(e:any, x:any, y:any) {
        e.preventDefault();
        let updatedData = this.state.boardData;
        let mines = this.state.mineCount;
        let win = false;

        if (updatedData[x][y].isRevealed) return;

        if (updatedData[x][y].isFlagged) {
            updatedData[x][y].isFlagged = false;
            mines++;
        } else {
            updatedData[x][y].isFlagged = true;
            mines--;
        }


        this.setState({
            boardData: updatedData,
            mineCount: mines,
            gameWon: win,
        });
    }
    displayBoard(data:any) {
        return data.map((datarow:any) => {
            return datarow.map((dataitem:any) => {
                return (
                    <div key={dataitem.x * datarow.length + dataitem.y}>
                        <FieldCell
                            onClick={() => this.onClickCell(dataitem.x, dataitem.y)}
                            cMenu={(e:any) => this.contextMenuHandler(e, dataitem.x, dataitem.y)}
                            value={dataitem}
                        />
                        {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
                    </div>);
            })
        });

    }
  
componentWillReceiveProps(nextProps:any) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
        this.setState({
            boardData: this.initBoardData(nextProps.height, nextProps.width, nextProps.mines),
            gameWon: false,
            mineCount: nextProps.mines,
        });
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
            {
                    this.displayBoard(this.state.boardData)
                }
        </div>
        )
    }
}
export default GameBoard