import React, { FormEvent, useState } from 'react';
import PageLogo from '../../components/PageLogo';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import './styles.scss';

function Login() {
    const history = useHistory();

    const [enableLogin, setEnableLogin] = useState(Boolean);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        await api.post('users/login', {
            userName,
            password
        }).then((result) => {
            localStorage.setItem('token', result.data.token);
            history.push('/');
        }).catch((err) => {
            alert('Erro ao realizar login ' + err)
        });
    }

    function setLoginData(type: string, value: string) {
        if (type === 'user')
            setUserName(value);
        else 
            setPassword(value);

        setEnableLogin(userName !== '' && password !== '');
    }

    return (
        <div id="page-login">
            <PageLogo />
            <div className="login-container">
                <div className="form-container">
                    <form onSubmit={ handleLogin }>
                        <fieldset>
                            <legend>Login</legend>
                            <input className="login-user" placeholder="E-mail/Usuário" onChange={ (e) => { setLoginData("user", e.target.value) }} />
                            <input className="login-password" type="password" placeholder="Senha" onChange={ (e) => { setLoginData("password", e.target.value) }} />

                            <div className="login-options">
                                <div className="login-remember">
                                    <input type="checkbox" />
                                    Lembrar-me
                                </div>
                                Esqueci minha senha
                            </div>
                            <button type="submit" disabled={ !enableLogin }>
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