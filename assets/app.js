// console.log('hey');
 // Initialize Firebase
var config = {
  apiKey: "AIzaSyDm4-ESY6AelFXgrP7VqgXhnYY3F6IqFlM",
  authDomain: "train-schedule-ab4cc.firebaseapp.com",
  databaseURL: "https://train-schedule-ab4cc.firebaseio.com",
  storageBucket: "train-schedule-ab4cc.appspot.com",
  messagingSenderId: "443451666432"
};

firebase.initializeApp(config);
//save firebase database to variable 
var database = firebase.database();
//onclick of submit button 
$("#submit").on('click', function(event){
  event.preventDefault(); 
  var trainName = $('#trainName').val().trim();
  var destination = $('#destination').val().trim();
  var firstTrain = $('#firstTrain').val().trim();
  var frequency = $('#frequency').val().trim();
  var currentTime = moment();
  var trainStart = moment(firstTrain,'HH:mm');
  var difference = moment().diff(moment(trainStart), 'minutes');
  var remaining = difference % frequency;
  var minutesAway = frequency - remaining;
  var nextArrivalTime = moment().add(minutesAway, 'minutes');
  var nextArrival = moment(nextArrivalTime).format('HH:mm');
    database.ref().push({
    name: trainName,
    destination: destination,
    frequency: frequency, 
    next: nextArrival,
    away: minutesAway 
  });
});

database.ref().on("child_added", function(snapshot){
  var data = snapshot.val();
  // console.log(snapshot.val());
  var name = data.name;
  var destination = data.destination;
  var frequency = data.frequency;
  var next = data.next;
  var away = data.away;
  $("table").append('<tr><td class="scheduling">'+name+'</td class="scheduling"><td class="scheduling">'+destination+'</td><td class="scheduling">'+frequency+'</td class="scheduling"><td>'+next+'</td><td class="scheduling">'+away+' minutes away</td></tr>')
});


 