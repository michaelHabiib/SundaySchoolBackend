import Excel from 'exceljs'

export function exportAtt (data,fileName){
    const workBook = new Excel.Workbook()
    const workSheet = workBook.addWorksheet('Att')

    workSheet.addRow(['id','code','Day'])
    data.forEach(item => {
        workSheet.addRow([item._id,item.code,item.attDay])
    });

    return workBook.xlsx.writeFile('data.xlsx')
}

export function exportFunday (data, fileName){
    const workBook = new Excel.Workbook()
    const workSheet = workBook.addWorksheet("Funday")

    workSheet.addRow(['code','color','time'])
    data.forEach(item => {
        workSheet.addRow([item.code,item.color,item.createdAt])
    })

    return workBook.xlsx.writeFile('funday.xlsx')
}