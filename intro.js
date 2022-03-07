// Intro
// load scene
// load actors
// set scene
// set time = 0
// set actors
// start

function GameIntro(canvas){
	this.canvas = typeof(canvas) == "string" ? document.querySelector(canvas) : canvas;
	this.enemySpeed = 10;
	this.init();
}

GameIntro.prototype.init = function(){
	this.isPause = false;
	this.ctx = this.canvas.getContext("2d");
	this.terrainPattern = this.ctx.createPattern(resources.get(BACKGROUND), 'no-repeat');
	this.reset();
};

GameIntro.prototype.reset = function(){
	this.lastTime = Date.now();
	this.enemies = this.enemiesLayout();
	this.mini_enemies = this.miniEmenemiesLayout();
};

GameIntro.prototype.enemiesLayout = function(){
	var player = new GameObject([0, 0], //position
		new Sprite(UFOSHIP // url
		, [0, 0]   //pos
		, [26, 20] //size
	));
	var player2 = new GameObject([40, -40], //position
		new Sprite(UFOSHIP // url
		, [0, 0] //pos
		, [26, 20] //size
	));
	var player3 = new GameObject([-40, 40], //position
		new Sprite(UFOSHIP // url
		, [0, 0] //pos
		, [26, 20] //size
	));
	// player.pos = [this.canvas.width / 2 - player.sprite.size[0], this.canvas.height - player.sprite.size[1] * 4];
	return [player,player2,player3];
};

GameIntro.prototype.miniEmenemiesLayout = function(){
	var enemies = [];
	for (var i = 0; i < 20; i++) {
		enemies.push(new GameObject([-10,-10]
				,new Sprite(ESHIP,[0,0],[26,20, 10, 8])
			)
		)
	}
	return enemies;
};

GameIntro.prototype.main = function(self){
	var now = Date.now();
	var dt = (now - self.lastTime) / 1000.0;

	self.update(dt);
	self.render();

	self.lastTime = now;

	requestAnimationFrame(function(){
		self.main(self);
	});
};

GameIntro.prototype.render = function() {
	this.ctx.fillStyle = this.terrainPattern;
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	this.renderEntities(this.enemies);
	this.renderEntities(this.mini_enemies);
};

GameIntro.prototype.renderEntities = function(list) {
	for(var i = 0; i < list.length; i++) {
		this.renderEntity(list[i]);
	}
};

GameIntro.prototype.renderEntity = function(entity) {
	var ctx = this.ctx;
	ctx.save();
	ctx.translate(entity.pos[0], entity.pos[1]);
	entity.sprite.render(ctx);
	ctx.restore();
};

GameIntro.prototype.update = function(dt) {
	this.updateEntities(dt);
};

GameIntro.prototype.updateEntities = function(dt) {
	// // Update the player sprite animation
	// this.player.sprite.update(dt);

	// // Update all the bullets
	// for(var i = 0; i < this.bullets.length; i++) {
	// 	var bullet = this.bullets[i];

	// 	switch (bullet.dir) {
	// 	case 'up':
	// 		bullet.pos[1] -= this.bulletSpeed * dt;
	// 		break;
	// 	case 'down':
	// 		bullet.pos[1] += this.bulletSpeed * dt;
	// 		break;
	// 	default:
	// 		bullet.pos[0] += this.bulletSpeed * dt;
	// 	}

	// 	// Remove the bullet if it goes offscreen
	// 	if ( bullet.pos[1] < 0
	// 	  || bullet.pos[1] > this.canvas.height
	// 	  || bullet.pos[0] > this.canvas.width) {
	// 		this.bullets.splice(i, 1);
	// 		i--;
	// 	}
	// }

	// Update all the enemies
	if (!this.skipEnemies){
		for (var i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].pos[0] < Math.floor(this.canvas.width / 8)
			 || this.enemies[i].pos[1] < Math.floor(this.canvas.height / 8))
			{
				this.enemies[i].pos[0] += this.enemySpeed * dt;
				this.enemies[i].pos[1] += this.enemySpeed * dt;
				this.enemies[i].sprite.update(dt);
			} else {
				this.skipEnemies = true;
			}
		}
		for (var i = 0; i < this.mini_enemies.length; i++) {
			this.mini_enemies[i].pos[0] += this.enemySpeed * dt;
			this.mini_enemies[i].pos[1] += this.enemySpeed * dt;
			this.mini_enemies[i].sprite.update(dt);
		}
	} else {
		var line = 5;

		for (var i = 0; i < this.mini_enemies.length; i++) {
			if (i > line){
				line--;

			}
			this.mini_enemies[i].pos[0] += this.enemySpeed * dt + i + line;
			this.mini_enemies[i].pos[1] += this.enemySpeed * dt + i + line;
			this.mini_enemies[i].sprite.update(dt);
		}
	}
};

GameIntro.prototype.pause = function(){
	this.isPause = !this.isPause;
};
