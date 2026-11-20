/*	-INFORMATION-
	Subject:	Class, Subclasses
	Effect:		This script adds "The Petal Knight" class by Logan Laidlaw (Nat19).
				Compatible with MPMB v14 (2014 ruleset).
	Code by:	ShadowzAll
	Updated:	v14.2.0 syntax (2014 ruleset)
*/

var iFileName = "The_Petal_Knight_v14.js";
RequiredSheetVersion("14.0.0");

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Define Sources for everything first >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

SourceList["NAT19:PK"] = {
	name: "Nat19: Petal Knight",
	abbreviation: "NAT19:PK",
	group: "Nat19",
	date: "2026/11/19"
};

// >>>>>>>>>>>>>>>>>>>>>> //
// >>> Add Base Class >>> //
// >>>>>>>>>>>>>>>>>>>>>> //

ClassList["petal knight"] = {
	regExpSearch: /^(?=.*petal)(?=.*knight).*$/i,
	name: "Petal Knight",
	source: [["NAT19:PK", 3]],
	primaryAbility: "Dexterity or Strength, and Wisdom",
	abilitySave: 5,
	prereqs: "Strength or Dexterity 13 and Wisdom 15",
	die: 10,
	improvements: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves: ["Dex", "Cha"],
	skillstxt: {
		primary: "Choose three from Animal Handling, Athletics, History, Investigation, Nature, Perception, Persuasion, Religion, and Survival",
		secondary: "Choose one from History, Nature, or Persuasion"
	},
	toolProfs: {
		primary: [["Musical instrument", 1], "Cartographer's tools", ["Artisan's tools", 1]]
	},
	armorProfs: {
		primary: [true, true, false, false],
		secondary: [true, true, false, false]
	},
	weaponProfs: {
		primary: [true, true, ["No Heavy or Two-Handed weapons"]],
		secondary: [true, false]
	},
	equipment: "Petal Knight starting equipment:" +
		"\n \u2022 A rapier, a longsword, or any weapon with the light or finesse property" +
		"\n \u2022 A diplomat's pack or an explorer's pack" +
		"\n \u2022 An arcane focus or a pouch of 5 gp" +
		"\n \u2022 Leather armor and three daggers",
	subclasses: ["Epithets", []],
	subclassGainedLevel: 2,
	attacks: levels.map(function (n) { return n < 5 ? 1 : 2; }),
	spellcastingFactor: "warlock1",
	spellcastingTable: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
		[1, 0, 0, 0, 0, 0, 0, 0, 0], // 1
		[2, 0, 0, 0, 0, 0, 0, 0, 0], // 2
		[0, 2, 0, 0, 0, 0, 0, 0, 0], // 3
		[0, 2, 0, 0, 0, 0, 0, 0, 0], // 4
		[0, 0, 2, 0, 0, 0, 0, 0, 0], // 5
		[0, 0, 2, 0, 0, 0, 0, 0, 0], // 6
		[0, 0, 0, 2, 0, 0, 0, 0, 0], // 7
		[0, 0, 0, 2, 0, 0, 0, 0, 0], // 8
		[0, 0, 0, 0, 2, 0, 0, 0, 0], // 9
		[0, 0, 0, 0, 3, 0, 0, 0, 0], // 10
		[0, 0, 0, 0, 3, 0, 0, 0, 0], // 11
		[0, 0, 0, 0, 3, 0, 0, 0, 0], // 12
		[0, 0, 0, 0, 3, 0, 0, 0, 0], // 13
		[0, 0, 0, 0, 3, 0, 0, 0, 0], // 14
		[0, 0, 0, 0, 3, 0, 0, 0, 0], // 15
		[0, 0, 0, 0, 3, 0, 0, 0, 0], // 16
		[0, 0, 0, 0, 4, 0, 0, 0, 0], // 17
		[0, 0, 0, 0, 4, 0, 0, 0, 0], // 18
		[0, 0, 0, 0, 4, 0, 0, 0, 0], // 19
		[0, 0, 0, 0, 4, 0, 0, 0, 0]  // 20
	],
	spellcastingKnown: {
		spells: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
	},
	spellcastingList: {
		class: "petal knight",
		spells: [
			// 1st Level
			"absorb elements", "animal friendship", "charm person", "command", "compelled duel",
			"detect magic", "earth tremor", "entangle", "faerie fire", "jump", "longstrider",
			"snare", "thunderwave", "zephyr strike",
			// 2nd Level
			"barkskin", "blur", "darkvision", "earthbind", "enhance ability", "flame blade",
			"gust of wind", "hold person", "lesser restoration", "moonbeam", "protection from poison",
			"see invisibility", "spike growth", "warding wind",
			// 3rd Level
			"call lightning", "daylight", "dispel magic", "elemental weapon", "erupting earth",
			"flame arrows", "fly", "melf's minute meteors", "protection from energy", "sleet storm",
			"tidal wave", "thunder step", "wall of water", "water breathing", "wind wall",
			// 4th Level
			"banishment", "charm monster", "confusion", "control water", "elemental bane",
			"freedom of movement", "guardian of nature", "ice storm", "mordenkainen's faithful hound",
			"sickening radiance", "stone shape", "stoneskin", "wall of fire", "watery sphere",
			// 5th Level
			"antilife shell", "control winds", "dispel evil and good", "holy weapon", "maelstrom",
			"reincarnate", "skill empowerment", "steel wind strike", "swift quiver", "tree stride",
			"wall of stone", "wrath of nature"
		]
	},
	features: {
		"fighting style": {
			name: "Fighting Style",
			source: [["NAT19:PK", 5]],
			minlevel: 1,
			description: desc([
				"Choose a Fighting Style using the \"Choose Feature\" button above. Whenever I reach an ASI level in this class, I can replace it with another Petal Knight style."
			]),
			choices: [
				"Arcane Flourisher", "Archery", "Blind Fighting", "Defense", "Dueling",
				"Interception", "Thrown Weapon Fighting", "Two-Weapon Fighting", "Unarmed Fighting"
			],
			"arcane flourisher": {
				name: "Arcane Flourisher Fighting Style",
				source: [["PK:LL", 5]],
				description: desc([
					"When I cast a spell that involves a weapon attack or spell attack, I gain a +2 bonus to those attack rolls."
				]),
				calcChanges: {
					atkCalc: [
						function (fields, v, output) {
							if (v.isSpell) output.extraHit += 2;
						},
						"When I cast a spell that involves a weapon attack or spell attack, I gain a +2 bonus to those attack rolls."
					]
				}
			},
			"archery": FightingStyles.archery,
			"blind fighting": FightingStyles.blind_fighting,
			"defense": FightingStyles.defense,
			"dueling": FightingStyles.dueling,
			"interception": FightingStyles.interception,
			"thrown weapon fighting": FightingStyles.thrown_weapon,
			"two-weapon fighting": FightingStyles.two_weapon,
			"unarmed fighting": FightingStyles.unarmed
		},
		"pact magic": {
			name: "Pact Magic",
			source: [["PK:LL", 5]],
			minlevel: 1,
			description: desc([
				"I can cast Petal Knight spells that I know, using Wisdom as my spellcasting ability. I regain all expended Pact Spell Slots on a short or long rest.",
				"I can use an arcane focus or a flower/replica matching my Epithet's emblem as a spellcasting focus (consuming the flower/replica when replacing material components). Flowers matching my emblem never die or wither naturally."
			]),
			additional: levels.map(function (n) {
				var known = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15][n - 1];
				var slots = n < 2 ? 1 : n < 10 ? 2 : n < 17 ? 3 : 4;
				var lvl = n < 3 ? "1st" : n < 5 ? "2nd" : n < 7 ? "3rd" : n < 9 ? "4th" : "5th";
				return known + " spells known; " + slots + "\u00D7 " + lvl + " level slots";
			}),
			calcChanges: {
				atkAdd: [
					function (fields, v) {
						if (v.isWeapon && !v.isNaturalWeapon && classes.known["petal knight"] && classes.known["petal knight"].subclass !== "petal knight-osmanthus") {
							if (/heavy|two-handed/i.test(fields.Description) && !v.theWea.prof) {
								fields.Proficiency = false;
							}
						}
					},
					"I am proficient with simple and martial weapons that lack the Heavy and Two-Handed properties."
				]
			}
		},
		"subclassfeature2": {
			name: "Epithet",
			source: [["PK:LL", 6]],
			minlevel: 2,
			description: desc([
				"Choose an Epithet (floral emblem) to represent my soul and put it in the \"Class\" field on the first page. I gain features from it at 2nd, 6th, 11th, and 15th level."
			])
		},
		"virtuous branches": {
			name: "Virtuous Branches",
			source: [["PK:LL", 6]],
			minlevel: 3,
			description: desc([
				"Whenever I cast a spell using a Pact Spell Slot, I can invoke one of the following effects as part of the casting action (each usable once per turn):",
				"\u2022 Blossoming Step: If a spell targeting a creature within 50 ft \u00D7 slot level hits or the target fails its save, I can teleport to an unoccupied space adjacent to it (unaffected by the spell's area on this turn).",
				"\u2022 Fortify: Until the end of my next turn, add 1d4 to each weapon or spell attack roll I make.",
				"\u2022 Graceful Protection: Me and up to 3 chosen creatures within 30 ft gain +half my Proficiency Bonus (rounded down) on the next saving throw made within 10 minutes.",
				"\u2022 Sweep: I can take the Dash action as a bonus action, and creatures targeted by the spell have disadvantage on opportunity attacks against me this turn."
			]),
			action: [["bonus action", "Sweep (Dash)"]]
		},
		"extra attack": {
			name: "Extra Attack",
			source: [["PK:LL", 6]],
			minlevel: 5,
			description: desc([
				"I can attack twice, instead of once, whenever I take the Attack action on my turn."
			])
		},
		"virtuous flora": {
			name: "Virtuous Flora",
			source: [["PK:LL", 6]],
			minlevel: 7,
			description: desc([
				"As a bonus action, I can tap into my Epithet to gain one of the following effects:",
				"\u2022 Attack: Make one attack with a one-handed weapon.",
				"\u2022 Charming Soul: Gain advantage on Charisma checks and saving throws for 1 minute.",
				"\u2022 Flourish: Gain advantage on attack rolls with one-handed weapons until the end of this turn.",
				"\u2022 Shroud: Gain resistance to one damage type of my choice until the start of my next turn.",
				"\u2022 Smite: My next weapon attack this turn deals extra weapon damage equal to 1d10 + half my Petal Knight level (rounded down)."
			]),
			additional: levels.map(function (n) {
				return n < 7 ? "" : "Smite: +1d10+" + Math.floor(n / 2);
			}),
			usages: "half Prof. Bonus + 1 per ",
			usagescalc: "event.value = Math.floor(How('Proficiency Bonus') / 2) + 1;",
			recovery: "short rest",
			action: [["bonus action", ""]]
		},
		"blossoming spell": {
			name: "Blossoming Spell",
			source: [["PK:LL", 7]],
			minlevel: 10,
			description: desc([
				"When I take the Attack action and hit a creature with an attack, I can replace a subsequent weapon attack in that action with casting a 1-action spell using a Pact Spell Slot.",
				"The spell must be centered on me or the hit creature, ranged spell attacks in it can be made as melee spell attacks, and I can omit myself or my target from its radius."
			])
		},
		"aura of dignity": {
			name: "Aura of Dignity",
			source: [["PK:LL", 7]],
			minlevel: 13,
			description: levels.map(function (n) {
				var rad = n < 20 ? "15-ft" : "30-ft";
				return desc([
					"While I'm not unconscious, allies within " + rad + " of me (including me) have advantage on death saves and saves against being Charmed or Frightened.",
					"When a creature within my aura (including me) fails a saving throw, I can use my reaction to cause it to succeed instead."
				]);
			}),
			additional: levels.map(function (n) {
				return n < 13 ? "" : (n < 20 ? "15-ft radius" : "30-ft radius");
			}),
			usages: "half Prof. Bonus per ",
			usagescalc: "event.value = Math.floor(How('Proficiency Bonus') / 2);",
			recovery: "long rest",
			action: [["reaction", "Turn Failed Save to Success"]],
			savetxt: {
				adv_vs: ["charmed", "frightened", "death saves"]
			}
		},
		"resplendence": {
			name: "Resplendence",
			source: [["PK:LL", 7]],
			minlevel: 17,
			description: desc([
				"Once per long rest, I can spend 1 minute concentrating while touching a flower matching my Epithet in an area abundant in natural flora. The flower dissolves and I regain all expended Pact Spell Slots."
			]),
			usages: 1,
			recovery: "long rest"
		},
		"paragon of protection": {
			name: "Paragon of Protection",
			source: [["PK:LL", 7]],
			minlevel: 20,
			description: desc([
				"My Aura of Dignity expands to 30 ft. When I use its reaction to turn a failed save into a success, all other creatures in my aura that failed against the same effect also succeed.",
				"I gain 10 temporary HP + 5 per failure turned into a success (lasts until next long rest). While I have these temp HP, I can make 1 extra weapon attack when taking the Attack action and gain advantage on one attack per turn."
			])
		}
	}
};

