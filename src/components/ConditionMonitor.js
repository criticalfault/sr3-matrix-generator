import './ConditionMonitor.css';
const ConditionMonitor = (props) => {
    const styles = {
        rectangle: {
            width: '25px',
            height: '25px',
            border: 'solid 1px black',
            display: 'inline-block',
            margin: '1px',
            cursor: 'pointer',
            textAlign: 'center'
        }
    }

    const handleClick = (options) => {
        var wounds = options.target.dataset.number;
        if(wounds === "0" && options.target.parentElement.children[0].classList.contains('damaged') && !options.target.parentElement.children[1].classList.contains('damaged')){
            options.target.parentElement.children[0].classList.remove('damaged');
        }else{
            var children = options.target.parentElement.children;
            for(var i=0; i < children.length; i++){
                if(children[i].dataset.number <= wounds){
                    children[i].classList.add('damaged');
                }else{
                    children[i].classList.remove('damaged');
                }
            }
        }
    }

    return (
        <div className="conditionMonitor">
            <div className="conditionBoxes">
                <div data-number={0} onClick={handleClick} style={styles.rectangle}>L</div>
                <div data-number={1} onClick={handleClick} style={styles.rectangle}>&nbsp;</div>
                <div data-number={2} onClick={handleClick} style={styles.rectangle}>M</div>
                <div data-number={3} onClick={handleClick} style={styles.rectangle}>&nbsp;</div>
                <div data-number={4} onClick={handleClick} style={styles.rectangle}>&nbsp;</div>
                <div data-number={5} onClick={handleClick} style={styles.rectangle}>S</div>
                <div data-number={6} onClick={handleClick} style={styles.rectangle}>&nbsp;</div>
                <div data-number={7} onClick={handleClick} style={styles.rectangle}>&nbsp;</div>
                <div data-number={8} onClick={handleClick} style={styles.rectangle}>&nbsp;</div>
                <div data-number={9} onClick={handleClick} style={styles.rectangle}>D</div>
            </div>
            <div className="conditionInfo">

            </div>
        </div>
    );

}
export default ConditionMonitor;