function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}


const express = require('express')
const app = express()

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/:time", (request, response) => {
  var second = parseInt(request.params.time)
  var date
  if (second) {
    date = new Date(second *1000)
  } else {
    date = new Date(request.params.time)
  }
  if (date) {
    var ts = Math.round(date.getTime() / 1000);
    var str = formatDate(date)
    var ret = {unix:ts, natural:str}
    response.send(JSON.stringify(ret))
  } else {
    var ret = {unix:null, natural:null}
    response.send(JSON.stringify(ret))
  }
  
  //response.sendFile(__dirname + '/views/index.html')
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
