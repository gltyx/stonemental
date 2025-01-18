const TAB_DATA = {
    stone: {
        name: "Stone / Quarry",
        res: ()=>`You have <b>${player.stone.format(0)}</b> Stone, <b>${player.t_stone.stone.format(0)}</b> ${tmp.t_stoneName}.`,
        icon: "images/stone.png",
    },
    gold: {
        name: "Golden Stone",
        res: ()=>`You have <b>${player.gold.stone.format(0)}</b> Golden Stone.`,
        req: ()=> player.stone.gte(CURRENCIES.gold.require) || player.gold.unl,
        reqDesc: ()=> `Reach <b>${format(CURRENCIES.gold.require)}</b> Stone`,
        icon: "images/gold.png",
    },
    cobble: {
        name: "Break Stone",
        unl: ()=> player.gold.unl,
        res: ()=>`You have <b>${player.break.stone.format(0)}</b> Cobblestone.`,
        req: ()=> player.stone.gte(CURRENCIES.cobble.require) || player.break.unl,
        reqDesc: ()=> `Reach <b>${format(CURRENCIES.cobble.require)}</b> Stone`,
        icon: "images/cobblestone.png",
    },
    auto: {
        name: "Automation",
        unl: ()=> player.gold.unl,
        icon: "images/automator.png",
    },

    options: {
        name: "Main Options",
        icon: "images/option.png",
    },
    saving: {
        name: "Saving",
        icon: "images/save.png",
    },
    mods: {
        name: "Modifiers",
        icon: "images/mods.png",
    },
    changelogs: {
        name: "Changelogs",
        icon: "images/changelog.png",
    },
}

const TABS = [
    {
        stab: "stone",
    },{
        stab: "gold",
    },{
        stab: "cobble",
    },{
        stab: "auto",
    },{
        name: "Options",
        icon: "images/option.png",

        stab: ["options","saving","mods","changelogs"],
    },
]

TABS.forEach((x,index) => {x.index = index})

function chooseTab(i,j) {
    console.log(i,j)

    tmp.tab = i
    if (j !== undefined) tmp.stab[i] = j;

    const T = TABS[i]
    if (T) tmp.current_tab = Array.isArray(T.stab) ? T.stab[tmp.stab[i] ?? 0] : T.stab;
}