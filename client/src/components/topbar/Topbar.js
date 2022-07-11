import './topbar.css';
import { Search } from '@material-ui/icons';
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Topbar() {
    
    const { user } = useContext(AuthContext);

    const content =
        user.designation === "registrar"
            ?   <div className="topbarContainer">
                    <div className="topbarLeft">
                        <Link to="/" style={{textDecoration:"none"}}>
                            <span className="logo">JISS</span>
                        </Link>
                    </div>
                    <div className="topbarRight">
                        <div className='createOptions'>
                            <Link to="/createUser" style={{textDecoration:"none"}}>
                                <span className="logo">create user</span>
                            </Link>
                            <Link to="/createCase" style={{textDecoration:"none"}}>
                                <span className="logo">create case</span>
                            </Link>
                        </div>
                    </div>
                </div>
        :   <div className="topbarContainer">
                <div className="topbarLeft">
                    <Link to="/" style={{textDecoration:"none"}}>
                        <span className="logo">JISS</span>
                    </Link>
                </div>
                <div className="topbarRight">
                    <div className="searchbar">
                        <Search className="searchIcon" />
                        <input type="text" className="searchInput" placeholder="Search for cases" />
                    </div>
                </div>
            </div>

    return (
        <div>
            {content}
        </div>
    );
}

export default Topbar;
