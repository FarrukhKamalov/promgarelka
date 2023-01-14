import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import Option from "../UI/Option"

import axios from 'axios'

const MainNav = () => {

    const [open, setOpen] = useState(false)

    const [category, setCategory] = useState([])

    useEffect(() => {
      axios.get('https://gasecommerce.onrender.com/api/category').then(res => {
        setCategory(res.data.data)
      })
    }, [])

    const items = category.map((item) => {
      return {
        id: new Date().getTime(),
        title: item.name,
        link: item._id
      }
    })

    return (
        <div>
            <nav>
                <ul className="main-nav-pc flex justify-around items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Option className="w-fit rounded-lg" data={items}><li><Link className="text-xs hover:border-b-2 hover:pb-1">КАТЕГОРИИ МАГАЗИНА</Link></li></Option>
                  </div>
                  <li><Link className="text-xs hover:border-b-2 hover:pb-1" to="/products">ТОВАРЫ</Link></li>
                  <li><Link className="text-xs hover:border-b-2 hover:pb-1" to="/about">ИНФОРМАЦИЯ</Link></li>
                </ul>
                {open ? <ul className="main-nav flex justify-start items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Option className="w-fit rounded-lg" data={items}><li><p className="text-xs hover:border-b-2 hover:pb-1">КАТЕГОРИИ МАГАЗИНА</p></li></Option>
                  </div>
                  <li><Link className="text-xs hover:border-b-2 hover:pb-1" to="/products">ТОВАРЫ</Link></li>
                  <li><Link className="text-xs hover:border-b-2 hover:pb-1" to="/about">ИНФОРМАЦИЯ</Link></li>
                </ul>: <i onClick={() => {setOpen(true)}} className="text-3xl hidden ex text-slate-800 p-4 fa-solid fa-bars"></i>}
                {open ? <i onClick={() => {setOpen(false)}} className="text-2xl hidden ex text-slate-800 p-2 fa-solid fa-xmark"></i> : ''}
            </nav>
        </div>
    )
}

export default MainNav