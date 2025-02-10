const UPGRADES = {
    resource: { // important! player.test -> [player, "test"] - ['object that change resource inside it','that resource']
        stone: ()=> [player, "stone"],
        t_stone: ()=> [player.t_stone, "stone"],
        gold: ()=> [player.gold, "stone"],
        break: ()=> [player.break, "stone"],
    },

    ids: {
        stone: {
            resDisplay: "Stone",
            bulk: ()=> upgAmount('gold',3)>=3,

            ctn: [
                {
                    type: 1,
                    title: `Miner`,
                    desc: ()=>`Increase Stone gain by <b>${upgEffect('stone',0)[0].format(2)}x</b>.`,
                    cost(i) {
                        let x = Decimal.pow(2,i.pow(1.2)).mul(10)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(10).max(1).log(2).max(0).root(1.2)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        if (upgBought('break',0)) i = i.mul(1.1)
                        let base = E(1.5).add(upgEffect('stone',1,0))
                        if (upgBought('gold',5)) base = base.add(upgEffect('gold',5,0))
                        let x = base.pow(i)
                        return [base,x]
                    },
                    effDesc(x) { return x[1].format(1) + 'x' },
                },{
                    type: 1,
                    max: ()=> 5+upgEffect('stone',6,0),
                    title: `Better Miner`,
                    desc: `Increase <b>Miner</b>'s base by <b>0.15</b>.`,
                    cost(i) {
                        let x = Decimal.pow(10,i.pow(1.5)).mul(100)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(100).max(1).log(10).max(0).root(1.5)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        if (upgBought('break',0)) i = i.mul(1.1)
                        let x = i.mul(0.15)
                        return x
                    },
                    effDesc(x) { return "+"+x.format(2)+'x' },
                },{
                    type: 1,
                    title: `Deep Miner`,
                    unl: ()=> player.t_stone.unl,
                    desc: ()=> `Increase ${tmp.t_stoneName} gain by <b>${upgEffect('stone',2)[0].format(2)}x</b>.`,
                    cost(i) {
                        let x = Decimal.pow(5,i.pow(1.1)).mul(2e4)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(2e4).max(1).log(5).max(0).root(1.1)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let base = E(3)
                        if (upgBought("gold",0)) base = base.add(upgEffect('t_stone',1,0))
                        let x = base.pow(i)
                        return [base,x]
                    },
                    effDesc(x) { return x[1].format(2)+'x' },
                },{
                    type: 1,
                    title: `Tiered Miner`,
                    unl: ()=> player.t_stone.max >= 2,
                    desc: ()=> `${tmp.t_stoneName} gain is boosted based on Quarry Tier you mined.`,
                    cost(i) {
                        let x = Decimal.pow(3,i.pow(2)).mul(1e5)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(1e5).max(1).log(3).max(0).root(2)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        if (upgBought('stone',4)) i = i.mul(1.5)
                        let x = Decimal.pow(player.t_stone.tier+1,i)
                        return x
                    },
                    effDesc(x) { return x.format(2)+'x' },
                },{
                    unl: ()=> player.t_stone.max >= 11,
                    type: 0,
                    desc: `<b>Tiered Miner</b> is <b>50%</b> stronger.`,
                    cost: E(1e30),
                },{
                    unl: ()=> player.t_stone.max >= 18,
                    type: 1,
                    max: 10,
                    title: `Synergism Miner`,
                    desc: `<b>Hard Miner</b>'s base is multiplied by <b>33.3%</b> (additive).`,
                    cost(i) {
                        let x = Decimal.pow(100,i.pow(1.5)).mul(1e66)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(1e66).max(1).log(100).max(0).root(1.5)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = i.div(3)
                        return x.add(1)
                    },
                    effDesc(x) { return x.format(2)+"x" },
                },{
                    unl: ()=> player.t_stone.max >= 23,
                    type: 1,
                    desc: `Increase <b>Better Miner</b>'s maximum level by <b>1</b>.`,
                    cost(i) {
                        let x = Decimal.pow(1e10,i.pow(2)).mul(1e130)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(1e130).max(1).log(1e10).max(0).root(2)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = i.toNumber()
                        return x
                    },
                    effDesc(x) { return "+"+format(x,0)+" maximum level" },
                },
            ],
        },
        t_stone: {
            resDisplay: ()=> tmp.t_stoneName,
            bulk: ()=> upgAmount('gold',3)>=3,

            ctn: [
                {
                    type: 1,
                    title: `Hard Miner`,
                    desc: ()=>`Increase ${tmp.t_stoneName} gain by <b>${upgEffect('t_stone',0)[0].format(2)}x</b>.`,
                    cost(i) {
                        let x = Decimal.pow(3,i.scale(100,2,0).pow(1.1)).mul(100)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(100).max(1).log(3).max(0).root(1.1).scale(100,2,0,true)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let base = E(2).add(upgEffect('t_stone',1,0)).mul(upgEffect('stone',5))
                        let x = base.pow(i)
                        return [base,x]
                    },
                    effDesc(x) { return x[1].format(2) + 'x' },
                },{
                    type: 1,
                    max: ()=> 5+upgEffect('t_stone',5,0),
                    title: `Harder Miner`,
                    desc: `Increase <b>Hard Miner</b>'s base by <b>0.2</b>.`,
                    cost(i) {
                        let x = Decimal.pow(10,i.scale(5,1.5,0).pow(1.5)).mul(1000)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(1000).max(1).log(10).max(0).root(1.5).scale(5,1.5,0,true)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = i.mul(0.2)
                        return x
                    },
                    effDesc(x) { return "+"+x.format(2)+'x' },
                },{
                    unl: ()=> player.t_stone.tier >= 3 || upgBought('t_stone',2),
                    type: 0,
                    keep: true,
                    title: `Stone's Tiered Boost`,
                    desc: ()=>`Stone gain is increased based on ${tmp.t_stoneName}. Keep this upgrade on Tiered Quarry entered.`,
                    cost: E(1e5),
                    eff(i) {
                        let x = player.t_stone.stone.add(1).pow(tmp.t_stoneHard).log10().add(1).pow(player.t_stone.tier**(upgBought('t_stone',4)?0.825:0.75))
                        return x
                    },
                    effDesc(x) { return x.format(2)+'x' },
                },{
                    unl: ()=> player.t_stone.tier >= 8,
                    type: 1,
                    title: `Flurry Stone`,
                    desc: ()=>`Decrease ${tmp.t_stoneName}'s strength by <b>0.2</b>.`,
                    cost(i) {
                        let x = Decimal.pow(1e3,i.scale(20,2,0)).mul(1e6)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(1e6).max(1).log(1e3).scale(20,2,0,true)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = i.div(5)
                        return x.toNumber()
                    },
                    effDesc(x) { return "-"+format(x,1)+" to Quarry Tier" },
                },{
                    unl: ()=> player.t_stone.tier >= 16 || upgBought('t_stone',4),
                    type: 0,
                    keep: true,
                    desc: `<b>Stone's Tiered Boost</b> is sightly stronger. Keep this upgrade on Tiered Quarry entered.`,
                    cost: E(1e21),
                },{
                    unl: ()=> player.t_stone.tier >= 21,
                    type: 1,
                    desc: ()=>`Increase <b>Harder Miner</b>'s maximum level by <b>1</b>.`,
                    cost(i) {
                        let x = Decimal.pow(1e2,i.pow(1.25)).mul(1e24)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(1e24).max(1).log(1e2).max(0).root(1.25)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = i
                        return x.toNumber()
                    },
                    effDesc(x) { return "+"+format(x,0)+" maximum level" },
                },{
                    title: `Flurr-stoned Stone`,
                    unl: ()=> player.t_stone.tier >= 26,
                    type: 0,
                    keep: true,
                    desc: `${tmp.t_stoneName}'s strength is weaker by Stone at a severly reduced rate. Keep this upgrade on Tiered Quarry entered.`,
                    cost: E(1e37),
                    eff(i) {
                        let x = player.stone.add(1).log10().root(3).div(50).add(1).pow(-1)
                        return x.toNumber()
                    },
                    effDesc(x) { return formatReduction(x)+" weaker" },
                },
            ],
        },
        gold: {
            resDisplay: "Golden Stone",
            bulk: ()=> upgAmount('break',3)>=2,

            ctn: [
                {
                    type: 0,
                    title: `Golden Deep`,
                    desc: `<b>Deep Miner</b> is affected by <b>Harder Miner</b>.`,
                    cost: E(1),
                },{
                    type: 1,
                    max: 10,
                    title: `Strong Golden Effect`,
                    desc: ()=>`Increase the exponent from Golden Stone's effect by <b>1</b>.`,
                    cost(i) {
                        let x = Decimal.pow(10,i.pow(1.25)).mul(10)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(10).max(1).log(10).max(0).root(1.25)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = i.div(1)
                        return x
                    },
                    effDesc(x) { return "+^"+x.format(1) },
                },{
                    type: 1,
                    max: 10,
                    title: `Weak Quarry`,
                    desc: ()=>`New Tiered Quarry's requirement is <b>3%</b> weaker.`,
                    cost(i) {
                        let x = Decimal.pow(2,i.pow(1.25)).mul(1000)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(1000).max(1).log(2).max(0).root(1.25)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = 1-i.mul(0.03).toNumber()
                        return x
                    },
                    effDesc(x) { return formatReduction(x,1)+" weaker" },
                },{
                    type: 2,
                    title: `Newble Automation`,
                    keep: true,
                    desc: ()=> [
                        `Unlock <b>Auto-Stone Upgrades</b>.`,
                        `Unlock <b>Auto-Tiered Stone Upgrades</b>.`,
                        `You can now bulk Stone & Tiered Stone Upgrades.`,
                        `You unlocked <b>Auto-Stone Upgrades</b> & <b>Auto-Tiered Stone Upgrades</b>, bulked Stone & Tiered Stone Upgrades.`
                    ][upgAmount("gold",3)],
                    cost: [E(1e3),E(1e4),E(1e5)],
                },{
                    type: 0,
                    title: `Golden Deep`,
                    desc: `Increase Golden Stone gain based on highest Quarry Tier reached.`,
                    cost: E(1e18),
                    eff(i) {
                        let x = Decimal.pow(1.2,player.t_stone.max-1)
                        return x
                    },
                    effDesc(x) { return x.format(2)+"x" },
                },{
                    type: 0,
                    title: `Golden Miner`,
                    desc: `Golden Stone's effect increases <b>Miner</b>'s base at a severely reduced rate.`,
                    cost: E(1e21),
                    eff(i) {
                        let x = tmp.goldEffect?tmp.goldEffect.max(1).log10().root(2).div(10):E(0)
                        return x
                    },
                    effDesc(x) { return "+"+x.format(2) },
                },{
                    unl: ()=>player.break.unl,
                    keep: true,
                    type: 0,
                    desc: `Pickaxe Tier affects Golden Stone gain. Keep this upgrade on breaking stone.`,
                    cost: E(1e36),
                },{
                    unl: ()=>player.break.unl,
                    type: 1,
                    title: `Golden XP`,
                    desc: ()=>`Increase XP gain by <b>${formatMult(player.gold.total.add(1).log10().add(1),2)}</b> (based on OoM of total Golden Stone).`,
                    cost(i) {
                        let x = Decimal.pow(10,i.pow(1.3)).mul(1e75)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(1e75).max(1).log(10).max(0).root(1.3)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = player.gold.total.add(1).log10().add(1).pow(i)
                        return x
                    },
                    effDesc(x) { return formatMult(x,2) },
                },
            ],
        },
        break: {
            resDisplay: "Cobblestone",

            ctn: [
                {
                    type: 0,
                    title: `Miner Starter`,
                    desc: `<b>Miner</b> & <b>Better Miner</b> are <b>10%</b> stronger.`,
                    cost: E(1),
                },{
                    max: 10,
                    type: 1,
                    title: `Stone XP`,
                    desc: `XP is boosted based on your Stone.`,
                    cost(i) {
                        let x = Decimal.pow(2.5,i.pow(1.5)).mul(10)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(10).max(1).log(2.5).max(0).root(1.5)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = player.stone.add(1).log10().add(1).pow(i)
                        return x
                    },
                    effDesc(x) { return formatMult(x,2) },
                },{
                    type: 0,
                    title: `Tiered Stone XP`,
                    desc: `XP is boosted based on your tiered Stone.`,
                    cost: E(1e4),
                    eff(i) {
                        let x = player.t_stone.stone.pow(tmp.t_stoneHard).add(1).log10().add(1).pow(player.t_stone.max/5+1)
                        return x
                    },
                    effDesc(x) { return formatMult(x,2) },
                },{
                    type: 2,
                    title: `Beginner Automation`,
                    keep: true,
                    desc: ()=> [
                        `Unlock <b>Auto-Enter Quarry</b>.`,
                        `Unlock <b>Auto-Golden Stone Upgrades</b>, you can now bulk Golden Stone Upgrades.`,
                        `Passively generate 10% of Golden Stone gained on reset.`,
                        `You unlocked <b>Auto-Enter Quarry</b> & <b>Auto-Golden Stone Upgrades</b>, bulked Golden Stone Upgrades, passively generated 10% of Golden Stone.`
                    ][upgAmount("break",3)],
                    cost: [E(5e5),E(2.5e6),E(1e7)],
                },
            ],
        },
        /* ID Template
        test: {
            resDisplay: "Test Points",

            ctn: [

            ],
        },
        */

        /* Upgrade Template

            Simple
        {
            type: 0,
            desc: `Placeholder`,
            cost: E(100),
        },

            Advanced
        {
            type: 1,
            max: 100,
            desc: `Placeholder`,
            cost(i) {
                let x = E(1)
                return x.ceil()
            },
            bulk(i) {
                let x = E(0)
                return x.add(1).floor()
            },
        },

            Custom
        {
            type: 2,
            desc: `Placeholder`,
            cost: [E(1),E(2),E(100),E(1e100)],
        },

            + Effect (optional)
                Simple
            eff() {
                let x = E(1)
                return x
            },
                Advanced/Custom
            eff(i) {
                let x = E(1)
                return x
            },

            effDesc(x) { return x.format() + 'x' },
        */
    },
}

