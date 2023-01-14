import ProductCard from "../components/Product/ProductCard"
import { useEffect, useState } from "react"

import axios from "axios"
import { Helmet } from "react-helmet"

const Product = () => {

    const [data, setData] = useState([{ id: 100, name: '' }])

    useEffect(() => {
        axios.get('https://gasecommerce.onrender.com/api/products')
            .then(res => res.data.data)
            .then(data => {
                setData(data)
                console.log(data)
            })
    }, [])

    let items = data.map((item) =>
        <ProductCard id={item._id} key={item.id} title={item.name} price={item.price + " сум"} link={"/singleproduct?id=" + item._id} description={item.description}>
            <img className="cursor-pointer h-44 my-2" src={item.image} alt={item.name} />
        </ProductCard>
    )

    return (
        <div className="max-w-screen-lg m-auto my-10">
            {/* SEO */}
            <Helmet>
                <title>Все товары</title>
                <meta name="description" content="Онлайн магазин PromGarelka, представляет вам возможность, купить горелки и строительные материалы не выходя из дома" />
                <meta name="keywords" content="promgarelka, prom garelka, garelka, promgarelkauz, schetchik, schotchik, promgorelka, prom gorelka, gorelka, краска, kraska, счетчик" />
            </Helmet>
            <div className="category max-w-screen-lg m-auto flex justify-between items-center gap-4 py-2 px-6">
                <div className="flex justify-center items-center gap-3">
                    <i class="text-slate-700 text-2xl fa-solid fa-cart-shopping"></i>
                    <p className="text-2xl py-4">Все товары</p>
                </div>
                <div className="flex justify-center items-center gap-3">
                    <p className="text-lg">Количество товаров: {items.length}</p>
                    <i class="text-slate-700 text-2xl fa-solid fa-calculator"></i>
                </div>
            </div>
            <div className="flex justify-evenly items-center flex-wrap gap-4">
                {data[0].name === '' ? <div className="loader-div"><div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : items}
            </div>
        </div>
    )
}

export default Product