$("#wrap").append("<button id='start'>START</button>");
$("#user").hide();
$("#progress").hide();
$("#status").hide();


var random;
var previous;

// to select the button created
$("#start").click( function() {
	random = Math.ceil(Math.random() * 100);
	previous = 101;
	var thermometer ;

	
	// to show the input form and progress bar
	$("#user").show();
	$("#progress").show();
	$("#status").show();

	// to hide the instruction paragraph and the start button
	$("#rules").hide();
	$(this).hide();
});


//progressbar function 
function progress(percent, $element) {
	var progressWidth = percent * $element.width() / 100;
	$element.find('div').animate({ width: progressWidth }, 500).html(percent + "%&nbsp;");
}



//function to test user's guess
var testGuess = function(guess){					
	var presentGuess = guess;

	current = Math.abs( random - presentGuess);

	thermometer = Math.ceil((( previous / (current + previous)) * 100 ));

	// console.log(thermometer);

	if( presentGuess != random){
		
		if ( current < previous) {
				$("#meter").removeClass().addClass("meter_hot");
				progress(thermometer, $('#progress'));
				$("#status").removeClass().addClass("hot").text("You are hot");
				
		}

		else if( current > previous){
			$("#meter").removeClass().addClass("meter_cold");
			progress(thermometer, $('#progress'));
			$("#status").removeClass().addClass("cold").text("You are Cold");
		}

		else if( current === previous) {
			$("#meter").removeClass().addClass("meter_cold");
			progress(current, $('#progress'));
			$("#status").removeClass().addClass("cold").text("You are Cold");
		}
		previous = current;
	}
	else{
		$("#status").removeClass().addClass("hot").text("Congratulation's you won");
		$('#meter').removeClass().addClass("meter_hot");
		progress(100, $('#progress'));
	}
	
}

$("#user").on("submit", function(event){
	event.preventDefault();
	var guess = parseInt($("#int").val());

	if (isNaN(guess) || guess > 100 || guess < 0) {
		alert("Not a valid input");
	}
	else {
			testGuess(guess);
	}		
	$("#int").val('');
});

$("#guessNum").click(function(event){
	event.preventDefault();
	location.reload();
});
