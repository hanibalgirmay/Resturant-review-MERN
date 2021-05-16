import React, { useState, useEffect } from "react";
import ResturantDataService from '../services/resturant.api';
import { Link } from 'react-router-dom';

const ResturantsList = props => {
  const [resturants, setResturants] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchZip, setSearchZip] = useState('');
  const [searchCuisine, setSearchCuisine] = useState('');
  const [cuisines, setCuisines] = useState(['All Cuisines']);

  useEffect(() => {
    retriveResturants();
    retriveCuisines();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  }
  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  }

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  }

  const retriveResturants = () => {
    ResturantDataService.getAll()
      .then((res) => {
        console.log(res.data);
        setResturants(res.data.resturants);
      }).catch(err => console.error(err));
  }

  const retriveCuisines = () => {
    ResturantDataService.getCuisines()
      .then(res => {
        console.log('cusines__' + res.data)
        setCuisines(['All Cuisines'].concat(res.data));
      }).catch(err => console.error(err));
  }

  const refershList = () => {
    retriveResturants();
  }

  const find = (query, by) => {
    ResturantDataService.find(query, by)
      .then((res) => {
        setResturants(res.data.resturants);
      }).catch(err => console.error(err))
  }

  const findByName = () => {
    find(searchName, "name")
  }

  const findByZip = () => {
    find(searchZip, 'zipcode')
  }

  const findByCusine = () => {
    if (searchCuisine == 'All Cuisines') {
      refershList();
    } else {
      find(searchCuisine, 'cuisine')
    }
  }
  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input type="text" placeholder="Search by name..." value={searchName} onChange={onChangeSearchName} className="form-control" />

          <div className="input-group-append">
            <button onClick={findByName} type="button" className="btn btn-outline-secondary">
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4">
          <input
            type="number"
            placeholder="Search by Zipcode..."
            value={searchZip}
            onChange={onChangeSearchZip}
            className="form-control" />

          <div className="input-group-append">
            <button onClick={findByZip} type="button" className="btn btn-outline-secondary">
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map(cuisine => {
              return (
                <option value={cuisine}>{cuisine.substr(0, 20)}</option>
              )
            })}
          </select>
          <div className="input-group-append">
            <button type="button" onClick={findByCusine} className="btn btn-outline-secondary">
              Search
            </button>
          </div>
        </div>

      </div>

      <div className="row">
        {resturants.map((resturant) => {
          const address = `${resturant.address.building} ${resturant.address.street}, ${resturant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{resturant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong> {resturant.cuisine} <br />
                    <strong>Address: </strong> {address} <br />

                  </p>
                  <div className="row">
                    <Link to={`/resturant/` + resturant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Reviews
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View on Map</a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ResturantsList;
