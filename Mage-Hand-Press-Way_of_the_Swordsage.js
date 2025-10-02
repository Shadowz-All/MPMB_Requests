/*	-WHAT IS THIS?-
    This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
    Import this file using the "Add Extra Materials" bookmark.
    -KEEP IN MIND-
    It is recommended to enter the code in a fresh sheet be`fore adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
    Subject:	SubClass
    Effect:		This script adds the Mage Hand Press "Way of the SwordSage" subclass.
    Code by:	ShadowzAll
    Date:		2025-09-0328
*/
var iFileName = "MHP_Monk_SwordSage.js";

RequiredSheetVersion("13.2.0");

SourceList["MHP"] = {
    name: "Mage Hand Press: Way of the SwordSage",
    abbreviation: "MHP:SS",
    date: "2015/06/29",
};

//add subclasses
AddSubClass("monk", "way of the swordsage", {
    regExpSearch : /way of the swordsage/i, /*req. tells form how to search for it */
    subname : "Way of the SwordSage",
    source : [["MHP:SS", 0]],
    features : {
        "subclassfeature3" : {
            name: "Combat Discipline",
            source: ["MHP:SS", 0],
            minlevel : 3,
			description : desc([
				"I gain a number of superiority dice that I can use to fuel special Maneuvers",
				"I may reselect my known manuevers anytime I complete a long rest",
				"Once I use a prepared manuever, it becomes unprepared until I complete a rest, unless I use",
				"an action to meditate in order to prepare it again",
				"When a manuever requires the target to make a saving throw, I use my Ki save DC"
			]),
			additional : levels.map(function (n) {
					return "1d" + (n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10);
			}),
			usages : [0, 0, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5],
			recovery : "short rest"
		},
        "subclassfeature3.1" : {
			name : "Maneuvers",
			source : ["P", 73],
			minlevel : 3,
			description : levels.map(function (n) {
                var descr = desc(["Use the \"Choose Features\" button above to add a Maneuver to the third page",
				"I can use a Maneuver by expending a superiority die (only one Maneuver per attack)"]);
                if (n >= 17) {
                    descr += desc(["Use the \"Choose Features\" button above to add a Maneuver to the third page",
				"I can use a Maneuver by expending a superiority die (two Maneuvers per attack)"]);
                }
                return descr;
            }),
			additional : ["", "", "5 known", "5 known", "5 known", "7 known", "7 known", "7 known", "7 known", "7 known", "9 known", "9 known", "9 known", "9 known", "9 known", "11 known", "11 known", "11 known", "11 known", "11 known"],
			extraname : "Maneuver",
			extrachoices : ["Commander's Strike", "Disarming Attack", "Distracting Strike", "Evasive Footwork", "Feinting Attack", "Goading Attack", "Lunging Attack", "Maneuvering Attack", "Menacing Attack", "Parry", "Precision Attack", "Pushing Attack", "Rally", "Riposte", "Sweeping Attack", "Trip Attack"],
			"commander's strike" : {
				name : "Commander's Strike",
				source : ["P", 74],
				description : "\n   " + "I forgo one attack of my Attack action to use a bonus action to direct an ally I see/hear" + "\n   " + "The ally can use a reaction to make an attack, adding the superiority die to damage",
				action : [["bonus action", " (with Attack action)"]]
			},
			"disarming attack" : {
				name : "Disarming Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Target makes a Strength save or drops a held object of my choice to its feet"
			},
			"distracting strike" : {
				name : "Distracting Strike",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "The next attack of an ally before my next turn has adv. against the creature"
			},
			"evasive footwork" : {
				name : "Evasive Footwork",
				source : ["P", 74],
				description : "\n   " + "Use when moving; I add the superiority die to my AC until I stop moving"
			},
			"feinting attack" : {
				name : "Feinting Attack",
				source : ["P", 74],
				description : "\n   " + "As a bonus action, I can feint to gain adv. on my next attack against a target within 5 ft" + "\n   " + "If the attack hits, I add the superiority die to my attack's damage",
				action : [["bonus action", ""]]
			},
			"goading attack" : {
				name : "Goading Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Target makes a Wis save or has disadv. vs. other targets until the end of my next turn"
			},
			"lunging attack" : {
				name : "Lunging Attack",
				source : ["P", 74],
				description : "\n   " + "I can spend a superiority die to increase the reach of a melee weapon attack by 5 ft" + "\n   " + "If the attack hits, I add the superiority die to my attack's damage"
			},
			"maneuvering attack" : {
				name : "Maneuvering Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Ally can use reaction to move half speed without opportunity attack from the target"
			},
			"menacing attack" : {
				name : "Menacing Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Target makes a Wisdom save or is frightened of me until the end of my next turn"
			},
			"parry" : {
				name : "Parry",
				source : ["P", 74],
				description : "\n   " + "When damaged in melee, I can use a reaction to reduce it by superiority die + Dex mod",
				action : [["reaction", " (when damaged in melee)"]]
			},
			"precision attack" : {
				name : "Precision Attack",
				source : ["P", 74],
				description : "\n   " + "I add the superiority die to my attack roll, either before or after rolling"
			},
			"pushing attack" : {
				name : "Pushing Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to the attack's damage" + "\n   " + "If target is Large or smaller, it must make a Strength save or be pushed up to 15 ft away"
			},
			"rally" : {
				name : "Rally",
				source : ["P", 74],
				description : "\n   " + "Ally that can see/hear me gets temporary HP equal to superiority die + Wis mod",
				action : [["bonus action", ""]]
			},
			"riposte" : {
				name : "Riposte",
				source : ["P", 74],
				description : "\n   " + "When missed in melee, I can use my reaction to make one melee attack vs. the attacker" + "\n   " + "If the attack hits, I add the superiority die to my attack's damage",
				action : [["reaction", " (after missed in melee)"]]
			},
			"sweeping attack" : {
				name : "Sweeping Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature and a second creature is within 5 ft of the first" + "\n   " + "If the original attack roll hits this second creature, it takes the superiority die in damage"
			},
			"trip attack" : {
				name : "Trip Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to the attack's damage" + "\n   " + "If target is Large or smaller, it must make a Strength save or be knocked prone"
			}
		},

        "subclassfeature6" : {
            name : "Quick to Act",
            source: ["MHP:SS", 0],
            minlevel: 6,
            description : desc([
				"I am exceptionally quick to act, and have Advantage on Initiative rolls."
			]),
            advantages : [["Initiative", true]],
        },
		"subclassfeature11" : {
            name : "Mystic Jaunt",
			extraname : "Ki Feature",
            source: ["MHP:SS", 0],
			minlevel: 11,
			action: ["bonus action", ""],
			description : " [2 ki points]" + desc(["As a bonus action, teleport up to 60ft to a space I can see (adjacent to enemy)", "I gain Advantage on the first attack I make before the end of my turn"]),
		},
		"subclassfeature17" : {
            name : "Sublime Way",
            source: ["MHP:SS", 0],
			minlevel: 17,
			description: desc([
        		"I can use two different manuevers on a single attack, each expending separate Ki points"
			]),
		},
		
	},
})