/*	-INFORMATION-
	Subject:	This script adds the 5 new Epithets (subclasses) and 11 new feats from
				"Epithets: Expanded" by Logan Laidlaw (Nat19) for The Petal Knight class.
				Requires the base "Petal Knight" class script to be loaded first.
				Compatible with MPMB v14 (2014 ruleset).
	Code by:	ShadowzAll
	Updated:	v14.2.0 syntax (2014 ruleset)
*/

var iFileName = "Petal_Knight_Epithets_Expanded_v14.js";
RequiredSheetVersion("14.0.0");

SourceList["NAT19:EE"] = {
	name: "Logan Laidlaw: Epithets Expanded",
	abbreviation: "NAT19:EE",
	group: "Nat19",
	date: "2026/11/19"
};

// >>>>>>>>>>>>>>>>>>>>>> //
// >>> Add Subclasses >>> //
// >>>>>>>>>>>>>>>>>>>>>> //

// 1. Black Rose
AddSubClass("petal knight", "black rose", {
	regExpSearch: /black rose/i,
	subname: "Black Rose",
	source: [["NAT19:EE", 3]],
	features: {
		"subclassfeature2": {
			name: "Improved Critical (Melee)",
			source: [["NAT19:EE", 3]],
			minlevel: 2,
			description: desc([
				"Whenever I hit a creature with a melee weapon or melee spell attack, I score a critical hit on a d20 roll of 19 or 20."
			]),
			calcChanges: {
				atkAdd: [
					function (fields, v) {
						if (v.isMeleeWeapon || (v.isSpell && /melee/i.test(fields.Description))) {
							fields.Description += (fields.Description ? '; ' : '') + 'Crit 19-20';
						}
					},
					"My melee weapon and melee spell attacks score a critical hit on a roll of 19 or 20."
				]
			}
		},
		"subclassfeature6": {
			name: "Divergent Arms",
			source: [["NAT19:EE", 3]],
			minlevel: 6,
			description: desc([
				"I gain proficiency with heavy armor and all simple and martial weapons. My Petal Knight features that require a one-handed weapon can now be used with any weapon I am proficient with."
			]),
			armorProfs: [true, true, true, false],
			weaponProfs: [true, true]
		},
		"subclassfeature6.1": {
			name: "Noble Hunt",
			source: [["NAT19:EE", 3]],
			minlevel: 6,
			description: desc([
				"Once per turn as a bonus action, I can declare one creature I can see as my noble prey for 1 hour or until it dies (can have multiple simultaneously). I can't have disadvantage on saves against my noble prey, and it needs total cover to hide from me.",
				"I get one extra reaction per turn against each noble prey (used before my normal reaction): when it attacks me, I can use a reaction to impose disadvantage; when I attack it, I can use a reaction to gain advantage."
			]),
			usages: "Proficiency bonus per ",
			usagescalc: "event.value = How('Proficiency Bonus');",
			recovery: "long rest",
			action: [["bonus action", "Declare Noble Prey"], ["reaction", "Noble Hunt (Adv/Disadv)"]]
		},
		"subclassfeature11": {
			name: "Black Rose Branches",
			source: [["NAT19:EE", 3]],
			minlevel: 11,
			description: desc([
				"Whenever I choose a Virtuous Branches option, I can instead choose from the following:",
				"\u2022 Billowing Bulwark: Ranged attacks against me have disadvantage until the start of my next turn.",
				"\u2022 Noble Mark: Declare a creature I hit or that failed a save against the spell as my noble prey without expending a use.",
				"\u2022 Repulsion: Push creatures that failed a save against or were hit by the spell 30 ft away from its origin (knocked prone if stopped short by at least 10 ft by a solid object)."
			])
		},
		"subclassfeature15": {
			name: "Stained Roots",
			source: [["PK:EE", 3]],
			minlevel: 15,
			description: desc([
				"When I score a critical hit with a melee attack against a creature that isn't an elemental, undead, or construct, I regain HP equal to the damage dealt (or gain half the damage as temporary HP if I have no wounds)."
			])
		}
	}
});

