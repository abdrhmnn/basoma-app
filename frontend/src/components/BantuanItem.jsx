import React from "react";

// npm packages
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material";

const BantuanItem = ({ img1 }) => {
    return(
        <div>
            <Card
                sx={{
                    maxWidth: 280,
                    boxShadow: "none"
                }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={img1}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
            </Card>
        </div>
    )
}

export default BantuanItem