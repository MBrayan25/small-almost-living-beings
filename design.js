function Design(){

    function descriptionSimulation(){
        document.getElementById('desc_simulation').innerHTML = `
        <p> | Time of simulation: ${0} | </p>
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
        descriptionSimulation
    }
}