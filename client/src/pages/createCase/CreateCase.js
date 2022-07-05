import { useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import './createCase.css'
import { ConfirmationNumberTwoTone } from "@material-ui/icons";

export default function CreateCase({Case}) {

    const defName = useRef();
    const defAddr = useRef();
    const crimeType = useRef();
    const crimeLoc = useRef();
    const officerName = useRef();
    const judgeName = useRef();
    const lawyerName = useRef();

    let Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Case = {
            defName: defName.current.value,
            defAddr: defAddr.current.value,
            crimeType: crimeType.current.value,
            crimeLoc: crimeLoc.current.value,
            officerName: officerName.current.value,
            judgeName: judgeName.current.value,
            lawyerName: lawyerName.current.value
        }
        try {
            await axios.post("/case", Case);
            Navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='cCase'>
            <div className="cCaseWrapper">
                <div className="cCaseLeft">
                    <h3 className="cCaseLogo">JISS</h3>
                    <span className="cCaseDesc">
                        Creating Case
                    </span>
                </div>
                <form className="cCaseRight" onSubmit={handleSubmit}>
                    <div className="cCaseBox">
                        <input type="text" required ref={defName} className='cCaseInput' placeholder="Defendant's name" />
                        <input type="text" required ref={defAddr} className="cCaseInput" placeholder="Defendant's address" />
                        <input type="text" required ref={crimeType} className="cCaseInput" placeholder="Crime Type" />
                        <input type="text" required ref={crimeLoc} className="cCaseInput" placeholder="Crime Location" />
                        <input type="text" required ref={officerName} className="cCaseInput" placeholder="Officer's name" />
                        <input type="text" ref={judgeName} className="cCaseInput" placeholder="Judge's name" />
                        <input type="text" ref={lawyerName} className="cCaseInput" placeholder="Lawyer's name" />
                        <button className="cCaseButton" type='submit'>Create Case</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
