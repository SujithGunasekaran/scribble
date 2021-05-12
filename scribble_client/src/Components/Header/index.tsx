import React from 'react';
import { Link } from 'react-router-dom';
import '../../Css/header.css';

const Header: React.FC = () => {
    return (
        <div>
            <div className="header_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header_main_container">
                                <div className="header_logo anchor_tag">
                                    <Link to="/" href='/'>Scribble</Link>
                                </div>
                                <div className="header_auth_container">
                                    <div className="header_login anchor_tag">
                                        <Link to="/login" href="/login">Login</Link>
                                    </div>
                                    <div className="header_signup anchor_tag">
                                        <Link to="/signup" href="/signup">Signup</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
