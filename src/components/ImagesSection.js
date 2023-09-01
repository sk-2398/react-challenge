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
    borderRadius:'4px',

})
const HeartBox=styled(Box)`
    position: absolute;
    /* left: 0; */
    /* top: 0; */
    right: 0;
    z-index: 1000;
    bottom: 0;
    margin-right:2px;
    margin-bottom:2px;
`



function ImagesSection({images,favorites,toggleFavorite}) {
  return (
    <>
       <ImagesWrapper className="image-container">
              {images.map((image, index) => (
                <ImageBox key={index} className="image-card">
                  <Image src={image} alt={`Dog ${index}`} />
                  <HeartBox
                    className={`heart-icon ${favorites.includes(image) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(image)}
                  >
                    
                        
                    
                    {favorites.includes(image) ?<FavoriteIcon style={{ fill:"red"}}/>:<FavoriteIcon style={{ fill:"white"}}/>}
                  </HeartBox>
                </ImageBox>
              ))}
        </ImagesWrapper>
    </>
  )
}

export default ImagesSection
