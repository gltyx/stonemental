const CURRENCIES = {
    stone: {
        name: "Stone",

        get amount () { return player.stone },
        set amount (v) { player.stone = v.max(0) },

        get gain() {
            let x = tmp.global_mult

            x = x.mul(upgradeEffect('stone\\1')).mul(simpleUpgradeEffect('t_stone\\3')).mul(tmp.gold_effect).mul(tmp.pickaxe_tier_effect)

            return x
        },
    },
    t_stone: {
        get name() { return tmp.t_stoneName },

        get amount () { return player.t_stone.stone },
        set amount (v) { return player.t_stone.stone = v.max(0) },

        gain: E(0),
        passive: 0,
    },
    gold: {
        name: "Golden Stone",

        get require() { return isModEnabled('hard') ? 1e27 : 1e21 },

        get amount () { return player.gold.stone },
        set amount (v) { player.gold.stone = v.max(0) },

        get total () { return player.gold.total },
        set total (v) { player.gold.total = v.max(0) },

        get gain() {
            let x = player.stone.div(this.require)
            if (x.lt(1)) return E(0);

            let exp = .5

            if (hasUpgrade("break\\1")) exp += .05;
            if (isModEnabled("easy")) exp += .025;
            if (isModEnabled("hard")) exp -= .05;

            x = expPow(x, exp).mul(tmp.global_mult).mul(simpleUpgradeEffect('gold\\5')).mul(upgradeEffect('gold\\6')).mul(simpleUpgradeBonus('stone\\h3',10))

            return x.max(1).floor()
        },

        get passive () { return +isAutomationEnabled('passive_gold') },
    },
    cobble: {
        name: "Cobblestone",

        get require() { return isModEnabled('hard') ? 1e96 : 1e93 },

        get amount () { return player.break.stone },
        set amount (v) { player.break.stone = v.max(0) },

        get total () { return player.break.total },
        set total (v) { player.break.total = v.max(0) },

        get gain() {
            let x = player.stone.div(this.require)
            if (x.lt(1)) return E(0);

            let exp = .5

            if (isModEnabled("easy")) exp += .025;
            if (isModEnabled("hard")) exp -= .05;

            x = expPow(x, exp).mul(1e3).root(3).sub(9).mul(tmp.global_mult).mul(simpleUpgradeEffect('money\\4')).mul(upgradeEffect('break\\6')).mul(simpleUpgradeBonus('gold\\h2',10))

            return x.max(1).floor()
        },

        get passive () { return 0 },
    },
    money: {
        name: "Money",

        get amount () { return player.break.money },
        set amount (v) { player.break.money = v.max(0) },

        get gain() {
            if (!player.break.unl) return E(0);

            let x = tmp.miner_effect.mul(tmp.global_mult)
            
            x = x.mul(upgradeEffect("money\\3")).mul(upgradeEffect("break\\2")).mul(simpleUpgradeEffect("break\\3")).mul(upgradeEffect("gold\\8")).mul(upgradeEffect("stone\\8")).mul(simpleUpgradeEffect("money\\h1"))

            return x
        },
    },
}

function gainCurrency(id, v) {
    const C = CURRENCIES[id]
    C.amount = C.amount.add(v)
    if ('total' in C) C.total = C.total.add(v);
}