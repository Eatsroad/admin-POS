import { PosPrinter, PosPrintData, PosPrintOptions } from "electron-pos-printer";

export const testPrinter = () => {
    const options: PosPrintOptions = {
        preview: false,
        width: '170px',       
        margin: '0 0 0 0',    
        copies: 1,
        printerName: 'EPSON L6190 Series',
        timeOutPerLine: 400,
        pageSize: { height: 301000, width: 71000 } // page size
    }
    const data:  PosPrintData[] = [
        {
            type: 'text',                         
            value: 'SAMPLE HEADING',
            style: `text-align:center;`,
            css: {"font-weight": "700", "font-size": "18px"}
         }
    ]
    PosPrinter.print(data, options)
    .then(() => {})
    .catch((e) => {
        console.log(e);
    });
}


 