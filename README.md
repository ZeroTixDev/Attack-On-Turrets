# **Attack on Turrets** - Game Jam Submission
# Overview
**Attack on Turrets**, a epic top down shooter style game developed in HTML/CSS/JS with no libraries. I wanted to build this game because I never joined a game jam before and the [Kaboom Jam](https://replit.com/talk/announcements/KABOOM-JAM/127934) came out of nowhere. **Shoot enemies, dodge bullets, beat levels**
![picture](https://attack-on-turrets.zerotixdev.repl.co/assets/images/picture.png)

# **Game Link**
### [https://attack-on-turrets.zerotixdev.repl.co - Attack on Turrets](https://attack-on-turrets.zerotixdev.repl.co)
# How to Play
You are a circle with a gun. What do you do? Destroy enemies and beat levels, of course!

## **Controls**
- **WASD** or **Arrow Keys** for movement
- **Mouse** to aim and shoot
- **P** to Pause


# Contributions / Credits
## Music:
- GTA5 (not owned material)
- ZeroTix
## Art: 
- ZeroTix
- Code-alt
## Code: 
- ZeroTix ( coding most of codebase )
- Mathletesv ( collision and bug fixes )
- Code-alt ( level design and bug fixes )

# Development
## Day 1
### Most of this day was spent brainstorming possible ideas
#### We settled on combining these two ideas but decided to scrap it after a few days
## Day 2
### On the second day, we established a json map format that we continued to use for the maps the day after
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
#### By the end of this day, we had a super basic game going and started working on the gun class
## Day 3
### We worked on the scaling aspect of the game, its completely fullscreen but scales to a ratio of 16:9
#### We gathered some enemy ideas, gun ideas, powerup ideas and decided to scrap some fo the idea we did earlier (check Day 1)
## Day 4
### We added support for multiple enemy types, bullets, knockback and collision physics, damage effects, and ZeroTix made a pistol model
## Day 5
### This day, we added a ton of things as we realized we have less time than we thought. Coins, dynamic enemy system, arrow key support, death effect and music were added today
## Day 6
### Oh no, only one day left. Guess what... we procrastinated.
## Day 7
### Today is the last day and we have to code fast, making 4 levels, coding more enemies, making a boss, and trying to finish this README as quick as possible so i can post it AAAA

# File Architecture
```yaml
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
# FAQ
## Q: How many levels are there
## A: 5 levels so far but we might add more



# Bugs
- Nothing here yet! If you find one please contact us via Discord (Lol)

# Discord
- ZeroTix#6300
- Mathletesv#6308
- code-alt#9877

### Oh and did I forget to tell you, this project is entirely open source
##### Whew. Finally we're done.