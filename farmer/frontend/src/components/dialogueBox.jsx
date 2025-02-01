// import './dialogueBox.css'
// import vlt from '../assets/verna-logo-tree.png'

// export default function DialogueBox(){
//     return(
//         <>
//         <div className="db-main">
//             <div className="db-main-one">
//                 <img src={vlt} alt="" />
//             </div>
//             <div className="db-main-two">
//                 <p>Start recording your land for monitoring</p>
//                 <button className='db-con'>Continue</button>
//             </div>
//         </div>
//         </>
//     )
// }


import './dialogueBox.css';
import vlt from '../assets/verna-logo-tree.png';

export default function DialogueBox({ message, onContinue }) {
    return (
        <div className="db-main">
            <div className="db-main-one">
                <img src={vlt} alt="Logo" />
            </div>
            <div className="db-main-two">
                <p>{message}</p>
                <button className='db-con' onClick={onContinue}>Continue</button>
            </div>
        </div>
    );
}
