import './App.css';
import React, { useEffect, useState } from 'react'
//@ts-ignore
import { createSpreadsheet } from './utils.ts';
//@ts-ignore
import Spreadsheet from './Spreadsheet.tsx';
import { CellValue } from './utils';

const App = () => {
  const [spreadsheet, setSpreadsheet] = useState<CellValue[]>([]);
  useEffect(() => {
    setSpreadsheet(createSpreadsheet());
  }, [])

  return (
    <Spreadsheet spreadsheet={spreadsheet} setSpreadsheet={setSpreadsheet} />
  )
}

export default App