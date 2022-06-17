import { render, screen } from "@testing-library/react";
import Spreadsheet from "./Spreadsheet";
import { CellValue } from '../shared/CellValue.types'
import { createSpreadsheet } from "../shared/utils";

describe('Spreadsheet test', () => {
    test('component rendering', () => {
        const spreadsheet: CellValue[][]= []
        const setSpreadsheet: React.Dispatch<React.SetStateAction<CellValue>[]> = jest.fn();
    const view = render(
      <Spreadsheet spreadsheet={spreadsheet} setSpreadsheet={setSpreadsheet} />
    );
    expect(view).not.toBeNull();
    });
  
  test('table', () => {
        const spreadsheet: CellValue[][]= []
        const setSpreadsheet: React.Dispatch<React.SetStateAction<CellValue>[]> = jest.fn();
    render(
      <Spreadsheet spreadsheet={spreadsheet} setSpreadsheet={setSpreadsheet} />
    );
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
  test('table body', () => {
    const spreadsheet: CellValue[][] = []
    const setSpreadsheet: React.Dispatch<React.SetStateAction<CellValue>[]> = jest.fn();
    render(
      <Spreadsheet spreadsheet={spreadsheet} setSpreadsheet={setSpreadsheet} />
    );
    expect(screen.getByRole('rowgroup')).toBeInTheDocument()
    
  });
});
