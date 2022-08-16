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
}

const AUTO_ID = Object.keys(AUTO)