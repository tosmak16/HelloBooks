import { createMemoryHistory } from 'react-router';

jest.mock('react-router');
const browserHistory = createMemoryHistory('/');

export default browserHistory;
