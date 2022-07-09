import './case.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Case({ currentCase, index, designation }) {

    return (
        <div className="case">
            <div className="caseWrapper">
                <div className="caseItem">
                    <h4 className="heading">Case: </h4>
                    <span className='caseText'>{index}</span>
                </div>
                <div className="caseItem">
                    <h4 className="heading">Case ID Number(CIN): </h4>
                    <span className='caseText'>{currentCase._id}</span>
                </div>
                <div className='caseItem'>
                    <h4 className='heading'>Defendant name: </h4>
                    <span className='caseText'>{currentCase.defName}</span>
                </div>
                <div className="caseItem">
                    <h4 className="heading">Crime Type:</h4>
                    <span className='caseText'>{currentCase.crimeType}</span>
                </div>
                <div className="caseItem">
                    <h4 className="heading">Arresting Officer Name:</h4>
                    <span className='caseText'>{currentCase.officerName}</span>
                </div>
                <div className="caseItem">
                    <h4 className="heading">Judge Name:</h4>
                    <span className='caseText'>{currentCase.judgeName}</span>
                </div>
                <div className="caseItem">
                    <h4 className="heading">Lawyer Name:</h4>
                    <span className='caseText'>{currentCase.lawyerName}</span>
                </div>
                <div className="caseItem">
                    <h4 className="heading">Status:</h4>
                    <span className='caseText'>{currentCase.status}</span>
                </div>
                <Link to={`/updateCase/${currentCase._id}`} >
                    <button>Update Case</button>
                </Link>
            </div>
        </div>
    )
}
