import { Box, styled } from '@mui/material'
import React from 'react'
import headerImage from '../images/R.jpg';
import SearchInputEl from './SearchinputEl';

const Header = () => {

    const StyleHeader = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        minHeight: "70vh", // Make the header full height of the viewport
        backgroundImage: `url(${headerImage})`,
        backgroundSize: "100%", // Reduce the size of the picture
        backgroundPosition: "right center", // Position the right side
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
        backgroundColor: theme.palette.secondary.main

        
    }));

    return (
        <>
            <StyleHeader >

            
            <main className="main-content">
                    <div className="text-container">
                        <div className="title">
                            <h1>
                                INDUSTRIAL TRAINING <br /> ALLOCATION <br />
                                SYSTEM
                            </h1>
                        </div>
                        <p className="subtitle">
                            FACULTY OF ENGINEERING,<br />
                            UNIVERSITY OF RUHUNA,<br />
                            HAPUGALA,<br />
                            GALLE,<br />
                            SRI LANKA
                        </p>
                    </div>
                </main>

                <SearchInputEl/>



            </StyleHeader>
        </>
    )
}

export default Header