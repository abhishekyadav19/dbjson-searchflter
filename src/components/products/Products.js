import React, { useEffect, useState } from 'react'
import './product.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Card, CardActions, CardContent, CardMedia, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import axios from 'axios';


export const Products = () => {
    const [data, setData] = useState([])
    const [query, setQuery] = useState("")
    const [error, setError] = useState('');

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const productss = await axios.get("http://localhost:3333/products")
            // console.log(productss.data,"data ");
            setData(productss.data)
        }
        catch (error) {

        }

    }

    return (
        <div className="main-wrapper">
            <div className="main-container">
                <div className="search-main-bx">
                    <div className="search-bar">

                        <OutlinedInput
                            className='search-input'
                            fullWidth
                            placeholder='Search Product'
                            id="input-with-icon-adornment"
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />

                    </div>
                </div>

                {/* listing code will start  */}
                <div className="listing-bx">
                    <Grid container spacing={4}>
                            {error}
                        {
                            data
                                .filter((val) => {
                                    if (query === "") {
                                        return val
                                    } else if (val.body.toLowerCase().includes(query)) {
                                        return val
                                    }else{
                                        setError('product not found')
                                    }
                                }).map((item, i) => {
                                    return (
                                        <Grid item xs={3} key={i}>
                                            <div className="product">
                                                <Card sx={{ maxWidth: 800 }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="260"
                                                        image={item.image}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {item.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.body}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions className='footer-card'>
                                                        <div className="left-content">
                                                            <Typography gutterBottom variant="h6" component="div">
                                                                {item.price}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {item.sales}
                                                            </Typography>
                                                        </div>
                                                        <div className="btn-right">
                                                            <IconButton aria-label="add to favorites" variant="outlined">
                                                                <AddShoppingCartIcon />
                                                            </IconButton>
                                                            <Button variant="outlined">Live Preview</Button>
                                                        </div>
                                                    </CardActions>
                                                </Card>
                                                <div className="wishlist">
                                                    <IconButton aria-label="add to favorites" variant="outlined" >
                                                        <PlaylistAddRoundedIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="add to favorites" variant="outlined">
                                                        <FavoriteRoundedIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </Grid>
                                    )
                                })
                        }


                    </Grid>


                </div>
            </div>
        </div>
    )
}
