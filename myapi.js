const express = require('express')
const app = express()
const port = 3000
let now = new Date()

let upcomingEvent = {//if had more time would dynamiclly update the years on fixed day holidays 
    "newyearsday": now.getFullYear() + 1 + "-01-01", //practice on adding dynamic dates
    "fourthofjuly":  "2023-07-04",//for holidays that already passed giving next years date
    "juneteenth":  "2023-06-19",
    "holloween": "2022-10-31",
    "christmas":"2022-12-25",
    "thanksgiving":"2022-11-24",

}
//todo add database of historical events 
let historicalEvents = {
    "Moon Landing": "1969-07-16",
    "Shakespeare's Birth": "1616-04-23",
    "End of civil war": "1865-04-09"
}


// app.get('/:id' ,(req, res) => {
//     req.header('Access-Control-Allow-Origin', '*')//to get cors to shut up when calling from external html, unsure if right way to do
//     res.status(200);
//     res.send("<h1>this rest service will rando generate</h1>" + '<p>'+ req.params.id+'</p>')
//     console.log('a requst has been made in root (/)')

// })
app.get('/random' ,function (req, res){
    res.status(200)
    const result = Math.floor(Math.random() * 1000)
    res.json({"result": result})
})
//enable port to listen to incoming requests
app.listen(port, function() {
    console.log('API is runnning on port' + port)
})

//ideas 
//convertion app


//
app.get('/countdown/:date', function (req,res){
    console.log('date is being used')
    res.status(200)
    var countDownDate = new Date(req.params.date).getTime()
    var now = new Date().getTime()
    var timeleft = countDownDate - now;
    res.json(convertDates(timeleft))
})

app.get('/dateof/:event',function (req,res){
    res.status(200)
    let event = req.params.event
    res.send(upcomingEvent[event])
})

app.get('/guess',function(reg,res){
    
    //get random event
    //calculate the days since that date
    //return both event and days in json let clinet handle guess logic
    res.status(200)
    res.json({"end of civil war" : numdaysSince(now, new Date(historicalEvents['End of civil war']))})//place holder for testing want to make dynamic later
   
})


//way to add spesific events will stay as long as server is running/does not save any info 
app.post('/add/:date/:name', function(req, res){//used get for testing in browser 
    res.status(200)
    let tempDate = req.params.date
    let tempName = req.params.name
    upcomingEvent[tempName] = tempDate
    res.send(upcomingEvent) 
})




/**
 * 
 * @param {*} timeleft number of milisecond 
 * @returns a JSON object that represnts the passed amount of mili seconds in days hours minutes and seconds 
 */
function convertDates(timeleft){
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    return {"mili": timeleft, "days":days, "hours":hours, "minutes":minutes, "seconds":seconds }
}

//functionality to get the number of days since an historical event i.e invention of the computer 
//use it for a guessing game 
function numdaysSince(now,then){
    let milis = now.getTime() - then.getTime()
    return Math.floor(milis / (1000 * 60 * 60 * 24))
}








