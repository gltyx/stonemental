const AUTO = {
    stone: {
        unl: _=> upgAmount('gold',3)>=1,
        title: `Auto-Stone Upgrades`,
        run() { buyMaxUpgrades('stone') },
    },
    t_stone: {
        unl: _=> upgAmount('gold',3)>=2,
        title: `Auto-Tiered Stone Upgrades`,
        run() { buyMaxUpgrades('t_stone') },
    },
    quarry: {
        unl: _=> upgAmount('break',3)>=1,
        title: `Auto-Enter Quarry`,
        run() { MAIN.t_stone.switch(1) },
    },
    gold: {
        unl: _=> upgAmount('break',3)>=2,
        title: `Auto-Golden Stone Upgrades`,
        run() { buyMaxUpgrades('gold') },
    },
    passive_gold: {
        unl: _=> upgAmount('break',3)>=3,
        title: `Generate 10% of Golden Stone gained`,
        run(dt) {
            player.gold.stone = player.gold.stone.add(tmp.goldGain.mul(dt/10))
            player.gold.total = player.gold.total.add(tmp.goldGain.mul(dt/10))
        },
    },
}

const AUTO_ID = Object.keys(AUTO)