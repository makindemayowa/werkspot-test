import enzyme from 'enzyme'
import renderer from 'react-test-renderer';
import { AppProvider } from '../context/app.context';
import Header from './Header';

test('Header element creates a consistent snapshot', () => {
    const component = renderer.create(<AppProvider><Header /></AppProvider>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Should contain an input element', () => {
  const wrapper = enzyme.render(<AppProvider><Header /></AppProvider>);
  expect(wrapper.find('input')).toBeDefined();
});