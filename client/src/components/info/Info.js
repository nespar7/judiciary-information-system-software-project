import './info.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Case from '../case/Case';
import { AuthContext } from '../../context/AuthContext';

export default function Info() {

    const [UpcomingCases, setUpcomingCases] = useState([]);
    
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        
        const fetchCases = async () => {
            // const currentUser = await axios.get(`/user?userId=${userId}`);
            // const User = currentUser.data;

            const res = currentUser.designation === 'registrar'
                ? await axios.get('/case?status=pending')
                : await axios.get(`/case?judgeName=${currentUser.username}&lawyerName=${currentUser.username}`);

            const newData = res.data.filter((value, index, self) => 
                index === self.findIndex((t) => (
                    t._id === value._id
                ))
            )
            
            setUpcomingCases(
                newData.sort((c1, c2) => {
                    return new Date(c2.createdAt) - new Date(c1.createdAt);
                })
            )
        }

        fetchCases();
    }, [currentUser]);

    return (
        <div className='info'>
            <div className="infoText">
                {`Welcome ${currentUser.username}`}
            </div>
            <div className="infoWrapper">
                {UpcomingCases.map((c, index) => (
                    <Case key={c._id} currentCase={c} index={index + 1} designation={currentUser.designation} />
                ))}
            </div>
        </div>
    )
}
