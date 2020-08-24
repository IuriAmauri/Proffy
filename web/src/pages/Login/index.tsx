import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import './styles.scss';

function Login() {
    return (
        <div id="page-login">
            <div className="logo-container">
                <div className="logo">
                    <img src={ logoImg } alt="logo"/>
                    <h2>Sua plataforma de estudos online</h2>
                </div>
            </div>
            <div className="login-container">
                <fieldset>
                    <legend>Login</legend>
                    <input className="login-email" placeholder="E-mail"/>
                    <input className="login-password" type="password" placeholder="Senha"/>

                    <div className="login-options">
                        <div className="login-remember">
                            <input type="checkbox" />
                            Lembrar-me
                        </div>
                        Esqueci minha senha
                    </div>
                    <button type="submit">
                        Entrar
                    </button>
                </fieldset>

                <footer>
                    <div>
                        <p>Não tem conta?</p>
                        <a href="">Cadastre-se</a>
                    </div>
                    <div>
                        <p>
                            É de graça
                            <img src={ purpleHeartIcon }/>
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Login;