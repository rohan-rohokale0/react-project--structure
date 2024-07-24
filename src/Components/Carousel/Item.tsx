import React from 'react'
import { Paper, Button, Box } from '@mui/material'

interface ItemProps {
    item: {
        id: number;
        imgPath: string;
    };
}

function Item({ item }: ItemProps) {
    return (
        <Box className="text-center" >
            <img src={item.imgPath} alt="" />
        </Box>
    )
}

export default Item