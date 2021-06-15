import { mount } from '@cypress/react';
import App from './App';

it('Should contain title', () => {
  mount(<App />);
  cy.get('.text-sm').contains('Students viewer - Poudlard school');
});
