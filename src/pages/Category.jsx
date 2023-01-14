import { useEffect, useState } from "react"
import ProductCard from "../components/Product/ProductCard"
import axios from "axios"
import { Helmet } from "react-helmet"

const Category = () => {
    const params = new URLSearchParams(document.location.search)

    const [nameCategory, setNameCategory] = useState([''])
    const [lengthCategory, setLenghtCategory] = useState([''])

    const [data, setData] = useState([{ id: 0, name: '' }])

    useEffect(() => {
        axios.get(`https://gasecommerce.onrender.com/api/products/category/` + params.get('name'))
            .then(res => res.data.data)
            .then(data => {
                setNameCategory(data[0].category[0])
                setLenghtCategory(data.length)
                setData(data)
            });
    }, [])

    let items = data.map((item, i) =>
        <ProductCard id={item._id} key={item.id} title={item.name} price={item.price + " сум"} link={"/singleproduct?id=" + item._id} description={item.description}>
            <img className="cursor-pointer h-44 my-2" src={item.image} alt={item.name} />
        </ProductCard>
    )

    return (
        <div className="max-w-screen-lg m-auto">
            {/* SEO */}
            <Helmet>
                <title>КАТЕГОРИИ МАГАЗИНА</title>
                <meta name="keywords" content="PromGarelka, КАТЕГОРИИ МАГАЗИНА" />
            </Helmet>

            <div className="category max-w-screen-lg m-auto flex justify-between items-center gap-4 py-2 px-6">
                <div className="flex justify-center items-center gap-3">
                    <i class="text-slate-700 text-2xl fa-solid fa-cart-shopping"></i>
                    <p className="text-2xl py-4">{nameCategory.name}</p>
                </div>
                <div className="flex justify-center items-center gap-3">
                    <p className="text-lg">Количество товаров: {lengthCategory}</p>
                    <i class="text-slate-700 text-2xl fa-solid fa-calculator"></i>
                </div>
            </div>
            <div className="flex justify-evenly items-center flex-wrap gap-4">
                {data[0].name === '' ? <div className="loader-div"><div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : items}
            </div>
        </div>
    )
}

export default Category