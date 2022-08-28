function Design(params){

    let canvas = params.canvas
    let ctx = params.ctx
    let pixel = params.pixel
    let cWidth = canvas.width
    let cHeight = canvas.height

    function drawSquare(params){
        ctx.fillStyle = params.color
        ctx.fillRect(params.x,params.y,params.w,params.h)
    }

    function descriptionSimulation(params){
        document.getElementById('desc_simulation').innerHTML = `
        <p> | Time of simulation: ${parseInt(params.simulationTime/1000)} | </p>
        <p> | Total of organisms: ${0} | </p>
        <p> | Total of foods: ${0} | </p>`
    }

    function statuschickens(chicken) { 
        document.getElementById('status').innerHTML = `
        <p id='p2'> | Life: ${parseInt(chicken.dna.life)} vs ${parseInt(chicken.dna.lifeMax)} | </p>
        <p id='p2'> | Time: ${parseInt(chicken.time)} vs ${parseInt(chicken.dna.timeMax)} | </p>
        <p id='p2'> | Position: ${chicken.x} - ${chicken.y} | </p>
        <p id='p2'> | Tamanho: ${chicken.dna.size} | </p>`
    }
    
    return {
        descriptionSimulation,
        drawSquare
    }
}