// >>>>>>>>>>>>>>>>>>>>>> //
// >>> Add Subclasses >>> //
// >>>>>>>>>>>>>>>>>>>>>> //

// 1. Camellia
AddSubClass("petal knight", "camellia", {
	regExpSearch: /camellia/i,
	subname: "Camellia",
	source: [["PK:LL", 8]],
	features: {
		"subclassfeature2": {
			name: "Wylam Bond",
			source: [["PK:LL", 8]],
			minlevel: 2,
			description: desc([
				"As a bonus action, I touch one creature to bond with it for 1 minute (1 bonded creature at a time). Either of us can use a reaction to cause an attack against the other to miss (before outcome is revealed), even if unseen.",
				"After negating an attack, the reactor makes a Charisma check (DC = half the attack roll, rounded up); on a failure, the bond ends."
			]),
			usages: levels.map(function (n) { return n < 2 ? 0 : n < 11 ? 1 : 2; }),
			recovery: "short rest",
			action: [["bonus action", "Form Wylam Bond"], ["reaction", "Negate Attack on Bonded"]]
		},
		"subclassfeature6": {
			name: "Dual Radiance",
			source: [["PK:LL", 8]],
			minlevel: 6,
			description: desc([
				"When I or my Wylam Bond partner attack a creature the other has hit since the attacker's last turn, that first attack has advantage."
			])
		},
		"subclassfeature6.1": {
			name: "Virtue of the Soft",
			source: [["PK:LL", 8]],
			minlevel: 6,
			description: desc([
				"As a bonus action, I can expend one use of Wylam Bond to gain 1d10 + my total character level temporary HP (until next short or long rest). While I have these temp HP, all attacks against me have disadvantage."
			]),
			action: [["bonus action", ""]]
		},
		"subclassfeature11": {
			name: "Blooming Action",
			source: [["PK:LL", 8]],
			minlevel: 11,
			description: desc([
				"On my Wylam Bond partner's turn, I can use my reaction to end the bond and grant them one extra action on that turn (cannot combine with Action Surge or other extra-action features)."
			]),
			action: [["reaction", ""]]
		},
		"subclassfeature11.1": {
			name: "Bond of Trust",
			source: [["PK:LL", 8]],
			minlevel: 11,
			description: desc([
				"Either I or my Wylam Bond partner can use a bonus action to allow the other to make one weapon attack. We can also see and hear everything the other can (excluding special senses)."
			]),
			action: [["bonus action", "Grant Bonded Attack"]]
		},
		"subclassfeature15": {
			name: "Stardust Dream",
			source: [["PK:LL", 8]],
			minlevel: 15,
			description: desc([
				"When I or my Wylam Bond partner cast a spell, it can originate from the other (willing) creature or target a point seen through their senses. We can target each other with touch effects at any distance."
			])
		}
	}
});

