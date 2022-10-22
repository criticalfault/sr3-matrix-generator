import React from 'react';
import { useState } from "react";
import './SecuritySheaf.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import IC from './IC.js';
import ServerEvent from './ServerEvent';
import PayData from './PayData.js';

const SecuritySheaf = (props) => {
    const [sheafCode, setSheafCode] = useState('blue');
    const [sheafDifficulty, setSheafDifficulty] = useState('easy');
    const [PaydataCheck, setPaydataCheck] = useState(false);
    const [NastySurprises, setNastySurprises] = useState(false);
    const [SecurityValue, setSecurityValue] = useState('');
    const [SecuritySheafOutput, setSecuritySheafOutput] = useState('');
    const [LethalSystem, setLethalSystem]= useState(false);
    const [EventList, setEventList] = useState([]);
    const [PayDataList, setPayDataList] = useState([]);
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
        "Construct":"",
        "Pavlov White":"Pavlov IC is similar to standard data bomb IC, except that it does not crash when detonated and remains armed. Pavlov IC follows all the same rules as data bombs with the following exceptions. First, Pavlov IC only inflicts (rating)M damage against an icon that accesses the file or device. Second, Pavlov IC does not crash when it detonates—it remains armed and ready to explode again should the file or remote device be accessed again. Third, Pavlov IC creates a threshold equal to half its rating (round down); if the number of successes achieved on the System Test to access the file or device do not exceed this threshold, then the operation fails.",
        "Data Bomb":"A data bomb is a form of reactive IC that is attached to a file or remote slavedevice icon. The armed data bomb remains in place until another icon accesses the file or device, at which point the bomb “explodes” and damages the intruder. Unlike other IC, data bombs are not triggered by security tallies; they attack any user icon that accesses the bomb-protected icon. (See Triggering Data Bombs, p. 104.)\n\n Only one data bomb may be attached to a particular file or remote device. Data bombs may be attached to icons that are also protected by scramble IC.\n\n A data bomb can be detected by performing a successful Analyze Icon operation against the bomb-protected icon.",
        "Trace":"Trace IC is a hybrid of white and gray IC programs designed to lock in on an intruder's datatrail and trace it back to its physical origin. Trace functions in a manner similar to the track utility (p. 221, SR3). Trace IC works in two distinct stages: the hunt cycle and the location cycle. During the hunt cycle, trace IC tries to get a fix on the intruder's datatrail by “attacking” him in cybercombat. If the intruder does not evade the attack, the trace IC begins its location cycle to locate the intruder's jackpoint.",
        "Crashworms":"Crashworms seek to undermine the integrity of utilities, causing them to crash or suffer from induced errors. Whenever a utility is activated on a cyberterminal infected with crashworms, make a Worm Rating Test against the rating of the utility. If the utility has the crashguard option (see p. 83), add the crashguard rating as a target number modifier. If successful, the utility suffers errors and must roll on the Glitch Table (see p. 82).",
        "Deathworms":"A deathworm infection impedes the cyberterminal's functioning from within. All tests made by the persona, including Attack and Resistance Tests made during cybercombat, suffer a target number modifier equal to the deathworm rating ÷ 2 (round down).",
        "Dataworm":"Dataworms reside on a cyberterminal and carefully log everything the persona does: the jackpoints it uses, the systems it logs onto, the accounts and passcodes it uses, the files it accesses the utilities it uses (including ratings and options) and so on. The dataworm secretly accumulates all of this data in a hidden file on the cyberterminal and seeks to transmit it to a predetermined destination on a periodic basis. Each time a dataworm-infected cyberterminal logs on to a grid, roll 1D6. On a result of 1, the dataworm tries to send a report chock-full of incriminating evidence back to its owner.\n\n At the same time, make a Sensor (4 + Worm Rating) Test for the cyberterminal's user. If the test fails, the data payload is sent away without being discovered. If the test succeeds, the user notices the dataworm report and may engage it in cybercombat to destroy it before it gets away.\n\n In cybercombat, dataworm reports act as standard icons with rating +3D6 Initiative and an effective Evasion rating equal to the worm rating. They possess no offensive capabilities, but will maneuver to evade detection (see Cybercombat, p. 224, SR3). If the dataworm report has evaded the user at the end of any Combat Turn, it escapes. Dataworm reports are always considered to be illegitimate icons for purposes of cybercombat. The effects of dataworm reports depend on the events in the adventure. Depending on the information logged and who receives it, the user may find himself targeted for arrest or assassination, his Matrix haunts under surveillance or raided, and/or his associates killed or chased underground.",
        "Tapeworm":"Tapeworms erase files downloaded onto the cyberterminal. Whenever the user downloads a file, make a Worm Rating (MPCP) Test as soon as the download is complete. If successful, the tapeworm corrupts the information and renders it irretrievable.",
        "Ringworm":"Unlike their counterparts, ringworms are relatively benign; they are primarily used as a prankster tool. Ringworms are programmed to alter the coding of a persona's icon to change its appearance. These changes can be minor (perhaps causing the icon to flicker or buzz with static) or drastic (changing an imposing samurai warrior icon to a fluffy pink kitty). When a ringworm invades a cyberterminal, make a Worm Rating (Icon Rating) Test. If successful, the ringworm alters the icon as it has been programmed; use successes to determine the extent of these changes."
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
        var ICExtra = "-" + ICRating() + ReactiveOptions()
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICName":ICName, "ICExtra":ICExtra, "ICDescription":ICTypes[ICName]});
        return ICName + ICExtra;
    }
    
    const ProactiveWhite = (ICStep) => {
        var IC = ["Crippler", "Crippler", "Crippler", "Crippler", "Killer", "Killer", "Killer", "Scout", "Scout", "Scout", "Construct"]
        var n = Dice(2,6,-2)
        var I = IC[n]
        var ICName = I;
        if (n <= 3)
            I += Crippler();
        
        var ICExtra = "-" + ICRating() + ProactiveOptions();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICName":I, "ICExtra":ICExtra, "ICDescription":ICTypes[ICName]});
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
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICName":I, "ICExtra":ICExtra+options, "ICDescription":ICTypes[ICName]});
        return I + ICExtra + options;
    }
    
    const ProactiveGray = (ICStep) => {
        var IC = ["Ripper", "Ripper", "Ripper", "Ripper", "Blaster", "Blaster", "Blaster", "Sparky", "Sparky", "Sparky", "Construct"]
        var n = Dice(2,6,-2)
        var I = IC[n]
        var ICName = I;
        if (n <= 3)
            I += Ripper()
        var ICExtra = "-" + ICRating();
        var options = ProactiveOptions();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICName":I, "ICExtra":ICExtra+options, "ICDescription":ICTypes[ICName]});
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
        return "";
        // var Trap = ["Data Bomb", "Blaster", "Blaster", "Blaster", "Killer", "Killer", "Killer", "Sparky", "Sparky", "Sparky", "Black"]
        // var n = Dice(2,6,-2)
        // var I = Trap[n] + "-" + ICRating()
        // if ((n === 0)&&(Dice(1,6,0) >= 5))
        //     I = "Pavlov " + I
        // else if (n === 12)
        //     I = Black()
    
        // return " with trap " + I
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
        return "";
        // var ICOptions = [" (Shielding)", " (Shielding)", " (Shielding)", " (Armor)", "None", "None", "Trap", " (Armor)", " (Shifting)", " (Shifting)", " (Shifting)"]
        // var n = Dice(2,6,-2)
        // var O = ICOptions[n]
        // if ((n === 4)|(n === 5))
        //     O = ""
        // else if (n === 6)
        //     O = TrapIC()
    
        // return O
    }

    const ProactiveOptions = () => {
        return "";
        // var ICOptions = ["Party Cluster", "Party Cluster", " (Expert Offense", " (Shifting)", " (Cascading)", "None", " (Armor)", " (Shielding)", " (Expert Defense", "Trap", "Roll Twice"]
        // var n = Dice(2,6,-2)
        // var O = ICOptions[n]
        // if ((n === 2)|(n === 8))
        //     O += "-" + Dice(1,3,0).toString() + ")"
        // else if (n === 5)
        //     O = ""
        // else if (n === 9)
        //     O = TrapIC()
        // else if (n === 10) {
        //     O = ""
        //     for (var m = 0; m < 2; m++) {
        //         var n2 = Dice(2,6,-2)
        //         while (n2 === 10)
        //             n2 = Dice(2,6,-2)
    
        //         var O2 = ICOptions[n2]
        //         if ((n2 === 2)|(n2 === 8))
        //             O2 += "-" + Dice(1,3,0).toString() + ")"
        //         else if (n2 === 5)
        //             O2 = ""
        //         else if (n2 === 9)
        //             O2 = TrapIC()
    
        //         O += O2
        //     }
        // }
        
        // return O
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
                    List.push({"size":MPSize, "defense":'', "description":ICTypes[Defenses] });
                }else{
                    List.push({"size":MPSize, "defense":`(${Defenses.type} - ${Defenses.rating})`, "description":ICTypes[Defenses] });
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
        EventListTemp = [];

        if (sheafDifficulty === "easy") {
            let secValue = Dice(1,3,3);
            setSecurityValue(secValue);
            SecuritySheafOutput += sheafCode + "-" + SecurityValue.toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "\n";
        }

        if (sheafDifficulty === "average") {
            let secValue = Dice(1,3,6);
            setSecurityValue(secValue);
            SecuritySheafOutput += sheafCode + "-" + SecurityValue.toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "\n";
        }

        if (sheafDifficulty === "hard") {
            let secValue = Dice(2,3,6);
            setSecurityValue(secValue)
            SecuritySheafOutput += sheafCode + "-" + SecurityValue.toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "\n";
        }
        
        if(sheafCode === "blue")  { StepModifier = 4 }
        if(sheafCode === "green") { StepModifier = 3 }
        if(sheafCode === "orange"){ StepModifier = 2 }
        if(sheafCode === "red")   { StepModifier = 1 }

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

    return (
    <Container id='SheafContainer'>
        <Row>
            <h1>Shadowrun Matrix Generator</h1>
        </Row>
        <Row>
            <Col >
                <div className='align-left'>
                    <InputGroup onChange={onChangeSheafCode}>
                        <InputGroup.Text>System Color</InputGroup.Text> 
                        <InputGroup.Radio aria-label="Blue"   value='blue'    name="sheafCode" checked/>
                        <InputGroup.Text>Blue</InputGroup.Text>
                        <InputGroup.Radio aria-label="Green"  value='green'   name="sheafCode"/>
                        <InputGroup.Text>Green</InputGroup.Text>
                        <InputGroup.Radio aria-label="Orange" value="orange"  name="sheafCode"/>
                        <InputGroup.Text>Orange</InputGroup.Text>
                        <InputGroup.Radio aria-label="Red"    value='red'     name="sheafCode"/>
                        <InputGroup.Text>Red</InputGroup.Text>
                    </InputGroup>
                    <InputGroup onChange={onChangeSheafDifficulty}>
                        <InputGroup.Text>System Difficulty</InputGroup.Text>
                        <InputGroup.Radio aria-label="easy"       value='easy'    name="sheafDifficulty" checked/>
                        <InputGroup.Text>Easy</InputGroup.Text>
                        <InputGroup.Radio aria-label="average"    value='average' name="sheafDifficulty"/>
                        <InputGroup.Text>Average</InputGroup.Text>
                        <InputGroup.Radio aria-label="hard"       value="hard"    name="sheafDifficulty"/>
                        <InputGroup.Text>Hard</InputGroup.Text>
                    </InputGroup>
                    <InputGroup onChange={onChangeNastySurprises}>
                        <InputGroup.Text>Nasty Surprises?</InputGroup.Text>
                        <InputGroup.Checkbox name='NastySurprises' value={NastySurprises} aria-label="Checkbox for following text input" />
                    </InputGroup>
                    <InputGroup onChange={onChangePaydata}>
                        <InputGroup.Text>Paydata?</InputGroup.Text>
                        <InputGroup.Checkbox name='Paydata' value={PaydataCheck} aria-label="Checkbox for following text input" />
                    </InputGroup>
                    <InputGroup onChange={onChangeLethalSystem}>
                        <InputGroup.Text>Lethal System?</InputGroup.Text>
                        <InputGroup.Checkbox name='Paydata' value={LethalSystem} aria-label="Checkbox for following text input" />
                    </InputGroup>
                    <Button onClick={GenerateSheaf}>Generate Host</Button>
                </div>
            </Col>
            <Col>
                <Row>
                {
                    EventList.map((item,index) => {   
                        if(item.type === 'IC'){
                            return (<IC ICStep={item.ICStep} ICName={item.ICName+item.ICExtra} ICDescription={item.ICDescription} />)
                        }else{
                            return (<ServerEvent ICStep={item.ICStep} EventName={item.EventName} EventDescription={ServerEventTypes[item.EventName]} />)
                        }
                    })
                }
                <hr></hr>
                {
                    PayDataList.map((item,index) => <PayData size={item.size} defense={item.defense} /> )
                }
                </Row>
            </Col>
        </Row>
        
    </Container>);
};

export default SecuritySheaf;