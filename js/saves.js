function getPlayerData() {
    let s = {
        upgs: {},
        auto: {},
        stone: E(0),
        t_stone: {
            unl: false,
            tier: 1,
            max: 1,
            stone: E(0),
        },
        gold: {
            unl: false,
            stone: E(0),
            total: E(0),
        },
        options: {
            theme: 'normal'
        },
    }
    for (let x in UPGRADES.ids) {
        let ss = []
        for (let y in UPGRADES.ids[x].ctn) ss[y] = UPGRADES.ids[x].ctn[y].type === 1 ? E(0) : 0
        s.upgs[x] = ss
    }
    for (let x in AUTO_ID) s.auto[AUTO_ID[x]] = false
    return s
}

Decimal.prototype.clone = function () { return this }

Decimal.prototype.softcap = function (start, power, mode) {
    var x = this.clone()
    if (x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start)
    }
    return x
}

Decimal.prototype.scale = function (s, p, mode, rev=false) {
    s = E(s)
    var x = this.clone()
    if (x.gte(s)) {
        if ([0, "pow"].includes(mode)) x = rev ? x.mul(s.pow(p-1)).root(p) : x.pow(p).div(s.pow(p-1))
        if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).logBase(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
    }
    return x
}

Decimal.prototype.format = function (acc, max) { return format(this.clone(), acc, max) }

Decimal.prototype.formatGain = function (gain, acc) { return formatGain(this.clone(), gain, acc) }

Decimal.prototype.formatMult = function (acc) { return formatMult(this.clone(), acc) }

function softcapHTML(x, start) { return E(x).gte(start)?` <span class='soft'>(softcapped)</span>`:"" }

Decimal.prototype.softcapHTML = function (start) { return softcapHTML(this.clone(), start) }

function wipe(reload=false) {
    if (reload) {
        wipe()
        save()
        resetTemp()
        loadGame(false)
        setTimeout(_=>location.reload(),100)
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
    if (localStorage.getItem("Stonemental_Save") == '') wipe()
    localStorage.setItem("Stonemental_Save",str)
    tmp.prevSave = localStorage.getItem("Stonemental_Save")

    notify("Game Saved!")
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
    let file = new Blob([str], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Stone-emental Save - "+new Date().toGMTString()+".txt"
    a.click()
}

function export_copy() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        return
    }

    let copyText = document.getElementById('copy')
    copyText.value = str
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
    notify("Copied to Clipboard")
}

function importy() {
    let loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")
    if (loadgame != null) {
        let keep = player
        setTimeout(_=>{
            try {
                if (findNaN(loadgame, true)) {
                    return
                }
                load(loadgame)
                save()
                location.reload()
            } catch (error) {
                notify("Failed Importing", "error")
                player = keep
            }
        }, 200)
    }
}

function loadGame(start=true, gotNaN=false) {
    if (!gotNaN) tmp.prevSave = localStorage.getItem("Stonemental_Save")
    wipe()
    resetTemp()
    load(tmp.prevSave)
    document.getElementById("theme_css").href = player.options.theme != "normal" ? "theme/"+player.options.theme+".css" : ""
    
    if (start) {
        setInterval(save,60000)
        for (let x = 0; x < 50; x++) updateTemp()
        setInterval(loop, 50)
        setInterval(checkNaN,1000)
        loadVue()
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