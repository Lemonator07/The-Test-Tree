addLayer("p", {
    name: "Lemon Knowledge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "K", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		total: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#F5E902",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Lemon Knowledge", // Name of prestige currency
    baseResource: "Lemons", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    style() {return  {'background-color': '#545118'}},
    branches: [['l',1]],
    hotkeys: [
        {key: "l", description: "L: Reset for Lemon Knowledge", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
        upgrades: {
        11: {
    title: "Grow More Lemons",
    description: "Double your lemon gain.",
    cost: new Decimal(1),
        },
        12: {
    title: "Use your Lemon Knowledge",
    description: "Lemon Knowledge increases your Lemon gain",
    cost: new Decimal(3),
        effect() {
            return player[this.layer].points.add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                    },
        13: {
    title: "Eat some Lemons",
    description: "Lemons boost Lemon Knowledge gain",
    cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                        },
        14: {
    title: "Grow a lot more Lemons",
    description: "Quintuple your lemon gain.",
    cost: new Decimal(15),
            },
        15: {
            title: "Lemonception",
            description: "Lemons boost Lemons",
            cost: new Decimal(50),
                    effect() {
                        return player.points.add(1).pow(0.10)
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                                },
        16: {
            title: "Back to basics",
            description: "Double your lemon gain.",
            cost: new Decimal(150),
                    },
        17: {
            title: "This seems obvious",
            description: "Boost lemons by lemon farms",
            cost: new Decimal(250),
                    effect() {
                        return player.l.points.add(1).pow(0.50)
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                                },
                    },
})
addLayer("l", {
    startData() { return {                  // startData is a function that returns default data for a layer.
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        total: new Decimal(0),
        best: new Decimal(0),
    }},

    color: "#318C0D",                       // The color for this layer, which affects many elements.
    resource: "Lemon Farms",            // The name of this layer's main prestige resource.
    symbol: "F",
    row: 1,                                 // The row this layer is on (0 is the first row).
    style() {return  {'background-color': '#102E04'}},
    baseResource: "Lemon Knowledge",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(50),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {
            mult = new Decimal(1)
            if (hasMilestone('l', 1)) mult = mult.times(player.l.points.pow(-0.3))
            return mult
        },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    milestones: {
                    0: {
                        requirementDescription: "5 Lemon Farms",
                        effectDescription: "Lemon gain x3",
                        done () {
                        return player[this.layer].points.gte(5)
                        }
                    },
                    1: {
                        requirementDescription: "8 Lemon Farms",
                        effectDescription: "Reduce Lemon Farm cost by Lemon Farms",
                        done () {
                        return player[this.layer].points.gte(8)
                        }
                    },
             },
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(new Decimal(x).mul(x)).add(1)},
            title() {
                            return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Hire more workers"
                        },
            display() { return "boosts lemon gain based on amount owned.<br>" + "<br>cost:" + this.cost() + "<br>" + format(buyableEffect(this.layer, this.id))+"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(x) {
             return getBuyableAmount(this.layer, this.id).add(1)
             },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"x" },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                if (hasUpgrade('l', 11)) player.points = player[this.layer].points.add(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },

        },
        12: {
           cost(x) { return new Decimal(1).mul(new Decimal(x).mul(x)).add(1)},
           title() {
                                       return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Improve Lemon Farming Methods"
                                   },
          display() { return "boosts lemon gain based on amount owned.<br>" + "<br>cost:" + this.cost() + "<br>" + format(buyableEffect(this.layer, this.id))+"^" },
           canAfford() { return player[this.layer].points.gte(this.cost()) },
           effect(x) {
                         return getBuyableAmount(this.layer, this.id).add(1).pow(.1)
                        },
                       effectDisplay() { return format(buyableEffect(this.layer, this.id))+"^" },
           buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                 if (hasUpgrade('l', 12)) player.points = player[this.layer].points.add(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },

                },

    },

})
