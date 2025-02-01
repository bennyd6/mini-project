// import DialogueBox from "./dialogueBox"
// import './recordLand.css'


// export default function RecordLand(){
//     return(
//         <>
//         <div className="rl-main">
//             <DialogueBox></DialogueBox>
//         </div>
//         </>
//     )
// }


import { useState } from "react";
import DialogueBox from "./dialogueBox";
import MapComponent from "./mapComponent";
import './recordLand.css';

export default function RecordLand() {
    const [step, setStep] = useState(1); // Step tracker

    return (
        <div className="rl-main">
            {step === 1 && (
                <DialogueBox 
                    message="Start recording your land for monitoring" 
                    onContinue={() => setStep(2)} 
                />
            )}
            
            {step === 2 && (
                <DialogueBox 
                    message="Track your field by walking around it" 
                    onContinue={() => setStep(3)} 
                />
            )}

            {step === 3 && (
                <MapComponent onComplete={() => setStep(4)} />
            )}
        </div>
    );
}
