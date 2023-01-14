import { useState } from "react";
import { Link } from "react-router-dom";

const Option = (props) => {

    const items = props.data.map((item) => 
      <div className="" key={item.id}>
        <Link to={"/category/?name=" + item.link}><p className="shadow hover:shadow-xl truncate hover:bg-gray-200 cursor-pointer relative bg-gray-100 w-40 text-slate-800 py-2 px-4 text-xs">{item.title}</p></Link>
      </div>
    )
  
    const [isClicked, setIsClicked] = useState(false)

    return (
      <div className="relative z-40 rounded w-fit" onMouseLeave={() => {setIsClicked(false)}}>
        <div className="flex flex-col w-fit h-fit rounded-lg">
          <p className="flex justify-center items-center gap-1 rounded cursor-pointer relative z-50 w-fit h-fit flex" onClick={() => {setIsClicked(!isClicked)}}>{props.children}</p>
  
          <div className="rounded top-6 flex flex-col absolute">
            {isClicked ? items : null}
          </div>
        </div>
      </div>
    )
}

export default Option