import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Case from "../case/Case";
import { AuthContext } from "../../context/AuthContext";
import './searches.css'

export default function Searches({ search }) {
    
    const [SearchResult, setSearchResult] = useState([]);

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchCases = async () => {
            const res = await axios.get(`/case?defName=${search}&defAddr=${search}&crimeType=${search}&crimeLoc=${search}&officerName=${search}&status=${search}&judgeName=${search}&lawyerName=${search}`)

            const newData = res.data.filter((value, index, self) => 
                index === self.findIndex((t) => (
                    t._id === value._id
                ))
            )
            
            setSearchResult(
                newData.sort((c1, c2) => {
                    return new Date(c2.createdAt) - new Date(c1.createdAt);
                })
            )
        }

        fetchCases();
    }, [search]);

    var content;

    if (SearchResult.length === 0) {
        content = 
            <div className="searchText">
                No Results Match the search
            </div>
    }
    else {
        content =
            SearchResult.map((c, index) => (
                <Case key={c._id} currentCase={c} index={index + 1} designation={currentUser.designation} />
            ))
    }

    return (
        <div className="search">
            <div className="searchText">
                Search results here...
            </div>
            <div className="searchWrapper">
                {content}
            </div>
        </div>
    )
}
