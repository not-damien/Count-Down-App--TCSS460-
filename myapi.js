const express = require('express')
const app = express()
const port = 3000
let now = new Date()

let upcomingEvent = {//if had more time would dynamiclly update the years on fixed day holidays 
    "New-Years-Day": now.getFullYear() + 1 + "-01-01", //practice on adding dynamic dates
    "Fourth-of-July":  "2023-07-04",//for holidays that already passed giving next years date
    "Juneteenth":  "2023-06-19",
    "Halloween": "2022-10-31",//todo make names nicer
    "Christmas":"2022-12-25",
    "Thanksgiving":"2022-11-24"
}
//todo add more historical events 
let historicalEvents = {
    "The Moon Landing": "1969-07-16",
    "Shakespeare's Birth": "1616-04-23",
    "The End of civil war": "1865-04-09"
}

//example code where i started
// app.get('/:id' ,(req, res) => {
//     req.header('Access-Control-Allow-Origin', '*')//to get cors to shut up when calling from external html, unsure if right way to do
//     res.status(200);
//     res.send("<h1>this rest service will rando generate</h1>" + '<p>'+ req.params.id+'</p>')
//     console.log('a requst has been made in root (/)')

// })
// app.get('/random' ,function (req, res){
//     res.status(200)
//     const result = Math.floor(Math.random() * 1000)
//     res.json({"result": result})
// })


// //enable port to listen to incoming requests
app.listen(port, function() {
    console.log('API is runnning on port' + port)
})



//
app.get('/countdown/:date', function (req,res){
    res.set({//so i can access from webpage easy 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    console.log('date is being used')//for debuging
    res.status(200)//ok
    var countDownDate = new Date(req.params.date).getTime()//use the string passed to create Date object
    var now = new Date().getTime()//what time is is now 
    var timeleft = countDownDate - now;//how much time until target date
    res.json(convertDates(timeleft))//convert the milliseconds vaalue into days hours minutes and seconds 
})

app.get('/dateof/:event',function (req,res){
    res.status(200)
    let event = req.params.event
    res.send(upcomingEvent[event])//return the date of the matching event 
})
app.get('/allEvents',function(req,res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.status(200)
    res.json(upcomingEvent)//return all upcoming events 
})

app.get('/dayof/:date', function(req,res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    var date = new Date(req.params.date)
    res.status(200)
    switch (date.getUTCDay()) {//gets the string value of the utc day
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
           day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }
      res.json({'day': day})
})







app.get('/guess',function(reg,res){
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    
    var obj_keys = Object.keys(historicalEvents)//get array of keys
    let i = Math.floor(Math.random() * obj_keys.length);//get random index in the bound of the array
    console.log(obj_keys[i])//print the key at that index for debuging
    //sudo code 
    //get random event
    //calculate the days since that date
    //return both event and days in json let clinet handle guess logic
    res.status(200)//ok
    res.json({'name': obj_keys[i], 'days' : numdaysSince(now, new Date(historicalEvents[obj_keys[i]]))})//sends single JSON elemnt with {event:days til event }
   
})


//way to add spesific events will stay as long as server is running/does not save any info 
app.post('/add/:date/:name', function(req, res){//used get for testing in browser 
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.status(200)
    let tempDate = req.params.date//get date passed
    let tempName = req.params.name//get name 
    upcomingEvent[tempName] = tempDate//tie name and date together in JSON
    res.json(upcomingEvent) //return updated list of upcoming events 
})







//helper functions 
/**
 * 
 * @param {*} timeleft number of milisecond 
 * @returns a JSON object that represnts the passed amount of mili seconds in days hours minutes and seconds 
 */
function convertDates(timeleft){//converts miliseconds in hours minutes and seconds
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








