import React from 'react';
import SingleCharacter from './SingleCharacter';
const Characters = ({ characters, loading }) => {
  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <div className="row">
        {characters.map((character) => (
          <div className="col" key={character.id}>
            <SingleCharacter character={character} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Characters;
