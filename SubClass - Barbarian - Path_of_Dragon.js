/*	-WHAT IS THIS?-
    This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
    Import this file using the "Add Extra Materials" bookmark.
    -KEEP IN MIND-
    It is recommended to enter the code in a fresh sheet be`fore adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
    Subject:	SubClass
    Effect:		This script adds StarForger's "Path of the Dragon Barbarian" subclass; homebrew available on Discord.
    Code by:	ShadowzAll & Rocky
    Date:		2025-02-03
*/
var iFileName = "PoDragonBarb.js";

RequiredSheetVersion("13.2.0");

SourceList["SHB"] = {
    name: "StarForger Path of the Dragon Barbarian",
    abbreviation: "SHB",
    date: "2025/02/03",
};

//add subclasses
AddSubClass("barbarian", "path of the dragon", {
    regExpSearch : /path of the dragon/i, /*req. tells form how to search for it */
    subname : "Path of the Dragon",
    source : [["SHB", 0]],
    features : {
        "subclassfeature3.1" : {
            name: "Draconic Might",
            source: ["SHB", 0],
            minlevel : 3,
            description : desc([
                "I learn to read, speak, and write Draconic and one other language of my choice",
                "I gain access to the Thaumaturgy cantrip"
            ]),
            languageProfs : [["Draconic"], 1],
            spellcastingBonus : {
                name : "Draconic Might",
                spells : ["thaumaturgy"],
                selection : ["thaumaturgy"],
                firstCol: "atwill"
            },
        },
        "subclassfeature3.2" : {
            name : "Burning Blood",
            source : ["SHB", 0],
            minlevel : 3,
            description : desc([
                "My unarmed strikes come in the form of razor sharp claws",
                "My unarmed strikes deal 1d8+STR slashing damage",
                "My Barbaric Rage becomes Draconic Fury, granting me Draconic Boons",
                "I gain 1 Draconic Boon at 3rd level and additional boons at 6th, 10th, and 14th level"
            ]),
            weaponOptions : [{
                baseWeapon : "unarmed strike",
                regExpSearch : /dragon claws/i,
                name : "Dragon Claws",
                source : ["SHB", 0],
                ability : 1,
                type : "Natural",
                damage : [1, 8, "slashing"],
                range : "Melee",
                description : "Unarmed strike",
                abilitytodamage : true,
                calcChanges : {
                    atkAdd : [
                        function (fields, v) {
                            if (v.baseWeaponName == "dragon claws" && classes.known.barbarian.level >= 14)  {
                                if (fields.Damage_Die == 1 || fields.Damage_Die == "1d8") fields.Damage_Die = '1d12';
                                fields.Description += (fields.Description ? '; ' : '') + 'Unarmed Strike';
                            };
                        },
                        "My Dragon Claws are improved and do 1d12 slashing dmg; Counts as Unarmed Strike.",
                        1
                    ]
                }
            }],
            weaponsAdd : ["Dragon Claws"],
            extraname : "Draconic Boons",
            extrachoices : ["Ancient Strength", "Hardened Scales", "Savage Instincts", "Draconic Disguise", "Kereska's Majesty", "Astilabor's Eye", "Dominating Presence", "Wit of Hlal", "Tamara's Mercy", "Null's Embrace", "Garyx's Destruction"],
            extratimes : levels.map(function (n) {
                return n < 1 ? 0 : n < 4 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4;
            }),
            choicesNotInMenu: false,
            "ancient strength" : {
                name : "Ancient Strength",
                submenu : "[Draconic Boon 03+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 3; },
                description : desc([
                    "You count as 1 size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
                    "When raging, you count as 2 sizes larger instead."
                ]),
            },
            "hardened scales" : {
                name : "Hardened Scales",
                submenu : "[Draconic Boon 03+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 3; },
                description : desc([
                    "You gain shining scales that resemble the color of a dragon of your choice.",
                    "Your Unarmored Defense is increased by 1. When raging, it is increased by 2."
                ]),
                extraAC : { mod : 1, misc : true },
            },
            "savage instincts" : {
                name : "Savage Instincts",
                submenu : "[Draconic Boon 03+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 3; },
                description : desc([
                    "When using Reckless Attack, you can make an Opportunity Attack against the first creature that attacks you " +
                    "without using your Reaction. While Draconic Fury is active, Opportunity Attacks double your Fury bonus damage."
                ]),
            },
            "draconic disguise" : {
                name : "Draconic Disguise",
                submenu : "[Draconic Boon 06+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 6; },
                description : desc([
                    "As an Action, once daily, you can transform into a humanoid form of your choice (Med or Small).",
                    "You keep your original stats. If you activate your Draconic Fury while transformed, force creatures within",
                    "15-ft to make a Wisdom saving throw (DC 8 + Proficiency + Con modifier). Fail: targets are",
                    "incapacitated until the end of your next turn. Success: no effect."
                ]),
                usages: 1,
                recovery: "day",
                action: ["action", "Draconic Disguise"],

            },
            "kereska's majesty" : {
                name : "Kereska's Majesty",
                submenu : "[Draconic Boon 06+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 6; },
                description : desc([
                    "Gain proficiency in Arcana and can cast Mage Hand, Prestidigitation, and and 1 cantrip of choice",
                    "from any spell list using Constitution as your spellcasting ability. When Raging, gain magic resistance,",
                    "and can add a number of d6s equal to half Draconic Fury damage bonus of Fire, Cold, Acid, Lightning, or Poison",
                    "in additional damage."
                ]),
                skills: ["Arcana"],
                spellcastingAbility: "Con",
                spellcastingBonus: [{
                    name: "Kereska's Majesty",
                    spells: ["mage hand, prestidigitation"],
                    selection: ["mage hand, prestidigitation"],
                    firstCol: "atwill"
                }, {
                    name: "Kereska's Majesty",
                    "class" : "any",
                    school : ["any"],
                    level : [0, 0],
                    times : 1,
                    firstCol: "atwill",
                }],
            },
            "astilabor's eye" : {
                name : "Astilabor's Eye",
                submenu : "[Draconic Boon 06+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 6; },
                description : desc([
                    "You gain expertise in Perception and Investigation checks, and ignore the weight of any treasure you carry. "+
                    "You can cast Locate Object a number of times equal to your Proficiency bonus per long rest. ",
                    "While Raging, you can use a Reaction to become immune to being grappled, knocked prone, or moved against "+
                    "your will. You can use this reaction a number of times equal to your Proficiency bonus per long rest."
                ]),
                skills: ["Perception", "Investigation"],
                spellcastingBonus: [{
                    name: "Astilabor's Eye",
                    spells: ["locate object"],
                    selection: ["locate object"],
                    recovery: "lr",
                    usages: "Proficiency bonus per ",
                    usagescalc: "event.value = (How('Proficiency Bonus'));",
                }],
                action: ["Reaction", "Imm: Grapple, Prone, Move (Fury)"],
                recovery: "lr",
                usages: "Proficiency bonus per ",
                usagescalc: "event.value = (How('Proficiency Bonus'));",
            },
            "dominating presence" : {
                name : "Dominating Presence",
                submenu : "[Draconic Boon 10+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 10; },
                description : desc([
                    "You gain expertise in Intimidation and Persuasion checks. When Raging, creatures within 30-ft of you",
                    "must make a Wisdom saving throw (DC 8 + Proficiency + Con modifier) or be frightened 10 mins.",
                    "Success: targets unaffected and immune until your next Fury activation. Save can be repeated at the end",
                    "of targets turns, ending on success."
                ]),
                skills: ["intimidation, persuasion"],
            },
            "wit of hlal" : {
                name : "Wit of Hlal",
                submenu : "[Draconic Boon 10+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 10; },
                description : desc([
                    "You gain proficiency in Persuasion, Deception and Performance. You can cast Commune once per long rest "+
                    "to speak with any Draconic deity. While raging, you can use an action to have creatures within 30-ft make "+
                    "a Wisdom saving throw (DC 8 + Proficiency + Con modifier).",
                    "Fail: targets are incapacitated with laughter 1 min.",
                    "Success: no effect. You can do this a number of times equal to your fury damage bonus, until your next long rest."
                ]),
                skills: ["persuasion, deception, performance"],
                spellcastingBonus: [{
                    name: "Wit of Hlal",
                    spells: ["commune"],
                    selection: ["commune"],
                    recovery: "lr",
                    usages: "1",
                }],
                action: ["action", "Fury: Wit of Hlal"],
                recovery: "lr",
                usages: [2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, "\u221E\xD7 per "],
            },
            "tamara's mercy" : {
                name : "Tamara's Mercy",
                submenu : "[Draconic Boon 10+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 10; },
                description : desc([
                    "You become immune to all diseases. As an action, you can cause yourself or a creature you touch to regain",
                    "hit points equal to 2d12 + barbarian level, or receive benefits of lesser restoration. You can do this a number",
                    "of times equal to your Proficiency Bonus per long rest. While raging, reroll 1s on healing you receive or cast.",
                ]),
                action: ["action",""],
                recovery: "lr",
                usages: "Proficiency bonus per ",
                usagescalc: "event.value = (How('Proficiency Bonus'));",
                savetxt: {immune : ["disease"]}
            },
            "null's embrace" : {
                name : "Null's Embrace",
                submenu : "[Draconic Boon 14+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 14; },
                description : desc([
                    "You can cast Speak with the Dead once per short rest. When raging, you gain the benefits of",
                    "Death Ward until your Fury ends or the effect is triggered. Additionally, you can summon a",
                    "Draconic Spirit to fight alongside you until your Fury ends or the spirit is destroyed.",
                    "The Draconic Spirit counts a one being summoned by a 5th level spell."
                ]),
                spellcastingBonus: [{
                    name: "Null's Embrace",
                    spells: ["speak with the dead"],
                    selection: ["speak with the dead"],
                    recovery: "sr",
                    usages: "1",
                }],
            },
            "garyx's destruction" : {
                name : "Garyx's Destruction",
                submenu : "[Draconic Boon 14+]",
                prereqeval: function (v) { return classes.known.barbarian.level >= 14; },
                description : desc([
                    "You become resistant to fire damage and any fire damage you deal is double against objects and",
                    "ignores fire resistance. While raging, you are engulfed in flames. You become immune to fire and",
                    "all creatures that enter or start their turn within 15-ft take fire damage equal to double your",
                    "Fury damage bonus."
                ]),
                dmgres : ["Fire"],
                savetxt: {immune : ["Fire (Raging)"]}
            },
        },
        "subclassfeature6" : {
            name : "Essence of Zorquan",
            source : ["SHB", 0],
            minlevel : 6,
            description : desc([
                "I grow a tail that I can use to make an additional attack as a bonus action",
                "The tail attack deals 1d8+STR bludg. damage",
                "I grow small wings that allow me to glide (5 ft horizontally for every 1 ft descended)",
                "Once at dawn, I can choose an element to gain resistance to while Draconic Fury is active",
                "I gain a breath weapon that deals 2d10 damage in a 5 ft × 30 ft line or 15 ft cone",
                "Creatures must make a DEX save (DC 8+Prof+CON) for half damage",
                "Breath weapon damage and area increases at higher levels"
            ]),
            weaponsAdd : ["Dragon Tail"],
            action: [["action", "Essence: Ele Res Choice (Fury)"],["bonus action", "Dragon Tail Atk (unarmed strike)"]],
            usages: levels.map(function (n) {
                return (n < 9 ? 2 : n < 16 ? 3 : 4) ;
            }),
            recovery: "SR",
            additional: levels.map(function (n) {
                if (n < 6) return "";
                if (n < 10) return "2d10, 5ft×30ft/15ft cone";
                if (n < 14) return "3d10, 10ft×60ft/30ft cone";
                if (n < 18) return "4d10, 10ft×60ft/30ft cone";
                return "4d10, 15ft×90ft/45ft cone";
            }),
            weaponOptions : [{
                regExpSearch : /breath weapon/i,
                name : "Breath Weapon",
                source : [["SRD", 5], ["P", 34]],
                ability : 3,
                type : "Natural",
                damage : [2, 10, "chosen type"],
                range : "5ft\xD730ft line or 15ft cone",
                description : "Hits all in area; Dex save, success - half damage",
                abilitytodamage : false,
                dc : true,
                dbBreathWeapon : true,
                selectNow : true,
            }],
            savetxt : { text : ["Resistance to one damage type (while raging)"] },
            calcChanges : {
                atkAdd : [
                    function (fields, v) {
                        if (/dragon tail/i.test(v.WeaponTextName) && classes.known.barbarian.level >= 14){
                        fields.Damage_Die = '1d12';
                        fields.Range = '15ft';}
                        if (/dragon claws/i.test(v.WeaponTextName) && classes.known.barbarian.level >= 14){
                        fields.Damage_Die = '1d12';}
                        if (v.theWea.dbBreathWeapon && classes.known.barbarian && classes.known.barbarian.level) 
                        fields.Damage_Die = (classes.known.barbarian.level < 10 ? 2 : classes.known.barbarian.level < 14 ? 3 : 4) + 'd10';
                        if (v.theWea.dbBreathWeapon && classes.known.barbarian && classes.known.barbarian.level < 10) {
                        fields.Range = '5ft×30ft line or 15ft cone';}
                        else if (v.theWea.dbBreathWeapon && classes.known.barbarian && classes.known.barbarian.level < 14) {
                        fields.Range = '10ft×60ft line or 30ft cone';}
                        else if (v.theWea.dbBreathWeapon && classes.known.barbarian && classes.known.barbarian.level < 18) {
                        fields.Range = '10ft×60ft line or 30ft cone';}
                        else if (v.theWea.dbBreathWeapon && classes.known.barbarian && classes.known.barbarian.level > 18){
                        fields.Range = '15ftx90ft line or 45ft cone';}
                    }
                ]
            }
        },
        "subclassfeature10" : {
            name : "Heart of the Wyrm",
            source : ["SHB", 0],
            minlevel : 10,
            description : desc([
                "I choose one of three paths: Heart of Tiamat, Heart of Bahamut, or Heart of Sardior",
                "This path cannot be changed. I can select one of my gained abilities at daily at dawn",
                "See Notes Pg."
            ]),
            choices : ["Tiamat (chromatic)", "Bahamut (metallic)", "Sardior (gem)"],
            "tiamat (chromatic)" : {
                //name : "Heart of the Wyrm",
                //source : ["SHB", 0],
                toNotesPage: [{
                    name: "Heart of Tiamat (Chromatic)",
                    page3notes: true,
                    note: [
                    "My blood and soul align with the malevolent Chromatic family",
                    "Once, at dawn, I can choose one of the following benefits (can change next dawn):",
                    "\u2022 Red Heart: 2 extra rages per day, immunity to extreme heat, climbing speed",
                    "\u2022 Blue Heart: +20ft movement speed, can Dash as part of Draconic Fury extension",
                    "\u2022 Green Heart: Speak with plants, swim speed, water breathing",
                    "\u2022 White Heart: Perfect memory for 1 month, immunity to extreme cold",
                    "\u2022 Black Heart: Heavily obscured in dim light, swim speed, water breathing",]
                }],
            },
            "bahamut (metallic)" : {
                //name : "Heart of the Wyrm",
                //source : ["SHB", 0],
                toNotesPage: [{
                    name: "Heart of Bahamut (Metallic)",
                    page3notes: true,
                    note: [
                    "My blood and soul align with the benevolent Metallic family",
                    "Once, at dawn, I can choose one of the following benefits (can change next dawn):",
                    "\u2022 Golden Heart: Advantage vs. charm/fear, swim speed, water breathing",
                    "\u2022 Silver Heart: Immunity to extreme cold and forced movement",
                    "\u2022 Bronze Heart: Can cast Zone of Truth once per short rest, swim speed, water breathing",
                    "\u2022 Copper Heart: Speak with animals, ignore difficult terrain, climbing speed",
                    "\u2022 Brass Heart: Can cast Major Image at 4th level once per short rest",]
                }],
            },
            "sardior (gem)" : {
                //name : "Heart of the Wyrm",
                //source : ["SHB", 0],
                toNotesPage: [{
                    name: "Heart of Sardior (Gem)",
                    page3notes: true,
                    note: [
                    "My blood and soul align with the impartial Gem family",
                    "Once, at dawn, I can choose one of the following benefits (can change next dawn):",
                    "\u2022 Amethyst Heart: Immunity to being knocked prone, swim speed, water breathing",
                    "\u2022 Emerald Heart: Advantage against psionic or illusion effects",
                    "\u2022 Sapphire Heart: Climbing speed with no hands needed",
                    "\u2022 Topaz Heart: Immunity to Exhaustion, swim speed, water breathing",
                    "\u2022 Crystal Heart: Can cast Guidance, Light, and Dancing Lights",
                    ""]
                }],
            },
            choiceDependencies : [{
				feature : "subclassfeature14",
			}]
        },
        "subclassfeature14" : {
			name : "Aspect of Asgorath",
			source : [["SHB", 0]],
			minlevel : 14,
			description : desc(["See Notes pg"]),
			"tiamat (chromatic)": {
                name: "Aspect of Asgorath",
                source : ["SHB", 0],
                description : desc(["See Notes pg"]),
                vision: [["Blindsight", 30], ["Truesight (Draconic Fury)", 60]],
                speed: { fly: { spd: "walk", enc: "walk" } },
                action: [["action","Aspect: Chromatic Flare (4d12 - Ele choice)"],["reaction", "Aspect: Elemental Immunity (choice)"]],
			    usages : levels.map(function (n) { return (n < 9 ? 2 : n < 16 ? 3 : 4);}),
                additional: "Element Choice (dmg / imm)",
                recovery : "SR",
                toNotesPage: [{
                    name: "Aspect of Asgorath: Tiamat",
                    page3notes: true,
                    note: [
                        "I gain the dragon creature type and become Large.",
                        "I gain extra benefits based on my Dragon Heart.",
                        "I gain Blindsight of 30 ft",
                        "My natural weapons and tail attack use d12s, and my tail attack gains 15 ft reach",
                        "I gain a flight speed equal to my walking speed",
                        "",
                        "When activating Draconic Fury, I transform into an aspect of Asgorath:",
                        "\u2022 I can hover without wings",
                        "\u2022 My shape cannot be changed against my will",
                        "\u2022 I gain 60 ft of True Sight",
                        "\u2022 Once per long rest, I automatically succeed on first Relentless Rage and regain half HP",
                        "\u2022 The DC increases to 15 for subsequent Relentless Rage checks",
                        "",
                        "Chromatic Benefits:",
                        "\u2022 My scales shine with the colors of the Chromatic family",
                        "\u2022 Action: Unleash Chromatic Flare (60ft rad, DEX save for half damage)",
                        "   Deal 4d12 elemental (choice) damage. I can do this a number of times equal to my Rage",
                        "   Damage Bonus per short rest",
                        "\u2022 Reaction: Gain immunity to Acid, Cold, Fire, Lightning, and Poison damage until next turn.",
                        "   I can do this is equal to my Rage Damage Bonus per short rest."]
                }]
            },
		    "bahamut (metallic)": {
                name: "Aspect of Asgorath",
                source : ["SHB", 0],
                description : desc(["See Notes pg"]),
                action : [["action", "Aspect: Platinum Lance (4d12)"], ["bonus action", "Aspect: Spectral Summon (1 per Rage)"]],
                usages : levels.map(function (n) { return (n < 9 ? 2 : n < 16 ? 3 : 4);}),
                additional : "Aspect: Platinum Lance",
                recovery : "SR",
                extraLimitedFeatures : [{
                    name : "Aspect: Spectral Summon (1 per Rage)"
                }],
                vision: [["Blindsight", 30], ["Truesight (Draconic Fury)", 60]],
                speed: { fly: { spd: "walk", enc: "walk" } },
                toNotesPage: [{
                    name: "Aspect of Asgorath: Bahamut",
                    source : ["SHB", 0],
                    page3notes: true,
                    note: [
                        "I gain the dragon creature type and become Large.",
                        "I gain extra benefits based on my Dragon Heart.",
                        "I gain Blindsight of 30 ft",
                        "My natural weapons and tail attack use d12s, and my tail attack gains 15 ft reach",
                        "I gain a flight speed equal to my walking speed",
                        "",
                        "When activating Draconic Fury, I transform into an aspect of Asgorath:",
                        "\u2022 I can hover without wings",
                        "\u2022 My shape cannot be changed against my will",
                        "\u2022 I gain 60 ft of True Sight",
                        "\u2022 Once per long rest, I automatically succeed on first Relentless Rage and regain half HP",
                        "\u2022 The DC increases to 15 for subsequent Relentless Rage checks",
                        "",
                        "Metallic Benefits:",
                        "\u2022 My scales gleam with the brilliance of platinum light",
                        "\u2022 Action: Can make a ranged attack using my STR Mod to summon a lance",
                        "   made of platinum light that deals 4d12 Radiant. Range is 30/90. You can ",
                        "   use this feature a number of times equal to your Rage damage bonus per sr",
                        "\u2022 Bonus Action: Summon 7 spectral ancient gold dragons that surround you",
                        "   and grant you and up to 7 allies within 60ft temp hp (20 + 2 * Barb lvl)",
                        "   once per use of Rage."]
                }]
            },
            "sardior (gem)": {
                name: "Aspect of Asgorath",
                source : ["SHB", 0],
                description : desc(["See Notes pg"]),
                action : ["bonus action", "Aspect: Teleport (60ft)"],
                usages : levels.map(function (n) { return (n < 9 ? 2 : n < 16 ? 3 : 4);}),
                additional : "Teleport (60ft) (3x per Rage)",
                recovery : "sr",
                vision: [["Blindsight", 30], ["Truesight (Draconic Fury)", 60]],
                speed: { fly: { spd: "walk", enc: "walk"} + "hover"},
                toNotesPage: [{
                    name: "Aspect of Asgorath: Sardior",
                    source : ["SHB", 0],
                    page3notes: true,
                    note: [
                        "I gain the dragon creature type and become Large.",
                        "I gain extra benefits based on my Dragon Heart.",
                        "I gain Blindsight of 30 ft",
                        "My natural weapons and tail attack use d12s, and my tail attack gains 15 ft reach",
                        "I gain a flight speed equal to my walking speed",
                        "",
                        "When activating Draconic Fury, I transform into an aspect of Asgorath:",
                        "\u2022 I can hover without wings",
                        "\u2022 My shape cannot be changed against my will",
                        "\u2022 I gain 60 ft of True Sight",
                        "\u2022 Once per long rest, I automatically succeed on first Relentless Rage and regain half HP",
                        "\u2022 The DC increases to 15 for subsequent Relentless Rage checks",
                        "",
                        "Gem Benefits:",
                        "\u2022 My scales shine with refractions of crimson ruby light",
                        "\u2022 Bonus Action: I can teleport 60ft in any direction a number of",
                        "   times equal to my Rage Damage Bonus per use of Rage. ",
                        "   I can use this feature a number of times equal to my Rage damage bonus per sr",
                        "\u2022 I can choose 2 resistances from the Essence of Zorgquan feature.",
                        "   Additionally, I can choose which damage type I want to use for my ",
                        "   Breath Weapon at the start of my turn."]
                }]
            },
        }, 
    },
},
WeaponsList["dragon tail"] = {
    baseWeapon : "unarmed strike",
    regExpSearch : /dragon tail/i,
    name : "Dragon Tail",
    source : ["SHB", 0],
    ability : 1,
    type : "Natural",
    damage : [1, 8, "bludgeoning"],
    range : "Melee",
    description : "Unarmed strike",
    abilitytodamage : true,
    selectNow: true,
});