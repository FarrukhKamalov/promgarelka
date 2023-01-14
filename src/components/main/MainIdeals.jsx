import Ideals from "../UI/Ideals"
import {Link} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const MainIdeals = () => {

    const [data, setData] = useState([{id: 0, name: ''}])

    useEffect(() => {
        axios.get('https://gasecommerce.onrender.com/api/category')
        .then(res => res.data.data)
        .then(data => {
          setData(data) 
        })
    }, [])

    let items = data.map((item) => 
      <Link className="categoryes" to={"./category/?name=" + item._id}>
        <Ideals title={item.name} />
      </Link>
    )

    return (
        <div>
            <div className="contentIdeals py-6 flex justify-center items-center gap-4">
              <div className="shadow-lg bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-cyan-500 hover:to-blue-500 cursor-pointer w-60 py-4 px-8 rounded-md">
                <p className="text-xl text-center text-slate-200">Наши преимущества:</p>
              </div>

              <Ideals title="Качество товара" symbol="fa-solid fa-industry" />
              <Ideals title="Гарантия 1 год" symbol="fa-solid fa-calendar-check" />
              <Ideals title="Быстрая доставка" symbol="fa-solid fa-truck-fast" />

            </div>

            <div className="py-6 text-center">
              <p className="text-xl text-cyan-900">КАТЕГОРИИ МАГАЗИНА</p>
            </div>

            <div className="my-4">
              <div className="contentIdeals flex justify-center items-center gap-4 flex-wrap">
                {data[0].name === '' ? <div className="loader-div-ideals"><div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : items}
              </div>
            </div>
        </div>
    )
}

export default MainIdeals