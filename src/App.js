import React from "react";
import "./App.css";
import Navigation from "./components/navigation";
import Photography from "./views/photography";
import Menu from "./components/menu";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import AboutMe from "./views/aboutMe";
import Projects from "./views/projects";
import GenerativeDesign from "./views/generativeDesign";
import { useTransition, animated } from "react-spring";

function App() {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { position: "absolute", opacity: 0 },
    enter: { position: "absolute", opacity: 1 },
    leave: { position: "absolute", opacity: 0 },
  });

  return (
    <div>
      <div className="d-block d-md-none">
        <Navigation />
      </div>
      <div className="pt-3">
        {/* A React Router wraps around the main app component */}
        {/*The Navbar and Menu components are within the router so that any components
          within them can have links to routes. However, they are outside the Switch */}

        {/*The Menu and the content both sit within a container and row div so that they
        can be arranged as columns */}
        <div className="container-fluid">
          <div className="row justify-content-end">
            <div className="position-fixed menu d-none d-md-block">
              <Menu />
            </div>

            {/*This is the div that contains the content*/}
            <div className="col-md-10 col-12">
              {transitions.map(({ item, props, key }) => (
                <animated.div key={key} style={props}>
                  <Switch location={item}>
                    <Route exact path="/">
                      <Photography />
                    </Route>
                    {/* Route to photography view */}
                    <Route path="/photography">
                      <Photography />
                    </Route>

                    {/* Route to AboutMe view */}
                    <Route path="/aboutme">
                      <AboutMe />
                    </Route>

                    {/* Route to Projects view */}
                    <Route path="/projects">
                      <Projects />
                    </Route>

                    {/* Route to Generative Design view */}
                    <Route path="/generative-design">
                      <GenerativeDesign />
                    </Route>
                  </Switch>
                </animated.div>
              ))}
            </div>
            {/* This is where the content ends */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