const UPG_IDS = Object.keys(UPGRADES.ids)

function buyUpgrade(id,i) {
    let ctn = UPGRADES.ids[id].ctn[i]

    if (ctn.unl ? !ctn.unl() : false) return;

    let [p, q] = UPGRADES.resource[id]()
    let tu = tmp.upgs[id]
    let upgs = player.upgs[id]
    
    if (p[q].gte(tu.cost[i]) && Decimal.gt(tu.bulk[i],upgs[i])) {
        if (tu.canBulk) upgs[i] = ctn.type === 1 ? upgs[i].max(tu.bulk[i]) : Math.max(upgs[i],tu.bulk[i])
        else upgs[i] = ctn.type === 1 ? upgs[i].add(1) : upgs[i] + 1

        // p[q] = p[q].sub(getUpgradeCost(upgs[i],ctn,1)).max(0)
        p[q] = p[q].sub(tu.cost[i])

        updateUpgradesTemp(id)
    }
}

function buyMaxUpgrades(id) {
    for (let y in UPGRADES.ids[id].ctn) buyUpgrade(id,y)
}

function resetUpgrades(id,reset) {
    for (let y in UPGRADES.ids[id].ctn) {
        let ctn = UPGRADES.ids[id].ctn[y]
        let keep = false
        if (reset == "quarry" && id == "t_stone") keep = ctn.keep
        if (reset == "break" && id == "gold") keep = ctn.keep
        if (!keep) player.upgs[id][y] = ctn.type === 1 ? E(0) : 0
    }
}

