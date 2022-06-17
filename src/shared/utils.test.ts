import { createSpreadsheet, getColumnLabel, findValueByCell } from './utils';

describe('test', () => {
    test('get the column letter', () => {
        expect(getColumnLabel(0)).toBe('A');
        expect(getColumnLabel(25)).toBe('Z');
    })
    test('spreadsheet creation', () => {
      expect(createSpreadsheet()).not.toBeNull();
    });

    test('find value of cell', () => {
        let spreadsheet = createSpreadsheet();
        expect(findValueByCell('a1', spreadsheet)).toBe('');
        spreadsheet[1][1].value = '2';
        expect(findValueByCell('a1', spreadsheet)).toBe('2');
    });
})