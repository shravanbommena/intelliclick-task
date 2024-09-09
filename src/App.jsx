import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Weather from "./components/Weather";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/weather/:name" component={Weather} />
    </Switch>
  );
};

export default App;
