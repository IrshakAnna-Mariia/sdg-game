import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {useLocation} from 'react-router-dom';

import useStyles from "./Header.styles";

const {Header} = Layout;

function HeaderSite() {
    let {pathname} = useLocation();
    const classes = useStyles();

    return (
        <Header className={classes.header}>
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[pathname]}>
                <Menu.Item key="/"><Link to="/">Game</Link></Menu.Item>
                <Menu.Item key="/myAccount"><Link to="/myAccount">My profile</Link></Menu.Item>
            </Menu>
        </Header>
    );
}

export default HeaderSite;