// 2. Coral Rose
AddSubClass("petal knight", "coral rose", {
	regExpSearch: /coral rose/i,
	subname: "Coral Rose",
	source: [["PK:EE", 4]],
	features: {
		"subclassfeature2": {
			name: "Deceptive Bouquet",
			source: [["PK:EE", 4]],
			minlevel: 2,
			description: desc([
				"As a bonus action, I turn invisible and leave an illusory clone in my space (source of speech/gestures). At the end of each of my turns and when I take the Attack action or cast a spell, I make a Cha save (DC 8 + turns invisible) or become visible and my clones vanish.",
				"When I attack or am attacked while invisible, I briefly appear and leave a new clone in that space as I invisibly move away."
			]),
			usages: "half Prof. Bonus per ",
			usagescalc: "event.value = Math.floor(How('Proficiency Bonus') / 2);",
			recovery: "long rest",
			action: [["bonus action", ""]]
		},
		"subclassfeature6": {
			name: "Breath of Tranquility",
			source: [["PK:EE", 4]],
			minlevel: 6,
			description: desc([
				"At the start of my turn, if I am Charmed, Frightened, Poisoned, Stunned, or Paralyzed, I can end one of those conditions immediately; if I do so, I cannot use my action this turn."
			])
		},
		"subclassfeature11": {
			name: "Coral Rose Branches",
			source: [["PK:EE", 4]],
			minlevel: 11,
			description: desc([
				"Whenever I choose a Virtuous Branches option, I can instead choose from the following:",
				"\u2022 Advance: Gain a 1d10 advance die for 1 minute; expend it when I fail an attack roll or saving throw to add 1d10 to the roll.",
				"\u2022 Enthusiasm: Choose one creature targeted by or that saved against the spell; within the next minute, the next time I would miss an attack against it, I hit instead.",
				"\u2022 Liberation: Force one creature affected by the spell to make a Cha save or I copy one magical effect on it (max 1 copied effect at a time; ends when it ends on the original target)."
			])
		},
		"subclassfeature15": {
			name: "Undeterrable Pace",
			source: [["PK:EE", 4]],
			minlevel: 15,
			description: desc([
				"My base movement speed increases by 10 ft, and creatures have disadvantage on opportunity attacks against me. As a bonus action, I can teleport to an unoccupied space I can see within my remaining movement (expending movement equal to the straight-line distance)."
			]),
			speed: { allModes: "+10" },
			action: [["bonus action", "Teleport (uses movement)"]]
		}
	}
});

// 3. Gardenia
AddSubClass("petal knight", "gardenia", {
	regExpSearch: /gardenia/i,
	subname: "Gardenia",
	source: [["PK:EE", 5]],
	spellcastingList: {
		class: ["petal knight", "cleric"],
		spells: ClassList["petal knight"] ? ClassList["petal knight"].spellcastingList.spells : []
	},
	features: {
		"subclassfeature2": {
			name: "Purity of Nature",
			source: [["PK:EE", 5]],
			minlevel: 2,
			description: desc([
				"Whenever I learn a new Petal Knight spell, I can choose from the Cleric spell list instead. Upon gaining this feature, I can also swap the spell gained at this level and one other known spell for Cleric spells."
			])
		},
		"subclassfeature6": {
			name: "Royal Posture",
			source: [["PK:EE", 5]],
			minlevel: 6,
			description: desc([
				"I can't be knocked prone by effects from creatures of my size category, and I have advantage on rolls to oppose or break free from grapples, shoves, or restraining effects. I can attempt to escape a grapple as a bonus action."
			]),
			action: [["bonus action", "Escape Grapple"]]
		},
		"subclassfeature6.1": {
			name: "Bane of the Unknown",
			source: [["PK:EE", 5]],
			minlevel: 6,
			description: levels.map(function (n) {
				var die = n < 14 ? "1d6" : "2d6";
				return desc([
					"When I hit a monstrosity or aberration with a weapon attack, I deal +" + die + " radiant damage and can expend a Pact Spell Slot to force it and creatures of its type within 30 ft to make a Wis save or be Turned for 1 minute (or until damaged)."
				]);
			}),
			additional: levels.map(function (n) {
				return n < 6 ? "" : (n < 14 ? "+1d6" : "+2d6") + " Radiant vs. Monstrosity/Aberration";
			})
		},
		"subclassfeature11": {
			name: "Gardenia Branches",
			source: [["PK:EE", 5]],
			minlevel: 11,
			description: desc([
				"Whenever I choose a Virtuous Branches option, I can instead choose from the following:",
				"\u2022 Buffer: Until the start of my next turn, reduce each instance of damage I take by half my Petal Knight level.",
				"\u2022 Expedience: Chosen creatures affected by the spell can use their reaction to move up to half their speed without provoking opportunity attacks.",
				"\u2022 Rejuvenation: If the spell restored HP to a creature, also cure it of Charmed, Frightened, Poisoned, or Stunned."
			])
		},
		"subclassfeature15": {
			name: "Proud Heart",
			source: [["PK:EE", 5]],
			minlevel: 15,
			description: desc([
				"When reduced to 0 HP by damage, I make a Cha save (DC = excess damage; +2 cumulatively per success until long rest) to drop to 1d6 HP instead.",
				"If I fail the save, or an effect kills/reduces me to 0 HP without damage, I drop to 1 HP instead and can't use any part of this feature again until I finish a long rest."
			]),
			usages: 1,
			recovery: "long rest"
		}
	}
});

