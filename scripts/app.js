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
var user_3p_makes = 0;
var cpu_3p_makes = 0;
var user_3p_shots = 0;
var cpu_3p_shots = 0;

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

		display(player.toUpperCase(), 'user_player_table');
		img_display(img_src, 'user_player_table_img');
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

		display(player.toUpperCase(), 'cpu_player_table');
		img_display(img_src, 'cpu_player_table_img');
	}
}

//Enable or Disable Function

var able = function() {
	if (user_player != undefined && cpu_player != undefined) {
		var buttons = document.getElementsByClassName('disabled');
		buttons[0].classList.remove('disabled');
		buttons[0].classList.remove('disabled');
		buttons[0].classList.remove('disabled');
		buttons[0].classList.remove('disabled');
		var selectors = document.getElementsByClassName('pulse');
		selectors[0].classList.remove('pulse');
		selectors[0].classList.remove('pulse');
		console.log(selectors);
		document.getElementById('test').classList.add('pulse');
		document.getElementById('test').classList.add('bnf');
	}
}

//Reset Game Function
var reset_game = function() {
	user_pts = 0;
	cpu_pts = 0;
	shot_probability = 0;
	user_shots = 0;
	user_makes = 0;
	user_misses =0;
	user_3p_shots=0;
	user_3p_makes=0;
	cpu_shots =0;
	cpu_makes =0;
	cpu_misses =0;
	cpu_3p_shots=0;
	cpu_3p_makes=0;

	display(user_pts, 'user_pts');
	display(cpu_pts, 'cpu_pts');
	display(user_makes, 'user_makes');
	display(user_shots, 'user_shots');
	display((((user_makes/user_shots).toFixed(2)*100)).toFixed(0)+'%', 'user_fg%');
	display((((user_3p_makes/user_3p_shots).toFixed(2)*100)).toFixed(0)+'%', 'user_3p%');

	display(cpu_makes, 'cpu_makes');
	display(cpu_shots, 'cpu_shots');
	display((((cpu_makes/cpu_shots).toFixed(2)*100)).toFixed(0)+'%', 'cpu_fg%');
	display((((cpu_3p_makes/cpu_3p_shots).toFixed(2)*100)).toFixed(0)+'%', 'cpu_3p%');
}

