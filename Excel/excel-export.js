import Excel from 'exceljs'
import User from '../Modal/User'

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

    workSheet.addRow(['code','name','color','payment','time'])
    data.forEach(item => {
        // console.log(item);
        workSheet.addRow([item.code,item.userID.name,item.color,item.isPaid,item.createdAt])
    })

    return workBook.xlsx.writeFile('funday.xlsx')
}