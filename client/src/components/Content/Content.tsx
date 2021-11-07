import React from 'react';
import {Switch, Route} from "react-router-dom";
import routes from "../../navigation/routes";
import {Layout} from 'antd';
import PlayerAccount from "../../pages/PlayerAccount";
import Game from "../../pages/Game";


const {Content} = Layout;

function ContentSite() {
    return (
        <Content style={{minHeight: '82vh'}}>
            <Switch>
                {routes.map((route) => (
                    <Route path={route.path} key={route.path}>
                        {route.component}
                    </Route>
                ))}
            </Switch>
        </Content>
    );
}

export default ContentSite;