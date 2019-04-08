import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
import Map from '../components/Map'
import Home from '../components/Home'

const AppRouter = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path="/Map"  component={Map} />
                <Route component={() => (<div>404</div>)}/>
            </Switch>
        </Suspense>
    </Router>
)

export default AppRouter;
