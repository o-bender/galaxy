// Levels


function GameLevelOne(canvas, rss, playerSpeed, bulletSpeed, enemySpeed){
	this.canvas = typeof(canvas) == "string" ? document.querySelector(canvas) : canvas;

	this.player = [];
	this.enemies = [];
	this.bullets = [];
	this.explosions = [];

	this.playerSpeed = playerSpeed || 200;
	this.bulletSpeed = bulletSpeed || 500;
	this.enemySpeed  = enemySpeed  || 10;

	// resources.load(rss);
	// resources.onReady(this.init);
	this.init();
};
GameLevelOne.prototype = Object.create(GameLevel.prototype);
GameLevelOne.prototype.constructor = GameLevelOne;
GameLevelOne.prototype.playerLayout = function(){
	this.player = new GameObject([0, 0], //position
		new Sprite(GUN // url
		, [0, 0]   //pos
		, [19, 20] //size
	));
	this.player.pos = [this.canvas.width / 2 - this.player.sprite.size[0], this.canvas.height - this.player.sprite.size[1] * 4];
	return this.player;
};
GameLevelOne.prototype.enemyLayout = function(){
	this.enemies = [];
	// enemies level 
	var enemy_size = {x:26, y:20};
	var enemy_border = {x:12, y:16}; // Расстояние между объектами
	var enemy_width = enemy_size.x + enemy_border.x;
	var enemy_height = enemy_size.y + enemy_border.y;
	var enemies_in_line = Math.floor(this.canvas.width / enemy_width);
	var scr_border = (this.canvas.width - (enemies_in_line * enemy_width - enemy_border.x)) / 2;

	for (var line = 0; line < 5; line++) {
		for (var i = 0; i < enemies_in_line; i++) {
			this.enemies.push(new GameObject([i * enemy_width + scr_border, line * enemy_height] //position
				, new Sprite(ESHIP, [0, 0], [enemy_size.x, enemy_size.y]) //sprite
			));
		}
	}
	return this.enemies;
}

function GameLevelTwo(canvas, rss, playerSpeed, bulletSpeed, enemySpeed){
	this.canvas = typeof(canvas) == "string" ? document.querySelector(canvas) : canvas;

	this.player = [];
	this.enemies = [];
	this.bullets = [];
	this.explosions = [];

	this.playerSpeed = playerSpeed || 200;
	this.bulletSpeed = bulletSpeed || 500;
	this.enemySpeed  = enemySpeed  || 10;

	// resources.load(rss);
	// resources.onReady(this.init);
	this.init();
};
GameLevelTwo.prototype = Object.create(GameLevel.prototype);
GameLevelTwo.prototype.constructor = GameLevelTwo;
GameLevelTwo.prototype.playerLayout = function(){
	this.player = new GameObject([0, 0], //position
		new Sprite(GUN // url
		, [0, 0]   //pos
		, [19, 20] //size
	));
	this.player.pos = [this.canvas.width / 2 - this.player.sprite.size[0], this.canvas.height - this.player.sprite.size[1] * 4];
	return this.player;
};
GameLevelTwo.prototype.enemyLayout = function(){
	this.enemies = [];
	// enemies level 
	var enemy_size = {x:26, y:20};
	var enemy_border = {x:12, y:16}; // Расстояние между объектами
	var enemy_width = enemy_size.x + enemy_border.x;
	var enemy_height = enemy_size.y + enemy_border.y;
	var enemies_in_line = Math.floor(this.canvas.width / enemy_width);
	var scr_border = (this.canvas.width - (enemies_in_line * enemy_width - enemy_border.x)) / 2;

	for (var line = 0; line < 3; line++) {
		for (var i = 0; i < enemies_in_line; i++) {
			this.enemies.push(new GameObject([i * enemy_width + scr_border, line * enemy_height] //position
				, new Sprite(ESHIP2, [0, 0], [enemy_size.x, enemy_size.y]) //sprite
				, 3
			));
		}
	}
	for (var line = 3; line < 5; line++) {
		for (var i = 0; i < enemies_in_line; i++) {
			this.enemies.push(new GameObject([i * enemy_width + scr_border, line * enemy_height] //position
				, new Sprite(ESHIP, [0, 0], [enemy_size.x, enemy_size.y]) //sprite
				, 1
			));
		}
	}
	return this.enemies;
}


