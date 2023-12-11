/*Trabalho final PPI - Sala de Bate-papo Web
Requisitos:
1. Cadastro de usuários: Deve ser possível cadastrar os usuários da sala de bate-papo, incluindo nome, e-mail e senha
2.Login e logout: Deve ser possível fazer login e logout da sala de bate-papo.
3.Envio e listagem de mensagens: Deve ser possível enviar mensagens para outros usuáriosda sala de bate-papo, além de poder visualizá-las.

*/

//Exibir a data do ultimo acesso do usuário (cookies)
//Autenticar o usuário para controlar o acesso aos recursos da aplicação (sessão)


//sintaxe moderna não funciona no vercell
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';


//exemplo de importação de biblioteca usando type:'commonjs'
//sintaxe antiga 
//express = require('express')

const porta = 3000;
const host = '0.0.0.0';

const app = express();
//ativando a funcionalidade de manipular cookies
app.use(cookieParser());

app.enable('trust proxy');

//adicionar uma nova capacidade para essa aplicação: memorizar com que o servidor está falando
//durante o uso do sistema, a aplicação saberá, dentro de uma aplicação válida, com quem ela se comunica.
app.use(session({
    secret:"M1nH4Ch4v3S3cR3t4",
    resave: true, //atualiza a sessão mesmo que não há alteração a cada requisição
    saveUninitialized: true,
    cookie:{
        //tempo de vida da sessão
         httpOnly: false,
         secure: false,
         sameSite: false,
        maxAge: 1000 * 60 * 30 //30 minutos
    }

}))

//ativar a extensão que manipula requisições HTTP
//OPÇÃO FALSE ativa a extensão querystring
//a opção true ativa a extensão qs(manipula objetos)( lista, animados)
app.use(express.urlencoded({extended: true}));

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
//app.use(express.static('./paginas'));
app.use(express.static(path.join(process.cwd(),'paginas')));

app.use(express.static(path.join(process.cwd(),'public')));
//pseudo middleware
function autenticar(requisicao, resposta, next){
    if(requisicao.session.usuarioAutenticado){
        next();
    }
    else{
        resposta.redirect("/login.html");
    }
}

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});

