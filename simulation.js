
function Simulation (){
    
    let activedSimulation = false
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    let pixel = 10
    let cWidth = canvas.width
    let cHeight = canvas.height
    let speed = 150
    let initialDate = 0
    let simulationTime = 0
    let delayTime = 0
    let highlighter
    
    let exportDesign = Design({ canvas, ctx, pixel })

    function startSimulation(){
        initialDate = Date.now() - initialDate
        console.log(' ---- Start ----')
        loopSimulation()
    }
    
    function loopSimulation(){
        if(activedSimulation){
            setTimeout(()=>{
                simulationTime = Date.now() - initialDate

                exportDesign.descriptionSimulation({simulationTime})
                exeSimulation()
                loopSimulation()
            }, speed)
        }else {
        }
    }

    function exeSimulation(){

        exportDesign.drawSquare({
            x: 0,
            y: 0,
            w: cWidth,
            h: cHeight,
            color: "rgb(50,200,50)"
        })


    }

    function pauseStart(){
        let button = document.getElementById("start-pause").value

        if(button === "Pause"){
            button = "Start"
            activedSimulation = !activedSimulation
            recoverTime('Pause')
        }else{
            button = "Pause"
            activedSimulation = !activedSimulation

            if(initialDate == 0){
                startSimulation()
            }else{
                recoverTime('ReStart')
                initialDate += delayTime
                loopSimulation()
            }
        }
        document.getElementById("start-pause").value = button
    }

    function recoverTime(param){
        console.log(' -',param)
        if(param == 'Pause') highlighter = Date.now() 
        if(param == 'ReStart') delayTime = Date.now() - highlighter
    }

    function updateSpeed(newSpeed){ speed = newSpeed }

    return {
        startSimulation,
        pauseStart,
        updateSpeed
    }
}