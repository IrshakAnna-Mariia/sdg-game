import React from 'react';
import { Layout, Breadcrumb  } from 'antd';
import PlayerAccount from "../../pages/PlayerAccount";

const { Content } = Layout;
function ContentSite() {

    return (
        <Content style={{minHeight: '82vh'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <PlayerAccount />
        </Content>
    );
}

export default ContentSite;