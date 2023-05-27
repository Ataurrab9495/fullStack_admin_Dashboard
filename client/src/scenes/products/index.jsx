import React, { useState } from 'react'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import Header from 'components/Header'
import { useGetProductsQuery } from 'state/api'


const Product = ({ _id, name, description, price, category, supply, productStat, rating }) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "1rem"
            }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography variant="body2">{description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{color: theme.palette.neutral[300]}}>
                <CardContent>
                    <Typography variant="subtitle2">id: {_id}</Typography>
                    <Typography variant="subtitle2">Supply Left: {supply}</Typography>
                    <Typography variant="subtitle2">Sales This year: {productStat.yearlySalesTotal}</Typography>
                    <Typography variant="subtitle2">Units Sold This year: {productStat.yearlyTotalSoldUnits}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const Products = () => {
    const { data, isLoading } = useGetProductsQuery();
    
    const isNonMobile = useMediaQuery("(min-width: 1000px)")


    return (
        <Box margin="1rem">
            <Header title="PRODUCTS" subtitle="See your list of Products" />
            {data || !isLoading ? (
                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4,minMax(0,1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{
                        "&>div": {
                            gridColumn: isNonMobile ? undefined : "span 4"      /* span 4 means it will take whole row in media query */
                        }
                    }}
                >
                    {data.map(({_id,name,description,price,rating,category,supply,productStat})=>(
                        <Product
                            key={_id}
                            _id={_id}
                            name={name}
                            description={description}
                            price={price}
                            rating={rating}
                            category={category}
                            supply={supply}
                            productStat={productStat}
                        />
                    ))}
                </Box>
            ) : (
                <></>
            )
            }
        </Box>
    )
}

export default Products