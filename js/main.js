var diff = 0;
var date = Date.now();
var player

const MAIN = {
    t_stone: {
        tiers: ['','Sandstone','Andesite','Diorite','Granite','Prismarine','Basalt','Ironstone','Cobalt','Obsidian','Quartz','Titanium','Topaz','Ruby','Diamond','w-BN','Lonsdaleite','Neutronium','Strange Matter','Unobtainium','Bedrock'],
        tiers2: ['','Super ','Hyper ','Ultra ','Meta-','Exo-','Power-','Omega ','Final ','Total '],

        gain() {
            let x = tmp.global_mult

            x = x.mul(upgradeEffect('stone\\3')).mul(upgradeEffect('stone\\4')).mul(upgradeEffect('t_stone\\1')).mul(tmp.gold_effect).mul(tmp.pickaxe_tier_effect)

            /*
            x = x.mul(upgEffect('t_stone',0)[1])
            x = x.mul(upgEffect('stone',2)[1])
            x = x.mul(upgEffect('stone',3))
            x = x.mul(tmp.goldEffect).mul(tmp.pickEffect)
            */

            return x
        },

        hard() {
            let t = player.t_stone.tier.sub(upgradeEffect('t_stone\\4',0)).sub(simpleUpgradeEffect('t_stone\\6',0)).sub(simpleUpgradeEffect('stone\\h1',0)).sub(simpleUpgradeEffect('gold\\h1',0))

            let f = upgradeEffect("stone\\h2")

            let exp = 2

            if (isModEnabled("hard")) exp += .5;

            let x = t.div(f).max(0).pow(exp).div(100).add(1);

            return x
        },

        max() {
            let t = player.t_stone.max.sub(simpleUpgradeEffect('stone\\h1',0))

            let f = Decimal.div(upgradeEffect("gold\\4"),simpleUpgradeBonus('break\\h1',Decimal.sqrt(upgradeEffect("stone\\h2"))))

            let x = Decimal.pow(10,t.max(0).mul(f).pow(1.25)).mul(1e3)

            x = x.div(simpleUpgradeEffect('t_stone\\h1'))

            return x
        },

        switch(s) {
            let ss = player.t_stone.tier.add(s).max(1).min(player.t_stone.max)

            if (ss.neq(player.t_stone.tier)) {
                player.t_stone.tier = ss

                resetUpgradesByGroup('t_stone',['t_stone\\3','t_stone\\5','t_stone\\6','t_stone\\h1'])
                player.t_stone.stone = E(0)

                updateTemp()

                tmp.pass = false
            }
        },
    },

    /*
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
    */

    gold_effect() {
        let exp = Decimal.add(2,upgradeEffect('gold\\2',0))

        let x = expPow(player.gold.total.add(1),0.5).pow(exp)

        return x
    },
}

const TST = MAIN.t_stone.tiers.length-1
const TST2 = MAIN.t_stone.tiers2.length

function getStoneTierName(i) {
    if (Decimal.gt(i,TST*TST2)) return format(i,0) + "-Tiered Stone";
    i = Number(i)
    return MAIN.t_stone.tiers2[Math.floor((i-1)/TST)] + MAIN.t_stone.tiers[(i-1)%TST+1]
}

function updateTSTemp() {
    tmp.t_stoneGain = MAIN.t_stone.gain()
    tmp.t_stoneHard = MAIN.t_stone.hard()

    tmp.t_stoneDiffGain = player.t_stone.stone.pow(tmp.t_stoneHard).add(tmp.t_stoneGain.mul(diff/1000)).root(tmp.t_stoneHard).sub(player.t_stone.stone).mul(1000/diff).max(0)
    tmp.t_stoneName = getStoneTierName(player.t_stone.tier)

    tmp.t_stoneNext = MAIN.t_stone.max()
}

function loop() {
    diff = Date.now() - player.lastPlayed;
    calc(diff/1000);
    updateTemp()
    app.$forceUpdate()
    player.lastPlayed = date = Date.now();
}

function expMult(a,b,base=10) { return E(a).gte(1) ? E(base).pow(E(a).logBase(base).pow(b)) : E(0) }