app.get('/', autenticar, (requisicao, resposta) => {

    const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
    const data = new Date();
    resposta.cookie("DataUltimoAcesso", data.toLocaleDateString() + " " + data.toLocaleTimeString(), {
            maxAge: 1000 * 60 * 60 * 24 * 30, //cookie ficará válido por 30 dias
            httpOnly: true
    });
    resposta.end(`<!DOCTYPE html>
    <html lang="pt-br"><!-- Basic -->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">   
       
        <!-- Mobile Metas -->
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
     
        <!-- Site Metas -->
        <title>Merry | Início</title>  
        <meta name="keywords" content="">
        <meta name="description" content="">
        <meta name="author" content="">
    
        <!-- Site Icons -->
        <link rel="shortcut icon" href="#" type="image/x-icon" />
        <link rel="apple-touch-icon" href="#" />
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <!-- Pogo Slider CSS -->
        <link rel="stylesheet" href="/css/pogo-slider.min.css">
        <!-- Site CSS -->
        <link rel="stylesheet" href="/css/style.css">    
        <!-- Responsive CSS -->
        <link rel="stylesheet" href="/css/responsive.css">
        <!-- Custom CSS -->
        <link rel="stylesheet" href="/css/custom.css">
    
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    
    </head>
    <body id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">
    
        <!-- LOADER -->
        <div id="preloader">
            <div class="loader">
                <div class="box"></div>
                <div class="box"></div>
            </div>
        </div><!-- end loader -->
        <!-- END LOADER -->
        
        <!-- Start header -->
        <header class="top-header">
            <nav class="navbar header-nav navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand"><img src="images/logo.png" alt="image"></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-wd" aria-controls="navbar-wd" aria-expanded="false" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbar-wd">
                        <ul class="navbar-nav">
                            <li><a class="nav-link active" href="/">Início</a></li>
                            <li><a class="nav-link" href="/formulario.html">Cadastro de Usuário</a></li>
                            <li><a class="nav-link" href="/batepapo">Bate-papo</a></li>
                            <li><a class="nav-link" href="/login.html">Sair</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <!-- End header -->
        
        <!-- Start Banner -->
        <div class="ulockd-home-slider">
            <div class="container-fluid">
                <div class="row">
                    <div class="pogoSlider" id="js-main-slider">
                        <div class="pogoSlider-slide" style="background-image:url(images/slider-01.jpg);"></div>
                        <div class="pogoSlider-slide" style="background-image:url(images/slider-02.jpg);"></div>
                    </div><!-- .pogoSlider -->
                </div>
            </div>
        </div>
        <!-- End Banner -->
        
        <!-- Start Footer -->
        <footer class="footer-box">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <p class="footer-company-name">Dayane Tiziani Boa Ventura &copy; 2023 | Seu último acesso: ${dataUltimoAcesso}</p>
                    </div>
                </div>
            </div>
        </footer>
        <!-- End Footer -->
        
        <!-- ALL JS FILES -->
        <script src="/js/jquery.min.js"></script>
        <script src="/js/popper.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <!-- ALL PLUGINS -->
        <script src="/js/jquery.magnific-popup.min.js"></script>
        <script src="/js/jquery.pogo-slider.min.js"></script> 
        <script src="/js/slider-index.js"></script>
        <script src="/js/smoothscroll.js"></script>
        <script src="/js/form-validator.min.js"></script>
        <script src="/js/contact-form-script.js"></script>
        <script src="/js/isotope.min.js"></script>	
        <script src="/js/images-loded.min.js"></script>	
        <script src="/js/custom.js"></script>
    </body>
    </html>
`);
})
//criar o endpoint login que irá processar o login da aplicação
app.post('/login', (requisicao, resposta) =>{
    const usuario =  requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario && senha && (usuario ===  'dayane') && (senha === '1301')){
        requisicao.session.usuarioAutenticado = true;
        resposta.redirect('/');
    }
    else{
        resposta.end(`
        <!DOCTYPE html>
    <html lang="pt-br"><!-- Basic -->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">   
       
        <!-- Mobile Metas -->
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="keywords" content="">
        <meta name="description" content="">
        <meta name="author" content="">
         
        <title>Merry | Login</title>  
        <script src="index.js" type="text/javascript"></script>
        
    
        <!-- Site Icons -->
        <link rel="shortcut icon" href="#" type="image/x-icon" />
        <link rel="apple-touch-icon" href="#" />
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <!-- Pogo Slider CSS -->
        <link rel="stylesheet" href="css/pogo-slider.min.css">
        <!-- Site CSS -->
        <link rel="stylesheet" href="css/style.css">    
        <!-- Responsive CSS -->
        <link rel="stylesheet" href="css/responsive.css">
        <!-- Custom CSS -->
        <link rel="stylesheet" href="css/custom.css">
    
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    
    </head>
    <body id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">
    
        <!-- login -->
        <div id="wish" class="about-box" style="padding-bottom: 0;">
            <div class="about-a1">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="title-box">
                                <h2>Merry</h2>
                                <p>Explore a magia do encontro online! Bem-vindo ao nosso bate-papo natalino, onde conexões encantadoras acontecem. Desperte a alegria, compartilhe sorrisos e celebre o Natal conosco. Entre para viver experiências únicas e construir memórias inesquecíveis. Feliz Natal!</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="row align-items-center about-main-info">
                                
                                <div class="col-lg-6 col-md-6 col-sm-12 text_align_center">
                                    <div class="full">
                                        <img class="img-responsive" src="images/w1.png" alt="#" />
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-12">
                                    <h2><img style="width: 60px;" src="images/head_s.png" alt="#" /> Bate-papo Natalino</h2>
           
                                    <div class="contact-block">
                                        <form action='/login' method='post' id="loginForm" novalidate="true">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group has-error">
                                                        <input type="text" placeholder="Usuário" id="usuario" name="usuario" class="form-control" required="" data-error="Por favor, informe seu usuário!">
                                                        <div class="help-block with-errors"><ul class="list-unstyled"><li>Por favor, informe seu usuário!</li></ul></div>
                                                    </div> 
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group has-error">
                                                        <input type="password" placeholder="Senha" id="senha" class="form-control" name="senha" required="" data-error="Por favor, informe sua senha!">
                                                        <div class="help-block with-errors"><ul class="list-unstyled"><li>Por favor, informe sua senha</li></ul></div>
                                                    </div> 
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="submit-button text-center">
                                                        <button class="btn btn-common disabled" id="submit" type="submit" style="pointer-events: all; cursor: pointer;">Entrar</button>
                                                        <div id="msgSubmit" class="h3 text-center hidden"></div> 
                                                        <div class="clearfix"></div> 
                                                    </div>
                                                </div>
                                            </div>            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div> 
        </div>
        <!-- fim cadastro de usuários  -->
        
        <!-- Start Footer -->
        <footer class="footer-box">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <p class="footer-company-name">Dayane Tiziani Boa Ventura &copy; 2023 | Projeto final PPI | Bate-papo </p>
                    </div>
                </div>
            </div>
        </footer>
        <!-- End Footer -->
        
        <!-- ALL JS FILES -->
        <script src="js/jquery.min.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <!-- ALL PLUGINS -->
        <script src="js/jquery.magnific-popup.min.js"></script>
        <script src="js/jquery.pogo-slider.min.js"></script> 
        <script src="js/slider-index.js"></script>
        <script src="js/smoothscroll.js"></script>
        <script src="js/form-validator.min.js"></script>
        <script src="js/contact-form-script.js"></script>
        <script src="js/isotope.min.js"></script>	
        <script src="js/images-loded.min.js"></script>	
        <script src="js/custom.js"></script>
    </body>
    </html>
        `);
    }
});

