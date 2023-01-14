import {Link} from "react-router-dom"
import { useState } from "react";

const ProductCard = ({title, price, children, link, id}) => {

    const [data] = useState(JSON.parse(localStorage.getItem('cartItems')) || [{title: "Нету заказанных товаров", price: ''}])

    function setToLocal(params) {
        if (data[0].title === "Нету заказанных товаров") {
            var existingEntries = [];
            if(existingEntries == null) existingEntries = [];
            var entry = {
                "id": id,
                "title": params.title,
                "price": params.price
            };
            existingEntries.push(entry);
            localStorage.setItem("cartItems", [JSON.stringify(existingEntries)]);
        } else {
            var existingEntries2 = JSON.parse(localStorage.getItem("cartItems"));
            if(existingEntries2 == null) existingEntries2 = [];
            var entry2 = {
                "id": id,
                "title": params.title,
                "price": params.price
            };
            localStorage.setItem("item", JSON.stringify(entry2));
            existingEntries2.push(entry2);
            localStorage.setItem("cartItems", JSON.stringify(existingEntries2));
        }
    }

    return (
        <div className="my-4 w-60 card">
            <Link to={link}>
                <div className="px-5 shadow-lg hover:shadow-xl transition-all flex py-6 rounded-lg px-4 border items-center justify-start flex-col flex-wrap">
                    {children}
                    <p className="text-lg word-break truncate w-full text-center my-2">{title}</p>
                    <p className="text-center text-lg font-light">{price}</p>
                    <div onClick={() => setToLocal({title: title, price: price})} className="my-2 w-full flex justify-center items-center gap-2">
                        <p className="hover:bg-slate-900 transition-all w-full text-md bg-gradient-to-r from-gray-800 to-gray-900 text-slate-200 py-2 px-4 my-2 rounded-md cursor-pointer flex justify-center items-center gap-2"><i className="text-slate-200 shop-icon fa-solid fa-cart-shopping mx-1"></i>Купить</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard