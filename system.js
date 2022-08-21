let gameStart = true
let time = 200
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let pixel = 10
let cWidth = canvas.width
let cHeight = canvas.height
let chickens = []
let listDeathChickens = []
let timeSeeds = 0
let player = undefined
let timeGame = 0
let newGeration = 0

let Mesh = {}
let Seeds = []
let limitSeeds = cWidth/pixel * cHeight/pixel

function normalChicken(params){
    return{
        kill: false,
        x: params.x || random(0,cWidth/10)*pixel - pixel,
        y: params.y || random(0,cHeight/10)*pixel - pixel,
        time: 0,
        cor: params.cor || [random(1,255),random(1,185),random(1,255)],
        dna: params.dna || {
            lifeMin: random(5,30),
            lifeMax: random(1000,2000),
            visao: random(2,25),
            timeMax: random(400,700),
            timeMin: random(150,250),
            life: random(10,50),
            size: random(7,10)
        }
    }
}

//for(let i = 0;i<1000;i++){ newSeed() }

function status(){ document.getElementById('tChickens').innerHTML = `
    <p> | Tempo de jogo: ${parseInt(timeGame)} | </p>
    <p> | Total de galinhas: ${chickens.length} | </p>
    <p> | Total de sementes: ${seeds.length} | </p>
    <p> | Nova geração: ${newGeration} | </p>`
}

function statuschickens(chicken) { document.getElementById('status').innerHTML = `
    <p id='p2'> | Life: ${parseInt(chicken.dna.life)} vs ${parseInt(chicken.dna.lifeMax)} | </p>
    <p id='p2'> | Time: ${parseInt(chicken.time)} vs ${parseInt(chicken.dna.timeMax)} | </p>
    <p id='p2'> | Position: ${chicken.x} - ${chicken.y} | </p>
    <p id='p2'> | Tamanho: ${chicken.dna.size} | </p>`
}

function pauseStart(){
    let test = document.getElementById("start-pause").value
    if(test === "Pause"){test = "Start"}else{test = "Pause"}
    document.getElementById("start-pause").value = test
    gameStart = !gameStart
}

function startChikens(){
    let n = document.getElementById('nChickens').value
    randowChickens(n)
}

function startPlayer() { player = normalChicken({}) }

window.onload = function startSimulation(){
    if(gameStart === true){drawCanvas();addEventListener("keydown",movePlayer)}
    setTimeout(startSimulation,time)
}

function randowChickens(n){
    for(let i = 0; i < n;i++){
        newChicken({})
    }
}

function drawCanvas(){ 
    
    timeGame += 1/10
    draw(0,0,cWidth,cHeight,"rgb(50,200,50)")

    updateChickens()
    deathChickens()
    updateSeeds()
    
    if(timeSeeds <= 0){newSeed(); timeSeeds = time/10}else{timeSeeds -= 1}

    status()
}

function updateSeeds(){
    for(let id in seeds){
        let seed = seeds[id]

        if(seed.coleted){
            seeds.splice(id,1)
        }else{
            let m = ((pixel-pixel/2)/2)
            draw(seed.x + m,seed.y + m,seed.size,seed.size,"green")
        }
    }
}

function deathChickens(){

    for(let kill of listDeathChickens){
        let id = chickens.indexOf(kill)
        if(id >= 0){ chickens.splice(id,1) }
    }
    
    for(let id in listDeathChickens){
        if(listDeathChickens[id].dna.life <= -2){
            listDeathChickens.splice(id,1)
        }else{
            draw(listDeathChickens[id].x,listDeathChickens[id].y,listDeathChickens[id].dna.size,listDeathChickens[id].dna.size,"red")
            listDeathChickens[listDeathChickens.length-1].dna.life += colidSeeds(listDeathChickens[listDeathChickens.length-1])
        }
    }
}

function updateChickens(){
    for(let id in chickens){

        if(chickens[id].kill === true || chickens[id].time > chickens[id].dna.timeMax){
            chickens[id].dna.life = 0
            listDeathChickens.push(chickens[id])
        }else{
            let cor = colorFunc(chickens[id].cor)
            let size = chickens[id].dna.size
            let border = (10 - chickens[id].dna.size) > 0 ? parseInt((10 - chickens[id].dna.size)/2) : 0

            draw(chickens[id].x + border,chickens[id].y + border,size,size,cor)
            moveChicken(id)
            colid(id)

            if(chickens[id].dna.life < 1){ chickens[id].kill = true }
        }
        chickens[id].dna.life += colidSeeds(chickens[id])
        chickens[id].time += 1/10
    }
}

function colorFunc(color){
    return `rgb(${color[0]},${color[1]},${color[2]})`
}

function dnaColor(colorA,colorB){
    let r = parseInt((colorA[0] + colorB[0]) / 2)
    let g = parseInt((colorA[1] + colorB[1]) / 2)
    let b = parseInt((colorA[2] + colorB[2]) / 2)

    return [r,g,b]
}

function draw(x,y,w,h,cor){
    ctx.fillStyle = cor
    ctx.fillRect(x,y,w,h)
}

