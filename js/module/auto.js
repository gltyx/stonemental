const AUTO = {
    stone: {
        unl: () => hasUpgrade("gold\\3"),
        title: `Automate Stone Upgrades`,
        run() { buyMaxUpgradesByGroup("stone",true) },
    },
    t_stone: {
        unl: () => hasUpgrade("gold\\3",2),
        title: `Automate Tiered Stone Upgrades`,
        run() { buyMaxUpgradesByGroup('t_stone',true) },
    },
    quarry: {
        unl: () => hasUpgrade("break\\4"),
        title: `Auto-Enter Quarry`,
        run() { MAIN.t_stone.switch(1) },
    },
    gold: {
        unl: () => hasUpgrade("break\\4",2),
        title: `Automate Golden Stone Upgrades`,
        run() { buyMaxUpgradesByGroup('gold',true) },
    },
    passive_gold: {
        unl: ()=> hasUpgrade("break\\4",3),
        title: `Golden Stone Generation`,
        run(dt) {
            
        },
    },
}

const AUTO_ID = Object.keys(AUTO)

function isAutomationEnabled(id) { return AUTO[id].unl() && player.auto[id] }