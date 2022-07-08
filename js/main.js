var diff = 0;
var date = Date.now();
var player

const MAIN = {
    stoneGain() {
        let x = E(1)

        x = x.mul(upgEffect('stone',0)[1])
        if (upgBought('t_stone',2)) x = x.mul(upgEffect('t_stone',2))
        x = x.mul(tmp.goldEffect)

        return x
    },

    t_stone: {
        tiers: [null,'Sandstone','Andesite','Diorite','Granite','Prismarine','Basalt','Ironstone','Cobalt','Obsidian','Quartz','Titanium','Topaz','Ruby','Diamond','w-BN'],

        gain() {
            let x = E(1)

            x = x.mul(upgEffect('t_stone',0)[1])
            x = x.mul(upgEffect('stone',2)[1])
            x = x.mul(upgEffect('stone',3))
            x = x.mul(tmp.goldEffect)

            return x
        },

        hard() {
            let x = Decimal.pow(Math.max(player.t_stone.tier-upgEffect('t_stone',3,0),0),2).div(100).add(1)

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

            return x.floor()
        },
        effect() {
            let exp = Decimal.add(2,upgEffect('gold',1))
            
            let x = player.gold.total.add(1).log10().add(1).pow(exp)

            return x
        },
    },
}

function getStoneTierName(i) { return i > MAIN.t_stone.tiers.length-1 ? format(i,0) + "-Tiered Stone" : MAIN.t_stone.tiers[i] }

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
})

function loop() {
    diff = Date.now()-date;
    calc(diff/1000);
    updateTemp()
    date = Date.now();
}

function expMult(a,b,base=10) { return E(a).gte(1) ? E(base).pow(E(a).logBase(base).pow(b)) : E(0) }