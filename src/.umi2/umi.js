import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import history from "./core/history";
import {getRoutes} from './core/routes'


let routes = getRoutes();

ReactDOM.render(
    <Router history={history}>
        {renderRoutes(routes)}
    </Router>, document.getElementById('root')
)

function renderRoutes(routes) {
    return routes.map(({path, exact, component: RouteComponent, routes: childrenRoutes=[]},index) => {
        return (
            <Route 
                key={index}
                path={path}
                exact={exact}
                render={
                    routeProps => (
                        <RouteComponent {...routeProps}>
                            <Switch>
                                {renderRoutes(childrenRoutes)}
                            </Switch>
                        </RouteComponent>
                    )
                }
            />
        )
    })
}

/**
 * 渲染Route有三种方式 component  render  children
 */