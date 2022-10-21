var SecurityValue = 0

function Dice(NumberDice, Sides, Modifier) {
	var roll = 0

	for (let i = 0; i < NumberDice; i++) {
		roll += Math.ceil(Math.random() * Sides)
	}

	roll += Modifier

	return roll
}


function Sheaf(sColor, sDifficulty, sNastySurprises, sPaydata) {

	// Generate System Ratings based on intrusion difficulty

	if (sDifficulty == "Easy") {
		SecurityValue = Dice(1,3,3)
		var SecuritySheaf = sColor + "-" + SecurityValue.toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "\n"
	}

	if (sDifficulty == "Average") {
		SecurityValue = Dice(1,3,6)
		var SecuritySheaf = sColor + "-" + SecurityValue.toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "\n"
	}

	if (sDifficulty == "Hard") {
		SecurityValue = Dice(2,3,6)
		var SecuritySheaf = sColor + "-" + SecurityValue.toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "\n"
	}


	// Nasty surprises

	if (sNastySurprises == true) {
		let Surprises = ["Semi-Autonomous Knowbot", "Teleporting SAN", "Vanishing SAN", "Bouncer Host", "Data Bomb", "Scramble IC", "Security Decker(s)", "Worm", "Chokepoint", "Trap Door", "Virtual Host"]
		let n = Dice(2,6,-2)
		let S = Surprises[n]
		if (n == 4) {
			if (Dice(1,6,0) >= 5)
				S = "Pavlov " + S
			if (Dice(1,6,0) <= 4)
				S += " guarding a file"
			else
				S += " guarding a slave device"
		}
		else if (n == 5) {
			Roll = Dice(1,6,0)
			if (Roll <= 2)
				S += " guarding Access subsystem"
			else if ((Roll == 3)|(Roll == 4))
				S += " guarding Files subsystem"
			else if (Roll >= 5)
				S += " guarding Slave subsystem"
		}
		else if (n == 7) {
			S += Worm()
		}
		SecuritySheaf += S + "\n"
	}


	// Generate security sheaf

	if (sColor == "Blue")
		var StepModifier = 4
	if (sColor == "Green")
		var StepModifier = 3
	if (sColor == "Orange")
		var StepModifier = 2
	if (sColor == "Red")
		var StepModifier = 1

	var AlertStatus = 0 // 0 = no alert, 1 = passive, 2 = active, 3 = shutdown
	var StepsAtCurrentAlert = 0
	var CurrentStep = 0
	var Event = ""
	var Roll = 0

	SecuritySheaf += "\nStep: Event"

	for (let n = 0; AlertStatus < 3; n++) {
		CurrentStep += Dice(1,3,StepModifier)
		Roll = Dice(1,6,StepsAtCurrentAlert)
		StepsAtCurrentAlert++
		if (AlertStatus == 0) { // No alert
			if (Roll <= 3)
				Event = ReactiveWhite()
			if ((Roll == 4)|(Roll == 5))
				Event = ProactiveWhite()
			if ((Roll == 6)|(Roll == 7))
				Event = ReactiveGray()
			if (Roll >= 8) {
				Event = "Passive Alert"
				AlertStatus = 1
				StepsAtCurrentAlert = 0
			}
		}
		else if (AlertStatus == 1) { // Passive alert
			if (Roll <= 3)
				Event = ProactiveWhite()
			if ((Roll == 4)|(Roll == 5))
				Event = ReactiveGray()
			if ((Roll == 6)|(Roll == 7))
				Event = ProactiveGray()
			if (Roll >= 8) {
				Event = "Active Alert"
				AlertStatus = 2
				StepsAtCurrentAlert = 0
			}
		}
		else if (AlertStatus == 2) { // Active alert
			if (Roll <= 3)
				Event = ProactiveGray()
			if ((Roll == 4)|(Roll == 5))
				Event = ProactiveWhite()
			if ((Roll == 6)|(Roll == 7))
				Event = Black()
			if (Roll >= 8) {
				Event = "Shutdown"
				AlertStatus = 3
			}
		}

		SecuritySheaf += "\n" + CurrentStep.toString() + ": " + Event
	}

	// Generate paydata

	if (sPaydata == true)
		SecuritySheaf += "\n\n" + PayData(sColor);

	return SecuritySheaf
}