// 2. Dahlia
AddSubClass("petal knight", "dahlia", {
	regExpSearch: /dahlia/i,
	subname: "Dahlia",
	source: [["PK:LL", 9]],
	features: {
		"subclassfeature2": {
			name: "Flames of Passion",
			source: [["PK:LL", 9]],
			minlevel: 2,
			description: levels.map(function (n) {
				var dmg = n < 11 ? "1d6" : "1d10";
				var res = n < 11 ? "resistance" : "immunity";
				return desc([
					"As a bonus action, I enter a fiery trance for 1 minute (requires concentration, but I can concentrate on a spell simultaneously, sharing one Con save for both):",
					"\u2022 My first weapon attack each turn deals +" + dmg + " fire damage, and I gain " + res + " to fire damage.",
					"\u2022 I can take the Dash action as a bonus action, and my weapon attacks crit on a 19 or 20."
				]);
			}),
			usages: "half Prof. Bonus per ",
			usagescalc: "event.value = Math.floor(How('Proficiency Bonus') / 2);",
			recovery: "long rest",
			action: [["bonus action", "Flames of Passion (Enter / Dash)"]],
			calcChanges: {
				atkAdd: [
					function (fields, v) {
						if (v.isWeapon) {
							fields.Description += (fields.Description ? '; ' : '') + 'Crit 19-20 (Flames of Passion)';
						}
					},
					"While in Flames of Passion, my weapon attacks score a critical hit on a roll of 19 or 20."
				]
			}
		},
		"subclassfeature6": {
			name: "Infernal Rebuff",
			source: [["PK:LL", 9]],
			minlevel: 6,
			description: desc([
				"When a creature enters or leaves my attack range, I can use my reaction to force a Dex save or take fire damage equal to half my total level and ignite. While burning, it takes that damage at the start of each of its turns and can't gain advantage on attacks until it uses an action to douse the flames."
			]),
			additional: levels.map(function (n) {
				return n < 6 ? "" : Math.floor(n / 2) + " Fire dmg";
			}),
			usages: "Proficiency bonus per ",
			usagescalc: "event.value = How('Proficiency Bonus');",
			recovery: "long rest",
			action: [["reaction", ""]]
		},
		"subclassfeature11": {
			name: "Extra Attack Improvement",
			source: [["PK:LL", 9]],
			minlevel: 11,
			description: desc([
				"Whenever I take the Attack action, I can make three attacks instead of two, provided none are made with a heavy or two-handed weapon."
			])
		},
		"subclassfeature15": {
			name: "Duke of Flames",
			source: [["PK:LL", 9]],
			minlevel: 15,
			description: desc([
				"All my attacks gain the extra fire damage from Flames of Passion, and creatures within 5 ft that hit me with a melee attack take 1d8 fire damage.",
				"When Flames of Passion ends for any reason, I can force creatures within 15 ft to make a Dex save or take 6d8 fire damage (half on success)."
			])
		}
	}
});

