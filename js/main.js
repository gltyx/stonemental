var diff = 0;
var date = Date.now();
var player

const MAIN = {
    stoneGain() {
        let x = E(1)

        x = x.mul(upgEffect('stone',0)[1])
        if (upgBought('t_stone',2)) x = x.mul(upgEffect('t_stone',2))
        x = x.mul(tmp.goldEffect).mul(tmp.pickEffect)

        return x
    },

    t_stone: {
        tiers: ['','Sandstone','Andesite','Diorite','Granite','Prismarine','Basalt','Ironstone','Cobalt','Obsidian','Quartz','Titanium','Topaz','Ruby','Diamond','w-BN','Lonsdaleite','Neutronium','Strange Matter','Unobtainium','Bedrock'],
        tiers2: ['','Super ','Hyper ','Ultra ','Meta-','Exo-','Power-','Omega ','Final ','Total '],

        gain() {
            let x = E(1)

            x = x.mul(upgEffect('t_stone',0)[1])
            x = x.mul(upgEffect('stone',2)[1])
            x = x.mul(upgEffect('stone',3))
            x = x.mul(tmp.goldEffect).mul(tmp.pickEffect)

            return x
        },

        hard() {
            let t = player.t_stone.tier

            if (upgBought('t_stone',6)) t *= upgEffect('t_stone',6,1)

            let x = Decimal.pow(Math.max(t-upgEffect('t_stone',3,0),0),2).div(100).add(1)

            return x
        },

        max() {
            let t = player.t_stone.max * upgEffect("gold",2)
            let x = Decimal.pow(10,t**1.25).mul(1e3)

            return x
        },

        switch(s) {
            let ss = Math.min(Math.max(player.t_stone.tier + s,1),player.t_stone.max)

            if (ss != player.t_stone.tier) {
                player.t_stone.tier = ss

                resetUpgrades("t_stone",'quarry')
                player.t_stone.stone = E(0)

                updateTemp()
            }
        },
    },

    gold: {
        gain() {
            let x = player.stone.div(1e21)
            if (x.lt(1)) return E(0)

            x = x.root(3)
            if (upgBought('gold',4)) x = x.mul(upgEffect('gold',4))
            if (upgBought('gold',6)) x = x.mul(tmp.pickEffect)

            return x.floor()
        },
        effect() {
            let exp = Decimal.add(2,upgEffect('gold',1))
            
            let x = player.gold.total.add(1).log10().add(1).pow(exp)

            return x
        },
    },

    break: {
        gain() {
            let x = player.stone.div(1e100)
            if (x.lt(1)) return E(0)

            x = x.div(1e5).root(15).add(1)

            return x.floor()
        },

        xpGain() {
            let x = upgEffect('break',1)

            x = x.mul(upgEffect('gold',7))
            if (upgBought('break',2)) x = x.mul(upgEffect('break',2))

            return x
        },

        nextTier() {
            let t = E(player.break.tier).scale(60,1.5,0)
            let x = Decimal.pow(2,t.sub(1).pow(1.25)).mul(100)

            return x
        },

        bulkTier() {
            if (player.break.xp.lt(100)) return 1
            let x = player.break.xp.div(100).max(1).log(2).root(1.25).add(1).scale(60,1.5,0,true).floor().toNumber()+1

            return x
        },

        effect() {
            let x = Decimal.pow(2,player.break.tier-1)

            return x
        },
    }
}

const TST = MAIN.t_stone.tiers.length-1
const TST2 = MAIN.t_stone.tiers2.length

function getStoneTierName(i) {
    return i > TST*TST2 ? format(i,0) + "-Tiered Stone" : MAIN.t_stone.tiers2[Math.floor((i-1)/TST)] + MAIN.t_stone.tiers[(i-1)%TST+1]
}

function updateTSTemp() {
    tmp.t_stoneGain = MAIN.t_stone.gain()
    tmp.t_stoneHard = MAIN.t_stone.hard()

    tmp.t_stoneDiffGain = player.t_stone.stone.pow(tmp.t_stoneHard).add(tmp.t_stoneGain.mul(diff/1000)).root(tmp.t_stoneHard).sub(player.t_stone.stone).mul(1000/diff).max(0)
    tmp.t_stoneName = getStoneTierName(player.t_stone.tier)

    tmp.t_stoneNext = MAIN.t_stone.max()
}

tmp_update.push(_=>{
    tmp.stoneGain = MAIN.stoneGain()
    updateTSTemp()
    tmp.goldGain = MAIN.gold.gain()
    tmp.goldEffect = MAIN.gold.effect()

    tmp.cobsGain = MAIN.break.gain()
    tmp.xpGain = MAIN.break.xpGain()
    tmp.bulkPickTier = MAIN.break.bulkTier()
    tmp.nextPickTier = MAIN.break.nextTier()
    tmp.pickEffect = MAIN.break.effect()
})

function loop() {
    diff = Date.now()-date;
    calc(diff/1000);
    updateTemp()
    date = Date.now();
}

function expMult(a,b,base=10) { return E(a).gte(1) ? E(base).pow(E(a).logBase(base).pow(b)) : E(0) }