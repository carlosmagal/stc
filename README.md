# Frontend 3D car
O projeto consiste em uma aplicação com um menu e um mapa. No menu é possível escolher uma, entre cinco rotas, para ser exibida no mapa. Ao selecionar uma rota, a navegação referente a ela é iniciada no mapa. Ao finalizar uma rota é possível selecionar outras. Além disso, o usuário tem a opção de escolher entre três idiomas, português, inglês e espanhol, para utilizar no site.


## Estrutura do projeto
A pasta "src" está estruturada da seguinte maneira
- **assets**
	- Contém as imagens e ícones utilizados no desenvolvimento.
- **components**
	- Contém os componentes utilizados para compor as páginas.
- **contexts**
	- Nessa pasta fica o "UserContext", contexto responsável por fazer o controle dos estados na aplicação.
- **i18n**
	- Contém a configuração referente a internacionalização do projeto, em três idiomas diferentes: português, inglês e espanhol.
- **styles**
	- Contém arquivos referentes a estilização de componentes.
- **utils**
	- Contém os dados que foram consumidos na aplicação e funções utilizadas para o desenvolvimento.

## Tecnologias utilizadas

- **SCSS**
	- Pré-processador de CSS que adiciona algumas funcionalidades na estilização, seu uso foi solicitado para o desenvolvimento.
- **Typescript**
	- Typescript é uma linguagem de programação que adiciona ao javascript a tipagem estática. Optar por utilizá-la no lugar do JS é interessante, pois a tipagem traz vantagens em relação a produtividade e prevenção de erros, por exemplo.
- **MaterialUI**
	- MaterialUI é uma biblioteca de componentes para React. Foi utilizada, pois tem uma lista grande de componentes e é amplamente aceita na comunidade de desenvolvimento.
- **i18next**
	- i18next é um framework de internacionalização para javascript. Ao pesquisar sobre frameworks para internacionalização, vi que o i18next tinha muitos usuários por ter um bom desempenho e fácil configuração .
- **Google Maps**
	- O Google Maps é um serviço oferecido pela Google para visualização de mapas. Optei por utilizá-la, pois oferece já havia utilizado em um projeto passado e por ela oferecer uma gama grande de funcionalidades.

## Como executar o projeto
Para utilizar o Google Maps é necessário gerar uma chave de api no google cloud, pois trata-se de um serviço pago. Por essa chave ser um dado sensível, ela foi armazenada como variável de ambiente e não estará presente no repositório (mandarei a chave utilizada no desenvolvimento por e-mail). Logo para utilizar o mapa há duas opções:

- Criar, na pasta raiz do projeto, um arquivo **.env** e declarar a variável **REACT_APP_GOOGLE_API_KEY**, cujo valor será a chave de api, da seguinte maneira (o arquivo deverá conter apenas esta linha): 
	> REACT_APP_GOOGLE_API_KEY="SUA CHAVE DE API"

- Ir no arquivo **src/components/mapWrapper/index.tsx** e fazer o seguinte:
	> Comentar a linha 7 (colocar um // em seu início), descomentar a linha 9 e colocar a chave de api entre as aspas.

Escolhida uma opção, deve-se baixar, caso não tenha, o [NodeJS](https://nodejs.org/en/) . Com o Node instalado, deve-se executar no terminal o comando:
>`npm install --global yarn`

Esse comando instalará o *yarn*, um gerenciador de pacotes. Após isso, deve-se executar o comando:

> `yarn install`

Esse comando vai instalar os pacotes utilizados no projeto. Para rodar o projeto, deve executar o comando:

>`yarn start`
