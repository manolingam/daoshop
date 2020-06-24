import React from "react";

import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/consult'>
                    <Form />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