// 4. Morning Glory
AddSubClass("petal knight", "morning glory", {
	regExpSearch: /morning glory/i,
	subname: "Morning Glory",
	source: [["PK:EE", 6]],
	features: {
		"subclassfeature2": {
			name: "Breath of Unity",
			source: [["PK:EE", 6]],
			minlevel: 2,
			description: desc([
				"By spending 1 minute in calm breathing exercises with up to 6 other creatures, participants can spend Hit Dice as if finishing a short rest (without other short rest benefits) and gain temporary HP equal to my Charisma modifier."
			])
		},
		"subclassfeature6": {
			name: "Attention Collar",
			source: [["PK:EE", 6]],
			minlevel: 6,
			description: desc([
				"As an action, up to my Cha mod creatures I see within 60 ft must make a Cha save or be cursed with a collar for 1 minute: they can't move farther away from me unless deliberately moving closer, we can't hide from each other, their attacks against others deal half damage, and either of us can use a reaction to turn ethereal and move up to 30 ft through solid objects toward the other."
			]),
			action: [["action", "Attention Collar"], ["reaction", "Ethereal Step (30 ft)"]]
		},
		"subclassfeature11": {
			name: "Bond of Dedication",
			source: [["PK:EE", 6]],
			minlevel: 11,
			description: desc([
				"Through a 1-hour ceremony, I can bind myself to one willing creature (1 bond at a time). On the same plane: we sense each other's condition, communicate telepathically, understand each other's languages, maximize healing given to each other, can use a reaction within 30 ft when one drops to 0 HP to halve our current HP and heal the other by that amount, and can use a reaction to add our Proficiency Bonus to the other's attack roll or save.",
				"Unilaterally severing the bond inflicts 1 level of exhaustion, 3d8 psychic damage, and prevents forming a new bond for 1 week."
			]),
			action: [["reaction", "Bond of Dedication (Transfer HP / +PB)"]]
		},
		"subclassfeature15": {
			name: "Bitter Farewell",
			source: [["PK:EE", 6]],
			minlevel: 15,
			description: desc([
				"Once per round (resets at the start of my turn), when a creature misses me with an attack roll, I can immediately move up to my speed without provoking opportunity attacks or range-exit triggers (such as Sentinel) from that attacker."
			])
		}
	}
});

