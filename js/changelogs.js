const CHANGELOGS = [
    {
        version: "v1.0 - Overhaul Update",

        get description() {
            return `
            Waited ~1.5 years to get excited!!!
            <ul>
                <li>
                    Overhauled everything!
                    <ul>
                        <li>Rebalanced the game</li>
                        <li>Code is improved better, making <code>vue.js</code> like "good dog"</li>
                        <li>Reworked style</li>
                        <li>Cobblestone features are reworked</li>
                    </ul>
                </li>
                <li>Implemented <b>MODIFIERS</b></li>
                <li>Implemented <b>SAVE SLOTS</b></li>
                <li>Implemented <b>OFFLINE PROGRESS</b> (static)</li>
                <li>Bugfixes and more...</li>
            </ul>
            <b>Projected Goal:</b> <spoiler-text>${format(1e250)} Stone, Quarry Tier ${format(30,0)}, ${format(1e30)} Golden Stone, ${format(1e8)} Cobblestone</spoiler-text> in Normal Mode
            `
        },
    },{
        version: "v0.2",

        get description() {
            return `
            <ul>
                <li>new prestige layer - Cobblestone!</li>
                <li>more upgrades!</li>
                <li>bugfixed, etc.</li>
            </ul>
            <b>Projected Goal:</b> <spoiler-text>${format(1e250)} Stone, Quarry Tier ${format(31,0)}, ${format(1e100)} Golden Stone, ${format(1e11)} Cobblestone</spoiler-text> in Normal Mode
            `
        },
    },{
        version: "v0.1",

        get description() {
            return `
            <ul>
                <li>DARK THEME!!!!!!!!!!11!1!</li>
                <li>more upgrades!</li>
                <li>nerfed a bit!</li>
            </ul>
            <b>Projected Goal:</b> <spoiler-text>${format(1e105)} Stone, Quarry Tier ${format(22,0)}, ${format(1e30)} Golden Stone</spoiler-text> in Normal Mode
            `
        },
    },
]

CHANGELOGS.forEach(x => {x.expanded = false})