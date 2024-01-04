import React from "react";

import profilePic from "../../assets/profile.jpeg"

export default function AboutMe() {
    
    return (
        <div>
        <img src={profilePic} />
        <Box
            sx={style}
        >
            <Typography>
            Hello, my name is Kory Jackson. Welcome to my website. I am currently in the process of building it out as I continue to gain clients. As you can see it is a basic site. I appreciate you taking the time to visit. I am an individual web designer located in Tacoma, WA. I mainly work with small businesses and churches in the South Sound and surrounding areas, however, I am willing to take clients from all over. A few services I offer are website design, website maintenance, search engine optimization(SEO) and a few other services. If you are interested in knowing more, feel free to contact me. 
            </Typography>
        </Box>

        </div>
    )
}