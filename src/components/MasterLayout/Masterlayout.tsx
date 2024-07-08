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
                <main className="store-bg text-black min-h-screen">{children}</main>
            {/* <Footer/> */}
        </div>
    );
};

export default MasterLayout;