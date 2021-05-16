import { Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Resturant from "./components/resturant";
import ResturantsList from "./components/resturants-list";
import AddReview from "./components/add-review";

function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/resturants">
            Resturant Reviews
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={"/resturants"}>
                  Resturants
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <a
                    onClick={logout}
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    Logout {user.name}
                  </a>
                ) : (
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Switch>
          <Route exact path={['/', '/resturants']} component={ResturantsList} />
          {/* <Route exact path='redirect' render={() => {
              handleRedirect();
              return <ResturantsList />;
            }} /> */}
          <Route exact path='/resturants/:id/review' render={(props) => (
            <AddReview {...props} user={user} />
          )} />
          <Route path="/resturant/:id" render={(props) => (
            <Resturant {...props} user={user} />
          )} />

          <Route path="/login" render={(props) => (
            <Login {...props} login={login} />
          )} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
