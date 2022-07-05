import Info from "../../components/info/Info"
import Searches from "../../components/searches/Searches"
import Topbar from "../../components/topbar/Topbar"
import './home.css';

export default function Home() {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Info />
                <Searches search="josu" />
            </div>
        </>
    )
}
