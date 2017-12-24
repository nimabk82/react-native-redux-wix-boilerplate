import App from './src/App';
if(!__DEV__){
    console.log = () => {};
}

const app = new App();