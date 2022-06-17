import './App.css';
import React, { useEffect, useState } from 'react'
//@ts-ignore
import { createSpreadsheet } from './shared/utils.ts';
//@ts-ignore
import Spreadsheet from './components/Spreadsheet.tsx';
//@ts-ignore
import { CellValue } from './shared/CellValue.types.ts';

const App = () => {
  const [spreadsheet, setSpreadsheet] = useState<CellValue[][]>([]);
  useEffect(() => {
    setSpreadsheet(createSpreadsheet());
  }, [])

  return (
    <Spreadsheet spreadsheet={spreadsheet} setSpreadsheet={setSpreadsheet} />
  )
}

export default App