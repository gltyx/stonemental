const BREAK_UPGRADES = {
    'money\\1': {
        name: `Real-life Miner`,
        get description() { return `Increase your <b>Miners</b> by <b>+1</b> per level.` },
        cost(i) {
            let x = i.sumBase(1.01).add(1).pow(1.2).sumBase(1.1).mul(100)
            return x
        },
        bulk(i) {
            let x = i.div(100).sumBase(1.1,true).root(1.2).sub(1).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "money",

        effect(i) {
            let x = i
            return x
        },
        effDesc: x => "+"+format(x,0),
    },
    'money\\2': {
        name: `Pickaxe Upgrader`,
        get description() { return `Increase <b>Pickaxe Tier</b> by <b>+1</b> per level.` },
        cost(i) {
            let x = i.sumBase(1.01).pow(1.25).pow_base(2).mul(100)
            return x
        },
        bulk(i) {
            let x = i.div(100).log(2).root(1.25).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "money",

        effect(i) {
            let x = i
            return x
        },
        effDesc: x => "+"+format(x,0),
    },
    'money\\3': {
        name: `Compounding Income`,
        get description() { return `Increase your <b>income</b> by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(10,i.sumBase(1.01)).mul(1e6)
            return x
        },
        bulk(i) {
            let x = i.div(1e6).max(1).log(10).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "money",

        get base() { return Decimal.add(2, 0) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'money\\h1': {
        max: 1,
        unl: () => isModEnabled("hard"),
        get description() { return `Total Cobblestone boosts your <b>income</b>.` },
        cost: () => 1e9,
        curr: "money",

        effect(i) {
            let x = player.break.total.add(10).log10().pow(2)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'money\\4': {
        max: 1,
        name: `More Cobblestone`,
        get description() { return `Pickaxe Tier affects Cobblestone at a reduced rate.` },
        cost: () => 1e12,
        curr: "money",

        effect(i) {
            let t = tmp.pickaxe_tier.sub(1).max(0)
            let x = t.pow_base(1.1).mul(t.mul(.1).add(1))
            return x
        },
        effDesc: x => formatMult(x),
    },

    'break\\1': {
        max: 1,
        name: `Better Gold`,
        get description() { return `Improve the formula for Golden Stone.` },
        cost: () => 1,
        curr: "cobble",
    },
    'break\\2': {
        name: `"Breaking" Income`,
        get description() { return `Increase your <b>income</b> by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(2,i.sumBase(1.01).pow(1.25)).mul(10)
            return x
        },
        bulk(i) {
            let x = i.div(10).max(1).log(2).root(1.25).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "cobble",

        get base() { return Decimal.add(isModEnabled("easy") ? 2 : 1.5, 0) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'break\\h1': {
        unl: () => isModEnabled("hard"),
        max: 1,
        get description() { return `<b>Softer Stone H</b> affects the requirement of Quarry Tier at a square-rooted rate.` },
        cost: () => 100,
        curr: "cobble",
    },
    'break\\3': {
        max: 1,
        name: `Worth Quarry`,
        get description() { return `Increase your <b>income</b> by <b>${formatMult(this.base)}</b> per the highest Quarry Tier, starting at <b>2</b>.` },
        cost: () => 1e3,
        curr: "cobble",

        get base() { return 1.1 },
        effect(i) {
            let x = player.t_stone.max.sub(1).pow_base(this.base)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'break\\4': {
        max: 3,
        name: `Beginner Automation`,
        get description() { return `<b>[1]</b> Automatically enter the next Quarry Tier. <b>[2]</b> Automate <b>Golden Stone Upgrades</b> without spending any resource. <b>[3]</b> Passively generate <b>100%</b> of your Golden Stone gained on reset.` },
        cost(i) {
            return listedCost(i,[1e3,1e4,1e6])
        },
        bulk(i) {
            return listedCost(i,[1e3,1e4,1e6],true)
        },
        curr: "cobble",
    },
    'break\\5': {
        max: 1,
        get description() { return `<b>Miner</b> & <b>Hard Miner</b> are <b>10%</b> stronger.` },
        cost: () => 1e5,
        curr: "cobble",
    },
    'break\\6': {
        name: `More Cobblestone`,

        get description() { return `Increase Cobblestone by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(10,i.sumBase(1.01)).mul(1e6)
            return x
        },
        bulk(i) {
            let x = i.div(1e6).max(1).log(10).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "cobble",

        get base() { return Decimal.add(2, 0) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'break\\7': {
        max: 1,
        get description() { return `<b>Better Miner Cap</b> affects <b>Syngism Miner</b>.` },
        cost: () => 1e7,
        curr: "cobble",
    },
}

const BREAK = {
    get miners() {
        let x = Decimal.add(1, upgradeEffect("money\\1"))

        return x
    },
    get miner_effect() {
        let m = tmp.miners.sub(1).max(0)

        let x = m.pow_base(1.1).mul(m.add(1))

        return x
    },

    get pickaxe_tier() {
        let x = Decimal.add(1, upgradeEffect("money\\2"))

        return x
    },
    get pickaxe_tier_effect() {
        let t = tmp.pickaxe_tier.sub(1).max(0)

        let x = t.add(1).mul(t.pow_base(1.5)).mul(t.sqr().pow_base(1.01))

        return x
    },
}

function updateBreakTemp() {
    tmp.miners = BREAK.miners
    tmp.miner_effect = BREAK.miner_effect

    tmp.pickaxe_tier = BREAK.pickaxe_tier
    tmp.pickaxe_tier_effect = BREAK.pickaxe_tier_effect
}