import React, { Component } from 'react';
import Main from './components/main';
import './App.css';
import { PageContext } from './contexts';

class App extends Component {
    render() {
        return (
            <div className="App">
                <PageContext.Consumer>
                    {
                        state => <Main {...state} />
                    }
                </PageContext.Consumer>
            </div>
        );
    }
}

export default App;
