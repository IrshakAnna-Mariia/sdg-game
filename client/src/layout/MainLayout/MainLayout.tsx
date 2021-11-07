import { Layout } from 'antd';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Content from "../../components/Content";

const MainLayout = () => {
    return (
        <Layout>
           <Header />
            <Content />
            <Footer />
        </Layout>
    )
}

export default MainLayout;