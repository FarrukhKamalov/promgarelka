import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

const SwipeImg = ({items}) => {

    return (
        <div>
            <Swiper
                pagination={true}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {items}
            </Swiper>
        </div>
    )
}

export default SwipeImg