import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Contact from './pages/contact';
import Admin from './pages/admin';
import About from './pages/about';
import Cart from './pages/cart';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Profile from './pages/profile';
import Blog from './pages/blog';
import SinglePostBlog from './pages/singlePostBlog';
import BlogAdm from './pages/blogAdmin';
import Mandacaru from './pages/create/mandacaru';
import Baiao from './pages/create/baiao';
import Buriti from './pages/create/buriti';
import Facheiro from './pages/create/facheiro';
import Carcara from './pages/create/carcara';
import Sertao from './pages/create/sertao';
import Mescla from './pages/create/mescla';
import ClientList from './pages/admin/clientList';
import CreatePost from './pages/admin/createPost';
import CreateColor from './pages/admin/createColor';
import ManageVoucher from './pages/admin/manageVoucher';
// import CreateTypes from './pages/admin/createTypes'
import Requests from './pages/admin/requests';
import RegisterProducts from './pages/admin/registerProduct';
import ManageProducts from './pages/admin/manageProduct';
import Products from './pages/products';
import Product from './pages/product';
import UserRequests from './pages/userRequests';
import ForgotPassword from './pages/forgotPassword';
import Grammage from './pages/grammage';
import DataChange from './pages/dataChange';
import Privacy from './pages/privacy';
import Terms from './pages/terms';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact />
            <Route component={Contact} path='/contato' />
            <Route component={Admin} path='/admin' />
            <Route component={About} path='/sobre' />
            <Route component={Cart} path='/carrinho' />
            <Route component={Login} path='/login' />
            <Route component={SignUp} path='/cadastro' />
            <Route component={Profile} path='/Perfil' />
            <Route component={Blog} path='/nossosClientes' />
            <Route component={SinglePostBlog} path='/post/:idPost' />
            <Route component={BlogAdm} path='/blogadmin' />
            <Route component={Mandacaru} path='/mandacaru' />
            <Route component={Baiao} path='/baiao' />
            <Route component={Facheiro} path='/facheiro' />
            <Route component={Carcara} path='/carcara' />
            <Route component={Buriti} path='/buriti' />
            <Route component={Sertao} path='/sertao' />
            <Route component={Mescla} path='/mescla' />
            <Route component={ClientList} path='/listaDeClientes' />
            <Route component={CreatePost} path='/criarPost' />
            <Route component={CreateColor} path='/gerenciarCores' />
            <Route component={Requests} path='/pedidos' />
            <Route component={UserRequests} path='/meusPedidos' />
            <Route component={ForgotPassword} path='/recuperarSenha' />
            <Route component={Grammage} path='/gramaturas' />
            <Route component={DataChange} path='/alterarDados' />
            <Route component={Privacy} path='/politicaDePrivacidade' />
            <Route component={Terms} path='/termosDeUso' />
            <Route component={RegisterProducts} path='/cadastrarProdutos' />
            <Route component={ManageProducts} path='/gerenciarProdutos' />
            <Route component={ManageVoucher} path='/gerenciarCupons' />
            <Route component={Products} path='/produtos' />
            <Route component={Product} path='/produto/:idProduct' />
        </BrowserRouter>
    );
};

export default Routes;
