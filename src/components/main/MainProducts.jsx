import ProductCard from "../Product/ProductCard"
import {Link} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const MainProducts = () => {

    const [data, setData] = useState([{id: 0, name: ''}])

    useEffect(() => {
        axios.get('https://gasecommerce.onrender.com/api/products')
        .then(res => res.data.data)
        .then(data => {
            setData(data) 
            data.length = 8
        })
    }, [])

    let items = data.map((item, i) => 
        <ProductCard id={item._id} key={item.id} title={item.name} price={item.price + " сум"} link={"./singleproduct?id=" + item._id} description={item.description}>
            <img className="cursor-pointer h-44 my-2" src={item.image} alt={item.name} />
        </ProductCard>
    )

    return (
        <div className="flex justify-center items-center flex-col">
            <div>
                <div className="flex justify-evenly items-center flex-wrap gap-4">
                    {data[0].name === '' ? <div className="loader-div-ideals"><div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : items}
                </div>
            </div>
            <Link className="my-4 bg-cyan-900 rounded-lg py-2 px-4 text-slate-200" to="/products">Показать все</Link>
        </div>
    )
}

export default MainProducts