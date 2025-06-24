import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <div className="flex h-16 bg-white w-full relative z-10 shadow-lg items-center">
            <img src="/icon.png" alt="icon" className="w-12 h-12 ms-6"/>
            <h1 className="ms-6 text-xl font-bold">Pepe's Sensoring App</h1>
            <div className="flex ms-auto">
                <Link to="/" className="me-6">Home</Link>
                <Link to="/report" className="me-6">Report</Link>
            </div>
        </div>
    )
}