function ICRating() {
	var Roll = Dice(2,6,0)

	if (SecurityValue <= 4) {
		if (Roll <= 5)
			var Rating = "4"
		if ((Roll >= 6)&&(Roll <= 8))
			var Rating = "5"
		if ((Roll >= 9)&&(Roll <= 11))
			var Rating = "6"
		if (Roll == 12)
			var Rating = "7"
	}
	if ((SecurityValue >= 5)&&(SecurityValue <= 7)) {
		if (Roll <= 5)
			var Rating = "5"
		if ((Roll >= 6)&&(Roll <= 8))
			var Rating = "7"
		if ((Roll >= 9)&&(Roll <= 11))
			var Rating = "9"
		if (Roll == 12)
			var Rating = "10"
	}
	if ((SecurityValue >= 8)&&(SecurityValue <= 10)) {
		if (Roll <= 5)
			var Rating = "6"
		if ((Roll >= 6)&&(Roll <= 8))
			var Rating = "8"
		if ((Roll >= 9)&&(Roll <= 11))
			var Rating = "10"
		if (Roll == 12)
			var Rating = "12"
	}
	if (SecurityValue >= 11) {
		if (Roll <= 5)
			var Rating = "8"
		if ((Roll >= 6)&&(Roll <= 8))
			var Rating = "10"
		if ((Roll >= 9)&&(Roll <= 11))
			var Rating = "11"
		if (Roll == 12)
			var Rating = "12"
	}

	return Rating
}


function ReactiveWhite() {
	var IC = ["Probe", "Probe", "Trace", "Trace", "Trace", "Tar Baby"]
	return IC[Dice(1,6,-1)] + "-" + ICRating() + ReactiveOptions()
}


function ProactiveWhite() {
	var IC = ["Crippler", "Crippler", "Crippler", "Crippler", "Killer", "Killer", "Killer", "Scout", "Scout", "Scout", "Construct"]
	var n = Dice(2,6,-2)
	var I = IC[n]
	if (n <= 3)
		I += Crippler()
	return I + "-" + ICRating() + ProactiveOptions()
}

function ReactiveGray() {
	var IC = ["Tar Pit", "Tar Pit", "Trace", "Probe", "Scout", "Construct"]
	var n = Dice(1,6,-1)
	var I = IC[n] + "-" + ICRating()
	if ((n >= 2)&&(n <= 4))
		I += TrapIC()
	return I + ReactiveOptions()
}

function ProactiveGray() {
	var IC = ["Ripper", "Ripper", "Ripper", "Ripper", "Blaster", "Blaster", "Blaster", "Sparky", "Sparky", "Sparky", "Construct"]
	var n = Dice(2,6,-2)
	var I = IC[n]
	if (n <= 3)
		I += Ripper()
	return I + "-" + ICRating() + ProactiveOptions()
}

function Black() {
	var IC = ["Psychotropic Black IC", "Psychotropic Black IC", "Psychotropic Black IC", "Lethal Black IC", "Lethal Black IC", "Lethal Black IC", "Non-Lethal Black IC", "Non-Lethal Black IC", "Non-Lethal Black IC", "Non-Lethal Black IC", "Cerebropathic Black IC", "Construct"]
	var n = Dice(2,6,-2)
	var I = IC[n]
	if (n <= 4) {
		var t = Dice(1,6,0)
		if (t <= 2)
			I += " (cyberphobia)"
		if (t == 3)
			I += " (frenzy)"
		if (t == 4)
			I += " (judas)"
		if (t >= 5)
			I += " (positive conditioning)"
	}
	return I + "-" + ICRating()
}


function TrapIC() {
	var Trap = ["Data Bomb", "Blaster", "Blaster", "Blaster", "Killer", "Killer", "Killer", "Sparky", "Sparky", "Sparky", "Black"]
	var n = Dice(2,6,-2)
	var I = Trap[n] + "-" + ICRating()
	if ((n == 0)&&(Dice(1,6,0) >= 5))
		I = "Pavlov " + I
	else if (n == 12)
		I = Black()

	return " with trap " + I
}

function Crippler() {
	var Target = ["acid", "acid", "binder", "jammer", "jammer", "marker"]
	return " (" + Target[Dice(1,6,-1)] + ")"
}
function Ripper() {
	var Target = ["acid", "acid", "bind", "jam", "jam", "mark"]
	return " (" + Target[Dice(1,6,-1)] + "-rip)"
}

