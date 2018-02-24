import React from 'react';
import {mount} from 'enzyme';
import ReactDOM from 'react-dom';

import App from './App';
import DesktopIcon from './components/DesktopIcon';

import Game from './game/Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
});

describe('App state', () => {
    let app;

    beforeEach(() => {
        jest.useFakeTimers();

        app = mount(<App/>);
    });

    it('should update react state when the game updates', () => {
        const initialState = app.state();

        jest.runOnlyPendingTimers();

        expect(app.state()).not.toEqual(initialState);
    });

    // TODO: Why does this test not work?
    // did it fail because of the beforeEach rerunning jest.useFakeTimers?
    // it('should render desktop icons as DesktopIcon components', () => {
    //     jest.runOnlyPendingTimers();
    //
    //     expect(app.find(DesktopIcon).length).toEqual(3);
    // });
});