function newSeed() {
    let x = random(0,cWidth/pixel)*pixel
    let y = random(0,cHeight/pixel)*pixel

    if(!Mesh[`${x}:${y}`]) Mesh[`${x}:${y}`] = {}

    if(!Mesh[`${x}:${y}`].seed){
        Mesh[`${x}:${y}`].seed = {
            size: pixel/2,
            x: x - parseInt(pixel/2),
            y: y - parseInt(pixel/2)
        }
    
        Seeds.push(`${x}:${y}`)
    }else if(Seeds.length < limitSeeds){
        newSeed()
    }
}

function newChicken(params){ chickens.push(normalChicken(params)) }

function radar(chicken,Seeds){
    let listSeed = []
    x1 = chicken.x - chicken.dna.visao*pixel
    y1 = chicken.y - chicken.dna.visao*pixel
    x2 = chicken.x + chicken.dna.visao*pixel
    y2 = chicken.y + chicken.dna.visao*pixel

    for(seed of Seeds){
        if(seed.x > x1 && seed.x < x2 && seed.y > y1 && seed.y < y2){
            listSeed.push(seed)
        } 
    }
    return listSeed
}

function moveChicken(id){
    let x = 0, y = 0, dire = random(1,10)

    if(dire <= 5 && chickens[id].life >= chickens[id].lifeMin+50){
        dire = radar(chickens[id],chickens)
    }else {
        dire = radar(chickens[id],seeds)
    }

    let direct = direction(chickens[id],dire)

    if(direct <= 1000){y = -pixel}
    else if(direct <= 2000){y = pixel}
    else if(direct <= 3000){x = -pixel}
    else if(direct <= 4000){x = pixel}
    else if(direct <= 5000){x = -pixel, y = -pixel}
    else if(direct <= 6000){x = pixel, y = -pixel}
    else if(direct <= 7000){x = -pixel, y = pixel}
    else if(direct <= 8000){x = pixel, y = pixel}

    if(chickens[id].x < pixel && x < 0 || chickens[id].x > cWidth - pixel*2 && x > 0){x=0}
    if(chickens[id].y < pixel && y < 0 || chickens[id].y > cHeight - pixel*2 && y > 0){y=0}

    chickens[id].x += x, chickens[id].y += y
}

function direction(chicken,listSeed){
    if(listSeed.length > 0){
      let d = []
        for(Seed of listSeed){
            d.push(Math.sqrt((Seed.x - chicken.x)**2 + (Seed.y - chicken.y)**2))
        }
        let seed = listSeed[d.indexOf(Math.min(...d))]
        if(seed.y < chicken.y && seed.x < chicken.x){return 5000}
        if(seed.y < chicken.y && seed.x > chicken.x){return 6000}
        if(seed.y > chicken.y && seed.x < chicken.x){return 7000}
        if(seed.y > chicken.y && seed.x > chicken.x){return 8000}
        if(seed.y < chicken.y){return 1000}
        if(seed.y > chicken.y){return 2000}
        if(seed.x < chicken.x){return 3000}
        if(seed.x > chicken.x){return 4000}
    }
    return random(1,8000)
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
    if(chicken.life >= chicken.dna.lifeMax) return -1
    for(seed of seeds){
        if(chicken.x === seed.x && chicken.y === seed.y){
            seed.x = -10
            seed.y = -10
            return 5
        }
    } return -1
}

function colid(idA){
    for(idB in chickens){
        if(idA !== idB){
            let ifA = chickens[idA].x === chickens[idB].x && chickens[idA].y === chickens[idB].y
            let ifB = chickens[idA].time > chickens[idA].dna.timeMin && chickens[idB].time > chickens[idB].dna.timeMin
            let ifC = chickens[idA].dna.life > chickens[idA].dna.lifeMin && chickens[idB].dna.life > chickens[idB].dna.lifeMin

            if( ifA && ifB && ifC){
                newGeration += 1
                newChicken({
                    x: chickens[idA].x,
                    y: chickens[idA].y,
                    cor: dnaColor(chickens[idA].cor,chickens[idB].cor),
                    dna: dnaFunc(chickens[idA].dna,chickens[idB].dna)
                })
            }
        }
    }
}

function dnaFunc(dnaA,dnaB){
    let newLife = parseInt(dnaA.life/3 + dnaB.life/3)
    let size = (dnaA.size + dnaB.size + random(dnaA.size, dnaB.size)) / 3
    let timeMax = (dnaA.timeMax + dnaB.timeMax + random(dnaA.timeMax, dnaB.timeMax)) / 3

    dnaA -= newLife
    dnaB -= newLife

    return {
        lifeMin: parseInt((dnaA.lifeMin + dnaB.lifeMin + random(dnaA.lifeMin, dnaB.lifeMin)) / 3),
        lifeMax: parseInt((dnaA.lifeMax + dnaB.lifeMax + random(dnaA.lifeMax, dnaB.lifeMax)) / 3),
        visao: parseInt((dnaA.visao + dnaB.visao + random(dnaA.visao, dnaB.visao)) / 3),
        timeMax: parseInt((timeMax * 1.8) - (timeMax * size/10)),
        timeMin: parseInt((dnaA.timeMin + dnaB.timeMin + random(dnaA.timeMin, dnaB.timeMin)) / 3),
        life: newLife,
        size: parseInt(size)
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}