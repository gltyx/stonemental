var tmp = {}
var tmp_update = []

function resetTemp() {
    keep = [tmp.prevSave]

    tmp = {
        pass: true,

        time: 0,
        upgs: {},
        tab: "stone",
        stab: {},

        prevSave: "",
        theme: "normal",
    }
    for (let x in UPGRADES.ids) tmp.upgs[x] = {
        res: E(0),
        max: [],
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