// Precisa analizar a estrutura do script!

let terreiro = document.getElementById('canvas'); // 900x600
let conteudo = terreiro.getContext('2d');
let pixel = 10;
let idChicken = 0
let seeds = {}
let chickens = []
let player
let namegeneration = 1
let nSeeds = 0

let time = 20

setInterval(()=>{
    newSeed()
    newSeed()
    newSeed()
    newSeed()
},time*1)

addEventListener("keydown",movePlayer)
setInterval(start,time*4);

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
    let x = chicken.x
    let y = chicken.y

    if(seeds[`${x}-${y}`] && (chicken.life + 10 < 150)){
        seeds[`${x}-${y}`] = false
        nSeeds--
        return random(10,12)
    }
    return -1
}

function newChicken(params) {
    return{
        life: 50,
        die:false,
        x: params.x ? params.x : random(0,(terreiro.width-pixel)/pixel)*pixel,
        y: params.y ? params.y : random(0,(terreiro.height-pixel)/pixel)*pixel,
        cor: params.cor ? params.cor : [random(1,100),random(1,100),random(1,100)],
        size: pixel,
        name: `id_${namegeneration}`,
    }
}

function start(){
    conteudo.fillStyle = "rgb(50,160,50)"
    conteudo.fillRect(0,0,terreiro.width,terreiro.height)

    drawSeed();statuss()

    if(chickens[0]){
        for(let i = 0;i < chickens.length;i++){
            
            if(chickens[i].life < 1){
                chickens.splice(i,1)
            }else{
                moveChicken(chickens[i])
                colid(chickens[i])
                chickens[i].life += colidSeeds(chickens[i])
                drawChicken(chickens[i])
            }
        }
        statuschickens(chickens[idChicken])
    }
}

function newSeed(){
    let x = random(0,(terreiro.width-10)/pixel)*pixel
    let y = random(0,(terreiro.height-10)/pixel)*pixel

    if(seeds[`${x}-${y}`]){
        if(nSeeds < ((terreiro.width/10)*(terreiro.height/10)-20)) newSeed() 
        return
     } else {
        seeds[`${x}-${y}`] = {x:x,y:y,id:seeds.length}
        nSeeds++
     } 
    // ARRUMAR 18/08
}

function drawSeed(){
    for(let id in seeds){
        let seed = seeds[id]

        conteudo.fillStyle = seed.cor ? seed.cor : "rgb(50,255,50)"
        conteudo.fillRect(seed.x,seed.y,pixel/2,pixel/2) 
    }
    
}

function startChicken(n) {
    for(let i = 0;i < n; i++){
        chickens.push(newChicken({})) 
        namegeneration++
    }
}

function startSeeds(n){
    for(let i = 0; i < n; i++){
        if(nSeeds < ((terreiro.width/10)*(terreiro.height/10))) newSeed()
    }
}

function drawChicken(chicken) {
    let x = chicken.x
    let y = chicken.y
    let size = chicken.size
    let cor = color(chicken.cor)

    conteudo.fillStyle = cor
    conteudo.fillRect(x,y,size,size)
}

function color(cor){
    let r = 255/100*cor[0] 
    let g = 255/100*cor[1]
    let b = 255/100*cor[2]
    
    return `rgb(${r},${g},${b})`
}

function distancia(x1,y1,x2,y2){
    return Math.sqrt((x2-x1)**2+(y2-y1)**2)
}

function observar(chicken){
    D = {
        x: chicken.x+5,
        y: chicken.y+5,
        d: 300
    }
    let seedss = []
    let p = 30

    for(let x = -p; x <= p; x+=10){
        for(let y = -p; y <= p; y+=10){

            let X = chicken.x + x
            let Y = chicken.y + y

            if(seeds[`${X}-${Y}`]){
                let dd = distancia(X+5,Y+5,D.x,D.y)

                if(dd == D.d){
                    seedss.push({x:X,y:Y})
                }else if(dd < D.d){
                    seedss[0] = {x:X,y:Y}
                    D.d = dd
                }
            }
        }
    }
    //console.log('------------------')
    //console.log(seedss)
    if(seedss.length < 1) return undefined
    return seedss[random(0,seedss.length-1)]
}

function moveChicken(chicken) {

    let xy = direct(observar(chicken),chicken)
    let x = xy[0]
    let y = xy[1]

    if(chicken.x < pixel && x < 0 || chicken.x > terreiro.width - pixel*2 && x > 0){x=0}
    if(chicken.y < pixel && y < 0 || chicken.y > terreiro.height - pixel*2 && y > 0){y=0}

    chicken.x += x
    chicken.y += y
}

function direct(seed,chicken){

    if(seed == undefined || (seed.y == chicken.y || seed.x == chicken.x)) return [random(-1,1)*10,random(-1,1)*10]

    if(seed.x < chicken.x){x = -pixel}    // Left
    if(seed.x > chicken.x){x =  pixel}    // Rigth
    if(seed.y < chicken.y){y = -pixel}    // Up
    if(seed.y > chicken.y){y =  pixel}    // Down
    
    if(seed.x < chicken.x && seed.y < chicken.y){x = -pixel ; y = -pixel} 
    if(seed.x < chicken.x && seed.y > chicken.y){x = -pixel ; y =  pixel}  
    if(seed.y > chicken.y && seed.x < chicken.x){y =  pixel ; x = -pixel} 
    if(seed.y > chicken.y && seed.x > chicken.x){y =  pixel ; x =  pixel} 

    return [x,y]
}

function colid(chicken){

    for(let chicken2 of chickens){

        let cond1 = chicken.name != chicken2.name
        let cond2 = chicken.x == chicken2.x && chicken.y == chicken2.y
        let cond3 = chicken.life > 75 && chicken2.life > 75

        if( cond1 && cond2 && cond3 && chicken2){
            chicken.life -= 25
            chicken2.life -= 25

            if(!(chicken && chicken2)) console.log(chicken,chicken2)

            chickens.push(newChicken({
                x: chicken.x,
                y: chicken.y,
                galita: true,
                cor: misturarCor(chicken,chicken2)
            }))

            console.log('+ una galita')
        }
    }
}

function misturarCor(A,B){
    let r = (A.cor[0] + B.cor[0]) / 2
    let g = (A.cor[1] + B.cor[1]) / 2
    let b = (A.cor[2] + B.cor[2]) / 2
    return [r,g,b]
}

function statuschickens(chicken) {
    if(chickens.length < 1) return
    statuss()
    document.getElementById('status').innerHTML = `
    <p id='p1'> | Galinha ${idChicken} | </p>
    <p id='p2'> | Life: ${chicken.life} | </p>
    <p id='p2'> | Position: ${chicken.x} - ${chicken.y} | </p>
    <p id='p2'> | Tamanho: ${chicken.size} | </p>
    `
}

function statuss(){
    document.getElementById('tChickens').innerHTML = `
    <p id='p1'> | Total de galinhas: ${chickens.length} | </p>
    <p id='p1'> | Total de sementes: ${nSeeds} | </p>
    `
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}