// 3. Hydrangea
AddSubClass("petal knight", "hydrangea", {
	regExpSearch: /hydrangea/i,
	subname: "Hydrangea",
	source: [["PK:LL", 10]],
	spellcastingList: {
		class: ["petal knight", "warlock"],
		spells: ClassList["petal knight"].spellcastingList.spells
	},
	features: {
		"subclassfeature2": {
			name: "Beckoning Knowledge",
			source: [["PK:LL", 10]],
			minlevel: 2,
			description: desc([
				"Whenever I learn a new Petal Knight spell, I can choose from the Warlock spell list instead. Upon gaining this feature, I can also swap the spell gained at this level and one other known spell for Warlock spells."
			])
		},
		"subclassfeature2.1": {
			name: "Frenetic Reflection",
			source: [["PK:LL", 10]],
			minlevel: 2,
			description: desc([
				"When a creature I see within 30 ft takes damage from an attack or failed save, I can use my reaction to split the damage evenly between that creature and another creature within 30 ft of me."
			]),
			usages: "Proficiency bonus per ",
			usagescalc: "event.value = How('Proficiency Bonus');",
			recovery: "long rest",
			action: [["reaction", ""]]
		},
		"subclassfeature6": {
			name: "Gracious Karma",
			source: [["PK:LL", 10]],
			minlevel: 6,
			description: desc([
				"When another creature restores my HP, I can use my reaction to grant them temporary HP equal to half the HP restored (rounded down). If they restored more than 10 HP, they also gain advantage on their next attack roll, saving throw, or ability check."
			]),
			action: [["reaction", ""]]
		},
		"subclassfeature11": {
			name: "Frozen Epithet",
			source: [["PK:LL", 10]],
			minlevel: 11,
			description: desc([
				"My weapon attacks deal +1d8 cold damage. I gain resistance to cold damage, suffer no ill effects from extreme cold, and ignore difficult terrain caused by snow, ice, or freezing temperatures."
			]),
			dmgres: ["Cold"],
			calcChanges: {
				atkAdd: [
					function (fields, v) {
						if (v.isWeapon) {
							fields.Description += (fields.Description ? '; ' : '') + '+1d8 Cold dmg';
						}
					},
					"My weapon attacks deal an additional 1d8 cold damage."
				]
			}
		},
		"subclassfeature15": {
			name: "Garden of Ice",
			source: [["PK:LL", 10]],
			minlevel: 15,
			description: desc([
				"Once per turn in place of a weapon attack, I can target a grounded or submerged creature within weapon reach; it must make a Dex save or be Restrained by ice (Strength check vs. spell DC as action to escape) and take 1d10 + half my Petal Knight level cold damage at the start of each of its turns.",
				"If a creature dies while restrained this way, I can use my reaction to bloom a 30-ft radius sphere of frozen mist (functions as Fog Cloud I can see through for 1 hr) that applies this restraining effect to all creatures inside."
			]),
			additional: levels.map(function (n) {
				return n < 15 ? "" : "1d10+" + Math.floor(n / 2) + " Cold dmg";
			}),
			action: [["reaction", "Bloom Frozen Mist (on kill)"]]
		}
	}
});