// 5. Sakura
AddSubClass("petal knight", "sakura", {
	regExpSearch: /sakura/i,
	subname: "Sakura",
	source: [["PK:EE", 7]],
	spellcastingList: {
		class: ["petal knight", "sorcerer"],
		spells: ClassList["petal knight"] ? ClassList["petal knight"].spellcastingList.spells : []
	},
	features: {
		"subclassfeature2": {
			name: "Spark of Sorcery",
			source: [["PK:EE", 7]],
			minlevel: 2,
			description: desc([
				"Whenever I learn a new Petal Knight spell, I can choose from the Sorcerer spell list instead. Upon gaining this feature, I can also swap the spell gained at this level and one other known spell for Sorcerer spells."
			])
		},
		"subclassfeature2.1": {
			name: "Valor",
			source: [["PK:EE", 7]],
			minlevel: 2,
			description: desc([
				"I gain a pool of Valor dice (d6s; d8s at 6th, d10s at 12th) equal to half my Petal Knight level (rounded down) + 2, regained on a long rest, for the following effects:",
				"\u2022 Armor Up: Reaction when hit by an attack I see to roll a Valor die and add it to my AC until the start of my next turn.",
				"\u2022 Counter Strike: Reaction when attacked to subtract a Valor die from the attack roll; if it misses, make one weapon attack against the attacker if in range.",
				"\u2022 Power Attack: Add a Valor die to a weapon attack roll and (if it hits) its damage roll.",
				"\u2022 Quick Draw: When surprised, spend a Valor die to act normally and immediately draw a main and off-hand weapon.",
				"\u2022 Targeted Sorcery: Subtract a Valor die from a target's first saving throw against a Petal Knight spell I cast."
			]),
			additional: levels.map(function (n) {
				if (n < 2) return "";
				var die = n < 6 ? "d6" : n < 12 ? "d8" : "d10";
				return (Math.floor(n / 2) + 2) + "\u00D7 " + die;
			}),
			usages: "half PK level + 2 per ",
			usagescalc: "event.value = (classes.known['petal knight'] ? Math.floor(classes.known['petal knight'].level / 2) : 1) + 2;",
			recovery: "long rest",
			action: [["reaction", "Armor Up / Counter Strike"]]
		},
		"subclassfeature6": {
			name: "Gilded Instincts",
			source: [["PK:EE", 7]],
			minlevel: 6,
			description: desc([
				"While not wearing armor or using a shield, my AC equals 10 + my Dexterity modifier + my Wisdom modifier."
			]),
			armorOptions: [{
				regExpSearch: /justToAddToDropDownAndEffectWildShape/,
				name: "Gilded Instincts (Wis)",
				source: [["PK:EE", 7]],
				ac: "10+Wis"
			}],
			armorAdd: "Gilded Instincts (Wis)"
		},
		"subclassfeature6.1": {
			name: "Vampiric Blade",
			source: [["PK:EE", 7]],
			minlevel: 6,
			description: levels.map(function (n) {
				var gain = n < 15 ? "temporary hit points" : "hit points";
				return desc([
					"Once per turn when I hit a creature with a one-handed weapon" + (n >= 15 ? " (or any attack benefiting from a Valor effect)" : "") + ", I gain " + gain + " equal to half the damage dealt."
				]);
			})
		},
		"subclassfeature11": {
			name: "Extra Attack Improvement",
			source: [["PK:EE", 7]],
			minlevel: 11,
			description: desc([
				"Whenever I take the Attack action, I can make three attacks instead of two, provided all attacks are made with one-handed weapons."
			])
		},
		"subclassfeature15": {
			name: "Blood Roots",
			source: [["PK:EE", 7]],
			minlevel: 15,
			description: desc([
				"My Vampiric Blade restores actual hit points instead of granting temporary hit points, and also triggers on any attack benefiting from a Valor effect."
			])
		}
	}
});

// >>>>>>>>>>>>>>>>> //
// >>> Add Feats >>> //
// >>>>>>>>>>>>>>>>> //

FeatsList["berserker"] = {
	name: "Berserker",
	source: [["PK:EE", 8]],
	description: [
		"I increase my Str or Dex by 1 (max 20). If a creature hit me since the end of my last turn, my next weapon attack against it has advantage (even if I would otherwise have disadvantage). When an attack reduces me to 0 HP without killing me outright, I can use my reaction just before falling unconscious to make one weapon attack against the attacker if in range."
	],
	action: [["reaction", "Berserker Strike (at 0 HP)"]],
	choices: ["Strength", "Dexterity"],
	"strength": {
		description: [
			"If a creature hit me since the end of my last turn, my next weapon attack against it has advantage (canceling disadvantage). When an attack reduces me to 0 HP without outright killing me, I can use my reaction to make one weapon attack against it. [+1 Strength]"
		],
		scores: [1, 0, 0, 0, 0, 0],
		scoresMaximum: [20, 0, 0, 0, 0, 0]
	},
	"dexterity": {
		description: [
			"If a creature hit me since the end of my last turn, my next weapon attack against it has advantage (canceling disadvantage). When an attack reduces me to 0 HP without outright killing me, I can use my reaction to make one weapon attack against it. [+1 Dexterity]"
		],
		scores: [0, 1, 0, 0, 0, 0],
		scoresMaximum: [0, 20, 0, 0, 0, 0]
	}
};

