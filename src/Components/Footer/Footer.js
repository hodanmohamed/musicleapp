import React, { useEffect, useState } from 'react';
import './Footer.css';

const ChangeRoles = () => {
    var myRoles = ['developed', 'designed', 'utilised', 'enjoyed'];

    const [roles, setRoles] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoles(role => (role === 3 ? 0 : role + 1));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span>{myRoles[roles]}</span>
    );
};

class Footer extends React.Component {
    render() {
        return (
            <div className="Footer">
                <h1><ChangeRoles /> by <a href='https://github.com/hodanmohamed' target="_blank" rel="noreferrer">hodan</a></h1>
            </div>
        );
    }
}

export default Footer;
