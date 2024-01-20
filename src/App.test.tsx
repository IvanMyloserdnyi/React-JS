import Main from "./App";
import {createRoot} from "react-dom/client";
//import { render, screen } from '@testing-library/react';

/*test('renders learn react link', () => {
  render(<Main />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/
it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<Main/>);
  root.unmount();
});
