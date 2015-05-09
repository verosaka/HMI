		function concatData(id,data){
			return id + ": " + data + "<br>";
		}
		var confirmGrab = function(){
			console.log("Griff erkannt");
			orderCocktail();
		}
		var nextLMRecipe  = function(){
			console.log("Bewegung nach links erkannt ");
			nextSlide();
		}
		var prevLMRecipe  = function(){
			console.log("Bewegung nach rechts erkannt");
			prevSlide();
		}
		var output = document.getElementById('output');
		var grabData = document.getElementById('grabData');
		var frameString = "";
		var handString = "";
		var fingerString = "";
		var hand;
		var previousFrame = null;
		var print = "";
		var print2 = "";
		var grabRegistered = 0;
		var k = 0;

		// Leap.loop uses browser's requestAnimationFrame
		var options = { enableGestures: true };

		// Main Loop
		Leap.loop(options, function(frame) {
			// body
			//number of hnads
			/*frameString = concatData("num_hands", frame.hands.length);
			frameString += "<br>";
			*/
			for(var i = 0, len = frame.hands.length; i < len; i++){
				hand = frame.hands[i];
				//handString = concatData("hand_type", hand.type);
				handString = concatData("grab_strength", hand.grabStrength);
				
				if(hand.grabStrength > 0.9) {
					if(grabRegistered ==0){
						grabRegistered = 1;
						confirmGrab();
					}
				}else{
					grabRegistered = 0;
				}
				
				frameString = handString;
			}
			//output.innerHTML = frameString;

		var swipeDir = document.getElementById('swipeDir');
		var tapnum = document.getElementById('tapnum');
	
		  if (frame.gestures.length > 0) {
		    
		    for (var i = 0; i < frame.gestures.length; i++) {
		      var gesture = frame.gestures[i];

		      switch (gesture.type) {
		      	
		        case "swipe":
		                        handleSwipe(gesture);
		                        //swipeDir.innerHTML = print;
		          break;
		          /*
		          //Screentap und Keytap
		        case "screenTap":
		        case "keyTap":
		        		//tap count
		        		print2 = "tap + " + k;
		        		k += 1;
		        		tapnum.innerHTML = print2;
		        		*/
		          break;
		        default:      
		      }
		      
		    }
		  }
		  
		  // Store frame for motion functions
		  previousFrame = frame;
		
		});

		function handleSwipe (swipe){
		    var startFrameID;
		    if(swipe.state === 'stop'){

		    	/*
		    	//Classify swipe as either horizontal or vertical
         		var isHorizontal = Math.abs(swipe.direction[0]) > Math.abs(swipe.direction[1]);
        	 	//Classify as right-left or up-down
          		if(isHorizontal){*/
		      	  	if (swipe.direction[0] > 0){
		      	  	  	  //this means that the swipe is to the right direction
		      	  	    prevLMRecipe();
		      	  	    setTimeout(30);
		      	  	    
		     	   	}
		      	  	else{
		         		  //this means that the swipe is to the left direction
		     	   		nextLMRecipe();
		      	  	    setTimeout(30);
		         	}
		        /*
		        }else{ //vertical
            		  if(swipe.direction[1] > 0){
                		  print = "up";
            		  }else{
                  		  print = "down";
              	  		}                  
		        	}*/
		    	}
			}
		