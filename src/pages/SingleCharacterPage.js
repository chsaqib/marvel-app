import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

var md5 = require('md5');
const SingleCharacterPage = () => {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  let storiesList = [];
  let eventList = [];
  let seriesList = [];

  useEffect(() => {
    const fetchCharacter = async () => {
      let ts = Date.now();
      let key = md5(
        ts +
          process.env.REACT_APP_PRIVATE_KEY +
          process.env.REACT_APP_PUBLIC_KEY
      );
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/${id}?ts=${ts}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${key}`
      );

      if (response != null && response.data.status === 'Ok') {
        // console.log('cons');
        // console.log(response.data.data.results[0].thumbnail.path);
        console.log(response.data.data.results[0]);
        setCharacter(response.data.data.results[0]);
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        'Loading'
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div class="card my-3  rounded" style={{ width: '25rem' }}>
                <img
                  class="card-img-top"
                  src={`${character.thumbnail.path}/portrait_xlarge.jpg`}
                  alt=""
                />

                <div class="card-body">
                  <Link to={`/character/${character.id}`}>
                    <h5 class="card-title">{character.name}</h5>
                  </Link>
                  <p class="card-text">{character.description}</p>
                  {character.stories.items.map((item) =>
                    storiesList.push(
                      <li ClassName="list-group-item">{item.name}</li>
                    )
                  )}
                  {character.series.items.map((item) =>
                    seriesList.push(
                      <li ClassName="list-group-item">{item.name}</li>
                    )
                  )}
                  {character.events.items.map((item) =>
                    eventList.push(
                      <li ClassName="list-group-item">{item.name}</li>
                    )
                  )}
                  <h2>Stories</h2>
                  {storiesList}
                  <h2>Series</h2>
                  {seriesList}
                  <h2>events</h2>
                  {eventList}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCharacterPage;
