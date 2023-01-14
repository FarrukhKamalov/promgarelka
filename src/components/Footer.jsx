import FooterIdeals from "./footer/FooterIdeals"
import {Link} from "react-router-dom"

const Footer = () => {
    return (
        <div>
            <footer className="bg-slate-900 py-6">
                <FooterIdeals/>
                <hr/>
                <div className="my-2 flex justify-between items-center p-4">
                <Link to="/" className="text-slate-200">@ PromGarelka.UZ</Link>
                <div className="flex justify-center items-end flex-col">
                    <p className="text-slate-200">+998 90 091 90 09</p>
                </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer