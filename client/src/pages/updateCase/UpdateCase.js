import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import './updateCase.css'
import { TextField } from "@material-ui/core";

export default function UpdateCase() {

    const params = useParams();
    const caseId = params.caseId;

    const [currentCase, setcurrentCase] = useState({
        defName: '',
        defAddr: '',
        crimeType: '',
        crimeLoc: '',
        officerName: '',
        judgeName: '',
        lawyerName: ''
    });

    useEffect(() => {
        const fetchCase = async () => {
            const fetchedCase = await axios.get('/case/' + caseId);

            setcurrentCase(fetchedCase.data);
        }

        fetchCase();
    }, [caseId]);

    let Navigate = useNavigate();

    const onChangeDefName = (e) => {
        setcurrentCase({
            ...currentCase, defName: e.target.value
        })
    }

    const onChangeDefAddr = (e) => {
        setcurrentCase({
            ...currentCase, defAddr: e.target.value
        })
    }

    const onChangeCrimeType = (e) => {
        setcurrentCase({
            ...currentCase, crimeType: e.target.value
        })
    }

    const onChangeCrimeLoc = (e) => {
        setcurrentCase({
            ...currentCase, crimeLoc: e.target.value
        })
    }

    const onChangeOfficerName = (e) => {
        setcurrentCase({
            ...currentCase, officerName: e.target.value
        })
    }

    const onChangeJudgeName = (e) => {
        setcurrentCase({
            ...currentCase, judgeName: e.target.value
        })
    }

    const onChangeLawyerName = (e) => {
        setcurrentCase({
            ...currentCase, lawyerName: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Case = {
            defName: currentCase.defName,
            defAddr: currentCase.defAddr,
            crimeType: currentCase.crimeType,
            crimeLoc: currentCase.crimeLoc,
            officerName: currentCase.officerName,
            judgeName: currentCase.judgeName,
            lawyerName: currentCase.lawyerName
        }
        try {
            await axios.put("/case/"+caseId, Case);
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
                        <TextField name="defName" variant="outlined" label="Defendant's Name" required value={currentCase.defName} className='uCaseInput' placeholder="Defendant's name" onChange={onChangeDefName} />
                        <TextField name="defAddr" variant="outlined" label="Defendant's Address" required value={currentCase.defAddr} className="uCaseInput" placeholder="Defendant's address" onChange={onChangeDefAddr} />
                        <TextField name="CrimeType" variant="outlined" label="Crime Type" required value={currentCase.crimeType} className="uCaseInput" placeholder="Crime Type" onChange={onChangeCrimeType} />
                        <TextField name="CrimeLoc" variant="outlined" label="Crime Location" required value={currentCase.crimeLoc} className="uCaseInput" placeholder="Crime Location" onChange={onChangeCrimeLoc} />
                        <TextField name="officerName" variant="outlined" label="Officer's Name" required value={currentCase.officerName} className="uCaseInput" placeholder="Officer's name" onChange={onChangeOfficerName} />
                        <TextField name="judgeName" variant="outlined" label="Judge's Name" value={currentCase.judgeName} className="uCaseInput" placeholder="Judge's name" onChange={onChangeJudgeName} />
                        <TextField name="lawyerName" variant="outlined" label="Lawyer's Name" value={currentCase.lawyerName} className="uCaseInput" placeholder="Lawyer's name" onChange={onChangeLawyerName} />
                        <button className="uCaseButton" type='submit'>Update Case</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
