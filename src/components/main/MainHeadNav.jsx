import logo from "../../img/logo.png"
import {Link} from "react-router-dom"

const MainHeadNav = () => {
    return (
        <div>
            <div className="main-nav-all flex justify-between item-center">
              <div className="logo">
                <Link to="./">
                  <img className="logo-img h-32 py-3" src={logo} alt="" />
                </Link>
              </div>

              <div className="header-items flex justify-center items-center gap-20">
                <div>
                  <a className="h-fit contact flex justify-center items-center gap-3" href="tel:+998-90-091-90-09">
                    <p className="text-xl"><i class="text-xl text-slate-800 fa-solid fa-phone-volume"></i></p>
                    <div className="flex flex-col justify-center">
                      <a className="text-rose-800 font-semibold" href="tel:998-90-091-90-09">+998 90 091 90 09</a>
                      <Link className="hover:underline text-xs" to="./">Хотите, мы вам позвоним?</Link>
                    </div>
                  </a>
                </div>
              </div>
            </div>
        </div>
    )
}

export default MainHeadNav