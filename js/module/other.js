function notify(text,type,icon) {
    var n = document.createElement("div")
    n.className = "notify_div "+(type||"success")
    n.innerHTML = `
    ${text}
    `
    document.getElementById("notify").appendChild(n)

    setTimeout(()=>{
        n.remove()
    },6000)
}

const ICONS = {
    expand: "&#xe000;",
    collapse: "&#xe001;",
}

function icon(id) { return `<icon>${ICONS[id]}</icon>` }