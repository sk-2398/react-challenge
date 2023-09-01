import React, { useState, useEffect } from 'react';
import FavouriteImages from './FavouriteImages';
import ImagesSection from './ImagesSection';
import {styled,Box,Typography, Button,Divider} from '@mui/material'




const Wrapper=styled(Box)(({theme})=>({
    width:'680px',
    marginLeft:'auto',
    marginRight:'auto',
    padding:'24px 54px',
    [theme.breakpoints.down('sm')]:{
        width:'100vw',
        padding:'14px 24px',
    }
}))



const Heading=styled(Typography)`
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align:left
`

const SearchBox=styled(Box)`
    width:100%;
    display:flex;
    height: 36px;
    border-radius: 4px;
    margin-top:45px;
`
const SearchInput=styled('input')({
    width:'90%',
    height:'100%',
    borderRadius: '4px',
    background: '#F7F7F7',
    border:'none',

})

const SearchBtn=styled(Button)`
height: 36px;
border-radius: 4px;
background: #0794E3;
color: #FFF;
text-align: center;
font-size: 14px;
font-weight: 700;
`

function Home() {
  const [breed, setBreed] = useState('');
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [breedNotFound, setBreedNotFound] = useState(false);

  // Load favorites from localStorage on initial load
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/10`);
      const data = await response.json();

      if (data.status === 'success') {
        setImages(data.message);
        setShowImages(true);
        setBreedNotFound(false);
      } else {
        setShowImages(false);
        setBreedNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const toggleFavorite = (image) => {
    if (favorites.includes(image)) {
      setFavorites(favorites.filter(fav => fav !== image));
    } else {
      setFavorites([...favorites, image]);
    }
  };

  return (
    <Wrapper>
    <header>
      <Heading className='heading'>Dog Breeds</Heading>
      <SearchBox className='searchinput'>
        <SearchInput
          type="text"
          placeholder="Search for a breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <SearchBtn onClick={fetchImages}>Search</SearchBtn>
      </SearchBox>
    </header>
    <main className="App-content" style={{marginTop:'35px'}}>
      {breedNotFound && <p>Breed not found</p>}
      {showImages && (
        <>
          <ImagesSection images={images} favorites={favorites} toggleFavorite={toggleFavorite}/>
        
        </>
      )}
      <Divider style={{marginTop:'40px',marginBottom:'40px'}}/>
        {favorites.length>0 &&<FavouriteImages favorites={favorites} toggleFavorite={toggleFavorite}/>}
    </main>
  </Wrapper>
  );
}

export default Home;
