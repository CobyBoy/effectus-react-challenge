import { CellValue } from "./CellValue.types";
//@ts-ignore
import { lettersMatchExpression } from "./constants.ts";

let alphabet: string[] = Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(i + 65));

export const createSpreadsheet = () => {
    let spreadsheet: CellValue[][] = [];
    for (let row = 0; row < alphabet.length; row++) {
        spreadsheet[row] = [];
        for (let column = 0; column < alphabet.length; column++) {
            spreadsheet[row][column] = { formula: '', value: '' };
        }
    }
    return spreadsheet;
};

export const getColumnLabel = (colIndex: number): string => {
    let letter = '';
    if (colIndex >= 0) {
        letter = `${alphabet[colIndex]}`;
    }
    return letter;
}

export const findValueByCell = (cellName: string, actualSpreadsheet: CellValue[][]): string => {
    let column = 0;
    //b1 find index of b, should return 2
    const letter = cellName.match(lettersMatchExpression)![0];
    const number = cellName.match(/\d+/g)![0];
    column = getColumnIndex(letter);
    return actualSpreadsheet[number][column].value;
};

const getColumnIndex = (letterToFind: string): number => {
    letterToFind = letterToFind.toUpperCase();
    let found = alphabet.findIndex((letter) => letter === letterToFind) + 1;
    return found;
};

