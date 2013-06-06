var Piece = function(){
    arguments.callee.prototype.toString() = function(){
        switch(this){
            case Piece.BLACK:
                return "黒";
            case Piece.WHITE:
                return "白";
        }
        return "";
    };
    
    arguments.callee.prototype.getOpposite = function(){
        switch(this){
            case Piece.BLACK:
                return Piece.WHITE;
            case Piece.WHITE:
                return Piece.BLACK;
        }
    };
};

Piece = {
    BLACK: new Piece(),
    WHITE: new Piece(),
    EMPTY: new Piece()
};

var Board = function(){
    var cells = new Array(8);
    for(var x = 0; x < cells.length; x ++){
        cells[x] = new Array(8);
        for(var y = 0; y<cells[x].length; y++){
            cells[x][y] = Piece.EMPTY;
        }
    }
    
    this.setPiece = function(piece, x, y){
        if(!piece || !(0<=x) || !(x <= 7) || !(0 <= y) || !(y <= 7)){
            return false;
        }
        cells[x][y] = piece;
        return true;
    };
    
    this.getPiece = function(x, y){
        if(!(0 <= x) || !(x <= 7) || !(0 <= y) || !(y <= 7))
            return ;
        return cells[x][y];
    };
}

var init = function(){
    var board = new Board();
    board.setPiece(Piece.WHITE, 3, 3);
    board.setPiece(Piece.WHITE, 4, 4);
    board.setPiece(Piece.BLACK, 3, 4);
    board.setPiece(Piece.BLACK, 4, 3);
    View.setBoard(board);
    View.paint();
};

var View = {
    setBoard : function(board){
        this._board = board;
    },
    
    paint : function(){
        if(!this._board) throw new Error("board is null or undefined. Call setBoard() method before paint.");
        var board_element = document.getElementById("board");
        board_element.innerHTML = "";
        for(var y = 0; y < 8; y++){
            for(var x = 0; x < 8; x++){
                var element;
                switch(this._board.getPiece(x, y)){
                    case Piece.BLACK:
                        element = document.getElementById("black").cloneNode(true);
                        break;
                    case Piece.WHITE:
                        element = document.getElementById("white").cloneNode(true);
                        break;
                    case Piece.EMPTY:
                        element = document.getElementById("empty").cloneNode(true);
                        break;
                }
                if(element){
                    element.style.left = 32 * x + "px";
                    element.style.top = 32 * y + "px";
                    var id = "cell" + (x+1 + y * 8);
                    element.id = id;
                    board_element.appendChild(element);
                }
            }
        }
    }
};

