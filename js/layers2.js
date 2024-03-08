effect() {
        return {
        pointBoost: (player[this.layer].add(1).pow(0.5))
        }
    },
     effectDescription() {
            eff = this.effect();
            return {
            "which are boosting lemon gain by ×" + format(eff.pointBoost)
            }

    },