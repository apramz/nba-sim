//Shot Variables
var user_pts = 0;
var shot_value;
var shot_probability;
var shot_a_prob; //Midrange Jumper
var shot_b_prob; //Three Pointer
var shots = 0;
var makes = 0;
var misses = 0;
var player;

//Div Clearing Function
var clear = function(content_area) {
	while (content_area.hasChildNodes()) {
		content_area.removeChild(content_area.firstChild);
	}
}

//Player Selection Dropdown Menu
var toggle = function() {
	document.getElementById('myDropdown').classList.toggle('show');
}
document.getElementById('dropbtn').addEventListener('click', toggle, false);
window.onclick = function(event) {
	if (!event.target.matches('#dropbtn')) {
		var dropdowns = document.getElementsByClassName('dropdown-content');
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

//Player Stat Display Function
var display = function() {
	var stats=document.createTextNode(player+' shoots '+shot_a_prob*100 +'% on Midrange Jumpers and '+shot_b_prob*100+'% on Three Pointers.');
	var stats_area = document.getElementById('stats');
	clear(stats_area);
	stats_area.appendChild(stats);
}

//Player Selection Function
var select = function(){
	if (this.innerHTML === 'Steph Curry') {
		shot_a_prob = 0.50;
		shot_b_prob = 0.45;
		player = 'Steph Curry';
		display();
	}
	else if (this.innerHTML === 'Klay Thompson') {
		shot_a_prob = 0.40;
		shot_b_prob = 0.43;
		player = 'Klay Thompson';
		display();
	}
	var result_area = document.getElementById('result');
	clear(result_area);
}

//Shot Processing Function: Takes shot type and assigns values for this type of shot.
var shot_proc = function(type) {
	if (type === 'Midrange Jumper') {
		shot_value = 2;
		shot_probability = shot_a_prob;
	}
	else if (type === 'Three Pointer') {
		shot_value = 3;
		shot_probability = shot_b_prob;
	}
}
//Shot Simulation Function: Takes shot values and simulates a given shot to return new pt total and string.
var shot_sim = function() {
	var sim_shot = Math.random();
	shots = shots + 1;
	console.log(shots);
	if (sim_shot <= shot_probability) {
		user_pts = user_pts + shot_value;
		makes = makes + 1;
		return "Swoosh!";
	}
	else {
		misses = misses +1;
		return "Brick!";
	}
}
//Outcome Function: Runs shot_proc, then shot_sim, then updates results in div below.
var outcome = function() {
	shot_proc(this.innerHTML);

	var result_txt = document.createTextNode(shot_sim());
	var score = document.createTextNode(" You've got: " + user_pts + " points on " + shots + " shots.")
	var result_area = document.getElementById('result');
	clear(result_area);
	result_area.appendChild(result_txt);
	result_area.appendChild(score);
}
//Click Functions: 1) Player Selection, 2) Shot Simulator
var players = document.getElementsByClassName('player');
var shot_types = document.getElementsByClassName('shot_type');

for (var i = 0; i < players.length; i++) {
    players[i].addEventListener('click', select, false);
}
for (var i = 0; i < shot_types.length; i++) {
    shot_types[i].addEventListener('click', outcome, false);
}