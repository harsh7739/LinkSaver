import { Link } from "react-router-dom"

function Navbar(){
    return(
        <>
        <div style={{display:"flex", justifyContent:"space-around"}}>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Signup</Link>
        <Link to={"/url"}>URL BookMark</Link>
        </div>
        </>
    )
}
export default Navbar