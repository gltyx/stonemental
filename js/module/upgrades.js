const UPGRADES = {
    resource: { // important! player.test -> [player, "test"] - ['object that change resource inside it','that resource']
        stone: _=> [player, "stone"],
        t_stone: _=> [player.t_stone, "stone"],
        gold: _=> [player.gold, "stone"],
    },

    ids: {
        stone: {
            resDisplay: "Stone",
            bulk: _=> upgAmount('gold',3)>=3,

            ctn: [
                {
                    type: 1,
                    title: `Miner`,
                    desc: _=>`Increase Stone gain by <b>${upgEffect('stone',0)[0].format(2)}x</b>.`,
                    cost(i) {
                        let x = Decimal.pow(2,i.pow(1.2)).mul(10)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(10).max(1).log(2).max(0).root(1.2)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let base = E(1.5).add(upgEffect('stone',1,0))
                        let x = base.pow(i)
                        return [base,x]
                    },
                    effDesc(x) { return x[1].format(1) + 'x' },
                },{
                    type: 1,
                    max: 5,
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
                        let x = i.mul(0.15)
                        return x
                    },
                    effDesc(x) { return "+"+x.format(2)+'x' },
                },{
                    type: 1,
                    title: `Deep Miner`,
                    unl: _=> player.t_stone.unl,
                    desc: _=> `Increase ${tmp.t_stoneName} gain by <b>${upgEffect('stone',2)[0].format(2)}x</b>.`,
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
                    unl: _=> player.t_stone.max >= 2,
                    desc: _=> `${tmp.t_stoneName} gain is boosted based on Quarry Tier you mined.`,
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
                    unl: _=> player.t_stone.max >= 11,
                    type: 0,
                    desc: `<b>Tiered Miner</b> is <b>50%</b> stronger.`,
                    cost: E(1e30),
                },{
                    unl: _=> player.t_stone.max >= 18,
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
                },
            ],
        },
        t_stone: {
            resDisplay: _=> tmp.t_stoneName,
            bulk: _=> upgAmount('gold',3)>=3,

            ctn: [
                {
                    type: 1,
                    title: `Hard Miner`,
                    desc: _=>`Increase ${tmp.t_stoneName} gain by <b>${upgEffect('t_stone',0)[0].format(2)}x</b>.`,
                    cost(i) {
                        let x = Decimal.pow(3,i.pow(1.1)).mul(100)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(100).max(1).log(3).max(0).root(1.1)
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
                    max: 5,
                    title: `Harder Miner`,
                    desc: `Increase <b>Hard Miner</b>'s base by <b>0.2</b>.`,
                    cost(i) {
                        let x = Decimal.pow(10,i.pow(1.5)).mul(1000)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(1000).max(1).log(10).max(0).root(1.5)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = i.mul(0.2)
                        return x
                    },
                    effDesc(x) { return "+"+x.format(2)+'x' },
                },{
                    unl: _=> player.t_stone.tier >= 3 || upgBought('t_stone',2),
                    type: 0,
                    keep: true,
                    title: `Stone's Tiered Boost`,
                    desc: _=>`Stone gain is increased based on ${tmp.t_stoneName}. Keep this upgrade on Tiered Quarry entered.`,
                    cost: E(1e5),
                    eff(i) {
                        let x = player.t_stone.stone.add(1).pow(tmp.t_stoneHard).log10().add(1).pow(player.t_stone.tier**(upgBought('t_stone',4)?0.825:0.75))
                        return x
                    },
                    effDesc(x) { return x.format(2)+'x' },
                },{
                    unl: _=> player.t_stone.tier >= 8,
                    type: 1,
                    title: `Flurry Stone`,
                    desc: _=>`Decrease ${tmp.t_stoneName}'s strength by <b>0.2</b>.`,
                    cost(i) {
                        let x = Decimal.pow(1e3,i).mul(1e6)
                        return x.ceil()
                    },
                    bulk(i) {
                        let x = i.div(1e6).max(1).log(1e3)
                        return x.add(1).floor()
                    },
                    eff(i) {
                        let x = i.div(5)
                        return x.toNumber()
                    },
                    effDesc(x) { return "-"+format(x,1)+" to Quarry Tier" },
                },{
                    unl: _=> player.t_stone.tier >= 16 || upgBought('t_stone',4),
                    type: 0,
                    keep: true,
                    desc: `<b>Stone's Tiered Boost</b> is sightly stronger. Keep this upgrade on Tiered Quarry entered.`,
                    cost: E(1e21),
                },
            ],
        },
        gold: {
            resDisplay: "Golden Stone",

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
                    desc: _=>`Increase the exponent from Golden Stone's effect by <b>1</b>.`,
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
                    desc: _=>`New Tiered Quarry's requirement is <b>3%</b> weaker.`,
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
                    desc: _=> [
                        `Unlock <b>Auto-Stone Upgrades</b>.`,
                        `Unlock <b>Auto-Tiered Stone Upgrades</b>.`,
                        `You can now bulk Stone & Tiered Stone Upgrades.`,
                        `You unlocked <b>Auto-Stone Upgrades</b> & <b>Auto-Tiered Stone Upgrades</b>, bulked Stone & Tiered Stone Upgrades.`
                    ][upgAmount("gold",3)],
                    cost: [E(1e3),E(1e4),E(1e5)],
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
        if (!keep) player.upgs[id][y] = ctn.type === 1 ? E(0) : 0
    }
}

function getUpgradeCost(plr,upg,b=0) {
    let type = upg.type
    switch (type) {
        case 0: // Simple
            return upg.cost
        case 1: // Advanced
            return plr.sub(b).gte(upg.max||EINF) ? EINF : upg.cost(plr.sub(b))
        case 2: // Custom
            return plr-b >= upg.cost.length ? EINF : upg.cost[plr-b]
    }
}

function bulkUpgrade(res,upg) {
    let type = upg.type
    switch (type) {
        case 0: // Simple
            return res.gte(upg.cost) ? 1 : 0
        case 1: // Advanced
            return res.gte(upg.cost(E(0))) ? upg.bulk(res).min(upg.max||EINF) : E(0)
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

        tu.cost[y] = getUpgradeCost(pu[y],upg)
        tu.bulk[y] = bulkUpgrade(tu.res,upg)
        if (upg.eff) tu.eff[y] = upg.eff(pu[y])
    }
}

tmp_update.push(_=>{
    for (let x = 0; x < UPG_IDS.length; x++) {
        updateUpgradesTemp(UPG_IDS[x])
    }
})