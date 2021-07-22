// Precisa analizar a estrutura do script!

let terreiro = document.getElementById('canvas'); // 900x600
let conteudo = terreiro.getContext('2d');
let pixel = 10;
let idChicken = 0
let seeds = []
let chickens = []
let player

let time = 200

setInterval(newSeed,time/100*800)

addEventListener("keydown",movePlayer)
setInterval(start,time);

function startPlayer(){
    player = newChicken()
}

function movePlayer(event){
    if(player && player.die === false){
        let x = 0
        let y = 0
        switch(event.keyCode){
            case 65:
                x =  -pixel
            break;
            case 87:
                y = -pixel
            break;
            case 68:
                x = pixel
            break;
            case 83:
                y = pixel
            break;
        }

        if(player.x < pixel && x < 0 || player.x > terreiro.width - pixel*2 && x > 0){x=0}
        if(player.y < pixel && y < 0 || player.y > terreiro.height - pixel*2 && y > 0){y=0}

        player.x += x
        player.y += y
        player.life += colidSeeds(player)
    }
}

function colidSeeds(chicken){
    for(seed of seeds){
        if(chicken.x === seed.x && chicken.y === seed.y){
            seeds[seed.id].x = -10
            seeds[seed.id].y = -10
            return 10
        }
    }
    return -1
}

function newChicken(x=random(0,(terreiro.width-pixel)/pixel)*pixel,y=random(0,(terreiro.height-pixel)/pixel)*pixel,size=pixel) {
    return{
        life: 50,
        die:false,
        x: x,
        y: y,
        size: size,
    }
}

function start(){
    conteudo.fillStyle = "rgb(50,160,50)"
    conteudo.fillRect(0,0,terreiro.width,terreiro.height)

    drawSeed();status()

    if(chickens[0]){
        let deathNote = []
        for(let i = 0;i < chickens.length;i++){
            
            if(chickens[i].life < 1){
                chickens[i].die = true
                deathNote.push(i)
            } 
            
            if(chickens[i].die === false){
                moveChicken(i)
                chickens[i].life += colidSeeds(chickens[i])
            }

            drawChicken(chickens[i])
        }

        for (let id = deathNote[0]; id < deathNote.length; id++) {
            chickens.splice(id,1)
        }

        
    }

    if(player){
        if(player.life < 1){
            player.die = true
        }
        drawChicken(player)
        statuschickens(player)
    }else if(chickens[idChicken]){statuschickens(chickens[idChicken])}
}

function newSeed(){
    let x = random(0,terreiro.width/pixel)*pixel
    let y = random(0,terreiro.height/pixel)*pixel
    seeds.push({x:x,y:y,id:seeds.length})
}

function drawSeed(){
    for(let i = 0;i < seeds.length;i++){

        conteudo.fillStyle = "rgb(50,255,50)"
        conteudo.fillRect(seeds[i].x,seeds[i].y,pixel/2,pixel/2) 
    }
    
}

function startChicken(n) {
    for(let i = 0;i < n; i++){
        chickens.push(newChicken()) 
    }
}

function drawChicken(chicken) {
    let x = chicken.x
    let y = chicken.y
    let die = chicken.die
    let size = chicken.size
    let cor;

    die === true? cor = "red": cor = "white";
    conteudo.fillStyle = cor
    conteudo.fillRect(x,y,size,size)
}

function moveChicken(id) {

    xy = direct()
    x = xy[0]
    y = xy[1]

    if(chickens[id].x < pixel && x < 0 || chickens[id].x > terreiro.width - pixel*2 && x > 0){x=0}
    if(chickens[id].y < pixel && y < 0 || chickens[id].y > terreiro.height - pixel*2 && y > 0){y=0}

    chickens[id].x += x
    chickens[id].y += y
}

function direct(){
    let direc = random(1,10000),x = 0,y = 0

    if(direc < 2500){y = -pixel}                    // Up
    if(direc > 2500 && direc < 5000){y = pixel}     // Down
    if(direc > 5000 && direc < 7500){x = -pixel}    // Left
    if(direc > 7500){x = pixel}                     // Rigth

    return [x,y]
}

function colid(){
    for(let i = 0;i < chickens.length;i++){
        //if()
    }
}

function statuschickens(chicken) {
    status()
    document.getElementById('status').innerHTML = `
    <p id='p1'> | Galinha ${idChicken} | </p>
    <p id='p2'> | Life: ${chicken.life} | </p>
    <p id='p2'> | Position: ${chicken.x} - ${chicken.y} | </p>
    <p id='p2'> | Tamanho: ${chicken.size} | </p>
    `
}

function status(){
    document.getElementById('tChickens').innerHTML = `
    <p id='p1'> | Total de galinhas: ${chickens.length} | </p>
    <p id='p1'> | Total de sementes: ${seeds.length} | </p>
    `
}



function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}














function colidChicken(){
    for(let i = 0;i < chickens.length;i++){
        for(let ii = 0;ii <chickens.length;ii++){
            if(i !== ii){
                if(chickens[i].x === chickens[ii].x && chickens[i].y === chickens[ii].y){
                    startChicken(chickens[i].x,chickens[i].y)
                    return console.log("Uma galinha")
                }
            }
        }

    }
}