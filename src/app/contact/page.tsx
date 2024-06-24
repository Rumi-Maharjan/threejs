import React from "react";
import Contact from "@/components/contact";
import MasterLayout from "@/components/MasterLayout/Masterlayout";

const ContactPage: React.FC = () => {
    return (
        <MasterLayout>
            <Contact/>
        </MasterLayout>
    );
};

export default ContactPage;