//rota para processar cadastros de usuários 
app.post('/lista', autenticar, processaCadastroUsuario);

var listaCadastroUsuario = [];

function processaCadastroUsuario(requisicao, resposta){
    //extrair os dados do corpo da requisição, além de validar os dados
    const dados = requisicao.body;
    let conteudoResposta= '';
    //é necessário álidar os dados enviados
    //a validação dos dados é de responsabilidade da aplicação servidora
    if(!(dados.nome && dados.nascimento && dados.apelido )){
           //estão faltando dados do usuário
           //resposta.status(400).send('Faltam dados do usuário');
           conteudoResposta=`
           <!DOCTYPE html>
           <html lang="pt-br"><!-- Basic -->
           <head>
               <meta charset="utf-8">
               <meta http-equiv="X-UA-Compatible" content="IE=edge">   
              
               <!-- Mobile Metas -->
               <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <meta name="keywords" content="">
               <meta name="description" content="">
               <meta name="author" content="">
               
               <script src="index.js" type="text/javascript"></script>
               <title>Merry | Cadastro de usuários</title>  
               
           
               <!-- Site Icons -->
               <link rel="shortcut icon" href="#" type="image/x-icon" />
               <link rel="apple-touch-icon" href="#" />
           
               <!-- Bootstrap CSS -->
               <link rel="stylesheet" href="css/bootstrap.min.css">
               <!-- Pogo Slider CSS -->
               <link rel="stylesheet" href="css/pogo-slider.min.css">
               <!-- Site CSS -->
               <link rel="stylesheet" href="css/style.css">    
               <!-- Responsive CSS -->
               <link rel="stylesheet" href="css/responsive.css">
               <!-- Custom CSS -->
               <link rel="stylesheet" href="css/custom.css">
           
               <!--[if lt IE 9]>
                 <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
                 <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
               <![endif]-->
           
            </head>
            <body id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">
           
                <!-- LOADER -->
                <div id="preloader">
                    <div class="loader">
                    <div class="box"></div>
                    <div class="box"></div>
                    </div>
                </div><!-- end loader -->
                <!-- END LOADER -->

                <!-- Start header -->
                <header class="top-header">
                <nav class="navbar header-nav navbar-expand-lg fixed-top">
                    <div class="container">
                        <a class="navbar-brand"><img src="images/logo.png" alt="image"></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-wd" aria-controls="navbar-wd" aria-expanded="false" aria-label="Toggle navigation">
                           <span></span>
                           <span></span>
                           <span></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbar-wd">
                            <ul class="navbar-nav">
                               <li><a class="nav-link" href="/">Início</a></li>
                               <li><a class="nav-link active" href="/formulario.html">Cadastro de Usuário</a></li>
                               <li><a class="nav-link" href="/batepapo">Bate-papo</a></li>
                               <li><a class="nav-link" href="/login.html">Sair</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                </header>
                <!-- End header -->

                <!-- cadastro de usuários -->
                <div id="wish" class="about-box" style="padding-bottom: 0;">
                    <div class="about-a1" style="background:#f7f7f7;margin-top: 50px;padding-top: 75px;padding-bottom: 50px;">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="row align-items-center about-main-info">
                                        <div class="col-lg-6 col-md-6 col-sm-12">
                                            <h2><img style="width: 50px;" src="images/head_s.png" alt="#" /> Cadastro de Usuário</h2>
                                            <div class="contact-block">
                                                <form action='/lista' method='post' id="cadastroForm" novalidate="true">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group has-error">
                                                                <input type="text" placeholder="nome" id="nome" name="nome" class="form-control" required="" data-error="Por favor, informe sua senha!"> 
                                                            `;
            if(!dados.nome){//só vai existir essa msg quando o nome não for informado
                conteudoResposta+=`
                                                            
                                                                <div class="help-block with-errors"><ul class="list-unstyled"><li>Please enter your number</li></ul></div> 
                                                            </div>
                                                        </div>`;
            }
            conteudoResposta+=`
                                                        <div class="col-md-5">
                                                            <div class="form-group has-error">
                                                                <input type="date" id="nascimento" class="form-control" name="nascimento" required="" data-error="Please enter your number">
                                                        `;
            if(!dados.nascimento){
                conteudoResposta+=`
                                                                <div class="help-block with-errors"><ul class="list-unstyled"><li>Please enter your number</li></ul></div>
                                                            </div> 
                                                        </div>`;
            }
            conteudoResposta+=`
                                                        <div class="col-md-7">
                                                            <div class="form-group has-error">
                                                                <input type="text" placeholder="apelido" id="apelido" class="form-control" name="apelido" required="" data-error="Please enter your number">
                                                                `;
            if(!dados.apelido){
                conteudoResposta+=`
                                                                <div class="help-block with-errors"><ul class="list-unstyled"><li>Please enter your number</li></ul></div> 
                                                            </div> 
                                                        </div>`;
            }
            conteudoResposta+=`
                                                        <div class="col-md-12">
                                                            <div class="submit-button text-center">
                                                                <button class="btn btn-common disabled" id="submit" type="submit" style="pointer-events: all; cursor: pointer;">Cadastrar</button>
                                                                <div id="msgSubmit" class="h3 text-center hidden"></div> 
                                                                <div class="clearfix"></div> 
                                                            </div>
                                                        </div>
                                                    </div>            
                                                </form>
                                            </div> 
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-12 text_align_center">
                                            <div class="full">
                                                <img class="img-responsive" src="images/w2.png" alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- fim cadastro de usuários  -->

                <!-- Start Footer -->
                <footer class="footer-box">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <p class="footer-company-name">Dayane Tiziani Boa Ventura &copy; 2023 | Projeto final PPI | Bate-papo </p>
                            </div>
                        </div>
                    </div>
                </footer>
                <!-- End Footer -->

                <!-- ALL JS FILES -->
                <script src="js/jquery.min.js"></script>
                <script src="js/popper.min.js"></script>
                <script src="js/bootstrap.min.js"></script>
                <!-- ALL PLUGINS -->
                <script src="js/jquery.magnific-popup.min.js"></script>
                <script src="js/jquery.pogo-slider.min.js"></script> 
                <script src="js/slider-index.js"></script>
                <script src="js/smoothscroll.js"></script>
                <script src="js/form-validator.min.js"></script>
                <script src="js/contact-form-script.js"></script>
                <script src="js/isotope.min.js"></script>	
                <script src="js/images-loded.min.js"></script>	
                <script src="js/custom.js"></script>
            </body>
            </html>
            `;          
    }
    else{
        const usuario = {
                        nome: dados.nome,
                        nascimento: dados.nascimento,
                        apelido: dados.apelido
                        }
        //adiciona um novo usuário na lista de usuários já cadastrados
        listaCadastroUsuario.push(usuario);
        
        //retorna a lista de cartas dos usuários/crianças
        conteudoResposta = `    <!DOCTYPE html>
        <html lang="pt-br"><!-- Basic -->
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">   
           
            <!-- Mobile Metas -->
            <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
         
            <!-- Site Metas -->
            <title>Merry | Lista usuários</title>  
            <meta name="keywords" content="">
            <meta name="description" content="">
            <meta name="author" content="">
        
            <!-- Site Icons -->
            <link rel="shortcut icon" href="#" type="image/x-icon" />
            <link rel="apple-touch-icon" href="#" />
        
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="css/bootstrap.min.css">
            <!-- Pogo Slider CSS -->
            <link rel="stylesheet" href="css/pogo-slider.min.css">
            <!-- Site CSS -->
            <link rel="stylesheet" href="css/style.css">    
            <!-- Responsive CSS -->
            <link rel="stylesheet" href="css/responsive.css">
            <!-- Custom CSS -->
            <link rel="stylesheet" href="css/custom.css">
        
            <!--[if lt IE 9]>
              <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
              <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
            <![endif]-->
        
        </head>
        <body id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">
    
        <!-- LOADER -->
        <div id="preloader">
            <div class="loader">
                <div class="box"></div>
                <div class="box"></div>
            </div>
        </div><!-- end loader -->
        <!-- END LOADER -->
        <!-- Start header -->
        <header class="top-header">
            <nav class="navbar header-nav navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand"><img src="images/logo.png" alt="image"></a>
                    
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-wd" aria-controls="navbar-wd" aria-expanded="false" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbar-wd">
                        <ul class="navbar-nav">
                        <li><a class="nav-link" href="/">Início</a></li>
                        <li><a class="nav-link" href="/formulario.html">Cadastro de Usuário</a></li>
						<li><a class="nav-link" href="/batepapo">Bate-papo</a></li>
                        <li><a class="nav-link" href="/login.html">Sair</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <!-- End header -->
    
        <!-- lista cadastros -->
        
        <div id="donate" class="gallery-box" style="background: #f7f7f7;"> 
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                    <br><br>
                        <div class="title-box">
                            <h2>Usuários cadastrados</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    
                    <table class="table table-sm">
                        <thead>
                          <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Data nascimento</th>
                            <th scope="col">Nickname ou apelido</th>
                          </tr>
                        </thead>
                        <tbody>`;

        for (const usuario of listaCadastroUsuario){
            conteudoResposta += `
                            <tr>
                                <td>${usuario.nome}</td>
                                <td>${usuario.nascimento}</td>
                                <td>${usuario.apelido} </td> 
                            </tr>
            `;
        }

            conteudoResposta+= `
                        </tbody>      
                        </table>
                            <a type="button" class="nav-link" href="/">Página Inicial</a>
                            <a class="nav-link" href="/formulario.html" role="button">Continuar cadastrando</a>
                    </div>
                </div>
            </div>
            <!-- fim lista cadastros -->

            <!-- Start Footer -->
            <footer class="footer-box">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <p class="footer-company-name">Dayane Tiziani Boa Ventura &copy; 2023 | Projeto final PPI | Bate-papo </p>
                        </div>
                    </div>
                </div>
            </footer>
            <!-- End Footer -->

            <!-- ALL JS FILES -->
            <script src="js/jquery.min.js"></script>
            <script src="js/popper.min.js"></script>
            <script src="js/bootstrap.min.js"></script>
            <!-- ALL PLUGINS -->
            <script src="js/jquery.magnific-popup.min.js"></script>
            <script src="js/jquery.pogo-slider.min.js"></script> 
            <script src="js/slider-index.js"></script>
            <script src="js/smoothscroll.js"></script>
            <script src="js/form-validator.min.js"></script>
            <script src="js/contact-form-script.js"></script>
            <script src="js/isotope.min.js"></script>	
            <script src="js/images-loded.min.js"></script>	
            <script src="js/custom.js"></script>
            </body>
            </html>
            `;
    }//fim do if/else validação
    resposta.end(conteudoResposta);
}

