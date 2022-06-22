import React from 'react';
import './App.css';
import {SheetDirective, SheetsDirective, RangesDirective, RangeDirective,  
  SpreadsheetComponent, ColumnsDirective,ColumnDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, DefinedNamesDirective, DefinedNameDirective} from '@syncfusion/ej2-react-spreadsheet';
  import {formulaData} from './data';
function App() {
  let ssObj: SpreadsheetComponent;
  const calculatePercentage=(cellAddr1: string, cellAddr2: string)=>{
    return (Number(cellAddr1)/Number(cellAddr2))*100;
  }
  const onCreated=()=>{
    ssObj.numberFormat("0.00", "F2:G11");
    ssObj.updateCell({value:"Average"}, "E13");
    ssObj.updateCell({formula:"=Average(F2:F11)"}, "F13")
    ssObj.addCustomFunction(calculatePercentage, "PERCENTAGE");
    ssObj.updateCell({value:"Percentage"}, "G1");
    ssObj.updateCell({formula:"=PERCENTAGE(F2,B2)"}, "G2");
    ssObj.addDefinedName({name:"Profit", refersTo:"F2:F11"});
  }
  return (
    <div className="App">
      <SpreadsheetComponent ref={((s:SpreadsheetComponent)=>ssObj=s)} height={500} created={onCreated}
        showFormulaBar={true}>
        <SheetsDirective>
          <SheetDirective name="Stock Details">
            <RangesDirective>
              <RangeDirective dataSource={formulaData}></RangeDirective>
            </RangesDirective>
            <RowsDirective>
              <RowDirective index={11}>
                <CellsDirective>
                  <CellDirective index={4} value="Total Profit"></CellDirective>
                  <CellDirective index={5} formula="=Sum(F2:F11)"></CellDirective>
                </CellsDirective>
              </RowDirective>
            </RowsDirective>
            <ColumnsDirective>
              <ColumnDirective width={160}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={120}></ColumnDirective>
              <ColumnDirective width={120}></ColumnDirective>
            </ColumnsDirective>
          </SheetDirective>
        </SheetsDirective>
        {/* <DefinedNamesDirective>
          <DefinedNameDirective name='Profit' refersTo='F2:F11'></DefinedNameDirective>
        </DefinedNamesDirective> */}
      </SpreadsheetComponent>
    </div>
  );
}

export default App;
