import React from 'react';
import { useState, createRef } from "react";
import './SecuritySheaf.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import IC from './IC.js';
import ServerEvent from './ServerEvent';
import PayData from './PayData.js';
import NastySurprise from './NastySurprise.js'
const SecuritySheaf = (props) => {

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    const [sheafCode, setSheafCode] = useState('blue');
    const [sheafWeight, setSheafWeight] = useState('none');
    const [sheafDifficulty, setSheafDifficulty] = useState('easy');
    const [sheafDisplay, setSheafDisplay] = useState('');
    const PaydataCheck = createRef();
    const NastySurprises = createRef();
    const LethalSystem = createRef();
    const ICHaveOptions = createRef();
    const SecurityValue = createRef();
    const [SystemName, setSystemName] = useState('Matrix System');
    const [SystemTally, setSystemTally] = useState(0);
    const [SystemAlertTally,setSystemAlertTally] = useState({'passive':10, 'active':20, 'shutdown':40})
    const [EventList, setEventList] = useState([]);
    const [SystemSurprise, setSystemSurprise] = useState([]);
    const [PayDataList, setPayDataList] = useState([]);
    const [MasterSecuritySheafOutput, setMasterSecuritySheafOutput] = useState('');
    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };
    
    const handleSaveProject = (event) => {
      let systemJSON = JSON.stringify({
        "SystemName":SystemName,
        "EventList":EventList,
        "SystemSurprise":SystemSurprise,
        "PayDataList":PayDataList,
        "MasterSecuritySheafOutput":MasterSecuritySheafOutput,
        "ACIFS":sheafDisplay,
        "SecurityValue":SecurityValue,
        "SystemColor":sheafCode,
        "SystemDifficulty":sheafDifficulty,
        "HasNastySurprises":document.querySelector('input[name="NastySurprises"]').checked,
        "HasPaydataGenerated":document.querySelector('input[name="Paydata"]').checked,
        "IsLethalSystem":document.querySelector('input[name="LethalSystem"]').checked,
        "ICHaveOptions":document.querySelector('input[name="ICHaveOptions"]').checked,
        "SystemTally":SystemTally
      });
      const blob = new Blob([systemJSON], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
    
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = SystemName+'.json';
      link.click();
    
      // Clean up by revoking the object URL
      URL.revokeObjectURL(url);
      fathom.trackEvent('Saved 3rd Matrix Sheaf');
    }
    
    const handleLoadProject = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileData = e.target.result;
            let systemData = JSON.parse(fileData);
            setEventList(systemData.EventList);
            setSystemSurprise(systemData.SystemSurprise);
            setPayDataList(systemData.PayDataList);
            setMasterSecuritySheafOutput(systemData.MasterSecuritySheafOutput);
            setSheafDifficulty(systemData.SystemDifficulty);
            document.querySelector('input[value="'+systemData.SystemDifficulty+'"]').checked = true;
            setSheafCode(systemData.SystemColor);
            document.querySelector('input[value="'+systemData.SystemColor+'"]').checked = true;
            setSheafDisplay(systemData.ACIFS);
            document.querySelector('input[name="NastySurprises"]').checked = systemData.HasNastySurprises;
            document.querySelector('input[name="Paydata"]').checked = systemData.HasPaydataGenerated;
            document.querySelector('input[name="LethalSystem"]').checked = systemData.IsLethalSystem;
            document.querySelector('input[name="ICHaveOptions"]').checked = systemData.ICHaveOptions;
            setSystemName(systemData.SystemName);
            setSystemTally(systemData.SystemTally);
            fathom.trackEvent('Loaded 3rd Matrix Sheaf');
            setShowModal(false);
        }    
        reader.readAsText(file);
      }
  

    const CombatStats = {
        "blue":  { "Legitimate":3, "Intruding":6, "ICDamage":"Moderate", "DumpShock":"Light",    "ICInit":"1d6+Rating", "ConstructHackingPool":0, "CascadeIncrease":"1"         },
        "green": { "Legitimate":4, "Intruding":5, "ICDamage":"Moderate", "DumpShock":"Moderate", "ICInit":"2d6+Rating", "ConstructHackingPool":1, "CascadeIncrease":"25% or 2"  },
        "orange":{ "Legitimate":5, "Intruding":4, "ICDamage":"Serious",  "DumpShock":"Serious",  "ICInit":"3d6+Rating", "ConstructHackingPool":2, "CascadeIncrease":"50% or 3"  },
        "red":   { "Legitimate":6, "Intruding":3, "ICDamage":"Serious",  "DumpShock":"Deadly",   "ICInit":"4d6+Rating", "ConstructHackingPool":3, "CascadeIncrease":"100% or 4" }
    }
    let EventListTemp = [];
    let NastySurprisesTemp = [];
    const Dice = (NumberDice, Sides, Modifier) => {
        let roll = 0
        for (let i = 0; i < NumberDice; i++) {
            roll += Math.ceil(Math.random() * Sides)
        }
        roll += Modifier
        return roll
    }

    const generateICRating = () => {
        let Roll = Dice(2,6,0)
        let Rating = 0;
    
        if (SecurityValue.current <= 4) {
            if (Roll <= 5)
                Rating = "4"
            if ((Roll >= 6)&&(Roll <= 8))
                Rating = "5"
            if ((Roll >= 9)&&(Roll <= 11))
                Rating = "6"
            if (Roll === 12)
                Rating = "7"
        }
        if ((SecurityValue.current >= 5)&&(SecurityValue.current <= 7)) {
            if (Roll <= 5)
                Rating = "5"
            if ((Roll >= 6)&&(Roll <= 8))
                Rating = "7"
            if ((Roll >= 9)&&(Roll <= 11))
                Rating = "9"
            if (Roll === 12)
                Rating = "10"
        }
        if ((SecurityValue.current >= 8)&&(SecurityValue.current <= 10)) {
            if (Roll <= 5)
                Rating = "6"
            if ((Roll >= 6)&&(Roll <= 8))
                Rating = "8"
            if ((Roll >= 9)&&(Roll <= 11))
                Rating = "10"
            if (Roll === 12)
                Rating = "12"
        }
        if (SecurityValue.current >= 11) {
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
        let IC = ["Probe", "Probe", "Trace", "Trace", "Trace", "Tar Baby"]
        let ICName = IC[Dice(1,6,-1)];
        let ICSubType = false;
        let ICRating = generateICRating();
        let ICExtra = "-" + ICRating;
        let ICOptions = ReactiveOptions();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICSubType":ICSubType, "ICRating":ICRating, "ICName":ICName, "ICExtra":ICExtra, "ICOptions":ICOptions});
        return ICName + ICExtra;
    }
    
    const ProactiveWhite = (ICStep) => {
        let IC = ["Crippler", "Crippler", "Crippler", "Crippler", "Killer", "Killer", "Killer", "Scout", "Scout", "Scout", "Construct"]
        let n = Dice(2,6,-2)
        let I = IC[n]
        let ICSubType = false;
        if (n <= 3)
            ICSubType = Crippler();

        let ICName = I;
        let ICRating = generateICRating();
        let ICExtra = "-" + ICRating;
        let ICOptions =  ProactiveOptions();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICSubType":ICSubType, "ICRating":ICRating, "ICName":ICName, "ICExtra":ICExtra, "ICOptions":ICOptions});
        return I + ICExtra;
    }
    
    const ReactiveGray = (ICStep) => {
        let IC = ["Tar Pit", "Tar Pit", "Trace", "Probe", "Scout", "Construct"]
        let n = Dice(1,6,-1)
        let I = IC[n]
        let ICName = I;
        let ICRating = generateICRating();
        let ICExtra = "-" + ICRating;
        let ICSubType = false;
        if ((n >= 2)&&(n <= 4)){
            ICSubType = TrapIC();
        }
        let options = ReactiveOptions();
        let ICOptions = ReactiveOptions();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICSubType":ICSubType, "ICRating":ICRating, "ICName":ICName, "ICExtra":ICExtra, "ICOptions":ICOptions});
        return I+ICExtra+' '+options;
    }
    
    const ProactiveGray = (ICStep) => {
        let IC = ["Ripper", "Ripper", "Ripper", "Ripper", "Blaster", "Blaster", "Blaster", "Sparky", "Sparky", "Sparky", "Construct"]
        let n = Dice(2,6,-2)
        let I = IC[n]
        let ICName = I;
        let ICSubType = false;
        if (n <= 3){
            ICSubType = Ripper()
        }
        let ICRating = generateICRating();
        let ICExtra = "-" + ICRating;
        let options = ProactiveOptions();
        let ICOptions = ProactiveOptions();
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICSubType":ICSubType, "ICRating":ICRating, "ICName":ICName, "ICExtra":ICExtra, "ICOptions":ICOptions });
        return I+ICExtra+' '+options;
    }
    
    const Black = (ICStep) => {
        let IC = ["Psychotropic Black IC", "Psychotropic Black IC", "Psychotropic Black IC", "Lethal Black IC", "Lethal Black IC", "Lethal Black IC", "Non-Lethal Black IC", "Non-Lethal Black IC", "Non-Lethal Black IC", "Non-Lethal Black IC", "Cerebropathic Black IC", "Construct"]
        let n = Dice(2,6,-2)
        let I = IC[n]
        let ICName = I;
        let ICSubType = false;
        if (n <= 4) {
            let t = Dice(1,6,0)
            if (t <= 2)
                ICSubType = "Cyberphobia"
            if (t === 3)
                ICSubType = "Frenzy"
            if (t === 4)
                ICSubType = "Judas"
            if (t >= 5)
                ICSubType = "Positive Conditioning"
        }
        let ICOptions = ProactiveOptions();
        let ICRating = generateICRating();
        let ICExtra = "-" + ICRating;
        EventListTemp.push({"type":"IC", "ICStep":ICStep, "ICSubType":ICSubType, "ICRating":ICRating, "ICName":ICName, "ICExtra":ICExtra, "ICOptions":ICOptions});
        return I+ICExtra;
    }
    
    const TrapIC = () => {
        if(ICHaveOptions.current.checked){
            let Trap = ["Data Bomb", "Blaster", "Blaster", "Blaster", "Killer", "Killer", "Killer", "Sparky", "Sparky", "Sparky", "Black"]
            let n = Dice(2,6,-2);
            let I = Trap[n] + "-" + generateICRating();
            if ((n === 0)&&(Dice(1,6,0) >= 5))
                I = "Pavlov " + I
            else if (n === 12)
                I = Black()
        
            return " with trap " + I
        }else{
            return false;
        }
    }
    
    const Crippler = () => {
        let Target = ["Acid", "Acid", "Binder", "Jammer", "Jammer", "Marker"]
        return Target[Dice(1,6,-1)];
    }
    const Ripper = () => {
        let Target = ["Acid", "Acid", "Bind", "Jam", "Jam", "Mark"]
        return Target[Dice(1,6,-1)];
    }
    
    const ReactiveOptions = () => {
        if(ICHaveOptions.current.checked){
            let ICOptions = ["Shielding", "Shielding", "Shielding", "Armor", false, false, "Trap", "Armor", "Shifting", "Shifting", "Shifting"]
            let n = Dice(2,6,-2)
            let O = ICOptions[n]
            if (n === 6)
                O = TrapIC()
        
            return O
        }else{
            return false;
        }
    }

    const ProactiveOptions = () => {
        if(ICHaveOptions.current.checked){
            let ICOptions = ["Party Cluster", "Party Cluster", "Expert Offense", "Shifting", "Cascading", false, "Armor", "Shielding", "Expert Defense", "Trap", "Roll Twice"]
            let n = Dice(2,6,-2);

            let O = ICOptions[n]
            if ((n === 2)|(n === 8))
                O += "-" + Dice(1,3,0).toString()
            else if (n === 9)
                O = TrapIC()
            else if (n === 10) {
                O = ""
                for (let m = 0; m < 2; m++) {
                    let n2 = Dice(2,6,-2)
                    while (n2 === 10)
                        n2 = Dice(2,6,-2)
        
                    let O2 = ICOptions[n2]
                    if ((n2 === 2)|(n2 === 8))
                        O2 += "-" + Dice(1,3,0).toString()
                    else if (n2 === 5)
                        O2 = ""
                    else if (n2 === 9)
                        O2 = TrapIC()
        
                    O = [...O,O2];
                }
            }   
            return O
        }else{
            return false;
        }
    }
    
    const PayDataGenerate = (systemColor) => {
        fathom.trackEvent('Generated PayData');
        let pd = "Paydata"
        let Points = 0;
        let List = [];

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
            for (let n = 0; n < Points; n++) {
                let MPSize = PayDataMp(systemColor);
                pd += "\n" + MPSize;
                let Defenses = PayDataDefenses(systemColor)
                if (Defenses){
                    pd += " (" + Defenses + ")";
                }

                if(Defenses === ''){
                    List.push({"size":MPSize, "protected":false, "defType":"", "defRating":0,  "description":"" });
                }else{
                    List.push({"size":MPSize, "protected":true, "defType":Defenses.type, "defRating":Defenses.rating});
                }
                
            }
            setPayDataList(List);
        }
        return pd;
    }
    
    const PayDataMp = (systemColor) => {
        let Mp = 0;
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
        let Defenses = ""
        let Roll = Dice(1,6,0)
        
        if (systemColor === "blue") {
            if (Roll >=5){
                Defenses = {type:"Scramble", "rating":generateICRating()}
            }    
        }
        if (systemColor === "green") {
            if (Roll === 3||Roll === 4){
                Defenses = {type:"Scramble", "rating":generateICRating()}
            }else if (Roll >= 5){
                Defenses = DataBombOrPavlov()
            }
        }
        if (systemColor === "orange") {
            if (Roll === 2||Roll === 3){
                Defenses = {type:"Scramble", "rating":generateICRating()}
            }else if (Roll === 4||Roll === 5){
                Defenses = DataBombOrPavlov()
            }else if (Roll === 6){
                Defenses = Worm()
            } 
        }
        if (systemColor === "red") {
            if (Roll <= 2){
                Defenses = {type:"Scramble", "rating":generateICRating()}
            }else if (Roll === 3||Roll === 4){
                Defenses = DataBombOrPavlov()
            }else if (Roll >= 5){
                Defenses = Worm()
            }
        }
        return Defenses	
    }
    
    const DataBombOrPavlov = () => {
        let defense = '';
        if (Dice(1,6,0) <= 4){
            defense = {type:"Data Bomb", "rating":generateICRating()}
        }else{
            defense = {type:"Pavlov IC", "rating":generateICRating()}
        }
        return defense	
    }

    const Worm = () => {
        let Roll = Dice(2,6,0)
        let I = '';
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
        fathom.trackEvent('Generated Sheaf');
        let SecuritySheafOutput = '';
        let StepModifier = 0;
        let AlertStatus = 0 // 0 = no alert, 1 = passive, 2 = active, 3 = shutdown
        let StepsAtCurrentAlert = 0
        let CurrentStep = 0
        let Event = ""
        let Roll = 0
        let PassiveAlertStep =0;
        let ActiveAlertStep = 0;
        let ShutdownAlertStep = 0;
        //ACIFS
        let AccessValue = 0;
        let ControlValue = 0;
        let IndexValue = 0;
        let FilesValue = 0;
        let SlaveValue = 0;
        let secValue = 0;
        NastySurprisesTemp = [];
        EventListTemp = [];
        if (sheafDifficulty === "easy") {
            secValue = Dice(1,3,3);
            SecurityValue.current = secValue;
            let tmpValues = [
                Dice(1,3,7),
                Dice(1,3,7),
                Dice(1,3,7),
                Dice(1,3,7),
                Dice(1,3,7)
            ]
            tmpValues.sort().reverse();
            if(sheafWeight === 'none'){
                console.log("Easy - Not Weighted");
                console.log(tmpValues);
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'access'){
                console.log("Easy - Access Weighted");
                console.log(tmpValues);
                AccessValue     = tmpValues.shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'control'){
                console.log("Easy - Control Weighted");
                console.log(tmpValues);
                ControlValue    = tmpValues.shift();
                AccessValue     = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'index'){
                console.log("Easy - Index Weighted");
                console.log(tmpValues);
                IndexValue      = tmpValues.shift();
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'files'){
                console.log("Easy - Files Weighted");
                console.log(tmpValues);
                FilesValue      = tmpValues.shift(); 
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'slave'){
                console.log("Easy - Slave Weighted");
                console.log(tmpValues);
                SlaveValue      = tmpValues.shift(); 
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
            }

        }

        if (sheafDifficulty === "average") {
            secValue = Dice(1,3,6);
            SecurityValue.current = secValue;
            let tmpValues = [
                Dice(2,3,9),
                Dice(2,3,9),
                Dice(2,3,9),
                Dice(2,3,9),
                Dice(2,3,9)
            ]
            tmpValues.sort().reverse();
            if(sheafWeight === 'none'){
                console.log("Average - Nonweighted");
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'access'){
                console.log("Average - Access Weighted");
                console.log(tmpValues);
                AccessValue     = tmpValues.shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'control'){
                console.log("Average - Control Weighted");
                console.log(tmpValues);
                ControlValue      = tmpValues.shift();
                AccessValue     = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'index'){
                console.log("Average - Index Weighted");
                console.log(tmpValues);
                IndexValue      = tmpValues.shift();
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'files'){
                console.log("Average - Files Weighted");
                console.log(tmpValues);
                FilesValue      = tmpValues.shift(); 
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'slave'){
                console.log("Average - Slave Weighted");
                console.log(tmpValues);
                SlaveValue      = tmpValues.shift(); 
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
            }
        }

        if (sheafDifficulty === "hard") {
            secValue = Dice(2,3,6);
            SecurityValue.current = secValue;
            let tmpValues = [
                Dice(1,6,12),
                Dice(1,6,12),
                Dice(1,6,12),
                Dice(1,6,12),
                Dice(1,6,12)
            ]
            tmpValues.sort().reverse();
            if(sheafWeight === 'none'){
                console.log("Hard - Not Weighted");
                console.log(tmpValues);
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'access'){
                console.log("Hard - Access Weighted");
                console.log(tmpValues);
                AccessValue     = tmpValues.shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'control'){
                console.log("Hard - Control Weighted");
                console.log(tmpValues);
                ControlValue    = tmpValues.shift();
                AccessValue     = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'index'){
                console.log("Hard - Index Weighted");
                console.log(tmpValues);
                IndexValue      = tmpValues.shift();
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'files'){
                console.log("Hard - Files Weighted");
                console.log(tmpValues);
                FilesValue      = tmpValues.shift(); 
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                SlaveValue      = shuffle(tmpValues).shift();
            }else if(sheafWeight === 'slave'){
                console.log("Hard - Slave Weighted");
                console.log(tmpValues);
                SlaveValue      = tmpValues.shift(); 
                AccessValue     = shuffle(tmpValues).shift();
                ControlValue    = shuffle(tmpValues).shift();
                IndexValue      = shuffle(tmpValues).shift();
                FilesValue      = shuffle(tmpValues).shift();
            }
        }
        SecuritySheafOutput += sheafCode + "-" + secValue.toString() + "/" + AccessValue + "/" + ControlValue + "/" + IndexValue + "/" + FilesValue + "/" + SlaveValue + "\n";
        setSheafDisplay(sheafCode.toUpperCase() + "-" + secValue.toString() + ' (ACIFS) ' +AccessValue+ "/" +ControlValue+ "/" +IndexValue+ "/" +FilesValue+ "/" +SlaveValue  );
        
        if(sheafCode === "blue")  { StepModifier = 4 }
        if(sheafCode === "green") { StepModifier = 3 }
        if(sheafCode === "orange"){ StepModifier = 2 }
        if(sheafCode === "red")   { StepModifier = 1 }

        if (NastySurprises.current.checked === true) {
            //Still need to work this in, see about how we can display this nicely when its enabled.
            let Surprises = ["Semi-Autonomous Knowbot", "Teleporting SAN", "Vanishing SAN", "Bouncer Host", "Data Bomb", "Scramble IC", "Security Decker(s)", "Worm", "Chokepoint", "Trap Door", "Virtual Host"]
            let n = Dice(2,6,-2);
            let S = Surprises[n];
            let Options = "";
            if (n === 4) {
                if (Dice(1,6,0) >= 5)
                    Options = "Pavlov " + S;
                if (Dice(1,6,0) <= 4)
                    Options= {"extra":" guarding a file", "rating":generateICRating(), "type":S};
                else
                    Options= {"extra":" guarding a slave device", "rating":generateICRating(), "type":S};
            }
            else if (n === 5) {
                Roll = Dice(1,6,0);
                if (Roll <= 2)
                    Options= {"extra":" guarding Access subsystem", "rating":generateICRating(), "type":S};
                else if ((Roll === 3)|(Roll === 4))
                    Options= {"extra":" guarding Files subsystem","rating":generateICRating(), "type":S};
                else if (Roll >= 5)
                    Options= {"extra":" guarding Slave subsystem","rating":generateICRating(), "type":S};
            }
            else if (n === 7) {
                Options = Worm();
            }
            NastySurprisesTemp.push({"type":S, "options":Options });
            setSystemSurprise(NastySurprisesTemp);
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
                    PassiveAlertStep = CurrentStep;
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
                    ActiveAlertStep = CurrentStep;
                }
            }
            else if (AlertStatus === 2) { // Active alert
                if (Roll <= 3)
                    Event = ProactiveGray(CurrentStep)
                if ((Roll === 4)|(Roll === 5))
                    Event = ProactiveWhite(CurrentStep)
                if ((Roll === 6)|(Roll === 7))
                    if(LethalSystem.current.checked){
                        Event = Black(CurrentStep)
                    }else{
                        Event = ProactiveGray(CurrentStep)
                    }
                if (Roll >= 8) {
                    EventListTemp.push({"type":"Alert", "ICStep":CurrentStep, "EventName":"Shutdown", "EventDescription":""});
                    Event = "Shutdown"
                    AlertStatus = 3
                    ShutdownAlertStep = CurrentStep;
                }
            }
            SecuritySheafOutput += "\n" + CurrentStep.toString() + ": " + Event;
            setSystemAlertTally({'passive':PassiveAlertStep, 'active':ActiveAlertStep, 'shutdown':ShutdownAlertStep});
        }

        // Generate paydata
        if (PaydataCheck.current.checked){
            SecuritySheafOutput += "\n\n" + PayDataGenerate(sheafCode);
        }else{
            setPayDataList([]);
        }
        setEventList(EventListTemp);
        setMasterSecuritySheafOutput(SecuritySheafOutput);
    }

    const onChangeSheafCode = (event) =>{
        setSheafCode(event.target.value);
    }

    const onChangeSheafDifficulty = (event) =>{
        setSheafDifficulty(event.target.value);
    }

    const onChangeSheafWeight = (event) =>{
        setSheafWeight(event.target.value);
    }
    

    return (
    <Container id='SheafContainer'>
        <Row>
            <h1>Shadowrun Matrix Generator</h1>
        </Row>
        <Row>
            <div className='col-md-6 col-xs-12' key='ProjectBase'>
                <Button style={{width: "49%",marginRight:"5px"}} onClick={handleSaveProject} >Save Project</Button>              
                <Button style={{width: "49%"}} onClick={handleModalOpen} >Load Project</Button><br></br>
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="file" accept=".json" onChange={handleLoadProject} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleModalClose}>
                            Upload
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Form className='align-left'>
                    <div style={{"margin":"5px", "marginTop":"10px", "fontSize":"20px"}}>   
                        <label className="form-check-label"><h2>System Name</h2>
                            <input name='systemName' value={SystemName} onChange={(function(event){ setSystemName(event.target.value)})} />
                        </label>
                    </div>
                    <div onChange={onChangeSheafWeight}>
                        <h2>System Weight</h2>
                        <div className="form-check">
                            <label className="form-check-label">None
                                <input className="form-check-input" type="radio" aria-label="None" value='none' name="sheafWeight" defaultChecked />
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Access
                                <input className="form-check-input" type="radio" aria-label="Access" value='access' name="sheafWeight" />
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Control 
                                <input className="form-check-input" type="radio" aria-label="Control" value='control' name="sheafWeight" />
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Index
                                <input className="form-check-input" type="radio" aria-label="Index" value="index" name="sheafWeight"/>
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Files
                                <input className="form-check-input" type="radio" aria-label="Files" value="files" name="sheafWeight"/>
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Slave
                                <input className="form-check-input" type="radio" aria-label="Slave" value='slave' name="sheafWeight"/>
                            </label>
                        </div>
                    </div>
                    <div onChange={onChangeSheafCode}> 
                        <h2>System Color</h2>
                        <div className="form-check">
                            <label className="form-check-label">Blue
                                <input className="form-check-input" type="radio" aria-label="Blue" value='blue' name="sheafCode" defaultChecked />
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Green
                                <input className="form-check-input" type="radio" aria-label="Green"  value='green' name="sheafCode" />
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
                                <input type="radio" className="form-check-input" aria-label="average" value='average' name="sheafDifficulty"/>
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
                            <input type="checkbox" name='NastySurprises' ref={NastySurprises} aria-label="Nasty Surprises?"/>
                            &nbsp;Nasty Surprises? (Bouncers, Encryption, etc)
                        </label>
                    </div>
                    <div >
                        <label className="form-check-label">
                            <input type="checkbox" name='Paydata' ref={PaydataCheck} aria-label="Paydata?"/>
                            &nbsp;Generate Random Paydata?
                        </label>
                    </div>
                    <div >
                        <label className="form-check-label">
                            <input type="checkbox" name='LethalSystem' ref={LethalSystem} aria-label="Lethal System?"/>
                             &nbsp;System Can Load Lethal IC?
                        </label>
                    </div>
                    <div c>
                        <label className="form-check-label">
                            <input type="checkbox" name='ICHaveOptions' ref={ICHaveOptions} aria-label="IC with Extra?"/>
                            &nbsp;IC with Extra Combat Options?
                        </label>
                    </div>
                    <Button onClick={GenerateSheaf}>Generate Host</Button>
                </Form>
                <Row className='CombatStats'>
                    <div className="col-md-12 col-xs-12">
                        <h3>Combat Stats</h3>
                    </div>
                    <Col className="col-md-6 col-xs-12">Legitimate&nbsp;Icon To-Hit&nbsp;TN: {CombatStats[sheafCode].Legitimate}</Col>
                    <Col className="col-md-6 col-xs-12">Intruding&nbsp;Icon To-Hit&nbsp;TN: {CombatStats[sheafCode].Intruding}</Col>
                    
                    <Col className="col-md-4 col-xs-12">IC&nbsp;Damage: {CombatStats[sheafCode].ICDamage}</Col>
                    <Col className="col-md-4 col-xs-12">IC&nbsp;Init: {CombatStats[sheafCode].ICInit}</Col>
                    <Col className="col-md-4 col-xs-12">DumpShock: {CombatStats[sheafCode].DumpShock}</Col>
                </Row>
                <Accordion defaultActiveKey="1" className='CombatStats'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>System Copy Field</Accordion.Header>
                        <Accordion.Body>
                        <pre>
                            {MasterSecuritySheafOutput.replaceAll(' false','')}
                        </pre>
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className='col-md-6 col-xs-12' key={'RenderWindow'}>
                <Row>
                    <h4>Security Tally: {SystemTally}</h4>
                    {/* <div class={"progress"} id='securityTallBar' role={"progressbar"} ariaLabel={"Security Tally Bar"} aria-valuenow={SystemTally} aria-valuemin={0} aria-valuemax={"0"}>
                        <div class={"progress-bar bg-success"} style={{"width":"0"}}>{SystemTally}</div>
                    </div> */}
                    <div style={{"margin":"5px"}}>
                        <button className='btn btn-primary' onClick={(function(event){
                            let systemTally = SystemTally;
                            systemTally +=1 ;
                            setSystemTally(systemTally);
                        })}> + </button> &nbsp; &nbsp;
                        <button className='btn btn-primary' onClick={(function(event){
                              let systemTally = SystemTally;
                              systemTally -=1 ;
                              if(systemTally < 0){ systemTally = 0; }
                              setSystemTally(systemTally);
                        })}> - </button>
                    </div>
                    <h3>Step / Intrustion Counter Measure</h3>
                    <h4>{sheafDisplay + " "}</h4>
                    <hr></hr>
                    {   
                        SystemSurprise.map((item,index) => {    
                            return (<NastySurprise type={item.type}  options={item.options} key={index} />)
                      })
                    }  
                    {
                        EventList.map((item,index) => {   
                            if(item.type === 'IC'){
                                return (<Row> 
                                            <IC ICStep={item.ICStep} ICName={item.ICName} ICSubType={item.ICSubType} ICExtra={item.ICExtra} ICOptions={item.ICOptions} ICRating={item.ICRating} key={index} conditionKey={index} securityTally={SystemTally}/>
                                        </Row>
                                        )
                            }else{
                                return (<Row> 
                                            <ServerEvent ICStep={item.ICStep} EventName={item.EventName} EventDescription={item.EventName} key={index} securityTally={SystemTally}/>
                                            <hr></hr>
                                        </Row>)
                            }
                        })
                    }      
                    {
                        PayDataList.map((item,index) => <PayData key={index} size={item.size} protected={item.protected} defType={item.defType} defRating={item.defRating} description={item.description}/> )
                    }
                </Row>
            </div>
        </Row>
        
    </Container>);
};

export default SecuritySheaf;