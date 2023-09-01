import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {styled,Box,Typography, Button} from '@mui/material'


const ImagesWrapper=styled(Box)(({theme})=>({
    display:'grid',
    gridTemplateColumns:'repeat(3,160px)',
    rowGap:'38px',
    justifyContent:'space-between',
    [theme.breakpoints.down('sm')]:{
        gridTemplateColumns:'repeat(1,1fr)',
    }
}))


const ImageBox=styled(Box)(({theme})=>({
    position:'relative',
    width:'160px',
    height:'160px',
    borderRadius:'4px',
    overflow:'hidden',
    [theme.breakpoints.down('sm')]:{
        width:'100%',
        height:'100%',
    }
}))


const Image=styled('img')({
    width:'100%',
    height:'100%',
})
const HeartBox=styled(Box)`
    position: absolute;
    /* left: 0; */
    /* top: 0; */
    right: 0;
    z-index: 1000;
    bottom: 0;
    margin-right:2px,
    margin-bottom:2px;
`
const Heading=styled(Typography)`
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align:left
`
function FavouriteImages({favorites,toggleFavorite}) {
  return (
    <>
              <Heading><FavoriteIcon style={{ fill:"white"}}/> Favorites</Heading>
       <ImagesWrapper className="favorites-container">
              {favorites.map((favorite, index) => (
                <ImageBox key={index} className="favorite-card">
                  <Image src={favorite} alt={`Favorite ${index}`} />
                  <HeartBox
                    className="heart-icon favorited"
                    onClick={() => toggleFavorite(favorite)}
                  >
                    {favorites.includes(favorite) ?<FavoriteIcon style={{ fill:"red"}}/>:<FavoriteIcon style={{ fill:"white"}}/>}
                  </HeartBox>
                </ImageBox>
              ))}
            </ImagesWrapper>
    </>
  )
}

export default FavouriteImages
