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
    microtabs: {
        stuff: {
            "Upgrades": {
                content: [
                    ["blank", "16px"],
                    ["row",[["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15,]]],
                    ["row",[["upgrade", 16], ["upgrade", 17]]],
                    ["blank", "16px"],

                ]
            },
            
        },

    },
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
        //mult = new Decimal(1000000000)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
     passiveGeneration() {
            let generation = new Decimal(0)
            if (hasMilestone('l', 2)) generation = generation.add(.5)
            if (hasMilestone('b', 51)) generation = generation.add(.5)
            return generation
        },
        doReset(resettingLayer) {
                    let keep = [];
                    if (hasMilestone("m", 11) && resettingLayer == "s")
                        keep.push("upgrades")
                    if (hasMilestone("m", 11) && resettingLayer == "l")
                        keep.push("upgrades")
                    if (layers[resettingLayer].row > this.row)
                        layerDataReset("p", keep)
                },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    style() {return  {'background-color': '#545118'}},
    branches: [['l',1], ['s',1]],
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
            return player[this.layer].points.add(1).pow(0.25)

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
 infoboxes: {
        lore: {
            title: "Lemon Knowledge",
            body() { return "You decide to learn something for once. Maybe these lemons will come in handy" },
        },
    },
    tabFormat: [

        "main-display",
        "prestige-button",
        "infoboxes",
        "blank",
        ["microtabs","stuff"],
    ]
})

addLayer("l", {
    startData() { return {                  // startData is a function that returns default data for a layer.
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        total: new Decimal(0),
        best: new Decimal(0),
    }},
    microtabs: {
        stuff: {
            "Milestones": {
                            content: [
                                ["blank", "16px"],
                                "milestones"

                            ]
                        },
            "Buyables": {
                content: [
                    ["blank", "16px"],
                    ["row",[["buyable", 11], ["buyable", 12]]],
                    ["blank", "16px"],

                ]
            },
            
        },

    },
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
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {
            mult = new Decimal(1)
            if (hasMilestone('l', 1)) mult = mult.times(player.l.points.add(1).log10().add(1).pow(-1.2))
            if (hasUpgrade('m', 35)) mult = mult.times(.5)
            if (hasUpgrade('t', 102)) mult = mult.times(.5)
            return mult
        },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    canBuyMax() { return hasMilestone("l", 4) },
hotkeys: [
        {key: "f", description: "F: Reset for Lemon Farms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown() { return hasUpgrade('p', 15) || this.layer.points > 0 || hasMilestone(this.layer, 0)},
    milestones: {
                    0: {
                        requirementDescription: "1 Lemon Farms",
                        effectDescription: "Lemon gain x3",
                        done () {
                        return player[this.layer].points.gte(1)
                        }
                    },
                    1: {
                        requirementDescription: "8 Lemon Farms",
                        effectDescription: "Reduce Lemon Farm cost by Lemon Farms",
                        done () {
                        return player[this.layer].points.gte(8)
                        }
                    },
                    2: {
                            requirementDescription: "10 Lemon Farms",
                            effectDescription: "start passively gaining 50% of knowledge per second. Also unlock a new layer",
                            done () {
                            return player[this.layer].points.gte(10)
                            }
                        },
                    3: {
                            requirementDescription: "15 Lemon Farms",
                            effectDescription: "Boost Lemons And Money by 10",
                            done () {
                            return player[this.layer].points.gte(15)
                            }
                        },
                    4: {
                            requirementDescription: "25 Lemon Farms",
                            effectDescription: "You can buy-max lemon farms",
                            done () {
                            return player[this.layer].points.gte(25)
                            },
                            unlocked() { return (hasUpgrade('r', 61))},

                        },
                    5: {
                            requirementDescription: "50 Lemon Farms",
                            effectDescription: "x10 Lemons",
                            done () {
                            return player[this.layer].points.gte(50)
                            },
                            unlocked() { return (hasUpgrade('r', 61))},

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
infoboxes: {
        lore: {
            title: "Lemon Farms",
            body() { return "You begin to actually farm the lemons instead of picking them yourself. Should come in handy." },
        },
    },
    tabFormat: [

        "main-display",
        "prestige-button",
        "infoboxes",
        "blank",
        ["microtabs","stuff"],
    ]
})
addLayer("s", {
    startData() { return {                  // startData is a function that returns default data for a layer.
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        total: new Decimal(0),
        best: new Decimal(0),
    }},
    microtabs: {
        stuff: {
           "Milestones": {
                           content: [
                               ["blank", "16px"],
                               "milestones"

                           ]
                       },
            "Upgrades": {
                content: [
                    ["blank", "16px"],
                    ["row",[["upgrade", 21], ["upgrade", 23]]],
                    ["blank", "16px"],

                ]
            },
            "Marketing": {
                content: [
                    ["blank", "16px"],
                   
                    ["blank", "16px"],

                ],
                unlocked() { return hasUpgrade('r', 63)}
            },
            
            
        },

    },
    color: "#6B6B6B",                       // The color for this layer, which affects many elements.
    resource: "Lemon Stands",            // The name of this layer's main prestige resource.
    symbol: "S",
    row: 1,                                 // The row this layer is on (0 is the first row).
    style() {return  {'background-color': '#333333'}},
    baseResource: "Lemon Knowledge",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1000),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {
            mult = new Decimal(1)
            if (hasMilestone('l', 1)) mult = mult.times(player.s.points.add(1).log10().add(1).pow(-.2))
            if (hasUpgrade('t', 103)) mult = mult.times(.5)
            if (hasUpgrade('m', 36)) mult = mult.times(.333)
            return mult
        },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    canBuyMax() { return hasMilestone("b", 52) },
        doReset(resettingLayer) {
                    let keep = [];
                    if (hasMilestone("b", 52) && resettingLayer == "b")
                        keep.push("milestones")
                    if (layers[resettingLayer].row > this.row)
                        layerDataReset("s", keep)
                },
    branches: [['m',1]],
hotkeys: [
        {key: "s", description: "S: Reset for Lemon Stands", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

 layerShown() { return hasMilestone('l', 2) || this.layer.points > 0 || hasUpgrade(this.layer, 21) || hasMilestone(this.layer, 21)},
 milestones: {
                     21: {
                         requirementDescription: "1 Lemon Stand",
                         effectDescription: "Money gain x3",
                         done () {
                         return player[this.layer].points.gte(1)
                         }
                     },
                     22: {
                         requirementDescription: "5 Lemon Stands",
                         effectDescription: "Reduce Lemon Stand cost by Lemon Stands",
                         done () {
                         return player[this.layer].points.gte(5)
                         }
                     },
                     23: {
                             requirementDescription: "8 Lemon Stands",
                             effectDescription: "Money gain x5",
                             done () {
                             return player[this.layer].points.gte(8)
                             }
                         },
                    24: {
                             requirementDescription: "10 Lemon Stands",
                             effectDescription: "Keep Money Upgrades on Farm and Stand Resets",
                             done () {
                             return player[this.layer].points.gte(10)
                             }
                         },
                    25: {
                             requirementDescription: "15 Lemon Stands",
                             effectDescription: "Boost Lemons And Money by 10",
                             done () {
                             return player[this.layer].points.gte(15)
                             }
                         },
              },
    upgrades: {
       21: {
           title: "Better Business",
           description: "Double your Money gain.",
           cost: new Decimal(3),
                   },
        23: {
           title: "Business practices",
           description: "Money is boosted by Lemon Stands again.",
           cost: new Decimal(5),
            effect() {
                        return player.s.points.add(1).pow(0.50)
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
                   },
    },



infoboxes: {
        lore: {
            title: "Lemon Stands",
            body() { return "You create some simple wooden stands to sell your lemons. Hopefully you can expand once you have some profit." },
        },
    },
    tabFormat: [

        "main-display",
        "prestige-button",
        "infoboxes",
        "blank",
        ["microtabs","stuff"],
    ]
})

addLayer("m", {
    startData() { return {                  // startData is a function that returns default data for a layer.
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        total: new Decimal(0),
        best: new Decimal(0),
    }},
    microtabs: {
        stuff: {
            "Milestones": {
                            content: [
                                ["blank", "16px"],
                                "milestones"

                            ]
                        },
            "Upgrades": {
                content: [
                    ["blank", "16px"],
                    ["row",[["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34], ["upgrade", 35],]],
                    ["row",[["upgrade", 36], ["upgrade", 37], ["upgrade", 38], ["upgrade", 39], ["upgrade", 40],]],
                    ["blank", "16px"],

                ]
            },
            
        },

    },
    position: 1,
    color: "#E6BF4B",                       // The color for this layer, which affects many elements.
    resource: "Money",            // The name of this layer's main prestige resource.
    symbol: "M",
    row: 0,                                 // The row this layer is on (0 is the first row).
    style() {return  {'background-color': '#826C2B'}},
    baseResource: "Lemons",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.45,                          // "normal" prestige gain is (currency^exponent).

    passiveGeneration() {
            let generation = new Decimal(0)
            if (hasMilestone('m', 10)) generation = generation.add(1)
            return generation
        },
    gainMult() {
            mult = new Decimal(1)
            mult = mult.times(player.s.points.add(1))
            if (hasUpgrade('s', 21)) mult = mult.times(2)
            if (hasUpgrade('m', 32)) mult = mult.times(2)
            if (hasUpgrade('m', 33)) mult = mult.times(upgradeEffect('m', 33))
            if (hasUpgrade('s', 23)) mult = mult.times(upgradeEffect('s', 23))
            if (hasMilestone('s', 21)) mult = mult.times(3)
            if (hasMilestone('s', 23)) mult = mult.times(5)
            if (hasMilestone('l', 3)) mult = mult.times(10)
            if (hasMilestone('s', 25)) mult = mult.times(10)
            return mult
        },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
doReset(resettingLayer) {
                    let keep = [];
                    if (hasMilestone("s", 24) && resettingLayer == "s")
                        keep.push("upgrades")
                    if (hasMilestone("s", 24) && resettingLayer == "l")
                        keep.push("upgrades")
                    if (hasMilestone("m", 11) && resettingLayer == "s")
                        keep.push("milestones")
                    if (hasMilestone("m", 11) && resettingLayer == "l")
                        keep.push("milestones")
                    if (layers[resettingLayer].row > this.row)
                        layerDataReset("m", keep)
                },

hotkeys: [
        {key: "m", description: "M: Reset for Money", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

     layerShown() { return player.s.points > 0 || hasMilestone(this.layer, 11)},
milestones: {
                    10: {
                        requirementDescription: "$10",
                        effectDescription: "Earn 100% of Money per second",
                        done () {
                        return player[this.layer].points.gte(10)
                        }
                    },
                    11: {
                        requirementDescription: "$100,000,000",
                        effectDescription: "Keep Lemon Knowledge Upgrades",
                        done () {
                        return player[this.layer].points.gte(100000000)
                        }
                    },


             },
    upgrades: {
        31: {
                   title: "Purchase more land",
                   description: "Double your Lemon gain.",
                   cost: new Decimal(1000),
                           },
        32: {
                  title: "Purchase more stands",
                  description: "Double your Money gain.",
                  cost: new Decimal(10000),
        },
        33: {
                 title: "Start Juicing Lemons",
                 description: "Increase your Money gain based on lemons.",
                 cost: new Decimal(1000000),
                 effect() {
                                         return player.points.add(1).pow(0.05)
                                     },
                                     effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                },
        34: {
                         title: "Start Juicing Money?",
                         description: "Increase your Lemon gain based on Money.",
                         cost: new Decimal(10000000),
                         effect() {
                                                 return player.m.points.add(1).pow(0.1)
                                             },
                                             effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                        },
        35: {
                  title: "Lower farm working costs",
                  description: "Double your Lemon Farm gain.",
                  cost: new Decimal(1000000000),
        },
        36: {
            title: "Back on the grind...",
            description: "Triple Lemon Stand Gain",
            cost: new Decimal(1e17),
  },
  37: {
    title: "..the cybergrind",
    description: "Double your Research Gain",
    cost: new Decimal(1e19),
},
38: {
    title: "Me when I farm",
    description: "Increase Lemon Gain based on Lemon Farms",
    cost: new Decimal(1e20),
    effect() {
        return player.l.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

},
39: {
    title: "I'm already running out of ideas for these names",
    description: "uhhhhhhhhhhh",
    cost: new Decimal(1e21),
    effect() {
        return player.points.add(1).pow(0.03)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

},
40: {
    title: "This one's a doozy",
    description: "Increase Lemon Gain by Lemons",
    cost: new Decimal(1e30),
    effect() {
        return player.points.add(1).pow(0.04)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

},
    },


infoboxes: {
        lore: {
            title: "Money",
            body() { return "Profit from the lemon stands you made, you can reinvest these profits to increase your lemon gain" },
        },
    },
    tabFormat: [

        "main-display",
        "prestige-button",
        "infoboxes",
        "blank",
        ["microtabs","stuff"],
    ]
})

