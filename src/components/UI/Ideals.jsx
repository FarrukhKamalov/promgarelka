const Ideals = ({title, symbol}) => {
    return (
        <div className="ideal hover:shadow-lg bg-gradient-to-r from-gray-300 to-gray-200 text-slate-800 text-xl transition-all shadow-xl transition-all w-60 py-4 px-2 rounded-md flex gap-4 justify-center items-center">
            {symbol ? <i className={symbol}></i> : ''}
            <p className="cursor-pointer text-lg px-1 truncate text-center text-slate-700">{title}</p>
        </div>
    )
}

export default Ideals