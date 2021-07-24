let gameStart = true, time = 200
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let pixel = 10
let cWidth = canvas.width
let cHeight = canvas.height
let chickens = []
let seeds = []
let timeSeeds = 0

window.onload = function startSimulation(){
    if(gameStart){drawCanvas()}
    setTimeout(startSimulation,time)
}

function randowChickens(n){
    for(let i = 0; i < n;i++){
        newChicken()
    }
}

function drawCanvas(){
    draw(0,0,cWidth,cHeight,"rgb(50,200,50)")

    for(let id in chickens){
        let chicken = chickens[id]

        draw(chicken.x,chicken.y,chicken.dna.size,chicken.dna.size,"white")
        actionChicken(id)
    }

    for(let seed of seeds){
        draw(seed.x,seed.y,seed.size,seed.size,"green")
    }

    if(timeSeeds === 0){newSeed();timeSeeds = time/10}else{timeSeeds -= 1}
}

function draw(x,y,w,h,cor){
    ctx.fillStyle = cor
    ctx.fillRect(x,y,w,h)
}

function newSeed(x,y) {
    seeds.push({
        size: pixel/2,
        x: x + ((pixel-pixel/2)/2) || random(0,cWidth-pixel) + ((pixel-pixel/2)/2), // SIMPLIFICAR
        y: y + ((pixel-pixel/2)/2) || random(0,cHeight-pixel) + ((pixel-pixel/2)/2)  
    })
}

function newChicken(x,y,size,dna) {
    chickens.push({
        x: x || random(0,cWidth-pixel),
        y: y || random(0,cHeight-pixel),
        dna: dna || {
            life: 50,
            size: size || 10
        }
    })
}

function iaChicken(){
    let x = random(-1,1)
    let y = random(-1,1)

    if(x<0){x= -10}else if(x>0){x=10}else{x=0}
    if(y<0){y= -10}else if(y>0){y=10}else{y=0}
    return {x,y}
}

function actionChicken(id){
    let x = iaChicken().x ; y = iaChicken().y

    if(chickens[id].x < pixel && x < 0 || chickens[id].x > cWidth - pixel*2 && x > 0){x=0}
    if(chickens[id].y < pixel && y < 0 || chickens[id].y > cHeight - pixel*2 && y > 0){y=0}

    moveChicken(id,x,y)
}

function moveChicken(id,x,y){ chickens[id].x += x ; chickens[id].y += y }









// Precisa analizar a estrutura do script!

// let idChicken = 0
// 
// let chickens = []
// let player

// let time = 200

//setInterval(newSeed,time/100*800)

//addEventListener("keydown",movePlayer)
//setInterval(start,time);

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

// function moveChicken(id) {

//     xy = direct()
//     x = xy[0]
//     y = xy[1]

//     if(chickens[id].x < pixel && x < 0 || chickens[id].x > terreiro.width - pixel*2 && x > 0){x=0}
//     if(chickens[id].y < pixel && y < 0 || chickens[id].y > terreiro.height - pixel*2 && y > 0){y=0}

//     chickens[id].x += x
//     chickens[id].y += y
// }

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