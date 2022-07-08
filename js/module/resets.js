const RESETS = {
    resource: { // important! player.test -> [player, "test"] - ['object that change resource inside it','that resource']
        gold: _=> [player.gold, "stone"],
    },
    resGain: {
        gold: _=> tmp.goldGain,
    },
    canReset(id) {
        let r = this.ids[id], gain = this.resGain[id]()
        return (r.canReset ? r.canReset() : true) && gain.gte(1)
    },
    reset(id) {
        if (this.canReset(id)) {
            let r = this.ids[id]
            let [p, q] = this.resource[id](), gain = this.resGain[id]()

            p[q] = p[q].add(gain)

            if (r.onReset) r.onReset(gain)
            r.doReset()

            updateTemp()
        }
    },
    ids: {
        gold: {
            reqDesc: _=> `Reach <b>${format(1e21)}</b> Stone to convert.`,
            gainDesc: x=> `Convert your Stone into <b>${x.format(0)}</b> Golden Stone.`,
            resetDesc: `Converting into Golden Stone will reset your Stone, Tiered Stone and their upgrades.`,
            onReset(gain) {
                player.gold.unl = true
                player.gold.total = player.gold.total.add(gain)
            },
            doReset() {
                player.stone = E(0)
                player.t_stone.stone = E(0)
                player.t_stone.tier = 1
                player.t_stone.max = 1

                resetUpgrades('stone')
                resetUpgrades('t_stone')
            },
        },
    },
}