addLayer("ach", {
    startData() { return {                  // startData is a function that returns default data for a layer.
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#FFFFC8",                       // The color for this layer, which affects many elements.
    resource: "achievements",            // The name of this layer's main prestige resource.
    symbol: "A",
    row: 'side',
    style() {return  {'background-color': '#373728'}},                                  // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(0),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    achievements: {
        11: {
            name: "<h4 style='margin-top:5px'>First Lemon</h4>",
            done() { return true},
            tooltip: "Get one lemon",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        12: {
            name: "<h4 style='margin-top:5px'>Many more to come</h4>",
            done() { return player.points.gte(100)},
            tooltip: "Get 100 lemons",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        13: {
                    name: "<h4 style='margin-top:5px'>Farming Time</h4>",
                    done() { return player.l.points.gte(1)},
                    tooltip: "Get 1 farm",
                    style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
                    onComplete() {player['ach'].points = player['ach'].points.add(1) },
                },
        14: {
            name: "<h4 style='margin-top:5px'>Hay Day</h4>",
            done() { return player.l.points.gte(10)},
            tooltip: "Get 10 farms",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        15: {
            name: "<h4 style='margin-top:5px'>Big Money</h4>",
            done() { return player.m.points.gte(1000)},
            tooltip: "Get $1000",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        21: {
            name: "<h4 style='margin-top:5px'>Lemon Energy Conduit</h4>",
            done() { return player.s.points.gte(3)},
            tooltip: "Get 3 Lemon Stands",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        22: {
            name: "<h4 style='margin-top:5px'>Bigger Big Money</h4>",
            done() { return player.m.points.gte(100000000)},
            tooltip: "Get $100,000,000",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        23: {
            name: "<h4 style='margin-top:5px'>Hay Day 2: Blowhog Edition</h4>",
            done() { return player.l.points.gte(15)},
            tooltip: "Get 15 Lemon Farms",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        24: {
            name: "<h4 style='margin-top:5px'>Business 2: Goat time</h4>",
            done() { return player.s.points.gte(15)},
            tooltip: "Get 15 Lemon Stands",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        25: {
            name: "<h4 style='margin-top:5px'>Finally, Lemonson</h4>",
            done() { return player.points.gte(10000000000000)},
            tooltip: "Reach 1e13 Lemons",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        31: {
            name: "<h4 style='margin-top:5px'>New Era</h4>",
            done() { return player.b.points.gte(1)},
            tooltip: "Reach 1 Building Space",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
            unlocked() { return hasAchievement('ach', 25)},
        },
        32: {
            name: "<h4 style='margin-top:5px'>Newer Era</h4>",
            done() { return player.b.points.gte(5000)},
            tooltip: "Reach 5000 Building Space",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
            unlocked() { return hasAchievement('ach', 25)},
        },

    },
    tabFormat: [
        ["display-text", function() { return "<h3> Achievements </h3><br> <h4 style='margin-top:5px'> just a collection of your accomplishments. </h4><br> You have <h1 style='color: #FFF29E'> " + player['ach'].points + "</h1> achievements"}],
        "blank",
        ["display-text", function() { return " Act 1<br> <h1 style='color: #FFF29E' >Lemon Small Business</h1>"}],
        "blank",
        ["row", [["achievement", 11], ["achievement", 12], ["achievement", 13], ["achievement", 14], ["achievement", 15]]],
        ["row", [["achievement", 21], ["achievement", 22], ["achievement", 23], ["achievement", 24], ["achievement", 25]]],
        "blank",
        "blank",
        ["display-text", function() { return " Act 2<br>" + (hasAchievement('ach',25)?" <h1 style='color: #FFF29E' >Lemon Corporation</h1>": "<h1 style='color: #FFF29E' >????? ???????????</h1>")}],
        "blank",
        ["row", [["achievement", 31], ["achievement", 32], ["achievement", 33], ["achievement", 34], ["achievement", 35]]],
        ["row", [["achievement", 41], ["achievement", 42], ["achievement", 43], ["achievement", 44], ["achievement", 45]]],
        "blank",
        "blank",
        ["display-text", function() { return " Act 3<br>" + (hasAchievement('ach',46)?" <h1 style='color: #FFF29E' >Lemon Planet</h1>": "<h1 style='color: #FFF29E' >????? ??????</h1>")}],
        "blank",
        ["row", [["achievement", 51], ["achievement", 52], ["achievement", 53], ["achievement", 54], ["achievement", 55], ["achievement", 56]]],
        ["row", [["achievement", 61], ["achievement", 62], ["achievement", 63], ["achievement", 64], ["achievement", 65], ["achievement", 66]]],
    ],
})