import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './IC.css';
const IC = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const OptionsDescription = {
        "Shielding":"Shielding -- The shield option makes it more difficult for attacking utilities to cause damage. Shield adds a +2 target modifier to all tests to hit the protected IC in cybercombat.",
        "Armor":"Armor -- This option strengthens the defenses of the IC, hardening it against attacks. Armor reduces the Power of any attack against the protected IC by 2. For example, armored IC hit by an attack-6M utility would make its Resistance Test against a Target Number 4.",
        "Shifting":"Shifting -- The shift option enables an IC program to constantly relocate its memory space and system addresses, making it difficult to target. Shift adds a +2 target modifier to all tests to hit the protected IC in cybercombat.\n\n Offensive utilities with the chaser option defeat the shift defense automatically and do not receive the +2 penalty. However, the shift option is extra-effective against utilities with the penetration option, which must add a +4 modifier to the target number rather than the standard +2.",
        "Expert Defense-1":"Expert Defense-1 -- IC that is programmed with the expert defense option is quite good at defending itself, at the cost of a weaker attack overall. Each point of expert defense adds an additional die to Damage Resistance Tests by the IC. However, for each point of expert defense, the IC rolls 1 less die on Attack Tests. The maximum expert defense rating IC may have is 3.\n\n Expert defense is incompatible with expert offense.",
        "Expert Defense-2":"Expert Defense-2 -- IC that is programmed with the expert defense option is quite good at defending itself, at the cost of a weaker attack overall. Each point of expert defense adds an additional die to Damage Resistance Tests by the IC. However, for each point of expert defense, the IC rolls 1 less die on Attack Tests. The maximum expert defense rating IC may have is 3.\n\n Expert defense is incompatible with expert offense.",
        "Expert Defense-3":"Expert Defense-3 -- IC that is programmed with the expert defense option is quite good at defending itself, at the cost of a weaker attack overall. Each point of expert defense adds an additional die to Damage Resistance Tests by the IC. However, for each point of expert defense, the IC rolls 1 less die on Attack Tests. The maximum expert defense rating IC may have is 3.\n\n Expert defense is incompatible with expert offense.",
        "Expert Offense-1":"Expert Offense-1 -- IC that is programmed with the expert offense option can make more effective attacks, though it is also less able to defend itself. Each point of expert offense adds an additional die to the Security Value for the IC's Attack Tests. However, for each point of expert offense, the IC rolls 1 less die on Damage Resistance Tests.\n\n The maximum expert offense rating IC may have is 3. Expert offense is incompatible with expert defense.",
        "Expert Offense-2":"Expert Offense-2 -- IC that is programmed with the expert offense option can make more effective attacks, though it is also less able to defend itself. Each point of expert offense adds an additional die to the Security Value for the IC's Attack Tests. However, for each point of expert offense, the IC rolls 1 less die on Damage Resistance Tests.\n\n The maximum expert offense rating IC may have is 3. Expert offense is incompatible with expert defense.",
        "Expert Offense-3":"Expert Offense-3 -- IC that is programmed with the expert offense option can make more effective attacks, though it is also less able to defend itself. Each point of expert offense adds an additional die to the Security Value for the IC's Attack Tests. However, for each point of expert offense, the IC rolls 1 less die on Damage Resistance Tests.\n\n The maximum expert offense rating IC may have is 3. Expert offense is incompatible with expert defense.",
        "Trap":"Trap -- IC with the trap option is designed to trigger one or more pieces of IC (usually gray or black IC) if it is destroyed in cyber-combat. The triggered IC immediately pursues the offending icon. If the IC is neutralized without being destroyed, it does not trigger any other IC.\n\nOnly the IC that triggers another piece of IC needs this option; the triggered piece of IC does not (though it may have this option and trigger IC of its own when destroyed as well). ",
        "Cascading":"Cascading -- IC with the cascading option is able to analyze a target's defenses, pinpoint weaknesses and improve its attacks to better exploit those weaknesses. When cascading IC misses a target in cybercombat or fails to damage a target when it scores a hit, it allocates more system resources to future attacks. Any proactive IC program may be programmed to cascade.\n\n If cascading IC misses on an attack, increase the Security Value used for its attacks by 1 for each subsequent Attack Test. This increase is cumulative—each time a test fails, add an additional point to the Security Value.\n\nIf the IC program attacks successfully but the target resists all of the damage or otherwise neutralizes the IC’s effect, increase the IC’s rating by 1 for subsequent attacks. These increases are also cumulative.\n\n The maximum increase depends on the Security Code of the system, as shown on the Cascading IC Table (p. 86).",
        "Party Cluster":"Party Cluster -- IC with the party cluster option is designed to coordinate with similar pieces of IC, attacking targets in tandem. This makes attacks by party IC more effective. Unlike IC constructs (p. 91), each piece of party IC remains distinct, forcing the intruder to defeat each piece of IC separately.\n\nIC with the party cluster option are intended to be grouped together and activated on the same trigger step, as part of the same 'cluster.' The total ratings of the party IC in a cluster may not exceed the system's Security Value x 2.\n\nBecause the system is more concerned with throwing IC at the intruder and overwhelming him with attacks than with accuracy, attacks by party IC suffer a +1 modifier for each additional piece of party IC that is part of its cluster.\n\nHowever, party IC programs are harder to hit because they surround the decker's processing space with rapidly shifting target addresses. Increase the intruder's target number to hit any component program in the party cluster by the total number of IC programs in the party cluster. Utilities equipped with the area option defeat this feature, however, and the penalty does not apply to tests made with such utilities.",
    }

    const ICSubTypes = {
        "Positive Conditioning":"Positive Conditioning -- The effects of positive conditioning are more insidious than other forms of psychotropic IC. In effect, an afflicted character is subconsciously manipulated to “love” the company (or organizational entity) that produced or deployed the IC. The character will find it difficult to take actions that might harm what he perceives as the best interests of the company, and he will react strongly to any criticisms of the company. Likewise, the character will feel compelled to support the company's actions and activities, not to mention buy its products.\n\n To participate in an action that he thinks will be harmful to the company's interests, he must make a Willpower Test against a target number equal to the IC rating. If the test succeeds, the character may participate in the action, but he receives +2 target number modifiers on all actions opposed to the company. If the test fails, the character is physically unable to participate in the action. If forced by others, the character protests vociferously and may violently resist or break down emotionally (at the gamemaster's discretion).", 
        "Cyberphobia":"Cyberphobia -- Cyberphobia is a profound fear of the Matrix, virtual reality, simsense, cyberterminals, decking and all related concepts. Any character afflicted with cyberphobia must make a successful Willpower Test against the rating of the psychotropic IC that caused the phobia before he can jack into a system. Also, add the IC's rating to the target numbers for all tests the character makes when decking, programming, working with hardware or anything else his new phobia causes him to fear. As a rule of thumb, the phobia affects any task involving computers, simsense or the Matrix.\n\n Drugs or spells inducing fear-free responses, such as tranquilizers or a Control Emotions spell, may reduce the phobia penalty by up to half at the gamemaster's discretion.", 
        "Frenzy":"Frenzy -- A character whose mind has been infected by frenzy psychotropic IC regresses into a maniacal state of rage. He may attack people at random, flee in howling terror, gibber, rant or otherwise engage in feral behavior. In combat, the character will fight viciously, using only his natural abilities (teeth, nails, fists), brute strength and maybe a basic blunt object. A frenzied character is not capable of conversation or intelligent self-control— he has been reduced to the mental state of a simple, agitated animal.\n\n The frenzied state lasts until the character is killed or knocked out and resumes immediately if the character regains consciousness. A kind gamemaster may allow the character to make a Willpower Test every 24 hours against the IC rating to resist the effect; if the test succeeds, the character wakes up in a non-psychotic state of total exhaustion (which isn’t to say that the frenzy state might not recur periodically).\n\n Magic or drugs may suppress the rage and allow the character to recover. A dosage of tranq patches equal to the IC's rating will calm the character down, as will manipulation by a Control Emotions spell with a rating equal to or higher than the IC rating. A calmed character will be able to suppress the frenzy for 24 hours, but after that period will revert back to that state at the drop of a hat.",
        "Judas":"Judas -- The so-called Judas syndrome is a subliminal compulsion to  betray one's self and one's colleagues. A character suffering  from the Judas syndrome leaves clues, both in the Matrix and  the real world, that lead to his location or reveal the identities  of his colleagues. An afflicted character is not aware that he is  doing this. In fact, he will deny his actions completely or interpret  them as mistakes, accidents or necessary actions. For  example, if someone were to ask the decker if he was the one  who scrawled the samurai's commcode on the corporate  office's front door with hot maroon lipstick, he would really  believe it when he said “No.” He'd even beat a lie-detector test.  Whenever a Judas syndrome-afflicted character has an opportunity to betray himself or others, make a secret Willpower Test against a target number equal to the psychotropic IC's rating. If the test succeeds, he resists the compulsion (of course, this is all subconscious, so the character is not aware of his internal conflict). If the test fails, the character carries out the compulsive act. Note that a character with the Judas syndrome is inclined toward any act of betrayal, not just acts that benefit whoever deployed the psychotropic IC.",
        "Acid":"Acid -- Targets Body",
        "Binder":"Binder -- Targets Evasion",
        "Jammer":"Jammer -- Targets Sensors",
        "Marker":"Marker -- Targets Masking",
    }

    const ICTypes = {
        "Trace":`Hunt Cycle: During the hunt cycle, trace IC makes Attack Tests against
        the intruder using the system's Security Value. All of the standard
        cybercombat rules apply. The trace IC suffers a +1 target
        number modifier for each successful Redirect Datatrail operation
        the targeted icon performs (see p. 100).

        If struck, the intruder makes an Evasion (Trace IC Rating)
        Test. If the targeted icon achieves an equal or greater number
        of successes, the attack fails to hit. If the trace IC achieves at
        least 1 net success, it has successfully hit the intruder and
        locked onto its datatrail, and the location cycle begins.
        
        Location Cycle: 
        The location cycle begins as soon as the trace IC makes a
        successful Attack Test against a decker. The IC immediately
        "disappears" and becomes reactive IC.

        To determine how long the location cycle lasts, add the
        intruder's jackpoint Trace Modifier (see p. 32) and the rating of
        any camo utility (see p. 70) he is running to 10. Divide the
        result by the number of net successes the trace IC achieved in
        its hunt cycle Attack Test. The result, rounded down, is the
        number of full Combat Turns the trace IC needs to complete its
        cycle and locate the intruder's jackpoint.

        Trace Effects:
        If a trace program completes its location cycle successfully,
        several things happen. First, the system records the jackpoint's
        serial number and physical location in its security logs.
        Second, the system notifies any physical security assets
        responsible for monitoring the invaded system. These security
        personnel can then initiate physical measures against the
        intruder's location (i.e., they send out the goons).
        Simultaneously, the trace program activates IC-targeting and
        tally-acceleration bonuses in the system.
        
        IC Targeting: Because the intruder has been located, the
        system can target the intruder more effectively. Reduce the target
        numbers of all Attack Tests made by the system's proactive
        IC programs against the intruder by 1.
        
        Tally Acceleration: The system will be more aware of a
        traced intruder's actions. Whenever the intruder generates
        increases to his security tally, add 1 extra point to the increase.
        For example, if a host scores 2 successes in a System Test
        against a traced intruder, add 3 to the intruder's security tally.
        
        Physical Measures: The physical measures triggered by a
        successful trace program are determined by the gamemaster.
        For example, say the trace IC has reported that a decker is
        tapped into a dataline in a squat in Redmond. The physical
        response depends entirely on what resources the invaded system's
        owners have, jurisdictional issues, the location of the
        nearest useful assets, whether Lone Star or any other local lawenforcement
        agency has been called in, the standard Security
        Rating of the site and so on.

        Running for It: A Graceful Logoff operation enables an
        intruder to get away and immediately stop the location cycle of
        a trace program. However, trace IC tries to prevent this operation, 
        so increase the character's target number for the operation by the IC's rating.
        Simply jacking out of the system will not defeat trace IC,
        because jacking out leaves the comm links in the network open
        for a measurable period. First, the LTG has to verify carrier signal
        loss. Then it gracefully dismantles the user's datatrail, the
        same way a user-initiated Graceful Logoff does. Just because a
        user jacks out doesn't mean his datatrail disappears in a big
        puff of bits. If a user does jack out, roll 1D6 - 1 (minimum value
        of 1). The result is the number of turns for which the user's
        datatrail remains intact. If the die roll result equals or exceeds
        the number of turns remaining in the trace program's location
        cycle, the IC will still locate the jackpoint.
        
        Likewise, if an intruder is knocked unconscious or killed by
        IC, or if his persona is crashed, a trace IC program in its location
        cycle will keep a connection open to the cyberterminal so that
        it may continue to trace the jackpoint. Again, the character must
        jack out to defeat the trace IC, and even then his datatrail
        remains intact and traceable for 1D6 - 1 (minimum 1) turns.
        `,
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
        "Lethal Black IC":"Lethal black IC fights like killer IC in cybercombat. However, successful lethal black IC attacks cause damage to a decker and his icon. The Damage Code for the IC depends on the Security Code of the Host: (IC Rating) Moderate for Blue and Green systems, (IC Rating) Serious for Orange and Red ones. The Damage Code applies to damage to both the decker and his icon.\n\n Stage up the Damage Level for every 2 successes on the IC's Attack Test. Every time black IC hits a decker, the decker rolls two Resistance Tests. Hardening reduces the Power of the damage for these Resistance Tests. A Body Resistance Test, using his Body Attribute, enables the decker to resist damage to his person. The Hacking Pool may not be used for this test, though Karma Pool dice may be. The decker also makes a Resistance Test using his icon's Bod Rating to resist damage to the icon. The icon resists damage as it resists damage from killer IC (see Killer, p. 228), and armor protects the icon normally.\n\n The decker's Matrix connection remains intact if the icon is killed before the decker dies or manages to jack out. In such cases, the IC completely dominates the decker's icon band bandwidth. Increase the effective rating of the IC by 2. Of course, the decker cannot fight back at all with his icon down. All he can do is try to jack out before the IC kills him. The Matrix connection automatically goes down if black IC kills the decker. But before it turns the deck loose, the black IC gets a shot at the MPCP, making the attack as if it were blaster IC, with double its rating. If the black IC completely destroys the MPCP, the IC deletes all data downloaded by the decker during the run. It deletes any such data stored in any connected storage memory as well, and reduces the MPCP's Rating to 0.", 
        "Non-Lethal Black IC":"Non-lethal black IC functions in the same manner as lethal black IC, with the following exceptions. First, non-lethal black IC causes Mental, not Physical damage. Deckers resist such damage with Willpower Tests. If damage from non-lethal black IC renders a decker unconscious, the decker’s Matrix connection is automatically broken. However, the non-lethal black IC still gets a final shot at the cyberdeck’s MPCP and the data downloaded during the run.\n\n Mental damage done by non-lethal black IC can overflow into the Physical Condition Monitor.",
        "Cerebropathic Black IC":"Though technically non-lethal, cerebropathic black IC is considered one of the nastiest IC programs created to date. Rather than targeting the persona or cyberterminal or attempting to kill or knock out the user, cerebropathic black IC attempts to selectively inflict brain damage on the user. The biofeedback impulses from cerebropathic IC tend to cause epileptic seizures and brain lesions and may also cause damage to implants through their neurological connections.\n\n Cerebropathic IC affects a character in the same manner as non-lethal black IC (p. 230, SR3). However, if the IC renders the character unconscious, it takes one last shot at his brain rather than his cyberterminal. Make a test using double the rating of the cerebropathic IC against the character's Willpower or Intelligence, whichever is higher. Each success inflicts 1 Stress Point against either the character's Intelligence, Willpower or an implant, as determined by the Cerebropathic Effects Table. Characters running with a cold ASIST are immune to stress effects of cerebropathic IC. If a character has an ICCM filter, they only suffer 1 Stress Point for every 2 successes scored by the IC.\n\n The effects of Stress Points are described on p. 124, M&M. If an implant Stress Point is achieved, apply the point to a randomly determined cyberware or bioware implant that is connected to the character's neurological system.",
        "Construct":""
    };

    const hasSubType = (subType) => {
        if(subType === false){
            return '';
        }else{
            return " ("+subType+") ";
        }
    }

    const hasSubTypeDesc = (subType) => {
        if(subType === false){
            return '';
        }else{
            return ICSubTypes[subType];
        }
    }
    
    const hasOptions = (options) => {
        if(options === false){
            return '';
        }else{
            return " ("+options+")";
        }
    }

    const hasOptionsDesc = (options) => {
        if(options === false){
            return '';
        }else{
            return OptionsDescription[options];
        }
    }


return (
    <div className='mb-2'>
        <Button className="ICButton" variant="primary" onClick={handleShow}>{props.ICStep}: {props.ICName + ' - '+ props.ICRating + hasSubType(props.ICSubType) + hasOptions(props.ICOptions) }</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.ICName + ' - '+ props.ICRating + hasSubType(props.ICSubType) + hasOptions(props.ICOptions)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ICTypes[props.ICName]}<br></br><br></br>{hasSubTypeDesc(props.ICSubType)}<br></br><br></br>{hasOptionsDesc(props.ICOptions)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>);
}

export default IC;