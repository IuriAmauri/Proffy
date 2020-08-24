import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import './styles.scss';

function PageLogo() {
    return (
        <div className="logo-container">
                <div className="logo">
                    <img src={ logoImg } alt="logo"/>
                    <h2>Sua plataforma de estudos online</h2>
                </div>
            </div>
    );
}

export default PageLogo;