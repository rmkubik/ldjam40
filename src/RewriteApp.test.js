import React from 'react';
import {shallow} from 'enzyme';
import ReactDOM from 'react-dom';

import RewriteApp from './RewriteApp';
import DesktopIcon from './components/DesktopIcon';

import Game from './game/Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RewriteApp />, div);
});

describe('App state', () => {
    let app;

    beforeEach(() => {
        jest.useFakeTimers();

        app = shallow(<RewriteApp/>);
    });

    it('should update react state when the game updates', () => {
        const initialState = app.state();

        jest.runOnlyPendingTimers();

        expect(app.state()).not.toEqual(initialState);
    });

    it('should render desktop icons as DesktopIcon components', () => {
        jest.runOnlyPendingTimers();

        expect(app.find(DesktopIcon).length).toEqual(3);
    });
});
