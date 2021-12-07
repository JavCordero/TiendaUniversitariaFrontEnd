# Proyecto Tópico avanzados de Ingeniería de Software: Tienda Universitaria - WebApp


## Introducción 💡

### Quiénes Somos
Somos el equipo Bijuu Developers, compuesto por los siguientes integrantes:

- Javiera Cordero (Líder del proyecto y full Stack).
- Juan Barnett (Líder de requerimientos y full Stack).
- Nicolás Cofré (Líder de SQA y full Stack).
- Luciano Larama (Líder de programación y full Stack).
- Yeison Olivares (Líder de documentación y full Stack).

### Contexto
El equipo está formado por estudiantes de la Universidad Católica del Norte, Antofagasta Chile. Con el fin de lograr el trabajo requerido para la asignatura de *Proyecto Tópico avanzados de Ingeniería de Software*.

## Proyecto 📜
Este proyecto consta en la creación de un control de inventario para la Tienda Universitaria de la Universidad Católica del Norte. El repositorio actual corresponde a la aplicación por lado del cliente. El proyecto consta de 2 partes.

- La primera corresponde a la aplicación que incluye el frontend y backend (WebApp).
- La segunda corresponde a la API que se encargará de manegar los datos y Requests (WebApi).

Este repositorio actualmente almacena la aplicación web. 
Para la webApi, dirigirse al siguiente repositorio: https://github.com/JavCordero/TiendaUniversitariaBackEnd

## Tecnologías 🛠️

* [Node.js 14.15.3](https://nodejs.org/es/)
* [Typescript](https://www.typescriptlang.org/)
* [Javascript](https://www.javascript.com/)
* [React.js 17.0.2](https://es.reactjs.org/)
* [Next.js 11.1.2](https://nextjs.org/)
* [Bootstrap 5](https://getbootstrap.com/)
* [Sass](https://sass-lang.com/)


### Dependencias utilizadas:

* @fortawesome/free-solid-svg-icons": ^5.15.4
* @fortawesome/react-fontawesome": ^0.1.15
* @material-ui/core": ^4.12.3
* bootstrap-css-only": ^4.4.1
* formik": ^2.2.9
* next": 11.1.2
* node-sass": ^5.0.0
* react": 17.0.2
* react-dom": 17.0.2
* react-icons": ^4.3.1
* sweetalert2": ^11.1.9
* yup": ^0.32.11
* @types/jquery": ^3.5.8
* @types/react": 17.0.27
* eslint": 8.0.0
* eslint-config-next": 11.1.2
* typescript": 4.4.3


## Instalación 🔧
### Pre-requisitos:
* Node.js
* Gestor de paquetes: [npm](https://www.npmjs.com/)

> Se debe crear un repositorio local el cual almacenará la información adyacente en el repositorio actual.

### Paso a paso  de instalación

1. Abrir el terminal.
2. Crear el directorio al cual se clonará el proyecto.
3. Iniciar el repositorio mediante:
```
git init
```
4. Crear conexión con el repositorio:
```
git remote add origin https://github.com/JavCordero/TiendaUniversitariaFrontEnd
```
5. Finalmente, hacer pull al master:
```
git pull origin main
```

### Instrucciones:

Desde la terminal en la carpeta raíz del proyecto, usa los siguientes comandos:

1. Debes instalar las dependecias utilizadas en el proyecto.
	```sh
	npm install
	```
  
## Uso 🔧
Desde la terminal en la carpeta raíz del proyecto, usa los siguientes comandos:

* Para levantar la aplicación: `http://localhost:3000/`
	```sh
	npm run dev
	```
* Para ejecutar las pruebas unitarias y de integración:
	```sh
	php run test
	```

## Convenciones 📋
### Commits
Los commits deben incluir un mensaje descriptivo de los cambios realizados
La estructura de los mensajes es la siguiente:
```
- <type>(<scope>):<subject>
```
#### type: el tipo de cambio, este pueden ser
- feat	  : adición nueva 	
- fix 	  : bug fixes (arreglo de errores)
- docs	  : cambios en la documentación
- Style	  : cambio de estilo que no afectan en la funcionalidad (formato, espaciados, etc).
- Refactor: cambio que no arregla ni agrega una funcionalidad.
- Test	  : agregar pruebas faltantes o bien corregir existentes
- Chore	  : cambios en librerías, build y herramientas auxiliares.
- perf	  : cambio que mejora el rendimiento del programa.

#### scope: Opcional, específica el lugar en donde se realiza el cambio en el commit (clase, módulo, etc).
#### subject: Descripción corta de que trata el cambio emitido.

### Programación
* Clases/Modelos: PascalCase
* Métodos: PascalCase
* Variables: camelCase
* Parámetros para Métodos: camelCase
* Json: spinal-case

### Comentarios
Para cualquier duda o consulta sobre el proyecto, no dude en contactarse con el Líder del proyecto, Javiera Cordero, mediante el siguiente correo electrónico: javiera.cordero@alumnos.ucn.cl 

Se despide atentamente, el equipo Bijuu Developers.

<hr>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