//rota para processar o batepapo
app.get('/batepapo', autenticar, exibeBatepapo);

var listaMensagens = [];

function exibeBatepapo(requisicao, resposta){

    let conteudo = `
    <!DOCTYPE html>
<html lang="pt-br"><!-- Basic -->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">   
   
    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
 
     <!-- Site Metas -->
    <title>Merry | Chat</title>  
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Site Icons -->
    <link rel="shortcut icon" href="#" type="image/x-icon" />
    <link rel="apple-touch-icon" href="#" />

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- Pogo Slider CSS -->
    <link rel="stylesheet" href="css/pogo-slider.min.css">
    <!-- Site CSS -->
    <link rel="stylesheet" href="css/style.css">    
    <!-- Responsive CSS -->
    <link rel="stylesheet" href="css/responsive.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<body id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">

<!-- LOADER -->
<div id="preloader">
    <div class="loader">
        <div class="box"></div>
        <div class="box"></div>
    </div>
</div><!-- end loader -->
<!-- END LOADER -->
<!-- Start header -->
<header class="top-header">
    <nav class="navbar header-nav navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand"><img src="images/logo.png" alt="image"></a>
            
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-wd" aria-controls="navbar-wd" aria-expanded="false" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbar-wd">
                <ul class="navbar-nav">
                    <li><a class="nav-link " href="/">Início</a></li>
                    <li><a class="nav-link " href="/formulario.html">Cadastro de Usuário</a></li>
                    <li><a class="nav-link active" href="/batepapo">Bate-papo</a></li>
                    <li><a class="nav-link" href="/login.html">Sair</a></li>
                </ul>
            </div>
        </div>
    </nav>
</header>
<!-- End header -->

<!-- lista cadastros -->
<br><br>
<div id="donate" class="gallery-box" style="background: #f7f7f7;"> 
    <div class="container">
        <div class="row">
            <div class="col-lg-10">
                <div class="title-box">
                    <h2 style="font-size: 70px;">Chat</h2>
                </div>
            </div>
        </div>
        <div class="row">
             <!-- lista cadastros -->
        
            <div class="container">
                <div style="overflow-y:scroll; height:300px; overflow-x: hidden;">`;
                    

    for (const dado of listaMensagens)  {             
    conteudo += `<div class="row">
                        <div class="col-lg-3 col-sm-3 col-xs-12">
                            <div class="left-contact">
                                <div class="media cont-line">
                                    <div class="media-left icon-b">
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                    <div class="media-body dit-right">
                                        <h4>${dado.nome}</h4>
                                        <p>${dado.datahora}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9 col-sm-9 col-xs-12">
                            <div class="left-contact">
                                <div class="media cont-line">
            
                                    <div class="media-body dit-right">
                                        <p>${dado.mensagem}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    }

    conteudo += `</div>
                <hr>
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="contact-block">
                          <form method="post" action="/batepapo" novalidate="true">
                            <div class="row">
                              <div class="col-md-3">
                                  <div class="form-group has-error">
                                    <select name="usuario" id="usuario" class="form-control">
                                        <option value="" disabled selected>Selecione um usuário</option>`
    for (const usuario of listaCadastroUsuario) {                                        
        conteudo+=  `<option value="${usuario.apelido}">${usuario.apelido}</option>`;
    }



    conteudo+=`</select>
                                      <!-- <input type="text" class="form-control" id="name" name="name" placeholder="Your Name" required="" data-error="Please enter your name"> -->
                                      <!-- <div class="help-block with-errors"><ul class="list-unstyled"><li>Please enter your name</li></ul></div> -->
                                  </div>                                 
                              </div>
                              <div class="col-md-6">
                                  <div class="form-group has-error">
                                      <input type="text" placeholder="Digite sua mensagem..." id="mensagem" class="form-control" name="mensagem" required="" data-error="Por favor digite uma mensagem">
                                      <!-- <div class="help-block with-errors"><ul class="list-unstyled"><li>Please enter your email</li></ul></div> -->
                                  </div> 
                              </div>
                              
                              <div class="col-md-3">
                                  <div class="submit-button text-center">
                                      <button class="btn btn-common disabled" id="submit" type="submit" style="pointer-events: all; cursor: pointer;">Enviar</button>
                                      <div class="clearfix"></div> 
                                  </div>
                              </div>
                            </div>            
                          </form>
                        </div>
                      </div>
                </div>
            </div>
        </div>
            <!-- fim lista cadastros -->
    </div>
</div>
<!-- fim lista cadastros -->

<!-- Start Footer -->
<footer class="footer-box">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <p class="footer-company-name">Dayane Tiziani Boa Ventura &copy; 2023 | Projeto final PPI | Bate-papo </p>
            </div>
        </div>
    </div>
</footer>
<!-- End Footer -->

<!-- ALL JS FILES -->
<script src="js/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<!-- ALL PLUGINS -->
<script src="js/jquery.magnific-popup.min.js"></script>
<script src="js/jquery.pogo-slider.min.js"></script> 
<script src="js/slider-index.js"></script>
<script src="js/smoothscroll.js"></script>
<script src="js/form-validator.min.js"></script>
<script src="js/contact-form-script.js"></script>
<script src="js/isotope.min.js"></script>	
<script src="js/images-loded.min.js"></script>	
<script src="js/custom.js"></script>
</body>
</html>`;

    resposta.end(conteudo);

}

app.post('/batepapo', autenticar, processaBatepapo);

function processaBatepapo (requisicao, resposta) {
    
    const dados = requisicao.body;

    const data = new Date();

    let dadoMensagem = {
        nome: dados.usuario,
        mensagem: dados.mensagem,
        datahora: data.toLocaleDateString() + " " + data.toLocaleTimeString()
    }

    let mensagemErro = '';

    if (dados.usuario && dados.mensagem) {
        listaMensagens.push(dadoMensagem);
    } else {

        mensagemErro += `<div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <div style="color: red" class="help-block with-errors">O usuário e a mensgem devem ser preenchidos</div> 
                            </div>
                        </div>`
    }
    
    let conteudo = `
    <!DOCTYPE html>
<html lang="pt-br"><!-- Basic -->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">   
   
    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
 
     <!-- Site Metas -->
    <title>Merry | Chat</title>  
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Site Icons -->
    <link rel="shortcut icon" href="#" type="image/x-icon" />
    <link rel="apple-touch-icon" href="#" />

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- Pogo Slider CSS -->
    <link rel="stylesheet" href="css/pogo-slider.min.css">
    <!-- Site CSS -->
    <link rel="stylesheet" href="css/style.css">    
    <!-- Responsive CSS -->
    <link rel="stylesheet" href="css/responsive.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<body id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">

    

<!-- LOADER -->
<div id="preloader">
    <div class="loader">
        <div class="box"></div>
        <div class="box"></div>
    </div>
</div><!-- end loader -->
<!-- END LOADER -->
<!-- Start header -->
<header class="top-header">
    <nav class="navbar header-nav navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand"><img src="images/logo.png" alt="image"></a>
            
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-wd" aria-controls="navbar-wd" aria-expanded="false" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbar-wd">
                <ul class="navbar-nav">
                    <li><a class="nav-link " href="/">Início</a></li>
                    <li><a class="nav-link " href="/formulario.html">Cadastro de Usuário</a></li>
                    <li><a class="nav-link active" href="/batepapo">Bate-papo</a></li>
                    <li><a class="nav-link" href="/login.html">Sair</a></li>
                </ul>
            </div>
        </div>
    </nav>
</header>
<!-- End header -->

<!-- lista cadastros -->
<br><br>
<div id="donate" class="gallery-box" style="background: #f7f7f7;"> 
    <div class="container">
        <div class="row">
            <div class="col-lg-10">
                <div class="title-box">
                    <h2 style="font-size: 70px;">Chat</h2>
                </div>
            </div>
        </div>
        <div class="row">
             <!-- lista cadastros -->
        
            <div class="container">
                <div style="overflow-y:scroll; height:300px; overflow-x: hidden;">`;
                    

    for (const dado of listaMensagens)  {             
    conteudo += `<div class="row">
                        <div class="col-lg-3 col-sm-3 col-xs-12">
                            <div class="left-contact">
                                <div class="media cont-line">
                                    <div class="media-left icon-b">
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                    <div class="media-body dit-right">
                                        <h4>${dado.nome}</h4>
                                        <p>${dado.datahora}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9 col-sm-9 col-xs-12">
                            <div class="left-contact">
                                <div class="media cont-line">
            
                                    <div class="media-body dit-right">
                                        <p>${dado.mensagem}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    }

    conteudo += `</div>
                <hr>
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="contact-block">
                          <form method="post" action="/batepapo" novalidate="true">
                            <div class="row">
                              <div class="col-md-3">
                                  <div class="form-group has-error">
                                    <select name="usuario" id="usuario" class="form-control">
                                        <option value="" disabled selected>Selecione um usuário</option>`;

    for (const usuario of listaCadastroUsuario) {                                        
        conteudo+=  `<option value="${usuario.apelido}">${usuario.apelido}</option>`;
    }

    conteudo+=  `</select>
                                      <!-- <input type="text" class="form-control" id="name" name="name" placeholder="Your Name" required="" data-error="Please enter your name"> -->
                                      <!-- <div class="help-block with-errors"><ul class="list-unstyled"><li>Please enter your name</li></ul></div> -->
                                  </div>                                 
                              </div>
                              <div class="col-md-6">
                                  <div class="form-group has-error">
                                      <input type="text" placeholder="Digite sua mensagem..." id="mensagem" class="form-control" name="mensagem" required="" data-error="Por favor digite uma mensagem">
                                      <!-- <div class="help-block with-errors"><ul class="list-unstyled"><li>Please enter your email</li></ul></div> -->
                                  </div> 
                              </div>
                              
                              <div class="col-md-3">
                                  <div class="submit-button text-center">
                                      <button class="btn btn-common disabled" id="submit" type="submit" style="pointer-events: all; cursor: pointer;">Enviar</button>
                                      <div class="clearfix"></div> 
                                  </div>
                              </div>
                            </div>            
                          </form>
                        </div>
                      </div>
                </div>
            </div>
        </div>
        ${mensagemErro}
            <!-- fim lista cadastros -->
    </div>
</div>
<!-- fim lista cadastros -->

<!-- Start Footer -->
<footer class="footer-box">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <p class="footer-company-name">Dayane Tiziani Boa Ventura &copy; 2023 | Projeto final PPI | Bate-papo </p>
            </div>
        </div>
    </div>
</footer>
<!-- End Footer -->

<!-- ALL JS FILES -->
<script src="js/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<!-- ALL PLUGINS -->
<script src="js/jquery.magnific-popup.min.js"></script>
<script src="js/jquery.pogo-slider.min.js"></script> 
<script src="js/slider-index.js"></script>
<script src="js/smoothscroll.js"></script>
<script src="js/form-validator.min.js"></script>
<script src="js/contact-form-script.js"></script>
<script src="js/isotope.min.js"></script>	
<script src="js/images-loded.min.js"></script>	
<script src="js/custom.js"></script>
</body>
</html>`;

    resposta.end(conteudo);
}