function GameLevelThree(canvas, rss, playerSpeed, bulletSpeed, enemySpeed){
	this.canvas = typeof(canvas) == "string" ? document.querySelector(canvas) : canvas;

	this.player = [];
	this.enemies = [];
	this.bullets = [];
	this.explosions = [];

	this.playerSpeed = playerSpeed || 200;
	this.bulletSpeed = bulletSpeed || 500;
	this.enemySpeed  = enemySpeed  || 10;

	// resources.load(rss);
	// resources.onReady(this.init);
	this.init();
};
GameLevelThree.prototype = Object.create(GameLevel.prototype);
GameLevelThree.prototype.constructor = GameLevelThree;
GameLevelThree.prototype.playerLayout = function(){
	this.player = new GameObject([0, 0], //position
		new Sprite(GUN // url
		, [0, 0]   //pos
		, [19, 20] //size
	));
	this.player.pos = [this.canvas.width / 2 - this.player.sprite.size[0], this.canvas.height - this.player.sprite.size[1] * 4];
	return this.player;
};
GameLevelThree.prototype.enemyLayout = function(){
	this.enemies = [];
	// enemies level 
	var enemy_size = {x:25, y:20};
	var enemy_border = {x:12, y:16}; // Расстояние между объектами
	var enemy_width = enemy_size.x + enemy_border.x;
	var enemy_height = enemy_size.y + enemy_border.y;
	var enemies_in_line = 5; //Math.floor(this.canvas.width / enemy_width);
	var scr_border = (this.canvas.width - (enemies_in_line * enemy_width - enemy_border.x)) / 2;

	for (var i = 0; i < enemies_in_line; i++) {
		this.enemies.push(new GameObject(
			[i * enemy_width + scr_border, 1 * enemy_height] //position
			, new Sprite(ESHIP3, [0, 0], [enemy_size.x, enemy_size.y]) //sprite
			, 3
		));
	}

	var enemies_in_line = 9;
	var scr_border = (this.canvas.width - (enemies_in_line * enemy_width - enemy_border.x)) / 2;
	for (var i = 0; i < enemies_in_line; i++) {
		this.enemies.push(new GameObject(
			[i * enemy_width + scr_border, 2 * enemy_height] //position
			, new Sprite(ESHIP3, [0, 0], [enemy_size.x, enemy_size.y]) //sprite
			, 3
		));
	}

	var enemies_in_line = 11;
	var scr_border = (this.canvas.width - (enemies_in_line * enemy_width - enemy_border.x)) / 2;
	for (var i = 0; i < enemies_in_line; i++) {
		if ([2,4,6,8].indexOf(i) >= 0){
			continue;
		}
		this.enemies.push(new GameObject(
			[i * enemy_width + scr_border, 3 * enemy_height] //position
			, new Sprite(ESHIP3, [0, 0], [enemy_size.x, enemy_size.y]) //sprite
			, 3
		));
	}

	var enemies_in_line = 13;
	var scr_border = (this.canvas.width - (enemies_in_line * enemy_width - enemy_border.x)) / 2;
	for (var i = 0; i < enemies_in_line; i++) {
		this.enemies.push(new GameObject(
			[i * enemy_width + scr_border, 4 * enemy_height] //position
			, new Sprite(ESHIP3, [0, 0], [enemy_size.x, enemy_size.y]) //sprite
			, 3
		));
	}

	var enemies_in_line = 11;
	var scr_border = (this.canvas.width - (enemies_in_line * enemy_width - enemy_border.x)) / 2;
	for (var i = 0; i < enemies_in_line; i++) {
		if ([2,5,8].indexOf(i) >= 0){
			continue;
		}
		this.enemies.push(new GameObject(
			[i * enemy_width + scr_border, 5 * enemy_height] //position
			, new Sprite(ESHIP3, [0, 0], [enemy_size.x, enemy_size.y]) //sprite
			, 3
		));
	}

	return this.enemies;
}