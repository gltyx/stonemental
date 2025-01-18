const FPS = 30

function getPlayerData() {
    let s = {
        upgs: {},
        auto: {},
        stone: E(0),
        t_stone: {
            unl: false,
            tier: E(1),
            max: E(1),
            stone: E(0),
        },
        gold: {
            unl: false,
            stone: E(0),
            total: E(0),
        },
        break: {
            unl: false,
            stone: E(0),
            total: E(0),
            money: E(0),
        },
        options: {
            theme: 'normal'
        },
        lastPlayed: Date.now(),
        timePlayed: 0,
        mods: [],
    }
    for (let x in UPGRADES) {
        s.upgs[x] = E(0)
    }
    for (let x in AUTO_ID) s.auto[AUTO_ID[x]] = false;
    return s
}

const SAVE_SLOT = {
    current: 1,
    length: 1,
    slots: {},
}

function wipe(reload=false) {
    if (reload) {
        wipe()
        save()
        resetTemp()
        loadGame(false)
        setTimeout(()=>location.reload(),100)
    }
    else player = getPlayerData()
}

function loadPlayer(load) {
    const DATA = getPlayerData()
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
    convertStringToDecimal()
}

function deepNaN(obj, data) {
    for (let x = 0; x < Object.keys(obj).length; x++) {
        let k = Object.keys(obj)[x]
        if (typeof obj[k] == 'string') {
            if (data[k] == null || data[k] == undefined ? false : data[k].constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) obj[k] = data[k]
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let x = 0; x < Object.keys(data).length; x++) {
        let k = Object.keys(data)[x]
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (data[k].constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function convertStringToDecimal() {
    
}

function cannotSave() { return false }

function save(){
    let str = btoa(JSON.stringify(player))
    if (cannotSave() || findNaN(str, true)) return
    let key = "stonemental-save-"+SAVE_SLOT.current
    if (localStorage.getItem(key) == '') wipe();
    localStorage.setItem(key,SAVE_SLOT.slots[SAVE_SLOT.current] = tmp.prevSave = str)

    notify("Game Saved!")

    return str
}

function load(x){
    if(typeof x == "string" && x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}

function exporty() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        return
    }
    save();
    export_file(str,"Stone-emental Save - "+new Date().toGMTString())
}

function export_copy() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        return
    }

    copy_clipboard(str)

    notify("Copied to Clipboard")
}

function copy_clipboard(t) {
    let copyText = document.getElementById('copy')
    copyText.value = t
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
}

function export_file(t, name="text") {
    let file = new Blob([t], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = name+".txt"
    a.click()
}

function importy() {
    let loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")
    if (loadgame != null) {
        let keep = player
        setTimeout(()=>{
            try {
                if (findNaN(loadgame, true)) {
                    return
                }
                createSaveSlot(loadgame)
            } catch (error) {
                notify("Failed Importing", "error")
                player = keep
            }
        }, 200)
    }
}

function loadGame(start=true, gotNaN=false) {
    SAVE_SLOT.current = Number(localStorage.getItem("stonemental-save-slot") ?? 1), SAVE_SLOT.length = Number(localStorage.getItem("stonemental-save-slots") ?? 1)

    let key = "stonemental-save-"+SAVE_SLOT.current
    if (!gotNaN) tmp.prevSave = localStorage.getItem(key);
    wipe()
    resetTemp()
    load(tmp.prevSave)
    document.getElementById("theme_css").href = player.options.theme != "normal" ? "theme/"+player.options.theme+".css" : ""
    
    if (start) {
        for (let x of UPG_KEYS) {
            const u = UPGRADES[x];
        
            u.unl ??= () => true;
            u.max ??= EINF;
        
            let id = x.split('\\')[0], g = UPGRADE_GROUPS[id]
        
            if (!g) UPGRADE_GROUPS[id] = g = [x];
            else if (!g.includes(x)) g.push(x);
        }

        if (localStorage.getItem("stonemental-save-slot") === null) localStorage.setItem("stonemental-save-slot", 1);
        if (localStorage.getItem("stonemental-save-slots") === null) localStorage.setItem("stonemental-save-slots", 1);

        for (let x = 1; x <= SAVE_SLOT.length; x++) {
            SAVE_SLOT.slots[x] = localStorage.getItem("stonemental-save-"+x);
        }

        setInterval(save,60000)
        for (let x = 0; x < 50; x++) updateTemp();
        setInterval(loop, 1000/FPS)
        setInterval(checkNaN,1000)
        loadVue()
        loop()
        document.getElementById("app").style.display = ""
        scrollNextMessage()

        setInterval(() => {
            document.title = "Stone-emental | "+player.stone.format(0)+" Stone"
        }, 1000);
    }
}

function checkNaN() {
    if (findNaN(player)) {
        console.log("Got NaN'ed")
        resetTemp()
        loadGame(false, true)
    }
}

function findNaN(obj, str=false, data=getPlayerData()) {
    if (str ? typeof obj == "string" : false) obj = JSON.parse(atob(obj))
    for (let x = 0; x < Object.keys(obj).length; x++) {
        let k = Object.keys(obj)[x]
        if (typeof obj[k] == "number") if (isNaN(obj[k])) return true
        if (str) {
            if (typeof obj[k] == "string") if (data[k] == null || data[k] == undefined ? false : data[k].constructor.name == "Decimal") if (E(obj[k]).isNan()) return true
        } else {
            if (obj[k] == null || obj[k] == undefined ? false : obj[k].constructor.name == "Decimal") if (obj[k].isNan()) return true
        }
        if (typeof obj[k] == "object") return findNaN(obj[k], str, data[k])
    }
    return false
}

function createSaveSlot(data) {
    let str = btoa(JSON.stringify(data ?? player))
    SAVE_SLOT.length ++
    localStorage.setItem("stonemental-save-slots", SAVE_SLOT.length)
    localStorage.setItem("stonemental-save-"+SAVE_SLOT.length, SAVE_SLOT.slots[SAVE_SLOT.length] = str)
}