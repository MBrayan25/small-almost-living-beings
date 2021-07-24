let gameStart = false, time = 200
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let pixel = 10
let cWidth = canvas.width
let cHeight = canvas.height
let chickens = []
let deathChickens = []
let seeds = []
let timeSeeds = 0
let player = undefined
let timeGame = 0
let newGeration = 0
let BL = []

function padrao(x,y,dna){
    return{
        kill: false,
        x: x || random(0,cWidth/10)*pixel - pixel,
        y: y || random(0,cHeight/10)*pixel - pixel,
        time: 0,
        dna: dna || {
            visao:4,
            timeMax: 120,
            timeMin: 35,
            life: 20,
            size: 10
        }
    }
}

for(let i = 0;i<100;i++){
   newSeed()
}

function status(){ document.getElementById('tChickens').innerHTML = `
    <p> | Tempo de jogo: ${parseInt(timeGame)} | </p>
    <p> | Total de galinhas: ${chickens.length} | </p>
    <p> | Total de sementes: ${seeds.length} | </p>
    <p> | Nova geração: ${newGeration} | </p>`
}

function statuschickens(chicken) { document.getElementById('status').innerHTML = `
    <p id='p2'> | Life: ${parseInt(chicken.dna.life)} | </p>
    <p id='p2'> | Time: ${parseInt(chicken.time)} | </p>
    <p id='p2'> | Position: ${chicken.x} - ${chicken.y} | </p>
    <p id='p2'> | Tamanho: ${chicken.dna.size} | </p>`
}

function pauseStart(){
    let test = document.getElementById("start-pause").value
    if(test === "Pause"){test = "Start"}else{test = "Pause"}
    document.getElementById("start-pause").value = test
    gameStart = !gameStart
}

function startPlayer() { player = padrao() }

window.onload = function startSimulation(){
    if(gameStart === true){drawCanvas();addEventListener("keydown",movePlayer)}
    setTimeout(startSimulation,time)
}

function randowChickens(n){
    for(let i = 0; i < n;i++){
        newChicken()
    }
}

function drawCanvas(){ timeGame += 1/10

    draw(0,0,cWidth,cHeight,"rgb(50,200,50)")

    for(i in BL){
        draw(BL[i].x,BL[i].y,10,10,"crimson")
    }
    
    if(player !== undefined){
        statuschickens(player)
        draw(player.x,player.y,player.dna.size,player.dna.size,"blue")
        player.dna.life += colidSeeds(player)
        player.time += 1/10
        if(player.dna.life < 1){statuschickens(player);player = undefined}
    }else{
        if(chickens[0]){statuschickens(chickens[0])}
        
    }

    for(let id in chickens){

        if(chickens[id].kill === true || chickens[id].time > chickens[id].dna.timeMax){
            chickens[id].dna.life = 0
            deathChickens.push(chickens[id])
        }else{

            if(chickens[id].time < chickens[id].dna.timeMin){chickens[id].cor = "white"}
            else{chickens[id].cor = "gray"}

            draw(chickens[id].x,chickens[id].y,chickens[id].dna.size,chickens[id].dna.size,chickens[id].cor)
            actionChicken(id)
            colid(id)
            if(chickens[id].dna.life < 1){ chickens[id].kill = true }
        }
        chickens[id].dna.life += colidSeeds(chickens[id])
        chickens[id].time += 1/10
    }

    for(let kill of deathChickens){
        let id = chickens.indexOf(kill)
        if(id >= 0){ chickens.splice(id,1) }
    }

    for(let id in deathChickens){
        if(deathChickens[id].dna.life <= -2){deathChickens.splice(id,1)}else{
            draw(deathChickens[id].x,deathChickens[id].y,deathChickens[id].dna.size,deathChickens[id].dna.size,"red")
            deathChickens[deathChickens.length-1].dna.life += colidSeeds(deathChickens[deathChickens.length-1])
        }
    }

    for(let seed of seeds){
        let m =  + ((pixel-pixel/2)/2)
        draw(seed.x + m,seed.y + m,seed.size,seed.size,"green")
    }

    if(timeSeeds === 0){newSeed();timeSeeds = time/10}else{timeSeeds -= 1}

    status()
}

function draw(x,y,w,h,cor){
    ctx.fillStyle = cor
    ctx.fillRect(x,y,w,h)
}

function newSeed(x,y) {
    seed = {
        size: pixel/2,
        x: x || (random(0,cWidth/10)*pixel - pixel), // SIMPLIFICAR
        y: y || (random(0,cHeight/10)*pixel - pixel)  
    }
    if(seeds.indexOf(seed) < 0){seeds.push(seed)}else{console.log(seed)}
}

function newChicken(x,y,dna) { chickens.push(padrao(x,y,dna)) }

function actionChicken(id){
    let seedR = []
    for(seed of seeds){
        if(radar(chickens[id],seed)){seedR.push(seed)}
    }

    let x = iaChicken().x ; y = iaChicken().y

    if(chickens[id].x < pixel && x < 0 || chickens[id].x > cWidth - pixel*2 && x > 0){x=0}
    if(chickens[id].y < pixel && y < 0 || chickens[id].y > cHeight - pixel*2 && y > 0){y=0}

    moveChicken(id,x,y)
}

function iaChicken(){

    let x = random(-1,1)
    let y = random(-1,1)

    if(x<0){x= -10}else if(x>0){x=10}else{x=0}
    if(y<0){y= -10}else if(y>0){y=10}else{y=0}
    return {x,y}
}

function moveChicken(id,x,y){ chickens[id].x += x ; chickens[id].y += y }

function radar(chicken,seed){
    x1 = chicken.x - chicken.dna.visao*pixel
    y1 = chicken.y - chicken.dna.visao*pixel

    x2 = chicken.x + chicken.dna.visao*pixel
    y2 = chicken.y + chicken.dna.visao*pixel

    if(seed.x > x1 && seed.x < x2 && seed.y > y1 && seed.y < y2){ return true }else{ return false }
}

function movePlayer(event){
    if(player && gameStart){
        let x = 0; let y = 0
        switch(event.keyCode){
            case 65:x = -pixel;mover(); break;
            case 87:y = -pixel;mover(); break;
            case 68:x = pixel;mover(); break;
            case 83:y = pixel;mover(); break;
        }
        function mover(){
            if(player.x < pixel && x < 0 || player.x > cWidth - pixel*2 && x > 0){x=0}
            if(player.y < pixel && y < 0 || player.y > cHeight - pixel*2 && y > 0){y=0}
            player.x += x ; player.y += y
        }
    }
}

function colidSeeds(chicken){
    for(seed of seeds){
        if(chicken.x === seed.x && chicken.y === seed.y){
            seed.x = -10
            seed.y = -10
            return 3
        }
    } return -1/10
}

function colid(idA){
    for(idB in chickens){
        if(idA !== idB){
            if(chickens[idA].x === chickens[idB].x && chickens[idA].y === chickens[idB].y && chickens[idA].time > chickens[idA].dna.timeMin && chickens[idB].time > chickens[idB].dna.timeMin){
                newGeration += 1
                console.log()
                newChicken(chickens[idA].x,chickens[idA].y)
            }
        }
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}