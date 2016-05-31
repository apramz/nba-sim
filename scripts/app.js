//Shot Variables
var user_pts = 0;
var cpu_pts = 0;
var shot_value;
var shot_probability;
var user_shot_a_pct; //Midrange Jumper Percentage
var user_shot_b_pct; //Three Pointer Percentage
var cpu_shot_a_prob; //Likelihood that CPU chooses Midrange Jumper
var cpu_shot_b_prob; //Likelihood that CPU chooses Three Pointer
var user_shots = 0;
var cpu_shots = 0;
var user_makes = 0;
var user_misses = 0;
var cpu_makes = 0;
var cpu_misses = 0;
var user_player;
var cpu_player;

//Div Clearing Function
var clear = function(content_area) {
	while (content_area.hasChildNodes()) {
		content_area.removeChild(content_area.firstChild);
	}
}

//Player Selection Dropdown Menu
var toggle = function(menu) {
	document.getElementById(menu).classList.toggle('show');
}
document.getElementById('userDropBtn').addEventListener('click', function() {toggle('userDropdown')}, false);
document.getElementById('cpuDropBtn').addEventListener('click', function() {toggle('cpuDropdown')}, false);

window.onclick = function(event) {
	if ((!event.target.matches('#userDropBtn')) && (!event.target.matches('#cpuDropBtn'))) {
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
var display = function(player, stats_area_id, shot_a_pct, shot_b_pct) {
	var stats=document.createTextNode(player+' shoots '+shot_a_pct*100 +'% on Midrange Jumpers and '+shot_b_pct*100+'% on Three Pointers.');
	var stats_area = document.getElementById(stats_area_id);
	clear(stats_area);
	stats_area.appendChild(stats);
}

//Player Selection Function
var select = function(){
	if (this.innerHTML === 'Steph Curry') {
		user_shot_a_pct = 0.50;
		user_shot_b_pct = 0.45;
		user_player = this.innerHTML;
		display(user_player, 'user_stats', user_shot_a_pct, user_shot_b_pct);
	}
	else if (this.innerHTML === 'Klay Thompson') {
		user_shot_a_pct = 0.40;
		user_shot_b_pct = 0.43;
		user_player = this.innerHTML;
		display(user_player, 'user_stats', user_shot_a_pct, user_shot_b_pct);
	}
	else if (this.innerHTML === 'LeBron James') {
		cpu_shot_a_pct = 0.54;
		cpu_shot_b_pct = 0.30;
		cpu_shot_a_prob = 0.75;
		cpu_shot_b_prob = 0.25;
		cpu_player = this.innerHTML;
		display(cpu_player, 'cpu_stats', cpu_shot_a_pct, cpu_shot_b_pct);
	}
	else if (this.innerHTML === 'Kyrie Irving') {
		cpu_shot_a_pct = 0.43;
		cpu_shot_b_pct = 0.38;
		cpu_shot_a_prob = 0.65;
		cpu_shot_b_prob = 0.35;
		cpu_player = this.innerHTML;
		display(cpu_player, 'cpu_stats', cpu_shot_a_pct, cpu_shot_b_pct);
	}
	var user_result_area = document.getElementById('user_result');
	clear(user_result_area);
}

//Shot Processing Function: Takes shot type and assigns values for this type of shot.
var shot_process = function(type, shot_a_pct, shot_b_pct) {
	if (type === 'Midrange Jumper') {
		shot_value = 2;
		shot_probability = shot_a_pct;
	}
	else if (type === 'Three Pointer') {
		shot_value = 3;
		shot_probability = shot_b_pct;
	}
}
//Shot Simulation Function: Takes shot values and simulates a given shot to return new pt total and string.
var shot_sim = function(user_or_cpu) {
	var sim_shot = Math.random();
	if (user_or_cpu === 'user') {
		user_shots = user_shots + 1;
		if (sim_shot <= shot_probability) {
			user_pts = user_pts + shot_value;
			user_makes = user_makes + 1;
			return "Swoosh!";
		}
		else {
			user_misses = user_misses +1;
			return "Brick!";
		}
	}
	else {
		cpu_shots = cpu_shots + 1;
		if (sim_shot <= shot_probability) {
			cpu_pts = cpu_pts + shot_value;
			cpu_makes = cpu_makes + 1;
			return "Swoosh!";
		}
		else {
			cpu_misses = cpu_misses +1;
			return "Brick!";
		}
	}
}

//CPU Shot Selection Function
var cpu_shot_select = function() {
	var cpu_sim_shot = Math.random();
	if (cpu_sim_shot <= cpu_shot_a_prob) {
		return 'Midrange Jumper';
	}
	else if ((cpu_sim_shot > cpu_shot_a_prob) && (cpu_sim_shot <= cpu_shot_a_prob + cpu_shot_b_prob)){
		return 'Three Pointer'
	}
}

//CPU Shot Outcome Function
var cpu_shot_outcome = function() {
	shot_process(cpu_shot_select(), cpu_shot_a_pct, cpu_shot_b_pct);
	var result_txt = document.createTextNode(shot_sim('cpu'));
	var cpu_score = document.createTextNode(' '+cpu_player + ' has: ' + cpu_pts + ' points on ' + cpu_shots + ' shots.');
	var cpu_result_area = document.getElementById('cpu_result');
	clear(cpu_result_area);
	cpu_result_area.appendChild(result_txt);
	cpu_result_area.appendChild(cpu_score);
}

//Outcome Function: Runs shot_process, then shot_sim, then updates results in div below.
var outcome = function() {
	shot_process(this.innerHTML, user_shot_a_pct, user_shot_b_pct);

	var result_txt = document.createTextNode(shot_sim('user'));
	var user_score = document.createTextNode(" You've got: " + user_pts + " points on " + user_shots + " shots.")
	var user_result_area = document.getElementById('user_result');
	clear(user_result_area);
	user_result_area.appendChild(result_txt);
	user_result_area.appendChild(user_score);

	cpu_shot_outcome();
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