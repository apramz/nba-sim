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
	if ((!event.target.matches('#userDropBtn')) && (!event.target.matches('#cpuDropBtn')) && (!event.target.matches('#cpuDropBtn img')) && (!event.target.matches('#userDropBtn img'))) {
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
var display = function(data, stats_area_id) {
	var stat = document.createTextNode(data);
	var stat_area = document.getElementById(stats_area_id);
	clear(stat_area);
	stat_area.appendChild(stat);
}

//Image Display Function
var img_display = function(img_src, img_area_id) {
	var img = document.createElement('img');
	img.src= img_src;
	var img_area= document.getElementById(img_area_id);
	clear(img_area);
	img_area.appendChild(img);
}

//User or CPU Display & Shot Pct Setting Function

var user_or_cpu_display = function(element) {
	if (element.classList.contains('user')) {
		display(player, 'user_player');
		display(context, 'user_context');
		display(season, 'user_season');
		img_display(img_src, 'user_img');
		display(shot_a_pct*100+'%', 'user_shot_a_pct');
		display(shot_b_pct*100+'%', 'user_shot_b_pct');
		user_shot_a_pct = shot_a_pct;
		user_shot_b_pct = shot_b_pct;
		user_player = player;
	}
	else if (element.classList.contains('cpu')) {
		display(player, 'cpu_player');
		display(context, 'cpu_context');
		display(season, 'cpu_season');
		img_display(img_src, 'cpu_img');
		display(shot_a_pct*100+'%', 'cpu_shot_a_pct');
		display(shot_b_pct*100+'%', 'cpu_shot_b_pct');
		cpu_shot_a_pct = shot_a_pct;
		cpu_shot_b_pct = shot_b_pct;
		cpu_player = player;
	}
}

//Player Selection Function
var select = function(){
	if (this.innerHTML === 'Steph Curry') {
		player = this.innerHTML;
		context = 'Point Guard - GSW #30';
		season = '2015-2016 Season';
		img_src = 'images/scurry.png';
		shot_a_pct = 0.50;
		shot_b_pct = 0.45;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Klay Thompson') {
		player = this.innerHTML;
		context = 'Shooting Guard - GSW #11';
		season	= '2015-2016 Season';
		img_src = 'images/kthompson.png';
		shot_a_pct = 0.40;
		shot_b_pct = 0.43;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'LeBron James') {
		player = this.innerHTML;		
		context = 'Small Forward - CLE #23';
		season = '2015-2016 Season';
		img_src = 'images/ljames.png';
		shot_a_pct = 0.54;
		shot_b_pct = 0.30;
		cpu_shot_a_prob = 0.75;
		cpu_shot_b_prob = 0.25;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Kyrie Irving') {
		player = this.innerHTML;
		context = 'Point Guard - CLE #2';
		season = '2015-2016 Season';
		img_src = 'images/kirving.png';		
		shot_a_pct = 0.43;
		shot_b_pct = 0.38;
		cpu_shot_a_prob = 0.65;
		cpu_shot_b_prob = 0.35;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Kevin Durant') {
		player = this.innerHTML;
		context = 'Small Forward - OKC #35';
		season = '2015-2016 Season';
		img_src = 'images/kdurant.png';		
		shot_a_pct = 0.45;
		shot_b_pct = 0.39;
		cpu_shot_a_prob = 0.55;
		cpu_shot_b_prob = 0.45;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Russell Westbrook') {
		player = this.innerHTML;
		context = 'Point Guard - OKC #0';
		season = '2015-2016 Season';
		img_src = 'images/rwestbrook.png';		
		shot_a_pct = 0.41;
		shot_b_pct = 0.32;
		cpu_shot_a_prob = 0.55;
		cpu_shot_b_prob = 0.45;
		var element = this;
		user_or_cpu_display(element);
	}
	var user_result_area = document.getElementById('user_result');
	clear(user_result_area);
}

//Shot Processing Function: Takes shot type and assigns values for this type of shot.
var shot_process = function(element, type, shot_a_pct, shot_b_pct) {
	if (element != null) {
		if (element.classList.contains('shot_a')) {
			shot_value = 2;
			shot_probability = shot_a_pct;
		}
		else if (element.classList.contains('shot_b')) {
			shot_value = 3;
			shot_probability = shot_b_pct;
		}
	}
	else {
		if (type === 'Midrange Jumper') {
			shot_value = 2;
			shot_probability = shot_a_pct;
			console.log(type);
		}
		else if (type === 'Three Pointer') {
			shot_value = 3;
			shot_probability = shot_b_pct;
		}
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
	var element = null;
	shot_process(element, cpu_shot_select(), cpu_shot_a_pct, cpu_shot_b_pct);
	var result_txt = document.createTextNode(shot_sim('cpu'));
	var cpu_score = document.createTextNode(' '+cpu_player + ' has: ' + cpu_pts + ' points on ' + cpu_shots + ' shots.');
	var cpu_result_area = document.getElementById('cpu_result');
	clear(cpu_result_area);
	cpu_result_area.appendChild(result_txt);
	cpu_result_area.appendChild(cpu_score);
}

//Outcome Function: Runs shot_process, then shot_sim, then updates results in div below.
var outcome = function() {
	var element = this;
	shot_process(element, this.innerHTML, user_shot_a_pct, user_shot_b_pct);
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