
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
    
    let CartesianPlane = {}
    let Organisms = {}
    let Foods = {}

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

    function newOrganism(params){
        return {
            x: params.x || random(0,cWidth/pixel)*pixel,
            y: params.y || random(0,cHeight/pixel)*pixel,
            cor: params.cor || [random(1,255),random(1,185),random(1,255)],
            die: false,
            age: 0,
            dna: params.dna || newDna()
        }
    }

    function newDna(){
        return  {
            energy: random(50,100),
            minEnergy: random(100,200),
            maxEnergy: random(1000,2000),
            rangeOfVision: random(3,35),
            maxAge: random(400,700),
            size: random(7,10)
        }
    }

    function newFood(){

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