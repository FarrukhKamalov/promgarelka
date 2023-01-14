import { useEffect, useState } from "react"
import axios from "axios"
import Modal from "../components/UI/Modal"
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

const SingleProduct = () => {

    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)

    const params = new URLSearchParams(document.location.search)

    const [messageObj, setMessageObj] = useState('')

    const { register, handleSubmit } = useForm();

    const [data, setData] = useState([{ id: 100, name: '' }])

    const formatter = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'Sum',
    });

    useEffect(() => {
        axios.get('https://gasecommerce.onrender.com/api/products')
            .then(res => res.data.data)
            .then(data => {
                setData(data)
            })
    }, [])

    const onSubmit = async (data) => {
        const TOKEN = '5850571509:AAHrvOpuiDqyoRh4gZHD2LcGi9BJGf5rgvI'
        const CHAT_ID = '-1001822213701'
        const URL_API = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage'

        let message = `<b>Заявка с сайта</b>\n`
        message += `<b>Имя отправителя: ${data.name}</b>\n`
        message += `<b>Номер отправителя: ${data.tel}</b>\n`
        message += `Адрес товара: <a href="${window.location.href}">ССЫЛКА</a>\n`
        message += `<b>Имя товара: ${messageObj.name}</b>\n`
        message += `<b>Цена товара: ${messageObj.price}</b>`

        await axios.post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        }).then(() => {
            setModal(true)
            setTimeout(() => {
                setModal(false)
            }, 2000);
            setOpen(false)
        })
    };

    let items = data.map((item) => {
        return item._id === params.get('id') ? <div onLoad={() => setMessageObj(item)} className="sinlge-top max-w-screen-xl m-auto my-10 flex justify-between items-start flex-col">
            {/* SEO */}
            <Helmet>
                <title>{item.name}</title>
                <meta name="description" content={item.description} />
                <meta name="keywords" content="promgarelka, prom garelka, garelka, promgarelkauz, schetchik, schotchik, promgorelka, prom gorelka, gorelka, краска, kraska, счетчик" />
            </Helmet>
            {modal ? <p className="modal-new text-xl text-slate-800 w-full text-center bg-gray-100 py-2 px-6 rounded-lg my-8 z-50">Наши администраторы свяжутся с вами в ближайшее время</p> : ''}
            {open ? <Modal isOpen={setOpen}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 px-4 py-10 w-72">
                    <div className="flex flex-col gap-2">
                        <input {...register("name")} name="name" className="py-2 px-4 border rounded-md" type="text" placeholder="Введите имя..." />
                        <input {...register("tel")} name="tel" className="py-2 px-4 border rounded-md" type="tel" placeholder="Введите номер телефона" />
                    </div>
                    <input className="bg-cyan-900 py-2 px-4 text-slate-200 cursor-pointer rounded-md" type="submit" value="Заказать" />
                </form>
            </Modal> : ''}
            <div className="single-block flex justify-between items-center gap-5 w-full">
                <img className="hover:scale-105 transition-all duration-300 sinlge-img w-5/12 h-auto rounded-xl border p-4 ml-40" alt="product" src={item.image} />
                <div className="flex-1 mb-32 single-text-block flex center h-fit items-start gap-1 flex-col">
                    <div className="justify-center items-start gap-1 flex-col">
                        <p className="text-3xl mt-5 font-light py-2">{item.name}</p>
                        <p className="text-lg">Цена: <br />{formatter.format(item.price)}</p>
                        <p className="text-lg">Статус: {item.status ? "можно купить" : "Нету в наличии"}</p>
                    </div>
                    <div className="w-full">
                        <p onClick={() => setOpen(true)} className="single-btn mt-10 hover:bg-slate-900 transition-all w-9/12 text-md bg-slate-800 text-slate-200 py-2 px-4 my-2 rounded-md cursor-pointer flex justify-center items-center gap-2"><i className="text-slate-200 shop-icon fa-solid fa-cart-shopping mx-1"></i>Заказать</p>
                    </div>
                </div>
            </div>
            <div className="desc py-6">
                <p className="px-20 text-xl py-4">Информация:</p>
                <p className="over-info px-20">{item.description}</p>
            </div>
        </div> : ''
    }
    )

    return (
        <div className="flex justify-evenly items-center flex-wrap gap-4">
            {data[0].name === '' ? <div className="loader-div"><div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : items}
        </div>
    )
}

export default SingleProduct