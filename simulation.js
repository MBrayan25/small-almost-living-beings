let exportDesign = Design()

function Simulation (){
    
    let activedSimulation = false
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    let pixel = 10
    let cWidth = canvas.width
    let cHeight = canvas.height
    let speed = 500


    function startSimulation(){
        setTimeout(()=>{
            exportDesign.descriptionSimulation()

            if(activedSimulation) exeSimulation()

        }, speed)
        startSimulation()
    }

    function exeSimulation(){
        console.log('Exe')
    }

    function pauseStart(){
        let button = document.getElementById("start-pause").value

        if(button === "Pause"){
            button = "Start"
        }else{
            button = "Pause"
        }

        document.getElementById("start-pause").value = button

        activedSimulation = !activedSimulation
    }

    return {
        startSimulation,
        pauseStart
    }
}