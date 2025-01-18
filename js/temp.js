var tmp = {}
var tmp_update = []

function resetTemp() {
    keep = [tmp.prevSave]

    tmp = {
        pass: true,

        prevSave: "",
        theme: "normal",

        time: 0,
        upg_effect: {},
        currency_gain: {},

        tab: 0,
        stab: [],
        current_tab: "stone",

        gold_effect: E(1),

        miners: E(1),
        miner_effect: E(1),

        pickaxe_tier: E(1),
        pickaxe_tier_effect: E(1),

        global_mult: E(1),

        mods_enabled: {},
    }
    for (let x in CURRENCIES) tmp.currency_gain[x] = E(0);
    for (let x in UPGRADES) {
        const U = UPGRADES[x]
        if ('effect' in U) tmp.upg_effect[x] = E(0);
    }
    for (let x in TABS.tab) tmp.stab[x] = 0
    
    tmp.prevSave = keep[0]
}

function getGlobalMult() {
    let x = E(1)

    if (isModEnabled('easy')) x = x.mul(2);
    if (isModEnabled('hard')) x = x.div(3);

    return x
}

function updateTemp() {
    for (let m of player.mods) tmp.mods_enabled[m] = true;

    tmp.global_mult = getGlobalMult()

    updateUpgradesTemp()

    updateBreakTemp()
    tmp.gold_effect = MAIN.gold_effect()
    updateTSTemp()

    for (let id in CURRENCIES) tmp.currency_gain[id] = CURRENCIES[id].gain;
}