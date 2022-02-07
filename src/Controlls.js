import React, {useState,useRef, useEffect} from "react";
import sound1 from './assets/1.wav';
import sound2 from './assets/2.wav';
import sound3 from './assets/3.wav';
import sound4 from './assets/4.wav';
import soundStart from './assets/start.wav';
import image1 from './assets/1.png';
import image2 from './assets/2.png';
import image3 from './assets/3.png';
import image4 from './assets/4.png';

function Controlls () {

    const steps = useRef();
    const [currentSteps, setCurrentSteps] = useState(steps);
    const [input, setInput] = useState([]);
    const inputCount = useRef(0);
    const correct = useRef(true);
    const i = useRef(0);
    const [button1, setButton1] = useState(false);
    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);
    const [button4, setButton4] = useState(false);

    const [gameStart, setGameStart] = useState(true);
    const [gameNext, setGameNext] = useState(false);
    const [gameReset, setGameReset] = useState(false);

    const [allowInput, setAllowInput] = useState(false);

    const score = useRef(0);

    const audio = new Audio();

    useEffect(() => {
        audio.autoplay = true;
        setInitialStep();
    },[]);

    useEffect(() => {
        if(input.length > 0) {
            check();
        }
    },[input]);

    var setInitialStep = () => {
        var newNumber = Math.floor(Math.random() * 4) + 1;
        steps.current = [newNumber];
        setCurrentSteps(steps.current);
    }

    var reset = () => {
        setInput([]);
        correct.current = true;
        inputCount.current = 0;
        setInitialStep();
        setAllowInput(false);
        i.current = 0;
        score.current = 0;
        gameState(0);
    }

    var gameState = (state) => {
        switch(state){
            case 0:
                setGameStart(true);
                setGameReset(false);
                break;
            case 1:
                setGameStart(false);
                setGameNext(true);
                break;
            case 2:
                setGameStart(false);
                setGameNext(false);
                setGameReset(true);
                break;
            case 3:
                setGameStart(false);
                setGameNext(false);
                setGameReset(false);
                break;
            default:
                break;
        }
    }

    var next = () => {
        setInput([]);
        i.current = 0;
        inputCount.current = 0;
        setAllowInput(false);
        start();
    }

    var start = () => {
        gameState(3);
        let interval = setInterval(() => {

            switch(currentSteps[i.current]) {
                case 1:
                    audio.autoplay = true;
                    audio.src=sound1;
                    audio.play();
                    setButton1(true);
                    break;
                case 2:
                    audio.autoplay = true;
                    audio.src=sound2;
                    audio.play();
                    setButton2(true);
                    break;
                case 3:
                    audio.autoplay = true;
                    audio.src=sound3;
                    audio.play();
                    setButton3(true);
                    break;
                case 4:
                    audio.autoplay = true;
                    audio.src=sound4;
                    audio.play();
                    setButton4(true);
                    break;
                default:
                    break;
            };
            
            i.current++;

            if(i.current >= currentSteps.length) {
                setAllowInput(true);
                clearInterval(interval);
            }
        }, 1000);
    }

    var press = (choice) => {
        if(allowInput) {
            switch(choice){
                case 1:
                    setInput(oldInput => [...oldInput, 1]);
                    setButton1(true);
                    break;
                case 2:
                    setInput(oldInput => [...oldInput, 2]);
                    setButton2(true);
                    break;
                case 3:
                    setInput(oldInput => [...oldInput, 3]);
                    setButton3(true);
                    break;
                case 4:
                    setInput(oldInput => [...oldInput, 4]);
                    setButton4(true);
                    break;
                default:
                    break;
            };
        }
    };

    var check = () => {
        if(currentSteps[inputCount.current] !== input[inputCount.current]) {
            correct.current = false;
            gameState(2);
        }

        if(input.length === currentSteps.length) {
            if(correct.current) {
                score.current++;
                gameState(1);
                generateNewStep();
            }
        }

        inputCount.current ++;
    }

    var generateNewStep = () => {
        var newNumber = Math.floor(Math.random() * 4) + 1;
        setCurrentSteps(oldSteps => [...oldSteps, newNumber]);
    }

    return (
        <div className="row">
            <div className="main">
                <div className="row1">
                    <img src={image1} className={button1 ? "btn-1 fade-btn1" : "btn-1"} onAnimationEnd={() => setButton1(false)} onClick={() => {press(1); audio.src=sound1; audio.play();}}></img>
                    <img src={image2} className={button2 ? "btn-2 fade-btn2" : "btn-2"} onAnimationEnd={() => setButton2(false)} onClick={() => {press(2); audio.src=sound2; audio.play();}}></img>
                </div>
                <div className="score">
                    {score.current}
                </div>
                <div className="row2">
                    <img src={image3} className={button3 ? "btn-3 fade-btn3" : "btn-3"} onAnimationEnd={() => setButton3(false)} onClick={() => {press(3); audio.src=sound3; audio.play();}}></img>
                    <img src={image4} className={button4 ? "btn-4 fade-btn4" : "btn-4"} onAnimationEnd={() => setButton4(false)} onClick={() => {press(4); audio.src=sound4; audio.play();}}></img>
                </div>
                {gameStart ? <button className="btn-3" onClick={() => {audio.src=soundStart; audio.play(); start();}}>START</button> : ""}
                {gameNext ? <button className="btn-3" onClick={next}>NEXT</button> : ""}
                {gameReset ? <button className="btn-3" onClick={reset}>RESET</button> : ""}
            </div>
        </div>
    );
}

export default Controlls