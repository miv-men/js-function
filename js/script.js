const body = document.querySelector('body');

function blockShowHide(button, show, changeClass = []) {

	var timeVar = false;
	var changeBut = false;

	const block = document.querySelector(show);

	if (changeClass.length > 1) {

		 var chan = button.querySelector("." + changeClass[0]) || button.querySelector("." + changeClass[1]) || button;

		 if (chan.classList.contains(changeClass[0])) {
			  chan.classList.remove(changeClass[0]);
			  chan.classList.add(changeClass[1]);
			  changeBut = true;
		 } else {
			  chan.classList.remove(changeClass[1]);
			  chan.classList.add(changeClass[0]);
			  changeBut = false;
		 }

	}

	if(!block.classList.contains("hidden")) {
		 block.classList.add("hidden");
	}else{
		 block.classList.remove("hidden");
		 timeVar = true;
	}

	button.classList.toggle('active');

	block.onclick = function()
	{
		 timeVar = true;
	}


	body.onclick = function() {

		 if(!timeVar) {
			  block.classList.add("hidden")

			  button.classList.remove('active');
			  if (changeBut){
					chan.classList.remove(changeClass[1]);
					chan.classList.add(changeClass[0]);
			  }
		 }

		 if(timeVar) { setTimeout(function(){ timeVar = false; }, 100);}
	}


}	