addLayer("b", {
    name: "Lemon Buildings", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		total: new Decimal(0),
        best: new Decimal(0),
        research: new Decimal(0),
    }},
    microtabs: {
            stuff: {
                "Buildings": {
                    content: [
                        ["blank", "16px"],
                        ["row",[["milestone", 51], ["milestone", 52]]],
                        ["row",[["upgrade", 41], ["upgrade", 42], ["upgrade", 43]]],
                        ["blank", "16px"],

                    ]
                },
                "Research": {
                    
                    content: [
                        ["blank", "16px"],
                        
                        ["blank", "16px"],

                    ],
                    unlocked() { return hasUpgrade('b', 43)}
                },
            },

        },
    color: "#E6E6E6",
    requires: new Decimal(1e13), // Can be a function that takes requirement increases into account
    resource: "Building Space", // Name of prestige currency
    baseResource: "Lemons", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff) {
        if (player.b.unlocked)
            player.b.research = player.b.research.plus(1);
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    style() {return  {'background-color': '#999999'}},
    branches: [['l',1], ['s',1]],
    hotkeys: [
        {key: "b", description: "B: Reset for Building Space", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return player.t.points > 0},
    milestones: {
                        51: {
                            requirementDescription: "1 Building Space",
                            effectDescription: "gain 50% of lemon knowledge per second",
                            done () {
                            return player[this.layer].points.gte(1)
                            }
                        },
                        52: {
                            requirementDescription: "1000 Building Space",
                            effectDescription: "keep lemon stand milestones on Space reset",
                            done () {
                            return player[this.layer].points.gte(1000)
                            }
                        },
                       },
        upgrades: {
    41: {
    title: "Lemon Factory",
    description: "Money Increases your lemon gain",
    cost: new Decimal(1),
        effect() {
            return player.m.points.add(1).pow(0.15)

        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                    },
    42: {
    title: "Lemon Republic",
    description: "Increase lemon gain by 5",
    cost: new Decimal(10),
                    },
    43: {
    title: "Research Facility",
    description: "Begin generating research points. Unlock a new layer",
    cost: new Decimal(5000),
                    },
                    },
 infoboxes: {
        lore: {
            title: "Lemon Buildings",
            body() { return "You start to purchase space for new and better buildings to improve your production." },
        },
    },
    tabFormat: [

                ["infoboxes", "lore"],
                "main-display",
                "prestige-button",
                "blank",
                ["microtabs","stuff"],
            ]
})

addLayer("r", {
    name: "Research Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		total: new Decimal(0),
        best: new Decimal(0),
        
    }},
    microtabs: {
            stuff: {
                "Farming": {
                    content: [
                        ["blank", "16px"],
                        ["row",[["upgrade", 61]]],
                        ["blank", "16px"],

                    ]
                },
                "Economics": {
                    
                    content: [
                        ["blank", "16px"],
                        ["row",[["upgrade", 62], ["upgrade", 63]]],
                        ["blank", "16px"],

                    ],
                    
                },
                "Automation": {
                    
                    content: [
                        ["blank", "16px"],
                        
                        ["blank", "16px"],

                    ],
                    
                },
            },

        },
    color: "#4DCDDB",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Research Points", // Name of prestige currency
    baseResource: "Building Space", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let generation = new Decimal(1)
        if (hasUpgrade('m', 37)) generation = generation.times(2)
        return generation
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    style() {return  {'background-color': '#2C757D'}},
    branches: [['l',1], ['s',1]],
    hotkeys: [
        {key: "b", description: "R: Reset for Research Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    layerShown() { return player.t.points > 0},
    milestones: {
                        
                       },
        upgrades: {
            61: {
                title: "Smart bobots",
                description: "Add two lemon farm milestones",
                cost: new Decimal(25),
            },
            62: {
                title: "Finally Smarten Up",
                description: "Get 5 new Money Upgrades",
                cost: new Decimal(200),
            },
            63: {
                title: "Lemon Propaganda",
                description: "Unlock a new subtab under lemon stands",
                cost: new Decimal(1000),
            },
        },
 infoboxes: {
        lore: {
            title: "Lemon Buildings",
            body() { return "You start to purchase space for new and better buildings to improve your production." },
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