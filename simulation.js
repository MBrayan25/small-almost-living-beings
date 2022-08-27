let exportDesign = Design()

function Simulation (){
    
    let activedSimulation = false
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    let pixel = 10
    let cWidth = canvas.width
    let cHeight = canvas.height
    let speed = 150


    function startSimulation(){
        if(activedSimulation){
            setTimeout(()=>{
                exportDesign.descriptionSimulation()
                exeSimulation()
                startSimulation()
            }, speed)
        }
    }

    function exeSimulation(){
        console.log('Exe')
    }

    function pauseStart(){
        let button = document.getElementById("start-pause").value

        if(button === "Pause"){
            button = "Start"
            activedSimulation = !activedSimulation
        }else{
            button = "Pause"
            activedSimulation = !activedSimulation
            exportSimulation.startSimulation()
        }

        document.getElementById("start-pause").value = button
    }

    return {
        startSimulation,
        pauseStart
    }
}