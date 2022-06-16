import React from 'react'
//@ts-ignore
import { ERROR, cellMatchExpression, findValueByCell } from '../shared/utils.ts'
//@ts-ignore
import CellValue from '../shared/CellValue.types.ts'

const Cell = ({ spreadsheet, rowIndex, columnIndex, setSpreadsheet }: { spreadsheet: CellValue[][], rowIndex: number, columnIndex: number, setSpreadsheet: React.Dispatch<React.SetStateAction<CellValue>[]> }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowInd: number, columnInd: number) => {
        const newSpreadSheet = [...spreadsheet];
        newSpreadSheet[rowInd][columnInd] = {
            formula: e.target.value,
            value: e.target.value
        }
        setSpreadsheet(newSpreadSheet);
    };

    const showCellFunctionValue = (rowInd: number, columnInd: number) => {
        const newSpreadSheet = [...spreadsheet];
        newSpreadSheet[rowInd][columnInd] = {
            ...newSpreadSheet[rowInd][columnInd],
            value: spreadsheet[rowInd][columnInd].formula
        };
        setSpreadsheet(newSpreadSheet);
    }

    const showFormulaResult = (rowInd: number, columnInd: number) => {
        const newSpreadSheet = [...spreadsheet];
        newSpreadSheet[rowInd][columnInd] = {
            formula: spreadsheet[rowInd][columnInd].formula,
            value: getCellValue(spreadsheet[rowInd][columnInd].formula)
        }
        //when update sheet cell and there's a reference to the cell, it doesn't update
        setSpreadsheet(newSpreadSheet);
    }

    const getCellValue = (formula: string) => {
        let newV: string | number | undefined = formula;
        if (formula[0] === "=") {
            let expressionWithoutEquals = formula.slice(1);
            let cleanExpression = expressionWithoutEquals.replace(/[a-zA-Z]*[^\d\w+-]/g, '');
            let sumNumbers = cleanExpression.split('+');
            let substractionNumbers = sumNumbers.map(n => n.split('-'));
            if (substractionNumbers[0].length === 1 && substractionNumbers.length === 1) {
                newV= getValueWhenItsOne(cleanExpression);
            }
            else {
                let result = substractionNumbers.map(nArray => {
                    if (nArray.length === 1) {
                        return parseNumberOrCellValue(nArray[0])
                    }
                    else {
                        return makeSubstraction(nArray, nArray[0]);
                    }
                })
                console.log(result);
                newV = makeAddition(result, newV);
            }
            return newV
        }
        //console.log("formula",formula)
        return newV
    }

    const parseNumberOrCellValue = (toValidate: string): number => {
        if (!isNaN(Number(toValidate))) {
            return parseInt(toValidate)
        }
        else if (cellMatchExpression.test(toValidate)) {
            let cellValue = findValueByCell(toValidate, spreadsheet);
            if (!isNaN(cellValue)) {
                return cellValue === '' ? 0 : parseInt(cellValue);
            }
            return ERROR;
        }
        return ERROR;

    }

    const makeSubstraction = (array: string[], arrayFirstElement: string): number => {
        let parsedNumber = parseNumberOrCellValue(arrayFirstElement);

        if (parsedNumber !== ERROR) {
            for (let index = 1; index < array.length; index++) {
                let validated = parseNumberOrCellValue(array[index]);
                parsedNumber -= validated;
            }

        }
        return parsedNumber;
    }

    const makeAddition = (result: number[], newV: string | number) => {
        if (!result.some(el => el === ERROR)) {
            newV = result[0];
            for (let index = 1; index < result.length; index++) {
                newV += result[index];
            }
            return newV
        }
        else return ERROR;
    }

    const getValueWhenItsOne = (expression: string) => {
        if (!isNaN(Number(expression))) {
                    return expression;
                }
                else if (cellMatchExpression.test(expression)) { 
                    return findValueByCell(expression, spreadsheet)
                }
                else return ERROR
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === "Tab") {
            (document.activeElement as HTMLElement).blur();
        }

    }

    return (
        <input value={spreadsheet[rowIndex][columnIndex].value}
            onChange={(e) => handleInputChange(e, rowIndex, columnIndex)}
            onFocus={(e) => showCellFunctionValue(rowIndex, columnIndex)}
            onBlur={(e) => showFormulaResult(rowIndex, columnIndex)}
            onKeyDown={(e) => handleKeyDown(e)} />
    )
}

export default Cell