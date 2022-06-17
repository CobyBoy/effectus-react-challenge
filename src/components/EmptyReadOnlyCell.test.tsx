import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EmptyReadOnlyCell from './EmptyReadOnlyCell';

xdescribe('EmptyReadOnlyCell', () => {
  test('component rendering', () => {
    const colIndex = 0;
    const view = render(
      <EmptyReadOnlyCell key={colIndex} colIndex={colIndex} />
    );
    expect(view).not.toBeNull();

  })
  test('cell', () => {
    const colIndex = 0;
     render(
      <EmptyReadOnlyCell key={colIndex} colIndex={colIndex} />
    );
    const cell = screen.getByRole('cell');
    expect(cell).toBeInTheDocument()

  })
})