import axios from 'axios'
import { useState, useEffect } from 'react';
import logo from '../img/logo.png'
import Modal from "../components/UI/Modal"
import { useForm } from "react-hook-form";

const Adminpanel = () => {

    const { register, handleSubmit } = useForm();
    const [id, setId] = useState('')
    const [cp, setCp] = useState(false)
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])

    const [postOrPut, setPostOrPut] = useState(true)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        axios.get("https://gasecommerce.onrender.com/api/category").then((res) => {
            setCategory(res.data.data)
        })
        axios.get("https://gasecommerce.onrender.com/api/products").then((res) => {
            setProducts(res.data.data)
        })
    }, []);

    function deleteCategory(id) {
        axios.delete("https://gasecommerce.onrender.com/api/category/" + id).then(() => {
            axios.get("https://gasecommerce.onrender.com/api/category").then((res) => {
                setCategory(res.data.data)
            })
        })
    }
    function deleteProduct(id) {
        axios.delete("https://gasecommerce.onrender.com/api/products/" + id).then(() => {
            axios.get("https://gasecommerce.onrender.com/api/products").then((res) => {
                setProducts(res.data.data)
            })
        })
    }

    const categoryData = category.map((item) => 
        <tr className='hover:shadow-md shadow' key={item._id}>
            <td className='p-2'>{item.name}</td>
            <td onClick={() => deleteCategory(item._id)} className='py-1 text-center'><i className="cursor-pointer text-sm fa-solid fa-xmark"></i></td>
        </tr>
    )

    const productsData = products.map((item) => {
        return <tr className='hover:shadow-md admin-product shadow' key={item._id}>
            <td className='p-0.5'>
                <img className='admin-product-logo h-10 w-10' src={item.image} alt="product" />
            </td>
            <td className='text-xs p-0.5 truncate max-w-xs-admina'>{item.name}</td>
            <td className='text-xs p-0.5 truncate max-w-xs-admina'>{item.description}</td>
            <td className='text-xs p-0.5'>{item.status ? "ДА" : "НЕТ"}</td>
            <td className='text-xs p-0.5'>{item.price} сум</td>
            <td className='text-xs p-0.5'>{item.category}</td>
            <td onClick={() => putProduct(item._id)} className='text-xs p-0.5 text-center'><i className="cursor-pointer text-sm fa-solid fa-edit"></i></td>
            <td onClick={() => deleteProduct(item._id)} className='text-xs p-0.5 text-center'><i className="cursor-pointer text-sm fa-solid fa-xmark"></i></td>
        </tr>
    })

    const onSubmitCategory = async (data) => {
        const formData = new FormData();
    
        formData.append('name', data.name)
    
        axios.post("https://gasecommerce.onrender.com/api/category", formData).then(() => {
            axios.get("https://gasecommerce.onrender.com/api/category").then((res) => {
                setCategory(res.data.data)
                setOpen(false)
            })
        })
    };

    const putProduct = (iden) => {
        setId(iden)
        setPostOrPut(false)
        open ? setOpen(true) : setOpen(true)
    }

    const onSubmitProducts = async (data) => {
        const formData = new FormData();
        
        console.log(data.status);

        formData.append('file', data.file[0])
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('status', data.status ? true : false)
        formData.append('category', data.category)

        await axios.post("https://gasecommerce.onrender.com/api/products", formData).then(() => {
            console.log(formData);
            axios.get("https://gasecommerce.onrender.com/api/products").then((res) => {
                console.log(formData);
                setProducts(res.data.data)
                setOpen(false)
            })
        })
    };

    const onPutProducts = async (data) => {
        const formData = new FormData();
    
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('status', data.status ? true : false)
        formData.append('category', data.category)
    
        await axios.put("https://gasecommerce.onrender.com/api/products/" + id, formData).then(() => {
            axios.get("https://gasecommerce.onrender.com/api/products").then((res) => {
                setProducts(res.data.data)
                setOpen(false)
            })
        })
    };

    return (  
        <div className='admin-div flex justify-between items-start h-screen'>
            {open ? <Modal isOpen={setOpen}>
                        {cp ? <form onSubmit={handleSubmit(postOrPut ? onSubmitProducts : onPutProducts)} className='flex flex-col items-center justify-center gap-3'>
                            {postOrPut ? <div>
                                <label className='hover:bg-gray-200 rounded-md border text-sm py-2 px-4' htmlFor="file">Выберите файл</label>
                                <input {...register("file")} id='file' className=' hidden text-xs' type="file" name='file' />
                            </div> : ''}
                            <input {...register("name")} placeholder='Введите имя...' className='py-2 px-4 rounded-md border text-xs' type="text" name='name' />
                            <input {...register("price")} placeholder='Введите цену...' className='py-2 px-4 rounded-md border text-xs' type="number" name='price' />
                            <textarea placeholder='Введите описание...' {...register("description")} className='text-xs p-0.5' name="description" id="description" cols="30" rows="5"></textarea>
                            {!postOrPut ? <div className='flex justify-center items-center gap-3'>
                                <label className='text-sm' htmlFor="status">Статус</label>
                                <input {...register("status")} id='status' className='text-xs' type="checkbox" name='status' />
                            </div> : ''}
                            <td>
                                <select {...register("category")} className='outline-none border py-2 px-4 text-xs' name="category" id="category">
                                    {
                                        category.map((item) => 
                                            <option value={item._id}>{item.name}</option>
                                        )
                                    }
                                </select>
                            </td>

                            <input className='py-2 px-4 bg-cyan-900 text-slate-200 rounded-md cursor-pointer text-sm hover:bg-cyan-800' type="submit" value="Добавить" />
                        </form>
                        : 
                        <form className='flex justify-center items-center gap-3 flex-col' onSubmit={handleSubmit(onSubmitCategory)}>
                            <input className='focus:bg-gray-100 py-2 px-4 rounded-md border text-sm' {...register("name")} type="text" name='name' placeholder='Введите заголовок...' />
                            <input className='text-sm bg-cyan-900 text-slate-200 rounded-md py-2 px-4 cursor-pointer hover:bg-cyan-800' type="submit" value="Добавить" />
                        </form>}
                    </Modal> : ''}
            <div className='logoWithTools h-full bg-gray-300 flex-none py-4 px-10 flex flex-col gap-4'>
                <a href="./">
                    <img className='admin-logo h-32' src={logo} alt="logo" />
                </a>
                <div className='flex flex-col gap-2'>
                    <p onClick={() => setCp(false)} className={cp ? "admin-nav cursor-pointer py-2 px-8 rounded-lg" : "shadow-lg bg-gray-400 cursor-pointer py-2 px-8 rounded-lg"}>Категории</p>
                    <p onClick={() => setCp(true)} className={!cp ? "admin-nav cursor cursor-pointer py-2 px-8 rounded-lg" : "shadow-lg bg-gray-400 cursor-pointer py-2 px-8 rounded-lg"}>Товары</p>
                </div>
            </div>
            <div className='flex-auto h-full px-8 over'>
                <div className='admin-nav-two py-10 px-6 flex justify-between items-center'>
                    <p className='admin-title text-3xl text-slate-800'>{cp ? "Товары" : "Категории"}</p>
                    <button onClick={() => {
                            setPostOrPut(true)
                            setOpen(true)
                        }} className='shadow-md text-sm bg-cyan-900 py-2 px-4 rounded-lg text-slate-200 shadow-md '>Добавить {cp ? "Товар" : "Категории"}</button>
                </div>
                <table className='w-full table-auto'>
                    {cp ? <tr className='noned-phone'>
                        <td className='py-2 text-sm'>Картинка</td>
                        <td className='py-2 text-sm'>Имя</td>
                        <td className='py-2 text-sm'>Описание</td>
                        <td className='py-2 text-sm'>Статус</td>
                        <td className='py-2 text-sm'>Цена</td>
                        <td className='py-2 text-sm'>Категория</td>
                        <td className='py-2 text-sm text-center'>Изменить</td>
                        <td className='py-2 text-sm text-center'>Удалить</td>
                    </tr>
                    :
                    <tr className=''>
                        <td className='py-2'>Имя</td>
                        <td className='py-2 text-center'>Удалить</td>
                    </tr>}
                    {cp ? productsData : categoryData}
                </table>
            </div>
        </div>
    );
}
 
export default Adminpanel;