FeatsList["glorious purpose"] = {
	name: "Glorious Purpose",
	source: [["PK:EE", 8]],
	prerequisite: "Proficiency in Persuasion or Deception",
	prereqeval: function (v) {
		return v.skillProfs.indexOf("Persuasion") !== -1 || v.skillProfs.indexOf("Deception") !== -1;
	},
	description: [
		"When a weapon attack would reduce me to 0 HP, I can use my reaction to speak in a language I know and make a Charisma check contested by the attacker's Wisdom (Insight) check (attacker has advantage if it doesn't understand the language). If I win, the attack misses instead."
	],
	action: [["reaction", "Glorious Purpose (avoid 0 HP)"]]
};

FeatsList["invoke consideration"] = {
	name: "Invoke Consideration",
	source: [["PK:EE", 8]],
	prerequisite: "Ability to cast at least 1 spell that can target 2 or more creatures",
	prereqeval: function (v) {
		return v.isSpellcaster;
	},
	description: [
		"I increase my spellcasting ability by 1 (max 20). When casting a spell affecting both allies and enemies, chosen affected creatures can use their reaction to move up to half their speed out of the area without provoking opportunity attacks from other affected creatures. When targeting creatures with a spell, any number of them can use their reaction to gain advantage on their first save against it."
	],
	choices: ["Intelligence", "Wisdom", "Charisma"],
	"intelligence": {
		description: [
			"When I cast a spell affecting allies and enemies, chosen targets can use a reaction to move half speed out of the area (no OA from other targets). Any target of my spell can use its reaction to gain advantage on its first save against it. [+1 Intelligence]"
		],
		scores: [0, 0, 0, 1, 0, 0],
		scoresMaximum: [0, 0, 0, 20, 0, 0]
	},
	"wisdom": {
		description: [
			"When I cast a spell affecting allies and enemies, chosen targets can use a reaction to move half speed out of the area (no OA from other targets). Any target of my spell can use its reaction to gain advantage on its first save against it. [+1 Wisdom]"
		],
		scores: [0, 0, 0, 0, 1, 0],
		scoresMaximum: [0, 0, 0, 0, 20, 0]
	},
	"charisma": {
		description: [
			"When I cast a spell affecting allies and enemies, chosen targets can use a reaction to move half speed out of the area (no OA from other targets). Any target of my spell can use its reaction to gain advantage on its first save against it. [+1 Charisma]"
		],
		scores: [0, 0, 0, 0, 0, 1],
		scoresMaximum: [0, 0, 0, 0, 0, 20]
	}
};

FeatsList["metamagical roots"] = {
	name: "Metamagical Roots",
	source: [["PK:EE", 8]],
	prerequisite: "Pact Magic feature, Charisma 15 or higher",
	prereqeval: function (v) {
		return (classes.known["petal knight"] || classes.known.warlock) && Number(What("Cha")) >= 15;
	},
	description: [
		"Choose two Metamagic options (Careful, Distant, Empowered, Heightened, Seeking, or Twinned Spell) via \"Choose Feature\". Once per short or long rest when I cast a spell using a Pact Spell Slot, I can apply one chosen option (ignoring sorcery point cost) by adding a verbal component. I can swap one option at each ASI level."
	],
	usages: 1,
	recovery: "short rest",
	extraname: "Metamagical Roots Option",
	extrachoices: ["Careful Spell", "Distant Spell", "Empowered Spell", "Heightened Spell", "Seeking Spell", "Twinned Spell"],
	extratimes: [2],
	choicesNotInMenu: false,
	"careful spell": {
		name: "Careful Spell",
		source: [["PK:EE", 8]],
		description: desc(["When a spell forces other creatures to make a saving throw, choose up to Cha mod creatures (min 1) to automatically succeed on the save."])
	},
	"distant spell": {
		name: "Distant Spell",
		source: [["PK:EE", 8]],
		description: desc(["Double the range of a spell with a range of 5 ft or greater, or change a Touch spell's range to 30 ft."])
	},
	"empowered spell": {
		name: "Empowered Spell",
		source: [["PK:EE", 8]],
		description: desc(["When rolling damage for a spell, reroll up to Cha mod damage dice (min 1) and use the new rolls."])
	},
	"heightened spell": {
		name: "Heightened Spell",
		source: [["PK:EE", 8]],
		description: desc(["Give one target of a spell disadvantage on its first saving throw made against the spell."])
	},
	"seeking spell": {
		name: "Seeking Spell",
		source: [["PK:EE", 8]],
		description: desc(["If I make an attack roll for a spell and miss, I can reroll the d20 and must use the new roll."])
	},
	"twinned spell": {
		name: "Twinned Spell",
		source: [["PK:EE", 8]],
		description: desc(["When casting a spell that targets only one creature and doesn't have a range of Self, target a second creature in range with the same spell."])
	}
};

