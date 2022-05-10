import React from 'react';
import * as XLSX from 'xlsx/xlsx';
import XlsxPopulate, * as xlsxPopulate from 'xlsx-populate/browser/xlsx-populate';

const ExcelExport = ({data}) => {


    const createDownloadData = () => {
        handleExport().then((url) => {
            console.log(url)
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute('href', url);
            downloadAnchorNode.setAttribute('download', 'relatorio_dealers.xlsx');
            downloadAnchorNode.click()
            downloadAnchorNode.remove()
        });
    }

    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);

        const view = new Uint8Array(buf);

        for(let i = 0 ; i !== s.length; i++) {
            view[i] = s.charCodeAt(i)
        }

        return buf;
    }

    const workbook2blob = (workbook) => {

        const wopts = {
            bookType: 'xlsx',
            type: 'binary',

        }

        const wbout = XLSX.write(workbook, wopts);

        const blob = new Blob([s2ab(wbout)], {
            type: 'application/octet-stream'
        });

        return blob;
    };

    const handleExport = () => {
        const title =[{A: 'Relatório Ativos - Dealer'}]; 

        let table1 =[
            {
                A: 'Brand',
                B: 'Basic',
                C: 'Compact',
                D: 'Full',
                E: 'Premium',
                F: 'Urban',
                G: 'Total',
            }
        ];


        data
        .filter((item) =>
        item.dealer !== 'JACON dealer' && 
        item.dealer !== 'ADMIN-YOUCAST' && 
        item.dealer !== 'ADYLNET' && 
        item.dealer !== 'AMERICANET' && 
        item.dealer !== 'DNET' && 
        item.dealer !== 'HSL' && 
        item.dealer !== 'NOVANET' && 
        item.dealer !== 'TCM' &&
        item.dealer !== 'TCM Telecom' && 
        item.dealer !== 'WSP' && 
        item.dealer !== 'Youcast CSMS' && 
        item.dealer !== 'YPLAY' && 
        item.dealer !== 'Z-Não-usar' &&
        item.dealer !== 'Z-Não-usar-'
        ).sort(function (a, b) {
        let x = a.dealer.toUpperCase(), y = b.dealer.toUpperCase();
        return x == y ? 0 : x > y ? 1 : -1;
        }).forEach(row => {
            const dealerDetails = row;

            table1.push({
                A: dealerDetails.dealer,
                B: dealerDetails.basicCount,
                C: dealerDetails.compactCount,
                D: dealerDetails.fullCount,
                E: dealerDetails.premiumCount,
                F: dealerDetails.urbanTv,
                G: dealerDetails.basicCount + dealerDetails.compactCount + dealerDetails.fullCount + dealerDetails.premiumCount,
            });

        });
        
        const finalData = [...title, ...table1]
        
        const wb = XLSX.utils.book_new();

        const sheet = XLSX.utils.json_to_sheet(finalData, {
            skipHeader: true,
        
        });

        XLSX.utils.book_append_sheet(wb, sheet, 'dealer_report');

        const workbookBlob = workbook2blob(wb);

        var headerIndexes = [];
        finalData.forEach((data, index) =>
          data["A"] === "Brand" ? headerIndexes.push(index) : null
        );
    
        const totalRecords = data.length;

        const dataInfo = {
            titleCell: 'A1',
            titleRange: 'A1:G1',
            tbodyRange: `A3:G${finalData.length}`,
            theadRange: 
                headerIndexes?.length >= 1
                ? `A${headerIndexes[0] + 1}:G${headerIndexes[0] + 1}`
                : null,
            tFirstColumnRange:
                headerIndexes?.length >= 1
                ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
                : null,
            tLastColumnRange:
                headerIndexes?.length >= 1
                ? `G${headerIndexes[0] + 1}:G${totalRecords + headerIndexes[0] + 1}`
                : null,
        };

        return addStyles(workbookBlob, dataInfo);

    };

    const addStyles = (workbookBlob, dataInfo) => {
        return XlsxPopulate.fromDataAsync(workbookBlob).then(workbook => {
            workbook.sheets().forEach(sheet => {
                //sheet.usedRange.style({
                //    fontFamily: 'Arial',
                //    verticalAlignment: 'center'
                //});

               sheet.column('A').width(35);
               sheet.column('B').width(15);
               sheet.column('C').width(15);
               sheet.column('D').width(15);
               sheet.column('E').width(15);
               sheet.column('F').width(15);
               sheet.column('G').width(15);


               sheet.range(dataInfo.titleRange).merged(true).style({
                   bold: true,
                   horizontalAlignment: 'center',
                   verticalAlignment: 'center',
               });


               if (dataInfo.tbodyRange) {
                sheet.range(dataInfo.tbodyRange).style({
                  horizontalAlignment: "center",
                });
              }
      
              sheet.range(dataInfo.theadRange).style({
                fill: "FFFD04",
                bold: true,
                horizontalAlignment: "center",
              });

              if (dataInfo.tFirstColumnRange) {
                sheet.range(dataInfo.tFirstColumnRange).style({
                  bold: true,
                });
              }
      
              if (dataInfo.tLastColumnRange) {
                sheet.range(dataInfo.tLastColumnRange).style({
                  bold: true,
                });
              }



            });

            return workbook.outputAsync().then(workbookBlob => URL.createObjectURL(workbookBlob));
        })
    }

    return <p onClick={() => createDownloadData()} style={{cursor: 'pointer'}}>Export to XLSX</p>

}

export default ExcelExport;