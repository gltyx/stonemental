const UPGRADES = {
    'stone\\1': {
        name: `Miner`,

        get description() { return `Increase Stone gain by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(2,i.sumBase(1.01).pow(1.2)).mul(10)
            return x
        },
        bulk(i) {
            let x = i.div(10).max(1).log(2).root(1.2).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "stone",

        get base() { return Decimal.add(isModEnabled("easy") ? 2 : 1.5, upgradeEffect('stone\\2',0)).add(simpleUpgradeEffect("gold\\7",0)) },
        get strength() { return simpleUpgradeBonus("break\\5",1.1) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'stone\\2': {
        get max() { return Decimal.add(10,upgradeEffect("stone\\7",0)) },

        name: `Better Miner`,
        get description() { return `Increase <b>Miner</b>'s base by <b>+0.15</b> per level.` },
        cost(i) {
            let x = Decimal.pow(10,i.pow(1.5)).mul(100)
            return x
        },
        bulk(i) {
            let x = i.div(100).max(1).log(10).max(0).root(1.5)
            return x.add(1).floor()
        },
        curr: "stone",

        // get strength() { return simpleUpgradeBonus("stone\\h2",1.5) },
        effect(i) {
            let x = i.mul(0.15)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'stone\\3': {
        unl: () => player.t_stone.unl,
        name: `Deep Miner`,

        get description() { return `Increase ${tmp.t_stoneName} gain by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(5,i.sumBase(1.01).pow(1.1)).mul(1e4)
            return x
        },
        bulk(i) {
            let x = i.div(1e4).max(1).log(5).max(0).root(1.1).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "stone",

        get base() { return Decimal.add(3, simpleUpgradeBonus('gold\\1',upgradeEffect('t_stone\\2',0),0)) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'stone\\4': {
        unl: () => player.t_stone.max.gte(2),
        name: `Tiered Miner`,

        get description() { return `Increase ${tmp.t_stoneName} gain by <b>${formatMult(this.base)}</b> per level, based on Quarry Tier.` },
        cost(i) {
            let x = Decimal.pow(3,i.sumBase(1.01).pow(2)).mul(1e5)
            return x
        },
        bulk(i) {
            let x = i.div(1e5).max(1).log(3).max(0).root(2).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "stone",

        get strength() { return simpleUpgradeBonus("stone\\5",1.5) },
        get base() { return player.t_stone.max.add(1) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'stone\\h1': {
        unl: () => isModEnabled("hard") && player.t_stone.max.gte(5),
        name: `Soft Stone H`,

        get description() { return `Decrease the strength of ${tmp.t_stoneName} and the requirement of Quarry Tier by <b>0.25</b> per level.` },
        cost(i) {
            let x = Decimal.pow(10,i.sumBase(1.1)).mul(1e9)
            return x
        },
        bulk(i) {
            let x = i.div(1e9).max(1).log(10).max(0).sumBase(1.1,true)
            return x.add(1).floor()
        },
        curr: "stone",

        effect(i) {
            let x = i.mul(.25)
            return x
        },
        effDesc: x => "-"+format(x)+" to Quarry Tier",
    },
    'stone\\h2': {
        unl: () => isModEnabled("hard") && player.t_stone.max.gte(9),
        name: `Softer Stone H`,

        get description() { return `Increase the divisor of the strength of ${tmp.t_stoneName} based on this level.` },
        cost(i) {
            let x = Decimal.pow(1e3,i.sumBase(1.1).pow(1.5)).mul(1e21)
            return x
        },
        bulk(i) {
            let x = i.div(1e21).max(1).log(1e3).max(0).root(1.5).sumBase(1.1,true)
            return x.add(1).floor()
        },
        curr: "stone",

        effect(i) {
            let x = i.mul(.2).add(1).root(2)
            return x
        },
        effDesc: x => formatMult(x.pow(-1),3)+" to Quarry Tier",
    },
    'stone\\5': {
        unl: () => player.t_stone.max.gte(11),
        max: 1,

        get description() { return `<b>Tiered Miner</b> is <b>50%</b> stronger.` },
        cost: () => 1e30,
        curr: "stone",
    },
    'stone\\6': {
        unl: () => player.t_stone.max.gte(19),
        get max() { return Decimal.add(10,simpleUpgradeBonus("break\\7",upgradeEffect("stone\\7",0),0)) },

        name: `Synergism Miner`,
        get description() { return `Increase <b>Hard Miner</b>'s base by <b>+25%</b> per level.` },
        cost(i) {
            let x = Decimal.pow(100,i.pow(1.5)).mul(isModEnabled('hard') ? 1e54 : 1e75)
            return x
        },
        bulk(i) {
            let x = i.div(isModEnabled('hard') ? 1e54 : 1e75).max(1).log(100).max(0).root(1.5)
            return x.add(1).floor()
        },
        curr: "stone",

        effect(i) {
            let x = i.mul(0.25).add(1)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'stone\\h3': {
        unl: () => isModEnabled("hard") && player.t_stone.max.gte(20),
        max: 1,

        get description() { return `<b>Tenfold</b> Golden Stone.` },
        cost: () => 1e60,
        curr: "stone",
    },
    'stone\\7': {
        max: 20,
        unl: () => player.t_stone.max.gte(23),

        name: `Better Miner Cap`,
        get description() { return `Raise <b>Better Miner</b>'s cap by <b>+5</b> per level.` },
        cost(i) {
            let x = Decimal.pow(1e10,i.add(1).pow(2)).mul(1e100)
            return x
        },
        bulk(i) {
            let x = i.div(1e100).max(1).log(1e10).max(0).root(2)
            return x.floor()
        },
        curr: "stone",

        effect(i) {
            let x = i.mul(5)
            return x
        },
        effDesc: x => "+"+format(x,0),
    },
    'stone\\8': {
        unl: () => player.t_stone.max.gte(26),
        name: `Antique Stone`,

        get description() { return `Increase your <b>income</b> by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(10,i.sumBase(1.01)).mul(1e160)
            return x
        },
        bulk(i) {
            let x = i.div(1e160).max(1).log(10).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "stone",

        get base() { return Decimal.add(1.1, 0) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },

    't_stone\\1': {
        name: `Hard Miner`,

        get description() { return `Increase ${tmp.t_stoneName} gain by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(3,i.sumBase(1.01).pow(1.1)).mul(100)
            return x
        },
        bulk(i) {
            let x = i.div(100).max(1).log(3).max(0).root(1.1).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "t_stone",

        get base() { return Decimal.add(2, upgradeEffect('t_stone\\2',0)).mul(upgradeEffect("stone\\6")) },
        get strength() { return simpleUpgradeBonus("break\\5",1.1) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    't_stone\\2': {
        max: 10,

        name: `Harder Miner`,
        get description() { return `Increase <b>Hard Miner</b>'s base by <b>+0.2</b> per level.` },
        cost(i) {
            let x = Decimal.pow(10,i.pow(1.5)).mul(1e3)
            return x
        },
        bulk(i) {
            let x = i.div(1e3).max(1).log(10).max(0).root(1.5)
            return x.add(1).floor()
        },
        curr: "t_stone",

        // get strength() { return simpleUpgradeBonus("stone\\h2",1.5) },
        effect(i) {
            let x = i.mul(0.2)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    't_stone\\3': {
        unl: () => player.t_stone.tier.gte(3),
        max: 1,
        name: `Stone's Tiered Boost`,

        get description() { return `Stone is boosted by unspent ${tmp.t_stoneName}.` },
        cost: ()=>1e6,
        curr: "t_stone",

        effect(i) {
            let x = player.t_stone.stone.add(10).log10().mul(tmp.t_stoneHard).pow(player.t_stone.tier.pow(hasUpgrade("t_stone\\5") ? .85 : .75))
            return x
        },
        effDesc: x => formatMult(x),
    },
    't_stone\\4': {
        unl: () => player.t_stone.tier.gte(8),
        name: `Soft Stone`,

        get description() { return `Decrease the strength of ${tmp.t_stoneName} by <b>0.2</b> per level.` },
        cost(i) {
            let x = Decimal.pow(1e3,i.sumBase(1.1)).mul(1e6)
            return x
        },
        bulk(i) {
            let x = i.div(1e6).max(1).log(1e3).max(0).sumBase(1.1,true)
            return x.add(1).floor()
        },
        curr: "t_stone",

        effect(i) {
            let x = i.mul(.2)
            return x
        },
        effDesc: x => "-"+format(x)+" to Quarry Tier",
    },
    't_stone\\h1': {
        unl: () => isModEnabled("hard") && player.t_stone.tier.gte(15),
        max: 1,

        get description() { return `Stone divides the requirement of Quarry Tier at a reduced rate.` },
        cost: ()=>1e21,
        curr: "t_stone",

        effect(i) {
            let x = expPow(player.stone.add(1),.5)
            return x
        },
        effDesc: x => formatMult(x.pow(-1)),
    },
    't_stone\\5': {
        unl: () => player.t_stone.tier.gte(16),
        max: 1,

        get description() { return `Improve <b>Stone's Tiered Boost</b>.` },
        cost: ()=>1e21,
        curr: "t_stone",
    },
    't_stone\\6': {
        unl: () => player.t_stone.tier.gte(24),
        max: 1,

        get description() { return `The strength of ${tmp.t_stoneName} is decreased based on your wealth.` },
        cost: ()=>1e27,
        curr: "t_stone",

        effect(i) {
            let x = player.break.money.add(1).log10().div(10)
            return x
        },
        effDesc: x => "-"+format(x,3)+" to Quarry Tier",
    },

    'gold\\1': {
        max: 1,
        name: `Golden Deep`,

        get description() { return `<b>Harder Miner</b> affects <b>Deep Miner</b> linearly.` },
        cost: ()=>1,
        curr: "gold",
    },
    'gold\\2': {
        max: 15,
        name: `Better Golden Effect`,

        get description() { return `Improve the effect of Golden Stone.` },
        cost(i) {
            let x = Decimal.pow(10,i.pow(1.25)).mul(1e2)
            return x.ceil()
        },
        bulk(i) {
            let x = i.div(1e2).max(1).log(10).max(0).root(1.25)
            return x.add(1).floor()
        },
        curr: "gold",

        effect(i) {
            let x = i
            return x
        },
        effDesc: x => "+"+format(x)+" to the exponent",
    },
    'gold\\h1': {
        name: `Soft Gold`,
        unl: () => isModEnabled("hard"),

        get description() { return `Decrease the strength of ${tmp.t_stoneName} by <b>0.5</b> per level.` },
        cost(i) {
            let x = Decimal.pow(10,i.sumBase(1.1)).mul(100)
            return x
        },
        bulk(i) {
            let x = i.div(100).max(1).log(10).max(0).sumBase(1.1,true)
            return x.add(1).floor()
        },
        curr: "gold",

        effect(i) {
            let x = i.mul(.5)
            return x
        },
        effDesc: x => "-"+format(x)+" to Quarry Tier",
    },
    'gold\\3': {
        max: 2,
        name: `Newble Automation`,

        get description() { return `<b>[1]</b> Automate <b>Stone Upgrades</b> without spending any resource. <b>[2]</b> Automate <b>Tiered Stone Upgrades</b> too. <subtitle>Note: Any automation or generation will be unlocked in Automation tab.</subtitle>` },
        cost(i) {
            return listedCost(i,[1e3,1e4])
        },
        bulk(i) {
            return listedCost(i,[1e3,1e4],true)
        },
        curr: "gold",
    },
    'gold\\4': {
        max: 10,
        name: `Fast Quarry`,

        get description() { return `The requirement of Quarry Tier is decreased by <b>5%</b> compounding per level.` },
        cost(i) {
            let x = Decimal.pow(2,i.pow(1.25)).mul(1e3)
            return x.ceil()
        },
        bulk(i) {
            let x = i.div(1e3).max(1).log(2).max(0).root(1.25)
            return x.add(1).floor()
        },
        curr: "gold",

        effect(i) {
            let x = i.pow_base(.95)
            return x
        },
        effDesc: x => "-"+formatReduction(x),
    },
    'gold\\5': {
        max: 1,
        name: `Golden Deep`,

        get description() { return `Increase Golden Stone by <b>${formatMult(this.base)}</b> per the highest Quarry Tier, starting at <b>2</b>.` },
        cost: ()=>1e5,
        curr: "gold",

        get base() { return isModEnabled("hard") ? 1.1 : 1.2 },
        effect(i) {
            let x = player.t_stone.max.sub(1).pow_base(this.base)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'gold\\6': {
        name: `More Gold`,

        get description() { return `Increase Golden Stone by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(10,i.sumBase(1.01)).mul(1e6)
            return x
        },
        bulk(i) {
            let x = i.div(1e6).max(1).log(10).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "gold",

        get base() { return Decimal.add(2, 0) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'gold\\7': {
        max: 1,
        name: `Golden Miner`,

        get description() { return `Total Golden Stone increases <b>Miner</b>'s base slightly.` },
        cost: ()=>isModEnabled("hard") ? 1e9 : 1e10,
        curr: "gold",

        effect(i) {
            let x = player.gold.total.add(10).log10().root(2).sub(1).div(10)
            return x
        },
        effDesc: x => "+"+format(x,3),
    },
    'gold\\h2': {
        unl: () => isModEnabled("hard") && player.break.unl,
        max: 1,

        get description() { return `<b>Tenfold</b> Cobblestone.` },
        cost: () => 1e15,
        curr: "gold",
    },
    'gold\\8': {
        unl: () => player.break.unl,
        name: `Worth Gold`,

        get description() { return `Increase your <b>income</b> by <b>${formatMult(this.base)}</b> per level, based on total golden stone.` },
        cost(i) {
            let x = Decimal.pow(3,i.sumBase(1.01).pow(1.5)).mul(1e18)
            return x
        },
        bulk(i) {
            let x = i.div(1e18).max(1).log(3).root(1.5).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "gold",

        get base() { return player.gold.total.add(10).log10().log10().add(1) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },

    ...BREAK_UPGRADES,
}

const UPG_KEYS = Object.keys(UPGRADES)

const UPGRADE_GROUPS = {
    'stone': [],
    't_stone': [],
    'gold': [],
}

function buyUpgrade(id, mode) {
    const U = UPGRADES[id]
    let level = player.upgs[id], max = U.max ?? EINF

    if (!U.unl() || level.gte(max)) return;

    let auto = mode == "auto", bulk = auto || mode == "bulk", curr = CURRENCIES[U.curr], amount = curr.amount, cost = U.cost(level);

    if (amount.gte(cost)) {
        let n = level.add(1)

        if (bulk && Decimal.gt(max,1)) {
            n = n.max(U.bulk(amount)).min(max)
            if (!auto) cost = U.cost(n.sub(1));
        }

        player.upgs[id] = n
        if (!auto) curr.amount = amount.sub(cost).max(0);
    }
}

function buyMaxUpgradesByGroup(id, auto) {
    for (let x of UPGRADE_GROUPS[id]) buyUpgrade(x, auto ? "auto" : "bulk");
}

function hasUpgrade(x,lvl=1) { return player.upgs[x].gte(lvl) }
function upgradeEffect(x,def=1) { return tmp.upg_effect?.[x] ?? def }
function simpleUpgradeEffect(x,def=1) { return hasUpgrade(x) ? upgradeEffect(x,def) : def }
function simpleUpgradeBonus(x,y,def=1) { return hasUpgrade(x) ? y : def }

function updateUpgradesTemp() {
    for (let x in UPGRADES) {
        const U = UPGRADES[x]

        if ('effect' in U) {
            let lvl = player.upgs[x].mul(U.strength ?? 1)

            tmp.upg_effect[x] = U.effect(lvl);
        }
    }
}

function isUpgradeAffordable(id) {
    let u = UPGRADES[id], lvl = player.upgrades[id];
    return !u.unl() && lvl.lt(u.max ?? EINF) && CURRENCIES[u.curr].amount.gte(u.cost(lvl))
}

function resetUpgrades(list=[],keep=[]) {
    for (let id of list) if (!keep.includes(id)) player.upgs[id] = E(0);
}

function resetUpgradesByGroup(id,keep) { resetUpgrades(UPGRADE_GROUPS[id],keep) }