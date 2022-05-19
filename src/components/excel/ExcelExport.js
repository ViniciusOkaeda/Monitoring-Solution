import React from 'react';
import * as XLSX from 'xlsx/xlsx';
import XlsxPopulate, * as xlsxPopulate from 'xlsx-populate/browser/xlsx-populate';

export const ExcelExport = ({data}) => {


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
                H: 'Users with incorrect packages',
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

            console.log("o dealerzin", dealerDetails)

            table1.push({
                A: dealerDetails.dealer,
                B: dealerDetails.basicCount,
                C: dealerDetails.compactCount,
                D: dealerDetails.fullCount,
                E: dealerDetails.premiumCount,
                F: dealerDetails.urbanTv,
                G: dealerDetails.basicCount + dealerDetails.compactCount + dealerDetails.fullCount + dealerDetails.premiumCount,
                H: dealerDetails.data.filter(item => item.pacoteYplayStatus === 'ERRO')
                .map(e => e.pacoteYplayStatus).length,
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
            titleRange: 'A1:H1',
            tbodyRange: `A3:H${finalData.length}`,
            theadRange: 
                headerIndexes?.length >= 1
                ? `A${headerIndexes[0] + 1}:H${headerIndexes[0] + 1}`
                : null,
            tFirstColumnRange:
                headerIndexes?.length >= 1
                ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
                : null,
            tLastColumnRange:
                headerIndexes?.length >= 1
                ? `H${headerIndexes[0] + 1}:H${totalRecords + headerIndexes[0] + 1}`
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
               sheet.column('H').width(35);


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

    return <p onClick={() => createDownloadData()} className='menuAction' >Export to XLSX</p>

}

export const ExcelExportWatching = ({data}) => {

    const createDownloadData = () => {
                handleExport().then((url) => {
            console.log(url)
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute('href', url);
            downloadAnchorNode.setAttribute('download', 'relatorio_watching_vendor.xlsx');
            downloadAnchorNode.click()
            downloadAnchorNode.remove()
        });
    };

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

        const title =[{A: 'Relatório Watching Now - Vendor'}]; 

        let table1 =[
            {
                A: 'Vendor',
                B: 'ID Vendor',
                C: 'Login',
                D: 'Channel',
                E: 'Channel - URL Image',
                F: 'VOD',
                G: 'VOD - URL Image',
                H: 'Watching now devices type',
                I: 'watching now stream type',
                J: 'watching now type',
            }
        ];

        data.forEach(row => {
            const watchingDetails = row;
            //console.log("olha meu watching", watchingDetails)

            table1.push({
                A: watchingDetails.Vendor,
                B: watchingDetails.IDVendor,
                C: watchingDetails.login,
                D: watchingDetails.Channel === null ? 'N/A' : watchingDetails.Channel,
                E: watchingDetails.ChannelURL === null ? 'N/A' : watchingDetails.ChannelURL,
                F: watchingDetails.VOD === null ? 'N/A' : watchingDetails.VOD,
                G: watchingDetails.VODURL === null ? 'N/A' : watchingDetails.VODURL,
                H: watchingDetails.watching_now_devices_type,
                I: watchingDetails.watching_now_stream_type,
                J: watchingDetails.watching_now_type,
            })

            console.log("olha meu tabela watching", table1)
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
          data["A"] === "Vendor" ? headerIndexes.push(index) : null
        );
    
        const totalRecords = data.length;

        const dataInfo = {
            titleCell: 'A1',
            titleRange: 'A1:G1',
            tbodyRange: `A3:J${finalData.length}`,
            theadRange: 
                headerIndexes?.length >= 1
                ? `A${headerIndexes[0] + 1}:J${headerIndexes[0] + 1}`
                : null,
            tFirstColumnRange:
                headerIndexes?.length >= 1
                ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
                : null,
            tLastColumnRange:
                headerIndexes?.length >= 1
                ? `J${headerIndexes[0] + 1}:J${totalRecords + headerIndexes[0] + 1}`
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

               sheet.column('A').width(15);
               sheet.column('B').width(10);
               sheet.column('C').width(30);
               sheet.column('D').width(30);
               sheet.column('E').width(80);
               sheet.column('F').width(40);
               sheet.column('G').width(80);
               sheet.column('H').width(26);
               sheet.column('I').width(25);
               sheet.column('J').width(20);


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
    };

    return <p className='menuAction' onClick={() => createDownloadData()}>Export to XLSX</p>

}

export const ExcelExportPackages = ({data}) => {


    const createDownloadData = () => {
        handleExport().then((url) => {
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', url);
        downloadAnchorNode.setAttribute('download', 'relatorio_watching_vendor.xlsx');
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
});
};

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

const title =[{A: 'Relatório Users and Packages - Vendor'}]; 

let table1 =[
    {
        A: 'Customer Login',
        B: 'Registered Packages',
    }
];

data.forEach(row => {
    const packagesDetails = row;
    //console.log("olha meu watching", packagesDetails)

    table1.push({
        A: packagesDetails.Cliente,
        B: packagesDetails.pacotes.map(e => e.Pacote),
    })

    console.log("olha meu tabela package", packagesDetails.pacotes.map(e => e.Pacote));
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
  data["A"] === "Customer Login" ? headerIndexes.push(index) : null
);

const totalRecords = data.length;

const dataInfo = {
    titleCell: 'A1',
    titleRange: 'A1:G1',
    tbodyRange: `A3:G${finalData.length}`,
    theadRange: 
        headerIndexes?.length >= 1
        ? `A${headerIndexes[0] + 1}:J${headerIndexes[0] + 1}`
        : null,
    tFirstColumnRange:
        headerIndexes?.length >= 1
        ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
        : null,
    tLastColumnRange:
        headerIndexes?.length >= 1
        ? `J${headerIndexes[0] + 1}:J${totalRecords + headerIndexes[0] + 1}`
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

       sheet.column('A').width(25);
       sheet.column('B').width(100);



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
};
    return <p className='menuAction' onClick={() => createDownloadData()}>Export to XLSX</p>
}

export const ExcelExportDealers = ({data}) => {

    const createDownloadData = () => {
        handleExport().then((url) => {
    console.log(url)
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', url);
    downloadAnchorNode.setAttribute('download', 'relatorio_watching_vendor.xlsx');
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
});
};

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

const title =[{A: 'Relatório Info Dealer - Yplay'}]; 

let table1 =[
    {
        A: 'Login',
        B: 'ID SMS',
        C: 'ID MW',
        D: 'Dealer ID',
        E: 'Dealer',
        F: 'Pacote',
        G: 'Pacotização',
        H: 'Identificador',
        I: 'Yplay Completo',
        J: 'Yplay Light',
        K: 'Kids',
        L: 'Nacional',
        M: 'Studios',
        N: 'TVOD',
        O: 'Urban',
    }
];

data.forEach(row => {
    const dealerDetails = row;
    const dealerDetails2 = row.pacotes.map(e => e.idsms);
    const dealer3 = dealerDetails2;
    console.log("olha meu dealer", dealerDetails2)

    table1.push({
        A: dealerDetails.login,
        B: dealer3,
        C: dealerDetails.login,
        D: dealerDetails.Channel === null ? 'N/A' : dealerDetails.Channel,
        E: dealerDetails.ChannelURL === null ? 'N/A' : dealerDetails.ChannelURL,
        F: dealerDetails.pacoteYplay,
        G: dealerDetails.pacoteYplayStatus,
        H: dealerDetails.watching_now_devices_type,
        I: dealerDetails.pacotes.forEach(row => { return row.product}),
        J: dealerDetails.pacotes.filter(i => i.product === 'Yplay Light').map(item => item.product),
        K: dealerDetails.pacotes.filter(i => i.product === 'SVOD Kids').map(item => item.product),
        L: dealerDetails.pacotes.filter(i => i.product === 'SVOD Nacional').map(item => item.product),
        M: dealerDetails.pacotes.filter(i => i.product === 'SVOD Studio').map(item => item.product),
        N: dealerDetails.pacotes.filter(i => i.product === 'TVOD').map(item => item.product),
        O: dealerDetails.pacotes.filter(i => i.product === 'Yplay UrbanTV').map(item => item.product),
    })

    //console.log("olha meu tabela watching", table1)
});

const finalData = [...title, ...table1]

//console.log("a data final", finalData)

const wb = XLSX.utils.book_new();

const sheet = XLSX.utils.json_to_sheet(finalData, {
    skipHeader: true,

});

XLSX.utils.book_append_sheet(wb, sheet, 'dealer_report');

const workbookBlob = workbook2blob(wb);

var headerIndexes = [];
finalData.forEach((data, index) =>
  data["A"] === "Login" ? headerIndexes.push(index) : null
);

const totalRecords = data.length;

const dataInfo = {
    titleCell: 'A1',
    titleRange: 'A1:G1',
    tbodyRange: `A3:J${finalData.length}`,
    theadRange: 
        headerIndexes?.length >= 1
        ? `A${headerIndexes[0] + 1}:J${headerIndexes[0] + 1}`
        : null,
    tFirstColumnRange:
        headerIndexes?.length >= 1
        ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
        : null,
    tLastColumnRange:
        headerIndexes?.length >= 1
        ? `J${headerIndexes[0] + 1}:J${totalRecords + headerIndexes[0] + 1}`
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

       sheet.column('A').width(15);
       sheet.column('B').width(10);
       sheet.column('C').width(30);
       sheet.column('D').width(30);
       sheet.column('E').width(80);
       sheet.column('F').width(40);
       sheet.column('G').width(80);
       sheet.column('H').width(26);
       sheet.column('I').width(25);
       sheet.column('J').width(20);


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
};
    return <p className='menuAction' onClick={() => createDownloadData()}>Export to XLSX</p>
}

