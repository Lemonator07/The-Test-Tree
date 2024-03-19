addLayer("t", {
    startData() { return {                  // startData is a function that returns default data for a layer.
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},
microtabs: {
        stuff: {
            "Tier 1 Upgrades": {
                content: [
                    ["blank", "16px"],
                    ["row",[["upgrade", 101], ["upgrade", 102], ["upgrade", 103]]],
                    ["row", [["upgrade", 104], ["upgrade", 105]]],
                    ["row", [["upgrade", 106]]],
                    ["blank", "16px"],

                ]
            },
        },

    },

    color: "#B3B3B3",                       // The color for this layer, which affects many elements.
    resource: "Tier Points",            // The name of this layer's main prestige resource.
    symbol: "T",
    row: 'side',                                 // The row this layer is on (0 is the first row).
    style() {return  {'background-color': '#696969'}},
    baseResource: "Lemons",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e13),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {
            mult = new Decimal(1)
            return mult
        },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasAchievement('ach', 25)},

    upgrades: {

       101: {
                  title: "This seems familiar",
                  description: "Double your Lemon gain.",
                  cost: new Decimal(1e13),
                  currencyDisplayName: "Lemons",
                  currencyInternalName: "points",
                          },
       102: {
                  title: "Farming Boost",
                  description: "Double your Lemon Farm gain.",
                  cost: new Decimal(1e14),
                  currencyDisplayName: "Lemons",
                  currencyInternalName: "points",
                          },
        103: {
                  title: "Profit Boost",
                  description: "Double your Lemon Stand gain.",
                  cost: new Decimal(1e15),
                  currencyDisplayName: "Lemons",
                  currencyInternalName: "points",
                          },
        104: {
                  title: "Next Level",
                  description: "Triple your Lemon gain.",
                  cost: new Decimal(1e30),
                  currencyDisplayName: "Lemons",
                  currencyInternalName: "points",
                          },     
        105: {
                  title:  "Getting Stronger",
                  description: "Triple Money Gain",
                  cost: new Decimal(1e35),
                  currencyDisplayName: "Lemons",
                  currencyInternalName: "points",
                          },      
        106: {
                  title: "This is convient",
                  description: "Keep Lemon Knowledge Upgrades on ALL RESETS",
                  cost: new Decimal(1e50),
                  currencyDisplayName: "Lemons",
                  currencyInternalName: "points",
                          },                                                           
    },

infoboxes: {
        lore: {
            title: "Corporation",
            body() { return "As you look upon your lemon empire, you realize you can't do this alone. You set out to build a corporation capable of producing the lemons you desire." },
        },
    },
     tabFormat: [
            "main-display",
            "prestige-button",
            "blank",
            ["microtabs","stuff"],
        ]
})