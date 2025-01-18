const MODS = {
    "easy": {
        name: "Easy Mode",
        short: "Easy",

        get description() {
            return `
            <subtitle>This mode is easier and faster to help you reach the end faster.</subtitle>
            Nearly every currency is <b>doubled</b>, its gain is improved slightly, some upgrades are improved slightly, etc.
            `
        },
    },
    "hard": {
        name: "Hard Mode",
        short: "Hard",

        get description() {
            return `
            <subtitle>The game is harder & slower, with slight compensation to help you slowly grind to the end.</subtitle>
            Nearly every currency is decreased by <b>3-fold</b>, its gain is weakened, some reset requirements are changed, the strength of tiered stone is stronger, etc.
            `
        },
    },
}

const MOD_KEYS = Object.keys(MODS);

MOD_KEYS.forEach(x => {
    const M = MODS[x]
    M.expanded = false, M.choosed = false
})

function createModdedSave() {
    let d = {}
    d.mods = MOD_KEYS.filter(x => MODS[x].choosed)

    // if (d.mods.length == 0) return;

    createSaveSlot(d)
    localStorage.setItem("stonemental-save-slot", SAVE_SLOT.length);
    location.reload()
}

function isModEnabled(x) { return tmp.mods_enabled[x] }