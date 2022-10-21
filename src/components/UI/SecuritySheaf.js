import React from 'react';
import { useState } from "react";
import './SecuritySheaf.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
// import Stack from 'react-bootstrap/Stack';


const SecuritySheaf = (props) => {

    const [sheafCode, setSheafCode] = useState('blue');
    const [sheafDifficulty, setSheafDifficulty] = useState(4);
    //const [Paydata, setPaydata] = useState(0);
    //const [NastySurprises, setNastySurprises] = useState(false);
    const [SecurityValue, setSecurityValue] = useState('');
    const [SecuritySheafOutput, setSecuritySheafOutput] = useState('');
    
    const Dice = (NumberDice, Sides, Modifier) => {
        var roll = 0
        for (let i = 0; i < NumberDice; i++) {
            roll += Math.ceil(Math.random() * Sides)
        }
        roll += Modifier
        return roll
    }

    const GenerateSheaf = (event) => {
        if (sheafDifficulty == "easy") {
            console.log("easy");
            let secValue = Dice(1,3,3);
            console.log(secValue)
            setSecurityValue(secValue);
            setSecuritySheafOutput(sheafCode + "-" + SecurityValue.toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "/" + Dice(1,3,7).toString() + "\n");
        }

        if (sheafDifficulty == "average") {
            console.log("average");
            let secValue = Dice(1,3,6);
            console.log(secValue)
            setSecurityValue(secValue);
            setSecuritySheafOutput(sheafCode + "-" + SecurityValue.toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "/" + Dice(2,3,9).toString() + "\n");
        }

        if (sheafDifficulty == "hard") {
            console.log("hard");
            let secValue = Dice(2,3,6);
            console.log(secValue)
            setSecurityValue(secValue)
            setSecuritySheafOutput(sheafCode + "-" + SecurityValue.toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "/" + Dice(1,6,12).toString() + "\n");
        }
        
        console.log(SecuritySheafOutput)
    }

    const onChangeSheafCode = (event) =>{
        console.log(event.target.value)
        setSheafCode(event.target.value);
    }

    const onChangeSheafDifficulty = (event) =>{
        setSheafDifficulty(event.target.value);
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
                  <InputGroup.Radio aria-label="Blue" value='blue' name="sheafCode"/>
                  <InputGroup.Text>Blue</InputGroup.Text>
                  <InputGroup.Radio aria-label="Green" value='green' name="sheafCode"/>
                  <InputGroup.Text>Green</InputGroup.Text>
                  <InputGroup.Radio aria-label="Orange" value="orange" name="sheafCode"/>
                  <InputGroup.Text>Orange</InputGroup.Text>
                  <InputGroup.Radio aria-label="Red" value='red' name="sheafCode"/>
                  <InputGroup.Text>Red</InputGroup.Text>
              </InputGroup>
              <InputGroup onChange={onChangeSheafDifficulty}>
                  <InputGroup.Radio aria-label="easy" value='easy' name="sheafDifficulty"/>
                  <InputGroup.Text>Easy</InputGroup.Text>
                  <InputGroup.Radio aria-label="average" value='average' name="sheafDifficulty"/>
                  <InputGroup.Text>Average</InputGroup.Text>
                  <InputGroup.Radio aria-label="hard" value="hard" name="sheafDifficulty"/>
                  <InputGroup.Text>Hard</InputGroup.Text>
              </InputGroup>
              <Button onClick={GenerateSheaf}>Generate Host</Button>
            </div>
          </Col>
          
        </Row>
    </Container>);

};

export default SecuritySheaf;