import { dogShape } from '../../propTypes/dogShape.js';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import Filter from '../Filter/Filter.jsx';
import Search from '../Search/Search.jsx';
import Dogs from '../Dogs/Dogs.jsx';
import PropTypes from 'prop-types';
import './Home.css';

function Home({ allDogs }) {
  const [breed, setBreed] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState(allDogs); 

  useEffect(() => {
    let filtered = allDogs;

    if (breed) {
      filtered = filtered.filter(dog => dog.breeds.toLowerCase().includes(breed.toLowerCase()));
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(dog => selectedSizes.includes(dog.size));
    }

    setFilteredDogs(filtered); 
  }, [breed, selectedSizes, allDogs]);

  return (
    <main className='home-container'>
      <Header allDogs={allDogs} setFilteredDogs={setFilteredDogs}/>
      <div className='content-container'>
        <Filter 
          selectedSizes={selectedSizes} 
          setSelectedSizes={setSelectedSizes}
        />
        <div className='right-container'>
          <Search 
            setBreed={setBreed}
          />
          {!filteredDogs.length ? <p>Sorry, there are no dogs that match! Try again.</p> : <Dogs filteredDogs={filteredDogs} /> }
        </div>
      </div>
    </main>
  );
}

export default Home;

Home.propTypes = {
  allDogs: PropTypes.arrayOf(dogShape).isRequired,
}

