import {Routes,Route} from "react-router-dom"
import LoginPage from "../component/Login"
import SignupPage from "../component/SignUp"
import UrlPage from "../component/Url"
function MainRoute(){
    return(
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="/url" element={<UrlPage />} />
        </Routes>
    )
}
export default MainRoute