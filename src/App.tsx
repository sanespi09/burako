import { h, Fragment } from "preact";
import Layout from "./components/Layout/Layout";
import { Route, Router } from 'wouter-preact';
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import Game from "./pages/Game";

const App = () => {
    return (
        <Layout>
            <Router>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/create-game">
                    <CreateGame />
                </Route>
                <Route path="/game/:id">
                    <Game />
                </Route>
            </Router>
        </Layout>
    )
}

export default App;
