let modInfo = {
	name: "The Lemon Tree",
	id: "lemon tree",
	author: "Lemonator",
	pointsName: "Lemons",
	modFiles: ["act-1.js", "tree.js", "side-layers.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.4",
	name: "Lemons V4",
}

let changelog = `<h1>Changelog:</h1><br>
    <h2>Polishing</h2><br>
	<h3>v0.4</h3><br>
	    - Added Achievements<br>
		- Balancing Changes<br>
		- Fixed a lot of bugs<br>
		- LORE!!!!!<br>
		- Added 7 Milestones. <br>
    <h2>Capitalism</h2><br>
	<h3>v0.3</h3><br>
		- Added 2 layers.<br>
		- Added 7 Upgrades. <br>
		- Added 2 Milestones. <br>
    <h2>Farming Time</h2><br>
	<h3>v0.2</h3><br>
		- Added 1 layer.<br>
		- Added 2 Upgrades. <br>
		- Added 2 Buyables. <br>
		- Added 2 Milestones. <br>
    <h2>The Beginning</h2><br>
	<h3>v0.1</h3><br>
		- Added 1 layer.<br>
		- Added 5 Upgrades.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 14)) gain = gain.times(5)
	if (hasUpgrade('p', 15)) gain = gain.times(upgradeEffect('p', 15))
	if (hasUpgrade('p', 16)) gain = gain.times(2)
    if (hasUpgrade('p', 17)) gain = gain.times(upgradeEffect('p', 17))
    if (hasUpgrade('m', 31)) gain = gain.times(2)
    if (hasUpgrade('m', 34)) gain = gain.times(upgradeEffect('m', 34))
    gain = gain.times(buyableEffect('l', 11))
    gain = gain.pow(buyableEffect('l', 12))
    //gain = gain.times(1000000000000) //for testing purposes
    if (hasMilestone('l', 0)) gain = gain.times(3)
    if (hasMilestone('l', 3)) gain = gain.times(10)
    if (hasMilestone('s', 25)) gain = gain.times(10)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
 `<h4 style='margin-top:5px;opacity:0.5'> current endgame: reach 1e13 lemons</h4>`
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e13"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}