// 4. Osmanthus
AddSubClass("petal knight", "osmanthus", {
	regExpSearch: /osmanthus/i,
	subname: "Osmanthus",
	source: [["PK:LL", 11]],
	armorProfs: [true, true, false, true],
	weaponProfs: [true, true],
	spellcastingList: {
		class: ["petal knight", "paladin"],
		spells: ClassList["petal knight"].spellcastingList.spells
	},
	features: {
		"subclassfeature2": {
			name: "Truthful Proficiency",
			source: [["PK:LL", 11]],
			minlevel: 2,
			description: desc([
				"I gain proficiency and expertise in Insight, proficiency with all martial weapons and shields, and can use any non-heavy weapon with Petal Knight features that require a one-handed weapon."
			]),
			skills: ["Insight", "only"]
		},
		"subclassfeature2.1": {
			name: "Oath of Nobility",
			source: [["PK:LL", 11]],
			minlevel: 2,
			description: desc([
				"Whenever I learn a new Petal Knight spell, I can choose from the Paladin spell list instead. Upon gaining this feature, I can also swap the spell gained at this level and one other known spell for Paladin spells."
			])
		},
		"subclassfeature6": {
			name: "Face to Face",
			source: [["PK:LL", 11]],
			minlevel: 6,
			description: desc([
				"Ranged weapon attacks against me have disadvantage while I am not incapacitated. While benefiting from the Dodge action, once per turn when a creature misses me with a weapon attack, I can make one melee weapon attack against it."
			])
		},
		"subclassfeature11": {
			name: "Truesight",
			source: [["PK:LL", 11]],
			minlevel: 11,
			description: desc([
				"As a bonus action, I can grant myself Truesight out to 120 ft for 1 minute."
			]),
			usages: "half Prof. Bonus per ",
			usagescalc: "event.value = Math.floor(How('Proficiency Bonus') / 2);",
			recovery: "long rest",
			action: [["bonus action", "Truesight (120 ft)"]]
		},
		"subclassfeature15": {
			name: "Fortress of One",
			source: [["PK:LL", 11]],
			minlevel: 15,
			description: desc([
				"As an action, for 1 minute I gain resistance to bludgeoning, piercing, and slashing damage, reduce the first damage I take each round after the start of my turn by my Petal Knight level, and make one extra weapon attack whenever I take the Attack action."
			]),
			usages: 1,
			recovery: "short rest",
			action: [["action", ""]]
		}
	}
});

