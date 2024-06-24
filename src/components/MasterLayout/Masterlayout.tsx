import React, {ReactNode} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
    children: ReactNode;
}

const MasterLayout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            <Navbar/>
                <main>{children}</main>
            <Footer/>
        </div>
    );
};

export default MasterLayout;