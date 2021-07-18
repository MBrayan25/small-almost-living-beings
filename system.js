

// Precisa analizar a estrutura do script!




let terreiro = document.getElementById('canvas'); // 900x600
let conteudo = terreiro.getContext('2d');
let pixel = 10;
let idChicken = 0

let chickens = []

setInterval(start,200);

function start (){
    conteudo.fillStyle = "rgb(50,160,50)"
    conteudo.fillRect(0,0,terreiro.width,terreiro.height)

    if(chickens[0]){
        for(let i = 0;i < chickens.length;i++){
            if(chickens[i].life < 1){dieChicken(i)}else{

                drawChicken(chickens[i].x,chickens[i].y,chickens[i].size)

                moveChicken(i)

                statuschickens(chickens[idChicken])

            }  
        }
    }
    
}

function startChicken(x=random(0,terreiro.width/pixel)*pixel,y=random(0,terreiro.height/pixel)*pixel,size=pixel) {
    chickens.push({
        life: 10,
        x: x,
        y: y,
        size: size,
    })
}

function startChickenII(n) {
    for(let i = 0;i < n; i++){
        startChicken()
    }
}

function drawChicken(x,y,size,cor="white") {
    conteudo.fillStyle = cor
    conteudo.fillRect(x,y,size,size)
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveChicken(id) {
    let chicken = chickens[id]
    let xc = chicken.x, yc = chicken.y

    xy = direct(),x = xy[0],y = xy[1]

    if(xc < pixel && x < 0 || xc > terreiro.width - pixel*2 && x > 0){x=0}
    if(yc < pixel && y < 0 || yc > terreiro.height - pixel*2 && y > 0){y=0}

    chicken.x += x
    chicken.y += y
    chicken.life -= 1

    chickens[id] = chicken
}

function direct(){
    let direc = random(1,1000),x = 0,y = 0

    if(direc < 250){y = -pixel}                   // Up
    if(direc > 250 && direc < 500){y = pixel}     // Down
    if(direc > 500 && direc < 750){x = -pixel}    // Left
    if(direc > 750){x = pixel}                    // Rigth

    return [x,y]
}

function colid(){
    for(let i = 0;i < chickens.length;i++){
        //if()
    }
}

function statuschickens(chicken) {
    document.getElementById('status').innerHTML = `
    <p> | Galinha ${idChicken} | Life: ${chicken.life} | Position: ${chicken.x} - ${chicken.y} | Tamanho: ${chicken.size} | </p>
    `
}

function dieChicken(id) {
    drawChicken(chickens[id].x,chickens[id].y,chickens[id].size,"red")
    chickens.splice(id,1)
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