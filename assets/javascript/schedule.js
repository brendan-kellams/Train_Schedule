 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCaA3B44mu52PGWLiQYtL00prA--gwdor0",
    authDomain: "my-bootcamp-project-4d24f.firebaseapp.com",
    databaseURL: "https://my-bootcamp-project-4d24f.firebaseio.com",
    projectId: "my-bootcamp-project-4d24f",
    storageBucket: "my-bootcamp-project-4d24f.appspot.com",
    messagingSenderId: "48571775868"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$('#add-train-btn').on('click', function() {
    event.preventDefault();

    name = $('#train-name-input').val().trim();
    dest = $('#destination-input').val().trim();
    trainTime = $('#train-time-input').val().trim();
    freq = $('#frequency-input').val().trim();

    var newTrain = {
        name: name,
        dest: dest,
        trainTime: trainTime,
        freq: freq
    };

    database.ref('/schedule').push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.trainTime);
    console.log(newTrain.freq);

    alert("Train Schedule Successfully Added YOU MUGGLE!!!");

    $("#train-name-input").val('');
    $("#destination-input").val('');
    $("#train-time-input").val('');
    $("#frequency-input").val('');
});

database.ref('/schedule').on("child_added", function(childSnapshot, prevChild){
    
    console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().trainTime;
    var freq = childSnapshot.val().freq;

    console.log(name);
    console.log(dest);
    console.log(trainTime);
    console.log(freq);


    //Time using moment.js converted
    var trainTimeConverted = moment(trainTime, "hh:mm A").subtract(1, "years")
    console.log(trainTimeConverted); 

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);
    
    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
    // Next Train(
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

    $("#train-table").append('<tr><td>' + name + '</td><td>' + dest + '</td><td>' + 
    freq + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>')

});
   
    
