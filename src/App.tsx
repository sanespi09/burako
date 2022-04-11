import { h, Fragment } from "preact";
import Layout from "./components/Layout/Layout";
import { Route, Router } from 'wouter-preact';
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import Game from "./pages/Game";
import ContinueGame from "./pages/ContinueGame";

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
                <Route path="/continue-game">
                    <ContinueGame />
                </Route>
                <Route path="/game/:id">
                   {params => <Game id={params.id}/>}
                </Route>
            </Router>
        </Layout>
    )
}

export default App;
