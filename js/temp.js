var tmp = {}
var tmp_update = []

function resetTemp() {
    keep = [tmp.prevSave]

    tmp = {
        time: 0,
        upgs: {},
        tab: "stone",
        stab: {},

        prevSave: "",
    }
    for (let x in UPGRADES.ids) tmp.upgs[x] = {
        res: E(0),
        cost: [],
        bulk: [],
        eff: [],
    }
    for (let x in TABS.tab) tmp.stab[x] = 0
    
    tmp.prevSave = keep[0]
}

function updateTemp() {
    for (let x = 0; x < tmp_update.length; x++) tmp_update[x]()
}