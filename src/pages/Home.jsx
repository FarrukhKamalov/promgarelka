import Main from "../components/Main"
import { Helmet } from "react-helmet"

const Home = () => {

    return (
        <div>
            <Helmet>
                <title>PROM GARELKA</title>
                <meta name="description" content="Онлайн магазин PromGarelka, представляет вам возможность, купить горелки и строительные материалы не выходя из дома" />
                <meta name="keywords" content="promgarelka, prom garelka, garelka, promgarelkauz, schetchik, schotchik, promgorelka, prom gorelka, gorelka, краска, kraska, счетчик" />
            </Helmet>
            <Main />
        </div>
    )
}

export default Home