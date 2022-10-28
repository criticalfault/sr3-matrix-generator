import React from 'react';
import { useState } from "react";
import './SecuritySheaf.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import IC from './IC.js';
import ServerEvent from './ServerEvent';
import PayData from './PayData.js';

const SecuritySheaf = (props) => {
    const [sheafCode, setSheafCode] = useState('blue');
    const [sheafDifficulty, setSheafDifficulty] = useState('easy');
    const [sheafDisplay, setSheafDisplay] = useState('');
    const [PaydataCheck, setPaydataCheck] = useState(false);
    const [NastySurprises, setNastySurprises] = useState(false);
    const [NastySurprisesOutput, setNastySurprisesOutput] = useState('');
    const [SecurityValue, setSecurityValue] = useState('');
    const [SecuritySheafOutput, setSecuritySheafOutput] = useState('');
    const [LethalSystem, setLethalSystem]= useState(false);
    const [EventList, setEventList] = useState([]);
    const [PayDataList, setPayDataList] = useState([]);
    const [ICOptions, setICOptions] = useState(false);

    var EventListTemp = [];
    
    const ICTypes = {
        "Probe":"Probe IC is reactive IC that conducts additional interrogations of data packets and program requests for computer resources. Probe IC helps detect any operations performed by unauthorized programs. For a probe-equipped system, the gamemaster makes a Probe Test using its probe IC Rating against a decker's Detection Factor every time the decker makes a System Test. Add any successes from the Probe Test to the decker's security tally.",
        "Scout":"Scout IC is a proactive variant of probe IC (p. 228, SR3). When scout IC is triggered, it acts as reactive probe IC: the gamemaster uses the IC's rating to make a test against the intruder's Detection Factor anytime the intruder makes a System Test. Any successes from these tests are added to the intruder's security tally.\n Unlike probe IC, however, scout IC switches into a proactive mode when attacked in cybercombat or when a passive or active alert is triggered. In this mode, scout IC no longer probes the intruder like probe IC but actively defends itself in cybercombat, using the standard cybercombat rules. Proactive scout IC also makes probing Attack Tests against intruders. These attacks do not inflict damage by themselves but enhance attacks by other IC in the system. Each attack success achieved by the scout IC adds 1 die to the Security Value for the next attack made against the intruder by any other piece of proactive IC. Successes achieved from additional probing attacks add cumulative dice, up to a maximum equal to the scout IC's rating.",
        "Killer":"Killer IC is proactive IC that causes damage to icons in cybercombat. All killer IC has a Damage Code and its Power is equal to its IC Rating. The Damage Level of killer IC is based on the host's security code. Killer IC on Blue or Green systems does Medium damage; killer IC on Orange and Red systems does Serious damage. For example, Killer-6 IC on an Orange host would do 6S damage. This damage rises a stage for every 2 successes achieved on the host's Attack Test, just like damage in standard combat. If an attack from killer IC fills the Condition Monitor of a decker, the decker is dumped. Armor utility programs (p. 222) reduce damage from killer IC.",
        "Crippler":"Cripplers are proactive white IC programs that each attack one of the decker's icon's Attributes. Cripplers come in four types: acid, binder, jammer, or marker programs. Acid cripplers attack an icon's Bod Rating. Binder cripplers attack an icon's Evasion Rating. Jammer cripplers attack the Sensor Rating, and marker cripplers attack the Masking Rating. Whenever a crippler program attacks an icon, they engage in a Success Contest. The gamemaster makes an Attack Test for the host and tallies the successes (see Cybercombat, p. 222, for details on Attack Tests). At the same time, the decker makes a test using the af ed icon Attribute against a target number equal to the crippler IC's Rating. If the decker achieves a greater or equal number of successes, the IC does no damage. Reduce the affected icon attribute by 1 point for every 2 net successes the IC scores. Yes, that means 1 net success for the IC does no damage. Two successes do 1 point of damage, four successes do 2 points, and so on. Neither Armor nor Hardening (see pp. 222 and 206) protect against cripplers. Crippler IC cannot reduce an icon Attribute below 1.",
        "Scramble":"Scramble IC is reactive IC used to protect elements of a host's Access, Files, or Slave subsystems. Scramble IC can be programmed to protect a specific component of a subsystem or the entire subsystem. For example, scramble IC can protect an individual data file, a datastore, or all the Files functions on a host—including faxprinter output and dedicated terminals. Similarly, scramble IC on an Access subsystem can oppose logons from specific entry points, such as public grids and dedicated workstations, or all logons. On a Slave subsystem, scramble IC can defend specific remote devices or all devices connected to the subsystem. Scramble IC programs are designed to make it impossible to Access any host or slave devices they protect, unless it is decrypted. Additionally, scramble IC will destroy the data under its care rather than letting it fall into unauthorized hands. If the decker tries to decrypt scramble IC and fails, the gamemaster makes a Scramble Test using its Rating against a target number equal to the decker's Computer Skill. If the test fails, the decker has managed to suppress the scramble IC's destruct code. If the test succeeds, the data is destroyed. Deckers may use specific system operations to defeat scramble IC, all of which can be augmented by the decryption utility program (see System Operations, p. 214). Decrypting scramble IC does not add to the decker's security tally. Deckers can use attack programs to crash scramble IC, but doing so will increase the decker's security tally unless he suppresses the scramble IC.",
        "Tar Baby":"Rar baby is reactive IC that attempts to crash deckers' utility programs. Each tar baby is pre-programmed to target a specific type of utility (operational, offensive, defensive, special), determined by the gamemaster. Tar baby IC does not attack completely passive utilities such as armor and sleaze programs. Whenever a decker uses one of the trigger utilities, the gamemaster makes an Opposed Test between the two programs' ratings. Make the Tar Baby Test against a target number equal to the utility program's rating. Make the Utility Test against a target number equal to the tar baby IC's Rating. If the tar baby wins the Opposed Test, it crashes both itself and the utility program. Tar baby IC does not increase the decker's security tally when it crashes this way. The decker has to load a fresh copy of the utility program with a Swap Memory operation. If the utility wins the Opposed Test, it remains safe and the gamemaster makes a secret Sensor Test to determine if the decker notices the tar baby IC (see Noticing Triggered IC, p. 209).",
        "Blaster":"Blaster IC is proactive IC that attacks in cybercombat in the same manner as killer IC (see Killer IC, above). Armor reduces damage from blaster attacks. Additionally, blaster IC may permanently damage a decker's MPCP if it crashes his icon. If blaster IC dumps a decker, make a Blaster Test using its Rating against a target number equal to the deck's MPCP Rating. Hardening increases the target number but armor has no effect. Reduce the MPCP Rating by 1 point for every 2 successes on the Blaster Test. Note that the decker may need to crank down his persona programs if his deck takes damage, because their total ratings may not exceed the deck's MPCP Rating multiplied by 3.",
        "Ripper":"Ripper IC is a gray version of crippler IC. This proactive IC attacks in the same manner (see Cripplers, p. 227). In addition, whenever a ripper program reduces an icon Attribute to zero, make a Ripper Test using its rating against a target number equal to the deck's MPCP Rating (Hardening increases the target number). For every 2 successes on this test, reduce the rating of the MPCP by 1. Replacing the MPCP is the only way to restore this damage.",
        "Sparky":"The proactive IC called sparky IC attacks in the same manner as Killer IC (see Killer IC, p. 228). However, if sparky IC crashes the persona, it causes an overload in the deck's power supply that feeds random jolts of electricity to the MPCP and the decker's brain. Results can range from a little impromptu electroshock therapy to a killing jolt. This is dark gray IC indeed—bordering on black—but because it is not designed to deliberately cause physical trauma,it is technically considered non-lethal. Whenever sparky IC crashes a persona, make a Sparky Test against a target number equal to the deck's MPCP Rating + 2. Hardening increases the target number. Reduce the MPCP Rating by 1 point for every 2 successes of the Sparky Test. A sparky attack also causes (IC Rating)M damage to the decker. Stage the Damage up one level for every 2 successes on the Sparky Test. The decker resists this damage as he would any other. Hardening reduces the Power of the damage.",
        "Tar Pit":"The reactive IC known as tar pit IC operates and attacks in the same manner as tar baby IC (see Tar Baby, p. 228). However, if tar pit IC trashes a utility on-line, it also injects the deck with viral code that corrupts all copies of the program in the deck's active and storage memories. Unless the decker has a backup copy of the utility stashed in off-line memory, he's lost it for good. And even if he has a backup, he can't get at it for the rest of the run. When tar pit IC trashes a program, make a Tar Pit Test against a target number equal to the deck's MPCP Rating. Hardening increases the target number. If the test produces no successes, the viral code is defeated and the tar pit IC has the same effect as the tar baby program, so the decker can reload his utility with a Swap Memory operation. If the Tar Pit Test produces any successes, however, the IC corrupts all copies of the program stored on the deck. The decker cannot get the utility back until he jacks out and reloads the utility from a source outside his deck (from a storage chip, most likely).",
        "Psychotropic Black IC":"",
        "Lethal Black IC":"",
        "Non-Lethal Black IC":"",
        "Construct":""
    };

    const ServerEventTypes= {
        "Passive Alert":"In a typical security sheaf, the third or fourth trigger step activates a passive alert. Passive alert means that a system suspects an intruder has invaded it, but is not 100 percent certain. Under passive-alert status, trigger steps typically activate proactive white or gray IC programs. When a system goes on passive alert status, increase all Subsystem Ratings by 2.",
        "Active Alert":"A typical system goes on active-alert status on the second or third trigger step after the system goes to passive alert. Active alert means the system has verified the presence of anillegal icon. Under active-alert status, trigger steps typically activate proactive and sometimes black IC programs. Trigger steps mayalso activate corporate or law-enforcement deckers in the system. Once a system reaches active-alert status, running away and sneaking back into the system become much more difficult for illegal deckers. Security personnel know that someone has been snooping around, and the system managers remain particularly vigilant for some time to come.",
        "Shutdown":""
    }

    const Dice = (NumberDice, Sides, Modifier) => {
        var roll = 0
        for (let i = 0; i < NumberDice; i++) {
            roll += Math.ceil(Math.random() * Sides)
        }
        roll += Modifier
        return roll
    }

    const ICRating = () => {
        var Roll = Dice(2,6,0)
        var Rating = 0;
    
        if (SecurityValue <= 4) {
            if (Roll <= 5)
                Rating = "4"
            if ((Roll >= 6)&&(Roll <= 8))
                Rating = "5"
            if ((Roll >= 9)&&(Roll <= 11))
                Rating = "6"
            if (Roll === 12)
                Rating = "7"
        }
        if ((SecurityValue >= 5)&&(SecurityValue <= 7)) {
            if (Roll <= 5)
                Rating = "5"
            if ((Roll >= 6)&&(Roll <= 8))
                Rating = "7"
            if ((Roll >= 9)&&(Roll <= 11))
                Rating = "9"
            if (Roll === 12)
                Rating = "10"
        }
        if ((SecurityValue >= 8)&&(SecurityValue <= 10)) {
            if (Roll <= 5)
                Rating = "6"
            if ((Roll >= 6)&&(Roll <= 8))
                Rating = "8"
            if ((Roll >= 9)&&(Roll <= 11))
                Rating = "10"
            if (Roll === 12)
                Rating = "12"
        }
        if (SecurityValue >= 11) {
            if (Roll <= 5)
                Rating = "8"
            if ((Roll >= 6)&&(Roll <= 8))
                Rating = "10"
            if ((Roll >= 9)&&(Roll <= 11))
                Rating = "11"
            if (Roll === 12)
                Rating = "12"
        }
        return Rating
    }
    
    const ReactiveWhite = (ICStep) => {
        var IC = ["Probe", "Probe", "Trace", "Trace", "Trace", "Tar Baby"]
        var ICName = IC[Dice(1,6,-1)];
        var ICExtra = "-" + ICRating();
        var ICOptions = ReactiveOptions();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICName":ICName, "ICExtra":ICExtra, "ICOptions":ICOptions, "ICDescription":ICTypes[ICName]});
        return ICName + ICExtra;
    }
    
    const ProactiveWhite = (ICStep) => {
        var IC = ["Crippler", "Crippler", "Crippler", "Crippler", "Killer", "Killer", "Killer", "Scout", "Scout", "Scout", "Construct"]
        var n = Dice(2,6,-2)
        var I = IC[n]
        var ICName = I;
        if (n <= 3)
            I += Crippler();
        
        var ICExtra = "-" + ICRating();
        var ICOptions =  ProactiveOptions();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICName":I, "ICExtra":ICExtra, "ICOptions":ICOptions, "ICDescription":ICTypes[ICName]});
        return I + ICExtra;
    }
    
    const ReactiveGray = (ICStep) => {
        var IC = ["Tar Pit", "Tar Pit", "Trace", "Probe", "Scout", "Construct"]
        var n = Dice(1,6,-1)
        var I = IC[n]
        var ICName = I;
        var ICExtra = "-" + ICRating();
        if ((n >= 2)&&(n <= 4)){
            I += TrapIC();
        }
        var options = ReactiveOptions();
        var ICOptions = ReactiveOptions();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICName":I, "ICExtra":ICExtra, "ICOptions":ICOptions, "ICDescription":ICTypes[ICName]});
        return I + ICExtra + options;
    }
    
    const ProactiveGray = (ICStep) => {
        var IC = ["Ripper", "Ripper", "Ripper", "Ripper", "Blaster", "Blaster", "Blaster", "Sparky", "Sparky", "Sparky", "Construct"]
        var n = Dice(2,6,-2)
        var I = IC[n]
        var ICName = I;
        if (n <= 3){
            I += Ripper()
        }
        var ICExtra = "-" + ICRating();
        var options = ProactiveOptions();
        var ICOptions = ProactiveOptions();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICName":I, "ICExtra":ICExtra, "ICOptions":ICOptions, "ICDescription":ICTypes[ICName]});
        return I + ICExtra + options
    }
    
    const Black = (ICStep) => {
        var IC = ["Psychotropic Black IC", "Psychotropic Black IC", "Psychotropic Black IC", "Lethal Black IC", "Lethal Black IC", "Lethal Black IC", "Non-Lethal Black IC", "Non-Lethal Black IC", "Non-Lethal Black IC", "Non-Lethal Black IC", "Cerebropathic Black IC", "Construct"]
        var n = Dice(2,6,-2)
        var I = IC[n]
        var ICName = I;
        if (n <= 4) {
            var t = Dice(1,6,0)
            if (t <= 2)
                I += " (cyberphobia)"
            if (t === 3)
                I += " (frenzy)"
            if (t === 4)
                I += " (judas)"
            if (t >= 5)
                I += " (positive conditioning)"
        }
        var ICExtra = "-" + ICRating();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICName":I, "ICExtra":ICExtra, "ICDescription":ICTypes[ICName]});
        return I + ICExtra;
    }
    
    const TrapIC = () => {
        if(ICOptions){
            var Trap = ["Data Bomb", "Blaster", "Blaster", "Blaster", "Killer", "Killer", "Killer", "Sparky", "Sparky", "Sparky", "Black"]
            var n = Dice(2,6,-2)
            var I = Trap[n] + "-" + ICRating()
            if ((n === 0)&&(Dice(1,6,0) >= 5))
                I = "Pavlov " + I
            else if (n === 12)
                I = Black()
        
            return " with trap " + I
        }
    }
    
    const Crippler = () => {
        var Target = ["Acid [Bod]", "Acid [Bod]", "Binder [Evasion]", "Jammer [Sensor]", "Jammer [Sensor]", "Marker [Masking]"]
        return " (" + Target[Dice(1,6,-1)] + ")"
    }
    const Ripper = () => {
        var Target = ["Acid", "Acid", "Bind", "Jam", "Jam", "Mark"]
        return " (" + Target[Dice(1,6,-1)] + "-rip)"
    }
    
    const ReactiveOptions = () => {
        if(ICOptions){
            var ICOptions = ["Shielding", "Shielding", "Shielding", "Armor", false, false, "Trap", "Armor", "Shifting", "Shifting", "Shifting"]
            var n = Dice(2,6,-2)
            var O = ICOptions[n]
            if ((n === 4)|(n === 5))
                O = ""
            else if (n === 6)
                O = TrapIC()
        
            return O
        }else{
            return false;
        }
    }

    const ProactiveOptions = () => {
        if(ICOptions){
            var ICOptions = ["Party Cluster", "Party Cluster", "Expert Offense", "Shifting", "Cascading", false, "Armor", "Shielding", "Expert Defense", "Trap", "Roll Twice"]
            var n = Dice(2,6,-2)
            var O = ICOptions[n]
            if ((n === 2)|(n === 8))
                O += "-" + Dice(1,3,0).toString() + ")"
            else if (n === 5)
                O = ""
            else if (n === 9)
                O = TrapIC()
            else if (n === 10) {
                O = ""
                for (var m = 0; m < 2; m++) {
                    var n2 = Dice(2,6,-2)
                    while (n2 === 10)
                        n2 = Dice(2,6,-2)
        
                    var O2 = ICOptions[n2]
                    if ((n2 === 2)|(n2 === 8))
                        O2 += "-" + Dice(1,3,0).toString() + ")"
                    else if (n2 === 5)
                        O2 = ""
                    else if (n2 === 9)
                        O2 = TrapIC()
        
                    O += O2
                }
            }   
            return O
        }else{
            return false;
        }
    }
    
    const PayDataGenerate = (systemColor) => {
        var pd = "Paydata"
        var Points = 0;
        var List = [];

        if (systemColor === "blue"){
            Points = Dice(1,6,-1);
        }           
        if (systemColor === "green"){
            Points = Dice(2,6,-2)
        }
        if (systemColor === "orange"){
            Points = Dice(2,6,0)
        }
        if (systemColor === "red"){
            Points = Dice(2,6,2)
        }

        if (Points === 0){
            pd += "\nNone"
        }else {
            for (var n = 0; n < Points; n++) {
                let MPSize = PayDataMp(systemColor);
                pd += "\n" + MPSize;
                var Defenses = PayDataDefenses(systemColor)
                if (Defenses){
                    pd += " (" + Defenses + ")";
                }

                if(Defenses === ''){
                    List.push({"size":MPSize, "protected":false, "defType":"", "defRating":0,  "description":"" });
                }else{
                    List.push({"size":MPSize, "protected":true, "defType":Defenses.type, "defRating":Defenses.rating, "description":ICTypes[Defenses] });
                }
                
            }
            setPayDataList(List);
        }
        return pd;
    }
    
    const PayDataMp = (systemColor) => {
        var Mp = 0;
        if (systemColor === "blue"){
            Mp = Dice(2,6,0) * 20;
        }
        if (systemColor === "green"){
            Mp = Dice(2,6,0) * 15
        }
        if (systemColor === "orange"){
            Mp = Dice(2,6,0) * 10
        }   
        if (systemColor === "red"){
            Mp = Dice(2,6,0) * 5
        }
        Mp = Mp.toString() + " Mp"
        return Mp
    }
    
    const PayDataDefenses = (systemColor) => {
        var Defenses = ""
        var Roll = Dice(1,6,0)
        
        if (systemColor === "blue") {
            if (Roll >=5){
                Defenses = {type:"Scramble", "rating":ICRating()}
            }    
        }
        if (systemColor === "green") {
            if (Roll === 3||Roll === 4){
                Defenses = {type:"Scramble", "rating":ICRating()}
            }else if (Roll >= 5){
                Defenses = DataBombOrPavlov()
            }
        }
        if (systemColor === "orange") {
            if (Roll === 2||Roll === 3){
                Defenses = {type:"Scramble", "rating":ICRating()}
            }else if (Roll === 4||Roll === 5){
                Defenses = DataBombOrPavlov()
            }else if (Roll === 6){
                Defenses = Worm()
            } 
        }
        if (systemColor === "red") {
            if (Roll <= 2){
                Defenses = {type:"Scramble", "rating":ICRating()}
            }else if (Roll === 3||Roll === 4){
                Defenses = DataBombOrPavlov()
            }else if (Roll >= 5){
                Defenses = Worm()
            }
        }
        return Defenses	
    }
    
    const DataBombOrPavlov = () => {
        var defense = '';
        if (Dice(1,6,0) <= 4){
            defense = {type:"Data Bomb", "rating":ICRating()}
        }else{
            defense = {type:"Pavlov IC", "rating":ICRating()}
        }
        return defense	
    }

    const Worm = () => {
        var Roll = Dice(2,6,0)
        var I = '';
        if (Roll <= 3){
            I = { type:"Crashworm", "rating":Dice(1,6,3).toString() }
        }else if ((Roll === 4)|(Roll === 5)){
            I = { type:"Deathworm", "rating":Dice(1,6,3).toString() }
        }else if ((Roll >= 6)&&(Roll <= 8)){
            I = { type:"Dataworm", "rating":Dice(1,6,3).toString() }
        } else if ((Roll === 9)|(Roll === 10)){
            I = { type:"Tapeworm", "rating":Dice(1,6,3).toString() }
        }else if ((Roll === 11)|(Roll === 12)){
            I = { type:"Ringworm", "rating":Dice(1,6,3).toString() }
        }  
        return I
    }

    const GenerateSheaf = (event) => {
        let SecuritySheafOutput = '';
        let StepModifier = 0;
        let AlertStatus = 0 // 0 = no alert, 1 = passive, 2 = active, 3 = shutdown
        let StepsAtCurrentAlert = 0
        let CurrentStep = 0
        let Event = ""
        let Roll = 0

        //ACIFS
        let AccessValue = 0;
        let ControlValue = 0;
        let IndexValue = 0;
        let FilesValue = 0;
        let SlaveValue = 0;
        let secValue = 0;

        EventListTemp = [];

        if (sheafDifficulty === "easy") {
            secValue = Dice(1,3,3);
           
            AccessValue     = Dice(1,3,7).toString();
            ControlValue    = Dice(1,3,7).toString();
            IndexValue      = Dice(1,3,7).toString();
            FilesValue      = Dice(1,3,7).toString();
            SlaveValue      = Dice(1,3,7).toString();
            SecuritySheafOutput += sheafCode + "-" + secValue.toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "\n";
        }

        if (sheafDifficulty === "average") {
            let secValue = Dice(1,3,6);
            setSecurityValue(secValue);
            AccessValue     = Dice(2,3,9).toString();
            ControlValue    = Dice(2,3,9).toString();
            IndexValue      = Dice(2,3,9).toString();
            FilesValue      = Dice(2,3,9).toString();
            SlaveValue      = Dice(2,3,9).toString();
            SecuritySheafOutput += sheafCode + "-" + secValue.toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "\n";
        }

        if (sheafDifficulty === "hard") {
            let secValue = Dice(2,3,6);
            setSecurityValue(secValue);
            AccessValue     = Dice(1,6,12).toString();
            ControlValue    = Dice(1,6,12).toString();
            IndexValue      = Dice(1,6,12).toString();
            FilesValue      = Dice(1,6,12).toString();
            SlaveValue      = Dice(1,6,12).toString();
            SecuritySheafOutput += sheafCode + "-" + secValue.toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "\n";
        }
        setSheafDisplay(sheafCode.toUpperCase() + "-" + secValue.toString() + '  (ACIFS) ' +AccessValue+ "/" +ControlValue+ "/" +IndexValue+ "/" +FilesValue+ "/" +SlaveValue  );
        
        if(sheafCode === "blue")  { StepModifier = 4 }
        if(sheafCode === "green") { StepModifier = 3 }
        if(sheafCode === "orange"){ StepModifier = 2 }
        if(sheafCode === "red")   { StepModifier = 1 }

        if (NastySurprises === true) {
            //Still need to work this in, see about how we can display this nicely when its enabled.
            // let Surprises = ["Semi-Autonomous Knowbot", "Teleporting SAN", "Vanishing SAN", "Bouncer Host", "Data Bomb", "Scramble IC", "Security Decker(s)", "Worm", "Chokepoint", "Trap Door", "Virtual Host"]
            // let n = Dice(2,6,-2)
            // let S = Surprises[n]
            // if (n === 4) {
            //     if (Dice(1,6,0) >= 5)
            //         S = "Pavlov " + S
            //     if (Dice(1,6,0) <= 4)
            //         S += " guarding a file"
            //     else
            //         S += " guarding a slave device"
            // }
            // else if (n === 5) {
            //     Roll = Dice(1,6,0)
            //     if (Roll <= 2)
            //         S += " guarding Access subsystem"
            //     else if ((Roll == 3)|(Roll == 4))
            //         S += " guarding Files subsystem"
            //     else if (Roll >= 5)
            //         S += " guarding Slave subsystem"
            // }
            // else if (n === 7) {
            //     S += Worm()
            // }

            //setNastySurprisesOutput(S);
        }

        SecuritySheafOutput += "\nStep: Event"

        for (let n = 0; AlertStatus < 3; n++) {
            CurrentStep += Dice(1,3,StepModifier)
            Roll = Dice(1,6,StepsAtCurrentAlert)
            StepsAtCurrentAlert++
            if (AlertStatus === 0) { // No alert
                if (Roll <= 3)
                    Event = ReactiveWhite(CurrentStep)
                if ((Roll === 4)|(Roll === 5))
                    Event = ProactiveWhite(CurrentStep)
                if ((Roll === 6)|(Roll === 7))
                    Event = ReactiveGray(CurrentStep)
                if (Roll >= 8) {
                    EventListTemp.push({"type":"Alert", "ICStep":CurrentStep, "EventName":"Passive Alert", "EventDescription":""});
                    Event = "Passive Alert"
                    AlertStatus = 1
                    StepsAtCurrentAlert = 0
                }
            }
            else if (AlertStatus === 1) { // Passive alert
                if (Roll <= 3)
                    Event = ProactiveWhite(CurrentStep)
                if ((Roll === 4)|(Roll === 5))
                    Event = ReactiveGray(CurrentStep)
                if ((Roll === 6)|(Roll === 7))
                    Event = ProactiveGray(CurrentStep)
                if (Roll >= 8) {
                    EventListTemp.push({"type":"Alert", "ICStep":CurrentStep, "EventName":"Active Alert", "EventDescription":""});
                    Event = "Active Alert"
                    AlertStatus = 2
                    StepsAtCurrentAlert = 0
                }
            }
            else if (AlertStatus === 2) { // Active alert
                if (Roll <= 3)
                    Event = ProactiveGray(CurrentStep)
                if ((Roll === 4)|(Roll === 5))
                    Event = ProactiveWhite(CurrentStep)
                if ((Roll === 6)|(Roll === 7))
                    if(LethalSystem){
                        Event = Black(CurrentStep)
                    }else{
                        Event = ProactiveGray(CurrentStep)
                    }
                if (Roll >= 8) {
                    EventListTemp.push({"type":"Alert", "ICStep":CurrentStep, "EventName":"Shutdown", "EventDescription":""});
                    Event = "Shutdown"
                    AlertStatus = 3
                }
            }
            SecuritySheafOutput += "\n" + CurrentStep.toString() + ": " + Event
        }
    
        // Generate paydata
        if (PaydataCheck === true){
            SecuritySheafOutput += "\n\n" + PayDataGenerate(sheafCode);
            console.log(SecuritySheafOutput);
        }
        setSecuritySheafOutput(SecuritySheafOutput);
        setEventList(EventListTemp);
    }

    const onChangeSheafCode = (event) =>{
        setSheafCode(event.target.value);
    }

    const onChangeSheafDifficulty = (event) =>{
        setSheafDifficulty(event.target.value);
    }

    const onChangeNastySurprises = (event) =>{
        setNastySurprises(event.target.checked);
    }

    const onChangePaydata = (event) =>{
        setPaydataCheck(event.target.checked);
    }

    const onChangeLethalSystem = (event) =>{
        setLethalSystem(event.target.checked);
    }

    const onChangeICOptions = (event) =>{
        setICOptions(event.target.checked);
    }

    return (
    <Container id='SheafContainer'>
        <Row>
            <h1>Shadowrun Matrix Generator</h1>
        </Row>
        <Row>
            <Col >
                <Form className='align-left'>
                    <div onChange={onChangeSheafCode}> 
                        <h2>System Color</h2>
                        <div className="form-check">
                            <label className="form-check-label">Blue
                                <input className="form-check-input" type="radio" aria-label="Blue" value='blue' name="sheafCode" defaultChecked />
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Green
                                <input className="form-check-input" type="radio" value='green' name="sheafCode"/>
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Orange
                                <input className="form-check-input" type="radio" aria-label="Orange" value="orange" name="sheafCode"/>
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Red
                                <input className="form-check-input" type="radio" aria-label="Red" value='red' name="sheafCode"/>
                            </label>
                        </div>
                    </div>
                    <div onChange={onChangeSheafDifficulty}>
                        <h2>System Difficulty</h2>
                        <div className="form-check">
                            <label className="form-check-label">Easy
                                <input type="radio" className="form-check-input" aria-label="easy" value='easy' name="sheafDifficulty" defaultChecked/>
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Average
                                <input type="radio" className="form-check-input" aria-label="average" value='average'name="sheafDifficulty"/>
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Hard
                                <input type="radio" className="form-check-input" aria-label="hard" value="hard" name="sheafDifficulty"/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="form-check-label">
                            <input type="checkbox" name='NastySurprises' value={NastySurprises} onChange={onChangeNastySurprises} aria-label="Nasty Surprises?"/>
                            &nbsp;Nasty Surprises?
                        </label>
                    </div>
                    <div >
                        <label className="form-check-label">
                            <input type="checkbox" name='Paydata' value={PaydataCheck}  onChange={onChangePaydata} aria-label="Paydata?"/>
                            &nbsp;Paydata?
                        </label>
                    </div>
                    <div >
                        <label className="form-check-label">
                            <input type="checkbox" name='LethalSystem' value={LethalSystem} onChange={onChangeLethalSystem} aria-label="Lethal System?"/>
                             &nbsp;Lethal System?
                        </label>
                    </div>
                    <div c>
                        <label className="form-check-label">
                            <input type="checkbox" name='ICOptions' value={ICOptions} onChange={onChangeICOptions} aria-label="IC with Extra?"/>
                            &nbsp;IC with Extra?
                        </label>
                    </div>   

                    <Button onClick={GenerateSheaf}>Generate Host</Button>
                </Form>
            </Col>
            <Col>
                <Row>
                    <h3>Step / Intrustion Counter Measure</h3>
                    <h4>{sheafDisplay + " " }</h4>
                    <hr></hr>
                {
                    EventList.map((item,index) => {   
                        if(item.type === 'IC'){
                            return (<IC ICStep={item.ICStep} ICName={item.ICName+item.ICExtra} ICDescription={item.ICDescription} key={index}/>)
                        }else{
                            return (<ServerEvent ICStep={item.ICStep} EventName={item.EventName} EventDescription={ServerEventTypes[item.EventName]} key={index} />)
                        }
                    })
                }
                <hr></hr>         
                {
                    PayDataList.map((item,index) => <PayData key={index} size={item.size} protected={item.protected} defType={item.defType} defRating={item.defRating}  description={item.description} /> )
                }
                </Row>
            </Col>
        </Row>
        
    </Container>);
};

export default SecuritySheaf;