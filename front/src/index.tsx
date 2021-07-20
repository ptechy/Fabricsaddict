import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './State/Stores/storeContainer'
import { AppContainer } from './Containers/AppContainer'



const store = configureStore()
const unsubscribe = store.subscribe(() => console.log(store.getState()))
unsubscribe()

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>
    , document.getElementById("root")
);
