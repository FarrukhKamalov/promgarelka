import MainAbout from "./main/MainAbout"
import MainIdeals from "./main/MainIdeals"
import MainNav from "./main/MainNav"
import SwipeImg from "./main/SwipeImg"
import MainProducts from "./main/MainProducts"
import {Link} from "react-router-dom"
import q from '../img/1.png'
// import w from '../img/2.png'
import e from '../img/3.png'
// import r from '../img/4.png'
// import t from '../img/5.png'
import { SwiperSlide } from "swiper/react"
import { useState } from "react"

const Main = () => {
    const [data] = useState([
    {_id: '63acbf4f00017c40aff5ec90', image: q, name: "Газовые горелки"},
    {_id: '63b005958eb19df7bec493fa', image: e, name: "Счетчики"},
//     {_id: '63b7278f9a12ac9101ce10f6', image: r, name: "Эмали"},
//     {_id: '63b88c5a6d3ef0902cdc71e5', image: w, name: "Краски"},
//     {_id: '63b8909b6d3ef0902cdc7219', image: t, name: "Сухие строительные смеси"}
    ])

    const items = data.map((item, i) => 
        <SwiperSlide key={i} className="swiper-div flex justify-center items-start gap-3">
        <img alt="garelka" className="order-1 swiper-img w-6/12 mb-10 mx-4" src={item.image} />
        <div className="swiper-block w-full ml-20 mt-20 flex flex-col flex-wrap items-start justify-center gap-2 swiper-texts">
            <p className="swiper-title w-full text-4xl">{item.name}</p>

            <Link className="hover:bg-cyan-900 transition-all mt-2 bg-cyan-800 py-2 px-4 text-slate-200 rounded" to={"/category?name=" + item._id}>Показать все</Link>
        </div>
        </SwiperSlide>
    )
    return (
        <div>
            <main>
                <div>
                    <div className="max-w-screen-lg m-auto divide-y">
                        <div className="pt-4 pb-4">
                            <MainNav/>
                        </div>

                        <div className="py-10">
                            <SwipeImg items={items} />
                        </div>

                        <MainIdeals/>

                        <div className="py-10">
                            <MainProducts/>
                        </div>

                        <div id="about" className="py-6">
                            <MainAbout/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Main
