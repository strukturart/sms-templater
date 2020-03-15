
$(document).ready(function() 
 {


	//Global Vars
	var i = 0;
	var z = -1;
	var finderNav_tabindex = -1;


	/////////////////////////
	function finder()
	{


	var finder = new Applait.Finder({ type: "sdcard", debugMode: true });


		finder.on("empty", function (needle) 
		{
		    //alert("no sdcard found, no openweathermap api-key found");
		    return;
		});

		finder.search("sms-templates.json");



		finder.on("fileFound", function (file, fileinfo, storageName) 
		{

			var reader = new FileReader()


			reader.onerror = function(event) 
					{
						alert('shit happens')
						reader.abort();
					};

					reader.onloadend = function (event) 
					{

							search_result = event.target.result
							
							//check if json valid
							var printError = function(error, explicit) {
							console.log("[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}");
							}

							try {
							   
							} catch (e) {
							    if (e instanceof SyntaxError) {
							        alert("Json file is not valid");
							        return;
							    } else {
							        
							    }

							}
									var data = JSON.parse(search_result);
									$.each(data, function(i, item) {
									finderNav_tabindex++;
					$("div#app-list").append('<div class="items" tabindex="'+finderNav_tabindex+'" data-content="'+item.sms_content+'" data-number="'+item.sms_number+'">'+item.sms_template+'</div>');
									
								
	
									

									});

$('div#finder').find('div.items[tabindex=0]').focus();

					};
					reader.readAsText(file)
				});


	}	


finder()


  
////////////////////////
//NAVIGATION
/////////////////////////



	function nav (move) {
	var items = document.querySelectorAll('.items');
		if(move == "+1" && i < finderNav_tabindex)
		{
			i++

			if(i <= finderNav_tabindex)
			{
				var items = document.querySelectorAll('.items');
				var targetElement = items[i];
				targetElement.focus();
				$("div#debugger").text(i)

			}
		}

		if(move == "-1" &&  i > 0)
		{
			i--
			if(i >= 0)
			{
				var items = document.querySelectorAll('.items');
				var targetElement = items[i];
				targetElement.focus();
				$("div#debugger").text(i)

			}
		}

	}








//////////////////
//LAUNCH APP
//////////////////

function open_sms()
{



	var selected_button = $(":focus")[0];
	var sms_content = selected_button.getAttribute('data-content');
	var sms_number = selected_button.getAttribute('data-number');

	var sms = new MozActivity({
                name: "new",
                data: {
                    type: "websms/sms",
                    number: sms_number,
                    body: sms_content
                }
            });




}







	//////////////////////////
	////KEYPAD TRIGGER////////////
	/////////////////////////



	function handleKeyDown(evt) {


			switch (evt.key) {


	        case 'Enter':
	        open_sms();
	        break;


			case 'ArrowDown':
				nav("+1")
			break; 


			case 'ArrowUp':
				nav("-1")
			break; 
 

		}

	};



	document.addEventListener('keydown', handleKeyDown);


	//////////////////////////
	////BUG OUTPUT////////////
	/////////////////////////


	$(window).on("error", function(evt) {

	console.log("jQuery error event:", evt);
	var e = evt.originalEvent; // get the javascript event
	console.log("original event:", e);
	if (e.message) { 
	    alert("Error:\n\t" + e.message + "\nLine:\n\t" + e.lineno + "\nFile:\n\t" + e.filename);
	} else {
	    alert("Error:\n\t" + e.type + "\nElement:\n\t" + (e.srcElement || e.target));
	}
	});


});