//Player Selection Function
var select = function(){
	if (user_player != undefined && cpu_player !=undefined) {
		reset_game();
	}
	if (this.innerHTML === 'Carmelo Anthony') {
		player = this.innerHTML;
		context = 'Small Forward - NYK #7';
		season = '2015-2016 Season';
		img_src = 'images/canthony.png';
		shot_a_pct = 0.42;
		shot_b_pct = 0.34;
		cpu_shot_a_prob = 0.76;
		cpu_shot_b_prob = 0.24;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Chris Paul') {
		player = this.innerHTML;
		context = 'Point Guard - LAC #3';
		season = '2015-2016 Season';
		img_src = 'images/cpaul.png';
		shot_a_pct = 0.53;
		shot_b_pct = 0.37;
		cpu_shot_a_prob = 0.71;
		cpu_shot_b_prob = 0.29;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Dirk Nowitzki') {
		player = this.innerHTML;
		context = 'Power Forward - DAL #41';
		season = '2015-2016 Season';
		img_src = 'images/dnowitzki.png';
		shot_a_pct = 0.48;
		shot_b_pct = 0.37;
		cpu_shot_a_prob = 0.69;
		cpu_shot_b_prob = 0.31;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Dwyane Wade') {
		player = this.innerHTML;
		context = 'Shooting Guard - MIA #3';
		season = '2015-2016 Season';
		img_src = 'images/dwade.png';
		shot_a_pct = 0.34;
		shot_b_pct = 0.16;
		cpu_shot_a_prob = 0.96;
		cpu_shot_b_prob = 0.04;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'James Harden') {
		player = this.innerHTML;
		context = 'Shooting Guard - HOU #13';
		season = '2015-2016 Season';
		img_src = 'images/jharden.png';
		shot_a_pct = 0.43;
		shot_b_pct = 0.36;
		cpu_shot_a_prob = 0.59;
		cpu_shot_b_prob = 0.41;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'John Wall') {
		player = this.innerHTML;
		context = 'Point Guard - WSH #2';
		season = '2015-2016 Season';
		img_src = 'images/jwall.png';
		shot_a_pct = 0.37;
		shot_b_pct = 0.35;
		cpu_shot_a_prob = 0.76;
		cpu_shot_b_prob = 0.24;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Kobe Bryant') {
		player = this.innerHTML;
		context = 'Shooting Guard - LAL #24';
		season = '2005-2006 Season';
		img_src = 'images/kbryant.png';
		shot_a_pct = 0.48;
		shot_b_pct = 0.35;
		cpu_shot_a_prob = 0.76;
		cpu_shot_b_prob = 0.24;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Kevin Durant') {
		player = this.innerHTML;
		context = 'Small Forward - OKC #35';
		season = '2015-2016 Season';
		img_src = 'images/kdurant.png';		
		shot_a_pct = 0.54;
		shot_b_pct = 0.39;
		cpu_shot_a_prob = 0.65;
		cpu_shot_b_prob = 0.35;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Kyrie Irving') {
		player = this.innerHTML;
		context = 'Point Guard - CLE #2';
		season = '2015-2016 Season';
		img_src = 'images/kirving.png';		
		shot_a_pct = 0.50;
		shot_b_pct = 0.32;
		cpu_shot_a_prob = 0.70;
		cpu_shot_b_prob = 0.30;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Kawhi Leonard') {
		player = this.innerHTML;
		context = 'Small Forward - SAS #2';
		season = '2015-2016 Season';
		img_src = 'images/kleonard.png';		
		shot_a_pct = 0.50;
		shot_b_pct = 0.44;
		cpu_shot_a_prob = 0.73;
		cpu_shot_b_prob = 0.27;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Klay Thompson') {
		player = this.innerHTML;
		context = 'Shooting Guard - GSW #11';
		season	= '2015-2016 Season';
		img_src = 'images/kthompson.png';
		shot_a_pct = 0.42;
		shot_b_pct = 0.43;
		cpu_shot_a_prob = 0.53;
		cpu_shot_b_prob = 0.47;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'LeBron James') {
		player = this.innerHTML;		
		context = 'Small Forward - CLE #23';
		season = '2015-2016 Season';
		img_src = 'images/logos/ljames.png';
		shot_a_pct = 0.34;
		shot_b_pct = 0.31;
		cpu_shot_a_prob = 0.80;
		cpu_shot_b_prob = 0.20;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Paul George') {
		player = this.innerHTML;
		context = 'Small Forward - IND #13';
		season = '2015-2016 Season';
		img_src = 'images/pgeorge.png';		
		shot_a_pct = 0.35;
		shot_b_pct = 0.37;
		cpu_shot_a_prob = 0.61;
		cpu_shot_b_prob = 0.39;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Russell Westbrook') {
		player = this.innerHTML;
		context = 'Point Guard - OKC #0';
		season = '2015-2016 Season';
		img_src = 'images/rwestbrook.png';		
		shot_a_pct = 0.43;
		shot_b_pct = 0.30;
		cpu_shot_a_prob = 0.76;
		cpu_shot_b_prob = 0.24;
		var element = this;
		user_or_cpu_display(element);
	}
	else if (this.innerHTML === 'Steph Curry') {
		player = this.innerHTML;
		context = 'Point Guard - GSW #30';
		season = '2015-2016 Season';
		img_src = 'images/scurry.png';
		shot_a_pct = 0.45;
		shot_b_pct = 0.45;
		cpu_shot_a_prob = 0.45;
		cpu_shot_b_prob = 0.55;
		var element = this;
		user_or_cpu_display(element);
	}
	var buttons = document.getElementsByClassName('shot_type');
	if (buttons[0].classList.contains('disabled') === true) {
		able();
	}
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
			if (shot_value === 3) {
				user_3p_makes = user_3p_makes + 1;
				user_3p_shots = user_3p_shots +1;
			}
			return "Swoosh!";
		}
		else {
			user_misses = user_misses +1;
			if (shot_value === 3) {
				user_3p_shots = user_3p_shots +1;
			}
			return "Brick!";
		}
	}
	else {
		cpu_shots = cpu_shots + 1;
		if (sim_shot <= shot_probability) {
			cpu_pts = cpu_pts + shot_value;
			cpu_makes = cpu_makes + 1;
			if (shot_value === 3) {
				cpu_3p_makes = cpu_3p_makes + 1;
				cpu_3p_shots = cpu_3p_shots +1;
			}
			return "Swoosh!";
		}
		else {
			cpu_misses = cpu_misses +1;
			if (shot_value === 3) {
				cpu_3p_shots = cpu_3p_shots +1;
			}
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
	shot_sim('cpu');
	display(cpu_pts, 'cpu_pts');
	display(cpu_makes, 'cpu_makes');
	display(cpu_shots, 'cpu_shots');
	display((((cpu_makes/cpu_shots).toFixed(2)*100)).toFixed(0)+'%', 'cpu_fg%');
	display((((cpu_3p_makes/cpu_3p_shots).toFixed(2)*100)).toFixed(0)+'%', 'cpu_3p%');
}

//Outcome Function: Runs shot_process, then shot_sim, then updates results in div below.
var outcome = function() {
	var element = this;
	if (element.classList.contains('disabled') != true) {
		shot_process(element, this.innerHTML, user_shot_a_pct, user_shot_b_pct);
		shot_sim('user');
		display(user_pts, 'user_pts');
		display(user_makes, 'user_makes');
		display(user_shots, 'user_shots');
		display((((user_makes/user_shots).toFixed(2)*100)).toFixed(0)+'%', 'user_fg%');
		display((((user_3p_makes/user_3p_shots).toFixed(2)*100)).toFixed(0)+'%', 'user_3p%');
		cpu_shot_outcome();
	}
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