const RESETS = {
    gold: {
        require: () => player.stone.gte(CURRENCIES.gold.require),
        get reqDesc () { return `Reach <b>${format(CURRENCIES.gold.require)}</b> Stone to convert.` },
        gainDesc: x => `Convert your Stone into <b>${x.format(0)}</b> Golden Stone.`,
        resetDesc: `Converting into Golden Stone resets your Stone, Quarry, and their upgrades.`,
        curr: "gold",
        onReset() {
            player.gold.unl = true
        },
        doReset() {
            player.stone = E(0)
            player.t_stone.stone = E(0)
            player.t_stone.tier = E(1)
            player.t_stone.max = E(1)

            resetUpgradesByGroup('stone')
            resetUpgradesByGroup('t_stone')
        },
    },
    break: {
        require: () => player.stone.gte(CURRENCIES.cobble.require),
        get reqDesc () { return `Reach <b>${format(CURRENCIES.cobble.require)}</b> Stone to convert.` },
        gainDesc: x=> `Break your Stone into <b>${x.format(0)}</b> Cobblestone.`,
        resetDesc: `Breaking stone resets everything Golden Stone does, as well as Golden Stone and its upgrades, except some automation.`,
        curr: "cobble",
        onReset() {
            player.break.unl = true
        },
        doReset() {
            player.gold.stone = E(0)
            player.gold.total = E(0)

            resetUpgradesByGroup('gold',["gold\\3"])
            
            RESETS.gold.doReset()
        },
        
    },
}

function doReset(id) {
    let r = RESETS[id]

    if (r.require()) {
        gainCurrency(r.curr, tmp.currency_gain[r.curr])

        r.onReset?.()
        r.doReset?.()

        updateTemp()

        tmp.pass = false
    }
}