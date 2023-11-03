const cells = document.querySelectorAll(".cell");
const turn = document.querySelector(".turn");

function player(name) {
    let move;
    return { name, move };
}

const GameBord = (function () {
    let gameBord = ["", "", "", "", "", "", "", "", ""];
    const x = player("user");
    x.move="x"
    const y = player("bot");
    y.move="o"
    let currentPlayer="";
    const setPlayer= () => currentPlayer=x;
    const getPlayer = () => {
        if(currentPlayer===""){
            setPlayer();
            
        }
        return currentPlayer;
    };
    const changePlayer=(player)=>{
        if (player===""){
            setPlayer();
        }else if(player===x){
            currentPlayer=y;
        }else if(player===y){
            currentPlayer=x;
        }
        turn.innerText=`${currentPlayer.move}`
        return currentPlayer;
    };
    const changeCell=(player,cell)=>{
        if (player===x){
            gameBord[cell.id-1]=player.move
        }
        if (player===y){
            gameBord[cell.id-1]=player.move
        }
        updateCell(cell)
    }
    const updateCell=(cell)=>{
        if(gameBord[cell.id-1]==='x'){
            cell.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        }else if(gameBord[cell.id-1]==='o'){
            cell.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>'
        }
    }
    const winCheck = ()=>{
        if(
            (gameBord[0]==='x' && gameBord[1]==='x' && gameBord[2]==='x') || //row1
            (gameBord[3]==='x' && gameBord[4]==='x' && gameBord[5]==='x') || //row2
            (gameBord[6]==='x' && gameBord[7]==='x' && gameBord[8]==='x') || //row3
            (gameBord[0]==='x' && gameBord[4]==='x' && gameBord[8]==='x') || //dia1
            (gameBord[2]==='x' && gameBord[4]==='x' && gameBord[6]==='x') || //dia2
            (gameBord[0]==='x' && gameBord[3]==='x' && gameBord[6]==='x') || //col1
            (gameBord[1]==='x' && gameBord[4]==='x' && gameBord[7]==='x') || //col2
            (gameBord[2]==='x' && gameBord[5]==='x' && gameBord[8]==='x')    //col3
        ){
            gameOver(currentPlayer.move);

        }else if(
                (gameBord[0]==='o' && gameBord[1]==='o' && gameBord[2]==='o') || //row1
                (gameBord[3]==='o' && gameBord[4]==='o' && gameBord[5]==='o') || //row2
                (gameBord[6]==='o' && gameBord[7]==='o' && gameBord[8]==='o') || //row3
                (gameBord[0]==='o' && gameBord[4]==='o' && gameBord[8]==='o') || //dia1
                (gameBord[2]==='o' && gameBord[4]==='o' && gameBord[6]==='o') || //dia2
                (gameBord[0]==='o' && gameBord[3]==='o' && gameBord[6]==='o') || //col1
                (gameBord[1]==='o' && gameBord[4]==='o' && gameBord[7]==='o') || //col2
                (gameBord[2]==='o' && gameBord[5]==='o' && gameBord[8]==='o')    //col3
            )
        {
            gameOver(currentPlayer.move);
        }   
    }
    const gameOver=(who)=>{
        clearBoard();
        alert(`${who} wins`)
        window.location.reload(true);
    }
    const clearBoard=()=>{
        gameBord=["", "", "", "", "", "", "", "", ""];
        cells.forEach((cell)=>{
            GameBord.updateCell(cell);
        })
        
        console.log(gameBord);
    }
    return { gameBord,setPlayer,changePlayer,getPlayer,changeCell,updateCell,winCheck };
})();




const DisplayController = (function () {
    cells.forEach((cell) => {
        GameBord.updateCell(cell);
        cell.addEventListener("click", (event) => {
            if (cell.innerHTML===""){
                let currentPlayer=GameBord.getPlayer();
                GameBord.changeCell(currentPlayer,cell);
                GameBord.winCheck(cells);
                GameBord.changePlayer(currentPlayer);
            }else return;
            // console.log(event);
        });
    });
})();





// console.log(GameBord.getPlayer());
// GameBord.changePlayer("y");
// console.log(GameBord.getPlayer());