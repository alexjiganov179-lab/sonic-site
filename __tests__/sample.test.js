const React = require('react');
const { render, screen } = require('@testing-library/react');

function SampleComponent() {
  return React.createElement('div', null, 'Hello, test!');
}

test('renders greeting', () => {
  render(React.createElement(SampleComponent));
  expect(screen.getByText('Hello, test!')).toBeTruthy();
});
