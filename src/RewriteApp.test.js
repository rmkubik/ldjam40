import React from 'react';
import {shallow} from 'enzyme';
import ReactDOM from 'react-dom';
import RewriteApp from './RewriteApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RewriteApp />, div);
});

describe('App state', () => {
    let app;

    beforeEach(() => {
        const app = shallow(<RewriteApp/>);
    });

    it('should update react state when the game updates', () => {

    });
});