function getUpgradeCost(plr,upg,max,b=0) {
    let type = upg.type
    switch (type) {
        case 0: // Simple
            return upg.cost
        case 1: // Advanced
            return plr.sub(b).gte(max||EINF) ? EINF : upg.cost(plr.sub(b))
        case 2: // Custom
            return plr-b >= upg.cost.length ? EINF : upg.cost[plr-b]
    }
}

function bulkUpgrade(res,upg,max) {
    let type = upg.type
    switch (type) {
        case 0: // Simple
            return res.gte(upg.cost) ? 1 : 0
        case 1: // Advanced
            return res.gte(upg.cost(E(0))) ? upg.bulk(res).min(max||EINF) : E(0)
        case 2: // Custom
            let x = upg.cost.length
            for (let i = 0; i < x; i++) if (res.lt(upg.cost[i])) return i;
            return x
    }
}

function upgAmount(id,i) { return player.upgs[id][i] }

function upgEffect(id,i,def=E(1)) { return tmp.upgs[id].eff[i] || def }

function upgBought(id,i) { return UPGRADES.ids[id].ctn[i].type === 1 ? player.upgs[id][i].gte(1) : player.upgs[id][i] >= 1 }

function updateUpgradesTemp(id) {
    let upgs = UPGRADES.ids[id]

    let tu = tmp.upgs[id]
    let pu = player.upgs[id]
    let [p, q] = UPGRADES.resource[id]()

    tu.res = p[q]
    tu.canBulk = upgs.bulk ? upgs.bulk() : false

    for (let y = 0; y < upgs.ctn.length; y++) {
        let upg = upgs.ctn[y]

        if (upg.max) tu.max[y] = typeof upg.max === 'function' ? upg.max() : upg.max
        tu.cost[y] = getUpgradeCost(pu[y],upg,tu.max[y])
        tu.bulk[y] = bulkUpgrade(tu.res,upg,tu.max[y])
        if (upg.eff) tu.eff[y] = upg.eff(pu[y])
    }
}

tmp_update.push(()=>{
    for (let x = 0; x < UPG_IDS.length; x++) {
        updateUpgradesTemp(UPG_IDS[x])
    }
})