FeatsList["promise of certainty"] = {
	name: "Promise of Certainty",
	source: [["PK:EE", 8]],
	prerequisite: "Petal Knight level 2 or higher",
	prereqeval: function (v) {
		return classes.known["petal knight"] && classes.known["petal knight"].level >= 2;
	},
	description: [
		"I increase my Charisma score by 1 (max 20). I choose two ability scores; once per short or long rest for each chosen ability, when I fail a saving throw with that ability, I can reroll it and must use the new result."
	],
	scores: [0, 0, 0, 0, 0, 1],
	scoresMaximum: [0, 0, 0, 0, 0, 20],
	usages: 2,
	recovery: "short rest",
	additional: "1 reroll per chosen save"
};

FeatsList["promise of companionship"] = {
	name: "Promise of Companionship",
	source: [["PK:EE", 9]],
	prerequisite: "Petal Knight level 2 or higher",
	prereqeval: function (v) {
		return classes.known["petal knight"] && classes.known["petal knight"].level >= 2;
	},
	description: [
		"I increase my Str or Con by 1 (max 20). By spending 1 minute strategizing with a creature that understands me, I form a pact until my next short/long rest: while my partner isn't incapacitated/unconscious, I have advantage on attacks against enemies within 5 ft of it. If my partner drops to 0 HP, I can use my reaction to move up to my speed closer to it and make one weapon attack with advantage against the attacker."
	],
	action: [["reaction", "Avenge Pact Partner"]],
	choices: ["Strength", "Constitution"],
	"strength": {
		description: [
			"Spend 1 min to form a pact until next short/long rest: gain advantage on attacks against enemies within 5 ft of my conscious partner. If my partner drops to 0 HP, use my reaction to move up to my speed toward it and make one weapon attack with advantage against the attacker. [+1 Strength]"
		],
		scores: [1, 0, 0, 0, 0, 0],
		scoresMaximum: [20, 0, 0, 0, 0, 0]
	},
	"constitution": {
		description: [
			"Spend 1 min to form a pact until next short/long rest: gain advantage on attacks against enemies within 5 ft of my conscious partner. If my partner drops to 0 HP, use my reaction to move up to my speed toward it and make one weapon attack with advantage against the attacker. [+1 Constitution]"
		],
		scores: [0, 0, 1, 0, 0, 0],
		scoresMaximum: [0, 0, 20, 0, 0, 0]
	}
};

FeatsList["promise of efficacy"] = {
	name: "Promise of Efficacy",
	source: [["PK:EE", 9]],
	prerequisite: "Petal Knight level 2 or higher",
	prereqeval: function (v) {
		return classes.known["petal knight"] && classes.known["petal knight"].level >= 2;
	},
	description: [
		"I increase my Str or Dex by 1 (max 20). Choose one proficient weapon type or specific proficient weapon (can change on Petal Knight level-up): its critical hit range increases by 1, and when I score a critical hit with it, I roll 1d100 and regain an expended Pact Spell Slot on a result of 10 + my Petal Knight level or lower."
	],
	choices: ["Strength", "Dexterity"],
	"strength": {
		description: [
			"Choose one proficient weapon type or specific weapon (changeable on PK level-up): its crit range increases by 1, and critting with it regains a Pact Spell Slot on a d100 roll \u2264 10 + Petal Knight level. [+1 Strength]"
		],
		scores: [1, 0, 0, 0, 0, 0],
		scoresMaximum: [20, 0, 0, 0, 0, 0]
	},
	"dexterity": {
		description: [
			"Choose one proficient weapon type or specific weapon (changeable on PK level-up): its crit range increases by 1, and critting with it regains a Pact Spell Slot on a d100 roll \u2264 10 + Petal Knight level. [+1 Dexterity]"
		],
		scores: [0, 1, 0, 0, 0, 0],
		scoresMaximum: [0, 20, 0, 0, 0, 0]
	}
};

