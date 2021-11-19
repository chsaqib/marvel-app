import React from 'react';
import { Link } from 'react-router-dom';
const SingleCharacter = ({ character }) => {
  return (
    <>
      <div className="card my-3  rounded" style={{ width: '18rem' }}>
        <Link to={`/SingleCharacterPage/${character.id}`}>
          <img
            className="card-img-top"
            src={`${character.thumbnail.path}/portrait_xlarge.jpg`}
            alt=""
          />
        </Link>
        <div className="card-body">
          <Link to={`/character/${character.id}`}>
            <h5 className="card-title">{character.name}</h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleCharacter;