// 5. Pink Rose
AddSubClass("petal knight", "pink rose", {
	regExpSearch: /pink rose/i,
	subname: "Pink Rose",
	source: [["PK:LL", 12]],
	features: {
		"subclassfeature2": {
			name: "Gentle Treatment",
			source: [["PK:LL", 12]],
			minlevel: 2,
			description: desc([
				"I gain a pool of d10 healing dice equal to my Proficiency Bonus + 4. As a bonus action, I can heal a creature I see within 30 ft by spending up to my Proficiency Bonus in dice from the pool."
			]),
			usages: "Proficiency bonus + 4 per ",
			usagescalc: "event.value = How('Proficiency Bonus') + 4;",
			recovery: "long rest",
			action: [["bonus action", "Gentle Treatment (Heal)"]]
		},
		"subclassfeature2.1": {
			name: "Improved Critical (Melee)",
			source: [["PK:LL", 12]],
			minlevel: 2,
			description: desc([
				"My melee weapon attacks score a critical hit on a roll of 19 or 20 (18\u201320 starting at 15th level)."
			]),
			calcChanges: {
				atkAdd: [
					function (fields, v) {
						if (v.isMeleeWeapon) {
							var critRange = classes.known["petal knight"] && classes.known["petal knight"].level >= 15 ? "18-20" : "19-20";
							fields.Description += (fields.Description ? '; ' : '') + 'Crit ' + critRange;
						}
					},
					"My melee weapon attacks score a critical hit on a roll of 19 or 20 (18-20 at 15th level)."
				]
			}
		},
		"subclassfeature6": {
			name: "Stunning Drive",
			source: [["PK:LL", 12]],
			minlevel: 6,
			description: desc([
				"When I hit a creature with a one-handed weapon, I can expend 1 die from my Gentle Treatment pool (no die needed on a critical hit) to force a Con save or be Stunned until the end of my next turn."
			])
		},
		"subclassfeature11": {
			name: "Graceful Reach",
			source: [["PK:LL", 12]],
			minlevel: 11,
			description: desc([
				"Ethereal chains extend from my arms, preventing me from being disarmed and increasing my melee reach with one-handed melee weapons to 20 ft (excluding opportunity attacks). I can initiate grapples at 20 ft, pulling grappled targets adjacent to me."
			]),
			calcChanges: {
				atkAdd: [
					function (fields, v) {
						if (v.isMeleeWeapon && !/two-handed/i.test(fields.Description)) {
							fields.Description += (fields.Description ? '; ' : '') + 'Reach 20 ft';
						}
					},
					"One-handed melee weapons have a 20 ft reach (excluding opportunity attacks)."
				]
			}
		},
		"subclassfeature15": {
			name: "Elegant Extension: Bursting Range",
			source: [["PK:LL", 12]],
			minlevel: 15,
			description: desc([
				"When attacking with a weapon benefiting from Graceful Reach, I can extend its melee reach to 60 ft until the end of the turn and gain advantage on the first attack made with it."
			]),
			usages: "half Prof. Bonus per ",
			usagescalc: "event.value = Math.floor(How('Proficiency Bonus') / 2);",
			recovery: "short rest"
		},
		"subclassfeature15.1": {
			name: "Elegant Extension: Undying Assault",
			source: [["PK:LL", 12]],
			minlevel: 15,
			description: desc([
				"As an action, I can make a single melee weapon attack against each chosen creature within 20 ft using a weapon under Graceful Reach, rolling attacks separately and applying one shared damage roll to all hits."
			]),
			usages: "half Prof. Bonus per ",
			usagescalc: "event.value = Math.floor(How('Proficiency Bonus') / 2);",
			recovery: "long rest",
			action: [["action", ""]]
		}
	}
});