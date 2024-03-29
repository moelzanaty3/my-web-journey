import React, { useState, useEffect, FunctionComponent } from 'react';
import useDropdown from './useDropdown';
import pet, { ANIMALS, Animal } from '@frontendmasters/pet';
import Results from './Results';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import changeLocation from '../redux/actionCreators/changeLocation';
import changeTheme from '../redux/actionCreators/changeTheme';

const SearchParams: FunctionComponent<RouteComponentProps<{
  theme: string;
  location: string;
  setTheme: any;
  updateLocation: any;
}>> = ({ theme, location, setTheme, updateLocation }) => {
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breeds, setBreeds] = useState([] as string[]);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([] as Animal[]);

  async function requestPets() {
    // @ts-ignore
    const { animals } = await pet
      .animals({
        location,
        breed,
        type: animal,
      })
      .catch(console.error);

    setPets(animals || []);
  }
  useEffect(() => {
    setBreeds([]);
    setBreed('');
    pet.breeds(animal).then(({ breeds }) => {
      const sortedBreed = breeds;
      const breedStrings = sortedBreed.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  if (!pets.length) {
    requestPets();
  }

  return (
    <>
      <div className="columns">
        <form
          className="search-params"
          onSubmit={e => {
            e.preventDefault();
            requestPets();
          }}
        >
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="location">
                Location
              </label>
              <input
                className="input"
                type="text"
                placeholder="Location"
                id="location"
                value={location}
                onChange={e => updateLocation(e.target.value)}
              />
            </div>
          </div>
          <AnimalDropdown />
          <BreedDropdown />
          <div className="field">
            <label className="label" htmlFor="theme">
              Theme
            </label>
            <div className="control">
              <div className="select">
                <select
                  value={theme}
                  onChange={e => setTheme(e.target.value)}
                  onBlur={e => setTheme(e.target.value)}
                >
                  <option value="peru">Peru</option>
                  <option value="darkblue">Dark Blue</option>
                  <option value="chartreuse">Chartreuse</option>
                  <option value="mediumorchid">Medium Orchid</option>
                  <option value="orange">Orange</option>
                  <option value="darkyellow">Dark Yellow</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-danger"
                style={{ backgroundColor: theme }}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="columns">
        <Results pets={pets} />
      </div>
    </>
  );
};

const mapStateToProps = ({ theme, location }: any) => ({ theme, location });
const mapDispatchToProps = (dispatch: any) => ({
  updateLocation(location: string) {
    dispatch(changeLocation(location));
  },
  setTheme(theme: string) {
    dispatch(changeTheme(theme));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
