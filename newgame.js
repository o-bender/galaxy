function GameObject(pos, sprite, health){
	this.pos = pos;
	this.sprite = sprite;
	this.health = health | 1;
	this.damage = 0;
}

function GameLevel(canvas, rss){
	this.canvas = typeof(canvas) == "string" ? document.querySelector(canvas) : canvas;

	this.player = [];
	this.enemies = [];
	this.bullets = [];
	this.explosions = [];
	// resources.load(rss);
	this.init();
}

GameLevel.prototype.init = function(){
	this.isGameOver = false;
	this.isPause = false;
	this.lastTime = 0;
	this.gameTime = 0;
	this.score = 0;
	this.lastFire = Date.now();
	this.ctx = this.canvas.getContext("2d");
	this.terrainPattern = this.ctx.createPattern(resources.get(BACKGROUND), 'no-repeat');
	this.reset();
}

GameLevel.prototype.main = function(self){
	if (self.isGameOver || self.isPause){
		return;
	}
	var now = Date.now();
	var dt = (now - self.lastTime) / 1000.0;

	self.update(dt);
	self.render();

	self.lastTime = now;

	requestAnimationFrame(function(){
		self.main(self);
	});
}

GameLevel.prototype.reset = function(){
	this.isGameOver = false;
	this.isPause = false;

	this.gameTime = 0;
	this.score = 0;
	this.lastTime = Date.now();

	this.bullets = [];
	this.player = this.playerLayout(this.canvas);
	this.enemies = this.enemyLayout(this.canvas);
	// this.main(this);
}

GameLevel.prototype.pause = function(){
	this.isPause = !this.isPause;
	if (!this.isPause){
		this.lastTime = Date.now();
		this.main(this);
	}
}

GameLevel.prototype.gameOver = function(){
	this.isGameOver = true;
	document.querySelector('.galaxy').dispatchEvent(new Event('game-over'));
}

GameLevel.prototype.checkWin = function(){
	if (this.enemies.length <= 0 ) {
		this.isGameOver = true;
		document.querySelector('.galaxy').dispatchEvent(new Event('user-win'));
	}
}

