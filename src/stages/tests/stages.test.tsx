import enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import { AppStateContext, AppDispatchContext } from '../../context/app.context';
import Stages from '../Stages';

const todoMocks = [
  {
    columnName: 'column-1',
    rows: [
      {
        id: 'card-1',
        title: 'Flow Meter Measurement Errors',
        description: 'https://blog.gesrepair.com/',
        tag: 'Blog Post',
        assignee: 'Peter Drury',
        dueDate: '09/15/2019'
      },
      {
        id: 'card-2',
        title: 'Flow Meter Measurement Errors 2',
        description: 'https://blog.gesrepair.com/',
        tag: 'Blog Post',
        assignee: 'Peter Drury',
        dueDate: '09/15/2019'
      },
    ]
  },
  {
    columnName: 'column-2',
    rows: [
      {
        id: 'card-3',
        title: 'Flow Meter Measurement Errors 3',
        description: 'https://blog.gesrepair.com/',
        tag: 'Blog Post',
        assignee: 'Peter Drury',
        dueDate: '09/15/2019'
      },
      {
        id: 'card-4',
        title: 'Flow Meter Measurement Errors 4',
        description: 'https://blog.gesrepair.com/',
        tag: 'Blog Post',
        assignee: 'Peter Drury',
        dueDate: '09/15/2019'
      },
    ]
  },
  {
    columnName: 'column-3',
    rows: [
      {
        id: 'card-5',
        title: 'Flow Meter Measurement Errors 5',
        description: 'https://blog.gesrepair.com/',
        tag: 'Blog Post',
        assignee: 'Peter Drury',
        dueDate: '09/15/2019'
      },
      {
        id: 'card-6',
        title: 'Flow Meter Measurement Errors 6',
        description: 'https://blog.gesrepair.com/',
        tag: 'Blog Post',
        assignee: 'Peter Drury',
        dueDate: '09/15/2019'
      },
      {
        id: 'card-7',
        title: 'Flow Meter Measurement Errors 7',
        description: 'https://blog.gesrepair.com/',
        tag: 'Blog Post',
        assignee: 'Peter Drury',
        dueDate: '09/15/2019'
      }
    ]
  }
];

const wrappedComponent = (Component: any) => {
  return (
    <AppStateContext.Provider value={{toDos: todoMocks, searchString: ''}}>
      <AppDispatchContext.Provider value={({ type, data }) => null}>
        <Component />
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

test('Stages component creates cards based on context data', () => {
    const component = renderer.create(wrappedComponent(Stages));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Should contain an input element', () => {
  const wrapper = enzyme.render(wrappedComponent(Stages));
  expect(wrapper.children().length).toEqual(4)
});