function ReactiveOptions() {
	var ICOptions = [" (Shielding)", " (Shielding)", " (Shielding)", " (Armor)", "None", "None", "Trap", " (Armor)", " (Shifting)", " (Shifting)", " (Shifting)"]
	var n = Dice(2,6,-2)
	var O = ICOptions[n]
	if ((n == 4)|(n == 5))
		O = ""
	else if (n == 6)
		O = TrapIC()

	return O
}

function Worm() {
	Roll = Dice(2,6,0)
	if (Roll <= 3)
		I = "Crashworm-"
	else if ((Roll == 4)|(Roll == 5))
		I = "Deathworm-"
	else if ((Roll >= 6)&&(Roll <= 8))
		I = "Dataworm-"
	else if ((Roll == 9)|(Roll == 10))
		I = "Tapeworm-"
	else if ((Roll == 11)|(Roll == 12))
		I = "Ringworm-"
	I += Dice(1,6,3).toString()
	return I
}

function ProactiveOptions() {
	var ICOptions = ["Party Cluster", "Party Cluster", " (Expert Offense", " (Shifting)", " (Cascading)", "None", " (Armor)", " (Shielding)", " (Expert Defense", "Trap", "Roll Twice"]
	var n = Dice(2,6,-2)
	var O = ICOptions[n]
	if ((n == 2)|(n == 8))
		O += "-" + Dice(1,3,0).toString() + ")"
	else if (n == 5)
		O = ""
	else if (n == 9)
		O = TrapIC()
	else if (n == 10) {
		O = ""
		for (var m = 0; m < 2; m++) {
			var n2 = Dice(2,6,-2)
			while (n2 == 10)
				n2 = Dice(2,6,-2)

			var O2 = ICOptions[n2]
			if ((n2 == 2)|(n2 == 8))
				O2 += "-" + Dice(1,3,0).toString() + ")"
			else if (n2 == 5)
				O2 = ""
			else if (n2 == 9)
				O2 = TrapIC()

			O += O2
		}
	}
	
	return O
}

function PayData(sColor) {
	var pd = "Paydata"
	if (sColor == "Blue")
		var Points = Dice(1,6,-1)
	if (sColor == "Green")
		var Points = Dice(2,6,-2)
	if (sColor == "Orange")
		var Points = Dice(2,6,0)
	if (sColor == "Red")
		var Points = Dice(2,6,2)

	if (Points == 0)
		pd += "\nNone"
	else {
		for (var n = 0; n < Points; n++) {
			pd += "\n" + PayDataMp(sColor)
			var Defenses = PayDataDefenses(sColor)
			if (Defenses)
				pd += " (" + Defenses + ")"
		}
	}
	
	return pd
}

function PayDataMp(sColor) {
	
	if (sColor == "Blue")
		var Mp = Dice(2,6,0) * 20
	if (sColor == "Green")
		var Mp = Dice(2,6,0) * 15
	if (sColor == "Orange")
		var Mp = Dice(2,6,0) * 10
	if (sColor == "Red")
		var Mp = Dice(2,6,0) * 5

	Mp = Mp.toString() + " Mp"

	return Mp
}

function PayDataDefenses(sColor) {
	var Defenses = ""
	Roll = Dice(1,6,0)
	
	if (sColor == "Blue") {
		if (Roll >=5)
			Defenses = "Scramble-" + ICRating()
	}
	if (sColor == "Green") {
		if (Roll == 3||Roll == 4)
			Defenses = "Scramble-" + ICRating()
		else if (Roll >= 5)
			Defenses = DataBombOrPavlov()
	}
	if (sColor == "Orange") {
		if (Roll == 2||Roll == 3)
			Defenses = "Scramble-" + ICRating()
		else if (Roll == 4||Roll == 5)
			Defenses = DataBombOrPavlov()
		else if (Roll == 6)
			Defenses = Worm()
	}
	if (sColor == "Red") {
		if (Roll <= 2)
			Defenses = "Scramble-" + ICRating()
		else if (Roll == 3||Roll == 4)
			Defenses = DataBombOrPavlov()
		else if (Roll >= 5)
			Defenses = Worm()
	}

	return Defenses	
}

function DataBombOrPavlov() {
	if (Dice(1,6,0) <= 4)
		var I = "Data Bomb-" + ICRating()
	else
		var I = "Pavlov IC-" + ICRating()
	
	return I	
}