FeatsList["promise of levity"] = {
	name: "Promise of Levity",
	source: [["PK:EE", 9]],
	prerequisite: "Petal Knight level 2 or higher",
	prereqeval: function (v) {
		return classes.known["petal knight"] && classes.known["petal knight"].level >= 2;
	},
	description: [
		"I increase my Charisma score by 1 (max 20). When a creature I see that can hear me within 60 ft fails an ability check, I can use my reaction to add my Charisma modifier to its roll. When I fail a contested Acrobatics or Athletics check, I can use my reaction or bonus action to have an ally within 5 ft of my opponent make the check in my place."
	],
	scores: [0, 0, 0, 0, 0, 1],
	scoresMaximum: [0, 0, 0, 0, 0, 20],
	action: [["reaction", "Promise of Levity (+Cha / Ally Check)"], ["bonus action", "Ally Contested Check"]]
};

FeatsList["promise of planar defense"] = {
	name: "Promise of Planar Defense",
	source: [["PK:EE", 9]],
	prerequisite: "Petal Knight level 2 or higher",
	prereqeval: function (v) {
		return classes.known["petal knight"] && classes.known["petal knight"].level >= 2;
	},
	description: [
		"I increase my Intelligence score by 1 (max 20). As an action, until the end of my next turn I sense the direction, type, and size of aberrations and monstrosities within 120 ft, as well as planar portals, plane-attuned objects, and planar-travel magic items (and clues to their associated plane)."
	],
	scores: [0, 0, 0, 1, 0, 0],
	scoresMaximum: [0, 0, 0, 20, 0, 0],
	usages: "Proficiency bonus per ",
	usagescalc: "event.value = How('Proficiency Bonus');",
	recovery: "long rest",
	action: [["action", "Planar Sense (120 ft)"]]
};

FeatsList["promise of understanding"] = {
	name: "Promise of Understanding",
	source: [["PK:EE", 9]],
	prerequisite: "Petal Knight level 2 or higher",
	prereqeval: function (v) {
		return classes.known["petal knight"] && classes.known["petal knight"].level >= 2;
	},
	description: [
		"I increase my Wis or Cha by 1 (max 20). As an action, I form a 10-minute link with a creature speaking an unknown language so we understand each other. Once per short rest, I can affect up to 1 + my Proficiency Bonus creatures within 60 ft as if casting Calm Emotions (using my Petal Knight spell save DC)."
	],
	usages: 1,
	recovery: "short rest",
	action: [["action", "Universal Translation / Calm Emotions"]],
	choices: ["Wisdom", "Charisma"],
	"wisdom": {
		description: [
			"As an action, link with a creature for 10 min to mutually understand speech across languages. Once per short rest, pacify up to 1 + Proficiency Bonus creatures within 60 ft as Calm Emotions (Petal Knight spell save DC). [+1 Wisdom]"
		],
		scores: [0, 0, 0, 0, 1, 0],
		scoresMaximum: [0, 0, 0, 0, 20, 0]
	},
	"charisma": {
		description: [
			"As an action, link with a creature for 10 min to mutually understand speech across languages. Once per short rest, pacify up to 1 + Proficiency Bonus creatures within 60 ft as Calm Emotions (Petal Knight spell save DC). [+1 Charisma]"
		],
		scores: [0, 0, 0, 0, 0, 1],
		scoresMaximum: [0, 0, 0, 0, 0, 20]
	}
};

FeatsList["tactician's command"] = {
	name: "Tactician's Command",
	source: [["PK:EE", 9]],
	prerequisite: "Charisma 14 or higher",
	prereqeval: function (v) {
		return Number(What("Cha")) >= 14;
	},
	description: [
		"I increase my Charisma score by 1 (max 20). Once per turn, when an ally I can see that can hear me makes a weapon attack, I can grant that attack advantage, even if the ally has disadvantage."
	],
	scores: [0, 0, 0, 0, 0, 1],
	scoresMaximum: [0, 0, 0, 0, 0, 20],
	usages: "Proficiency bonus per ",
	usagescalc: "event.value = How('Proficiency Bonus');",
	recovery: "long rest"
};