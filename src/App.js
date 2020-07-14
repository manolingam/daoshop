import React from "react";

import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import RaidGuildIcon from "./assets/raidguild__crosses.png";

import "./App.css";

const payload = [
    {
        type: "chips",
        options: [
            {
                text: "Case Studies",
                link: "https://cloud.google.com/dialogflow/case-studies",
            },
            {
                text: "Docs",
                link: "https://cloud.google.com/dialogflow/docs",
            },
            {
                text: "Case Studies",
                link: "https://cloud.google.com/dialogflow/case-studies",
            },
            {
                text: "Docs",
                link: "https://cloud.google.com/dialogflow/docs",
            },
        ],
    },
];

class App extends React.Component {
    componentDidMount() {
        const dfMessenger = document.querySelector("df-messenger");
        // dfMessenger.addEventListener("df-user-input-entered", function (event) {
        //     if (event.detail.input.includes("help")) {
        //         dfMessenger.renderCustomCard(payload);
        //     }
        // });
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                        <df-messenger
                            chat-icon={RaidGuildIcon}
                            intent='WELCOME'
                            // chat-title='QUERY BOT'
                            agent-id='ce67c101-d4c1-45da-bec8-0a89fbeab3d6'
                            language-code='en'
                        ></df-messenger>
                    </Route>
                    <Route exact path='/consult'>
                        <Form />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
