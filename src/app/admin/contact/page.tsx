import React from "react";
import Header from "@/components/Layout/header";
import ArtistContact from "@/components/Layout/artist-contact";


const ContactPage: React.FC = () => {
    return (
        <Header>
            <ArtistContact />
        </Header>
    );
};

export default ContactPage;