GameLevel.prototype.collides = function(x, y, r, b, x2, y2, r2, b2) {
	return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

GameLevel.prototype.boxCollides = function(pos, size, pos2, size2) {
	return this.collides(pos[0], pos[1],
		pos[0] + size[0], pos[1] + size[1],
		pos2[0], pos2[1],
		pos2[0] + size2[0], pos2[1] + size2[1]
	);
};

GameLevel.prototype.checkCollisions = function() {
	this.checkPlayerBounds(this.player);

	// Run collision detection for all enemies and bullets
	for(var i = 0; i < this.enemies.length; i++) {
		var enemy = this.enemies[i];
		var pos = enemy.pos;
		var size = enemy.sprite.size;

		for(var j = 0; j < this.bullets.length; j++) {
			var pos2 = this.bullets[j].pos;
			var size2 = this.bullets[j].sprite.size;

			if(this.boxCollides(pos, size, pos2, size2)) {
				enemy.damage++;
				if (enemy.damage >= enemy.health) {
					// Remove the enemy
					this.enemies.splice(i, 1);
					i--;

					// Add score
					this.updateScore(100 * enemy.health);

					// Add an explosion
					this.explosions.push({
						pos: pos,
						sprite: new Sprite(EXPLOSION, [0, 0], [0, 0], 16,
							[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
							null,true)
					});
				}
				// Remove the bullet and stop this iteration
				this.bullets.splice(j, 1);
				break;
			}
		}

		if(this.boxCollides(pos, size, player.pos, this.player.sprite.size)) {
			this.gameOver();
		}
	}

	for (var i = 0; i < this.enemies.length; i++) {
		if(this.enemies[i].pos[1] + this.enemies[i].sprite.size[1] > this.canvas.height) {
			this.gameOver();
		}
	}
};

GameLevel.prototype.checkPlayerBounds = function(game_obj) {
	// Check bounds
	var x_pos = game_obj.pos[0];
	var y_pos = game_obj.pos[1];
	var x_size = this.canvas.width - game_obj.sprite.size[0];
	var y_size = this.canvas.height - game_obj.sprite.size[1];
	if(x_pos < 0) {
		game_obj.pos[0] = 0;
	} else if(x_pos > x_size) {
		game_obj.pos[0] = x_size;
	}

	if(y_pos < 0) {
		game_obj.pos[1] = 0;
	} else if(y_pos > y_size) {
		game_obj.pos[1] = y_size;
	}
};

GameLevel.prototype.update = function(dt) {
	this.gameTime += dt;

	this.handleInput(dt);
	this.updateEntities(dt);
	this.checkCollisions();
	this.checkWin();
	// this.score_el.textContent += this.score;
};

GameLevel.prototype.updateScore = function(score){
	this.score += score;
	document.querySelector('.galaxy').dispatchEvent(new Event('update-score'));
}

GameLevel.prototype.handleInput = function(dt) {
	player = this.player;
    if(input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += this.playerSpeed * dt;
    }

    if(input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= this.playerSpeed * dt;
    }

    if(input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= this.playerSpeed * dt;
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += this.playerSpeed * dt;
    }

    if(input.isDown('SPACE') && !self.isGameOver && Date.now() - this.lastFire > 100) {
        var x = player.pos[0] + player.sprite.size[0] / 2;
        var y = player.pos[1] + player.sprite.size[1] / 2;

        this.bullets.push({pos: [x-2, y],
                      dir: 'up',
                      sprite: new Sprite(BULLET, [0, 0], [4, 4])
        });
        // bullets.push({ pos: [x, y],
        //                dir: 'forward',
        //                sprite: new Sprite('img/sprites.png', [0, 50], [9, 5]) });
        // bullets.push({ pos: [x, y],
        //                dir: 'down',
        //                sprite: new Sprite('img/sprites.png', [0, 60], [9, 5]) });


        this.lastFire = Date.now();
    }
};

// Draw everything
GameLevel.prototype.render = function() {
	this.ctx.fillStyle = this.terrainPattern;
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	// Render the player if the game isn't over

	if(!this.isGameOver) {
		this.renderEntity(this.player);
	}

	this.renderEntities(this.bullets);
	this.renderEntities(this.enemies);
	this.renderEntities(this.explosions);
};

GameLevel.prototype.renderEntities = function(list) {
	for(var i = 0; i < list.length; i++) {
		this.renderEntity(list[i]);
	}
};

GameLevel.prototype.renderEntity = function(entity) {
	this.ctx.save();
	this.ctx.translate(entity.pos[0], entity.pos[1]);
	entity.sprite.render(this.ctx);
	this.ctx.restore();
};

GameLevel.prototype.updateEntities = function(dt) {
	// Update the player sprite animation
	this.player.sprite.update(dt);

	// Update all the bullets
	for(var i = 0; i < this.bullets.length; i++) {
		var bullet = this.bullets[i];

		switch (bullet.dir) {
		case 'up':
			bullet.pos[1] -= this.bulletSpeed * dt;
			break;
		case 'down':
			bullet.pos[1] += this.bulletSpeed * dt;
			break;
		default:
			bullet.pos[0] += this.bulletSpeed * dt;
		}

		// Remove the bullet if it goes offscreen
		if ( bullet.pos[1] < 0
		  || bullet.pos[1] > this.canvas.height
		  || bullet.pos[0] > this.canvas.width) {
			this.bullets.splice(i, 1);
			i--;
		}
	}

	// Update level
	// Update all the enemies
	for (var i = 0; i < this.enemies.length; i++) {
		this.enemies[i].pos[1] += this.enemySpeed * dt;
		this.enemies[i].sprite.update(dt);

		// Remove if offscreen
		// if(enemies[i].pos[1] + enemies[i].sprite.size[1] < 0) {
		// 	enemies.splice(i, 1);
		// 	i--;
		// }
	}

	// Update all the explosions
	for (var i = 0; i < this.explosions.length; i++) {
		this.explosions[i].sprite.update(dt);

		// Remove if animation is done
		if (this.explosions[i].sprite.done) {
			this.explosions.splice(i, 1);
			i--;
		}
	}
};

function GameManager(canvas, levels){
	var self = this;

	// Init Canvas
	var canvas = typeof(canvas) == "string" ? document.querySelector(canvas) : canvas;
	var ctx = canvas.getContext("2d");
	canvas.width = 512;
	canvas.height = 480;

	// Variables
	var total_score = 0;
	var level_index = 0;
	var current_level;

	// Set interface Event Listeners
	var d = document.querySelector('.galaxy');
	var start_el = d.querySelector('.play-game');
	var pause_el = d.querySelector('.pause');
	var veil_el  = d.querySelector('.veil');
	var score_el = d.querySelector('.scores');

	d.addEventListener('user-win', function(){
		self.nextLevel();
		self.start();
	});
	d.addEventListener('game-over', function(){
		self.stop();
	});

	this.setPreview = function(){
		ctx.fillStyle = ctx.createPattern(resources.get(PREVIEW), 'repeat');
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	this.nextLevel = function(){
		if (current_level){
			current_level.pause();
		}
		current_level = levels[level_index++];
		if (!current_level){
			self.stop();
		}
		current_level.reset();
	};

	this.start = function(){
		veil_el.style.display = 'none';
		current_level.main(current_level);
	};

	this.stop = function(){
		self.setPreview();
		veil_el.style.display = 'block';
	};

	this.reset = function(){
		current_level.reset();
	};

	this.pause = function(event){
		event.stopPropagation();
		current_level.pause();
	};

	pause_el.addEventListener('click', this.pause);
	start_el.addEventListener('click', function(){
		self.reset();
		self.start();
	});

	d.addEventListener('update-score', function(){
		total_score += current_level.score;
		score_el.innerHTML = current_level.score;
	});
	this.stop();
}
