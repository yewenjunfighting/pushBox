import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
import FireWork from '../components/FireWork'
import Map from '../components/Map'

const AppRouter = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path='/' component={FireWork} />
                <Route exact path="/Map"  component={Map} />
                <Route component={() => (<div>404</div>)}/>
            </Switch>
        </Suspense>
    </Router>
)

export default AppRouter;
