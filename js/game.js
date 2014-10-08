/* ===================================================
 * game.js
 * ===================================================
 * Written for: CP317-A
 * 
 * Assignment 1
 * 
 * Group: #4
 * 
 * Authors:
 *      Ranadeep Polavarapu - (120443120) - (pola3120@mylaurier.ca)
 *      Bruno Salapic - () - ()
 *      Lee Glendenning - (120289190) - (glen9190@mylaurier.ca)
 *      Ryan Burke - (120543180) - (burk3180@mylaurier.ca)
 * 
 * Version: Wednesday, Oct. 8, 2014
 * ========================================================== */

/**
 * Documentation and comments are based off Google's JavaScript style guide.
 */

// ----------------- DEBUG -- START -- Code below is debugging for developer's reference. ----------------- //
// DEBUG: Display the window's height and width just for the developer's reference.
console.log("%c[DEBUG]: Window - height=" + window.innerHeight + ", width=" + window.innerWidth, 'font-weight: bold; color: red;');

// DEBUG: Mouse to window coordinates logging in console. This will allow us to see coordinates for the entire window and the canvas.
window.addEventListener('mousedown', function(e) {
    var pos = {
        x: e.pageX - 0,
        y: e.pageY - 0
    };
    console.log("%c[DEBUG]: " + "x=" + pos.x + ", y=" + pos.y, 'font-weight: bold; color: blue;');
}, false);

// ----------------- DEBUG -- END -- Code above is debugging for developer's reference. ----------------- //

// ----------------- GAME -- START -- Code below is the core game code. ----------------- //

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
document.body.appendChild(canvas);

// DEBUG: Write to console the canvas's width and height for developer's reference.
console.log('[DEBUG]: canvas.width=' + canvas.width + ' canvas.height=' + canvas.height);

/**
 * IMAGES: All game related images.
 */

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterHeight = 32;
var monsterWidth = 30;
var xdir = 1;
var ydir = 1;
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Bullet image
var bulletReady = false;
var bulletImage = new Image();
bulletImage.onload = function () {
    bulletReady = true;
};
bulletImage.src = "images/fireball.gif";

// Game objects
var hero = {
    speed: 256 // movement in pixels per second
};
var monster = {};

/**
 * HIGH SCORE UTILITIES: Score stored using localStorage.
 */

var highScore = {
    createHighScore: function() {
        localStorage.highScore = 0;
        console.log("Scores are now persistent and stored through localStorage!");
    },
    
    destroyHighScore: function() {
        localStorage.removeItem("highScore");
        console.log("Scores are no longer being stored through localStorage!");
    },

    getHighScore: function() {
        if (!localStorage.highScore) {
            // Create this item in localStorage if it doesn't exist.
            localStorage.highScore = 0;
        }
        return localStorage.highScore;
    },

    setHighScore: function(score) {
        // Doesn't matter if highScore is already set or not in localStorage. Create it if it doesn't exist.
        localStorage.highScore = parseInt(score);
    },

    incrementHighScore: function() {
        // Increment highScore by 1.
        if (!localStorage.highScore) {
            // Create this item in localStorage if it doesn't exist.
            localStorage.highScore = 0;
        }
        localStorage.highScore = parseInt(localStorage.highScore) + 1;
    },
    
    decrementHighScore: function() {
        // Decrement highScore by 1.
        if (!localStorage.highScore) {
            // Create this item in localStorage if it doesn't exist.
            localStorage.highScore = 0;
        }
        localStorage.highScore = parseInt(localStorage.highScore) - 1;
    },

    resetHighScore: function() {
        localStorage.highScore = 0;
    }
}

/**
 * EVENT LISTENERS: All game related event listens for keyboard and mouse.
 */

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a monster
var reset = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function(modifier) {
    if (38 in keysDown && hero.y > 2) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown && hero.y < canvas.height - 34) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x > 2) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown && hero.x < canvas.width - 34) { // Player holding right
        hero.x += hero.speed * modifier;
    }

    // Are they touching?
    if (
        hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)
    ) {
        highScore.incrementHighScore();
        reset();
        console.log("[DEBUG]: Goblin caught");
    }
};

//function to calculate direction monster is moving as well as incremend/decrement its x and y position
var moveMonster = function(){

	if (xdir == 1 && monster.x >= canvas.width - 30)//heading right
		xdir = -1;
	else if (xdir == -1 && monster.x <= 0)//heading left
		xdir = 1;
		
	if (ydir == 1 && monster.y >= canvas.height - 32)//heading down
		ydir = -1;
	else if (ydir == -1 && monster.y <= 0)//heading up
		ydir = 1;

	monster.x += xdir;
	monster.y += ydir;
};

/**
 * RENDER UTILITIES: Utilities for rendering.
 */
var renderUtilities = {
    dynamicCanvasResize: function(canvasObj) {
        /**
         * Resizes the canvas based on the user's specifications.
         */
        canvasObj.height = window.innerHeight / 2;
        canvasObj.width = window.innerWidth / 2;
    }
}


// Draw everything
var render = function() {
    /**
     * Changes the canvas size upon browser's window height and width change. This occurs when you open a browser's Dev Tools or when
     * the user changes the size of the browser manually.
     */
    renderUtilities.dynamicCanvasResize(canvas);

    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "16px Calibri";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + highScore.getHighScore(), 40, 22);
};

// The main game loop
var main = function() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
setInterval(moveMonster, 5);

// ----------------- GAME -- END -- Code above is the core game code. ----------------- //
