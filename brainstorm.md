# Theme: Shoot!
## Language: Javascript/HTML/CSS
## Name? Attack on Turrets
# Brainstorm
## Ideas - 

need to make it relate to the topic :)
the shooting mechanicsm needs to be good
maybe add interesting ways to actually shoot
dont want the game to be too generic i guess
planning this to be singleplayer

# Day 1
## Brainstorming Ideas for the game
	
#### A action-packed level-based game where there are interesting enemies that you need to shoot at the get better gear
#### A circle with the radius that the player must follow, if they get out of it, they DIE, level-based shooter-game where they have to dodge obstacles and shoot down enemies and bosses while trying to stay in the circle
#### A shooter battle-royale type game (maybe ais) where you fight in a big arena and be the last one to survive as u collect more loot lol
#### A multiplayer game with a huge arena and the players are circles that pick up ammo to shoot at other players
#### A triangle (omg not a circle :O) that points in the direction of your mouse and everytime you click, you "shoot" and you become the bullet (probably wont do this just thinking of ideas outside of something literally shooting at something)
#### A multiplayer game where when you shoot people you become smaller and they become bigger and the goal is to lose all of your mass

# Top 3 ideas (still brainstorming)

## Zerotix's Top 3
#### 1. A action-packed level-based game where there are interesting enemies that you need to shoot at the get better gear
#### 2. A multiplayer game where when you shoot people you become smaller and they become bigger and the goal is to lose all of your mass
#### 3. A circle with the radius that the player must follow, if they get out of it, they DIE, level-based shooter-game where they have to dodge obstacles and shoot down enemies and bosses while trying to stay in the circle

## Mathletesv's Top 3
#### 1. A circle with the radius that the player must follow, if they get out of it, they DIE, level-based shooter-game where they have to dodge obstacles and shoot down enemies and bosses while trying to stay in the circle
#### 2. A action-packed level-based game where there are interesting enemies that you need to shoot at the get better gear
#### 3. A multiplayer game where when you shoot people you become smaller and they become bigger and the goal is to lose all of your mass

# Apparently we got the same top 3 ideas
## We selected on combining these ideas :)
#### 1. A action-packed level-based game where there are interesting enemies that you need to shoot at the get better gear
#### 2. A circle with the radius that the player must follow, if they get out of it, they DIE, level-based shooter-game where they have to dodge obstacles and shoot down 

# Now we need to find a good name
## Name ideas [ 3 - 10 chars ]
#### Remcen (Remain central)
#### Stay In
#### Rein
#### Stray
#### Remence
#### Clora
#### Follow Me
### (will keep adding names as we work on it, not finalized)

# File strucutre prototypes
## Zerotix's Prototype
```md
- assets
	- images
		- files:: images that we will use in the game
	- sounds
		- files:: sound effects/music we use in the game
- maps/levels
		- files:: json files of our levels/maps :)
- src
	- client
		- game
			- files:: like update.js, render.js, input.js, state.js
		- objects
			- files:: game object classes we will use in the game
		- util
			- files:: useful files that we will require in other modules, like clamp, lerp, loadAsset, resize, round
		- (root files, not a directory)
		- index.html (the html of our app)
		- global.js (optional, exports an object that is created on the window object)
		- index.js (the main root, start file of the whole app)
		- references.js (exports an object with all the dom references we need)
		- style.css (css file of the app, potentially add several different ones if this gets too big lol
	- server
		- files:: basic web server index.js
- LICENSE :: license of the app, probably mit or gnu
- README :: uhh readme lol
```
## Mathletesv's Prototype
```md
(client folder)
- index.js:: for main loop
- /scripts
	- player.js:: player class
	- references.js:: constants
	- spot.js:: circle the player is trying to stay in
	- /enemies:: contains all enemy class files
	- /obstacles:: obstacles the player has to dodge
```

# Final Planned File Architecture

```md
- src
	- client
		- assets
			- images
				- files:: images that we will use in the game
			- sounds
				- files:: sound effects/music we use in the game
			- fonts
				- files:: fonts that we use
		- levels
			- files:: json files of our levels/maps :)
		- game
			- files:: like update.js, render.js, input.js, state.js
		- objects
			- enemy sub folder
				- files:: enemy classes
			- obstacle sub folder
				- files:: obstacles classes
			- guns sub folder
				- files:: gun classes in the game
			- files:: game object classes we will use in the game
		- util
			- files:: useful files that we will require in other modules, like clamp, lerp, loadAsset, resize, round
		- (root files, not a directory)
		- index.html (the html of our app)
		- global.js (optional, exports an object that is created on the window object)
		- index.js (the main root, start file of the whole app)
		- references.js (exports an object with all the dom references we need)
		- style.css (css file of the app, potentially add several different ones if this gets too big lol
		- constants.js (all of the constants in the app)
	- server
		- files:: basic web server index.js
- LICENSE.md :: license for the game
- README.md :: uhh readme lol
- BRAINSTORM.md:: look at this file now C:



```

