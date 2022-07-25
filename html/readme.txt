how to get up and running
0)unzip folder 
1)ensure node is installed 
2)ensure express is installed in the assignment 3 460 file type the command npm install express
3)type the commmand node myapi to start the server side code('API is runnning on port3000' should pritn to the console)
4)once the server code is running all that is need is to open the index.html file
->make sure you have javascript enabled
5)On the index.html page you have a few options you can...
    -select a deafualt upcoming event witch will start the countdown 
    -maunally enter a date to start the countdown 
    -Add a custom event witch will update the list of avalible events to chose from using AJAX
    -from the nav bar select Guessing Game to go the the quiz style Game
    if a countdown is started it will update from the server every second using AJAX until the page is reloaded 
    if a custom event is added it will persit even is the page is closed as long as the server code is still running 
7) if you select the Guessing game you will be greated with a prompt asking you how many days have passed since a histroical event has taken place
-selecting a wrong answer will change its backgrund color to red
-selecting the right aswer will change it backgrund to green 
8)cick the button 'new question' to get a new question 
-there are only a handleful of events so it is common to get the same question more than once 


Server stuff
paths:
'/countdown/:date' GET 
    param date should be in YYYY-MM-DD format 
    returns a JSON {"mili": timeleft, "days":days, "hours":hours, "minutes":minutes, "seconds":seconds } 
    where milis is the total number of miliseconds between now and the target date
    and Days, hours, minute, and seconds colectively add to the total miliseconds
'/dateof/:event' GET
    unused in the final application it returned the date of the param event case sensitive i.e /dateof/Christmas returned 2022-12-25
 '/allEvents' GET
    returns in JSON format all of the Events and thier dates including user added events that have been saved
'/dayof/:date'
    unused in final application, param date should be in YYYY-MM-DD format
    returns the day of the week of any passed date, seemed to useless to include in final product
'/guess' GET
    returns in JSON format a random histroical Event as the key and how many days have passed as the value
'/add/:date/:name' POST 
    param date should be in YYYY-MM-DD format 
    param name is any string you wish to call it
    updates upcoming events list
    returns JSON of updated list 
