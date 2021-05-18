import React, { memo, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import '../../Css/header.css';

const Header: React.FC = memo(() => {

    const [isUserLoggedOut, setIsUserLoggedOut] = useState<boolean>(false);

    const userName = sessionStorage.getItem('email')?.split('@')[0];

    const handleLogout = () => {
        sessionStorage.clear();
        setIsUserLoggedOut(true);
    }

    if (isUserLoggedOut) {
        return <Redirect to="/" />
    }

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
                                    <div className="header_username">Welcome, {userName}</div>
                                    <div><ExitToAppIcon className="header_logout_icon" onClick={() => handleLogout()} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Header;