## What ZeroTix is in charge of doing
- Graphics
- Main game loop
- Maintaining Code
- Coding most of the obstacles
- User Interface
- CSS styles


## What Mathletesv is in charge of doing
- Level and Map Design
- Optimizing the game
- Coding most of the enemies
- Making the core game physics

## What NKY5223 is in charge of doing
- Making graphics look cool
- Creating the art assets
- Light coding for the html and css
- Dark coding!!!! #DarkModeftw

## Current Game Idea
### A circle that moves in a predetermined path that the player must stay in to survive and needs to shoot at enemies to beat the area and you can make your circle bigger and BEAT the game!!

# Day 2

## Working on the code
### We are adding objects and setting up the basic code needed

## Map Format [ for a level ]
```yaml
{
	world:  {
		width: number,
		height: number,
	},
	obstacles: [
		{
			x: number,
			y: number,
			width: number,
			height: number,
			[optional]
			type: string,
		}
	],
	player: {
		x: number,
		y: number,
		type: string,
		[optional]
		radius: number,
		width: number,
		height: number,
		geometry: [],
	},
	text: [
		{
			data: string, (the actual text)
			x: number,
			y: number,
		}
	],
	coins: [
		{
			x: number,
			y: number,
		}
	],
	enemySpawn: [
		{	
			x: number,
			y: number,
			width: number,
			height: number,
			count: number,
			type: string,
			[optional]
			show: bool
		}
	],
	portal: {
		x: number,
		y: number,
		width: number,
		height: number,
		type: string,
	}
}
```
### Added some smoothing to the camera and finished the level parser
#### Making gun class and refining collision and bullets
### We have a game where you can move around and collide with platforms and there is a portal that you cannot collide with... and the graphics are... interesting
## Guns stats Format
```yaml
{
	guns: {
		gun_name: {
			[stats]
			ammo: number,
			reload: number, (ex. 0.1 in seconds)
			bulletRadius: number,
			bulletSpeed: number,
			bulletLength: number, (ex. how long till it dies)
			specials: string,
			[optional]
			image: Image
		}
	}
}
```
## Day 3

## Working on enemy and adding rescale gui

## Enemy Ideas
- moves in a circle
- moves in a spiral
- moves normally and bounces normally
- high knockback enemy
- fast enemy
- any of the previous types + shoots
- mixtures
- stuck in 1 place and shoots(turret)
- tries to go to player(a* algorithm if time)

## Obstacle Ideas

- Normal Obstacle
- Fake Obstacle
- Killing obstacle

## Powerup Ideas
- +50 health
- Speed boost
- Small immortality time
- Infinite ammo (wtf?)
- Ammo pack

## Gun Ideas
- you can charge it and make the bullet bigger
- slow reload but fast shoot and lots of damage (sniper)
- shoots several bullets in a spread with knockback to player (shotgun)
- shoots an expolsive that does damage to things around it (rpg)
- very low reload and spam gun that doesn't do much damage per shot (machinegun)
- shoots a constant stream of bullets (flamethrower)
- shoots a constant beam (lazer)

### We decided to remove the safeCircle concept from the game idea..

## Things we need to finish (in general)
- Turrets
- Enemy look at player
- 10 levels
- 3 guns

## Day 4

## Added enemy types, bullets, knockback and collision, damage effects, pistol model and removed aim indicator
### Currently only one test level in the game

## Day 5
 
## Things to add today
- The concept of coins (done)
- A enemy system and at least 3 different enemies (done)
- Add text to the map format and game(done)
- Finishing the two other gun icons
- Add arrow key support (done)
- A gun switching system and at least 3 different guns
- Add powerup ammo packs
- Add knockback when bullet hits enemy (done)
- A death effect when the player dies (done)
- Add turret spawners and Turrets (done)

#### Coin svg:
![coin](./src/client/assets/images/coin.svg)

## Day 6
NOthing interesting actually
## Day 7
### Today is the last day of the game jam and we have 4 working levels and level end screen working
## We decided on only doing 5 levels, making the boss very epic and code-alt helped a ton