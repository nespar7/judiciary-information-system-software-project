import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Case from "../case/Case";
import { AuthContext } from "../../context/AuthContext";
import './searches.css'
import { Search } from "@material-ui/icons";

export default function Searches({ search }) {
    
    const [SearchResult, setSearchResult] = useState([]);
    const [Query, setQuery] = useState("");

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchCases = async () => {
            const res = await axios.get(`/case?defName=${Query}&defAddr=${Query}&crimeType=${Query}&crimeLoc=${Query}&officerName=${Query}&status=${Query}&judgeName=${Query}&lawyerName=${Query}`)

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
    }, [Query]);

    const onChangeQuery = (e) => {
        setQuery(e.target.value);
    }

    var content;

    if (SearchResult.length === 0 || Query === "") {
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
            <div className="searchbar">
                <Search className="searchIcon" />
                <input type="text" className="searchInput" placeholder="Search for cases" value={Query} onChange={onChangeQuery} />
            </div>
            <div className="searchWrapper">
                {content}
            </div>
        </div>
    )
}
