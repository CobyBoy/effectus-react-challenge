import React from 'react'
//@ts-ignore
import Cell from './Cell.tsx'
//@ts-ignore
import ColumnHeader from './ColumnHeader.tsx'
//@ts-ignore
import EmptyReadOnlyCell from './EmptyReadOnlyCell.tsx'
//@ts-ignore
import { CellValue } from '../shared/CellValue.types.ts'

const Spreadsheet = ({ spreadsheet, setSpreadsheet }: { spreadsheet: CellValue[][], setSpreadsheet: React.Dispatch<React.SetStateAction<CellValue>[]> }) => {
    return (
        <table cellSpacing="0" cellPadding="0" id='spreadsheet-table'>
            <tbody id='table-body'>
                {
                    spreadsheet.map((row, rowIndex) => {
                        if (rowIndex === 0) {
                            return (
                                <tr key={rowIndex} id={`row-${rowIndex}-id`}>
                                    {row.map((column, colIndex) => {
                                        if (colIndex === 0) {
                                            return (<EmptyReadOnlyCell key={colIndex} colIndex={colIndex} />)
                                        }
                                        return (<ColumnHeader key={colIndex} colIndex={colIndex} />)
                                    })}
                                </tr>
                            )
                        }
                        return (
                            <tr key={rowIndex} id={`row-${rowIndex}-id`}>
                                <td className="row-header">{rowIndex}</td>
                                {row.map((column, columnIndex) => {
                                    if (columnIndex !== 0) {
                                        return (
                                            <td key={columnIndex}>
                                                <Cell spreadsheet={spreadsheet} rowIndex={rowIndex} columnIndex={columnIndex} setSpreadsheet={setSpreadsheet} />
                                            </td>
                                        );
                                    }
                                    return null;
                                })}
                            </tr>
                        )

                    }
                    )
                }
            </tbody>
        </table>
    )
}

export default Spreadsheet