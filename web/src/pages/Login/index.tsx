import React from 'react';
import PageLogo from '../../components/PageLogo';
import { Link } from 'react-router-dom';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import './styles.scss';

function Login() {
    return (
        <div id="page-login">
            <PageLogo />
            <div className="login-container">
                <div className="form-container">
                    <form>
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
                    </form>

                    <footer>
                        <div>
                            <p>Não tem conta?</p>
                            <Link to="/register" className="register">Cadastre-se</Link>
                        </div>
                        <div>
                            <p>
                                É de graça
                                <img src={ purpleHeartIcon } alt="purpleHeart"/>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Login;