 
const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');
const getSales = require('./getTotalSales');
const getInstruments = require('./getTotalInstruments');
const getAccessories = require('./getTotalAccessories');
const getServices = require('./getTotalServices');
const getEmployees = require('./getTotalEmployees');

async function createReport(){
    const Sales = await getSales()
    const totalSales = Sales.data
    const Instruments = await getInstruments()
    const InstrumentNum = Instruments.instrumentNum
    const InstrumentValue = Instruments.instrumentValue
    const Accessories = await getAccessories()
    const accNum = Accessories.accNum
    const accValue = Accessories.accValue
    const Services = await getServices()
    const serNum = Services.serNum
    const serValue = Services.serValue
    const Employees = await getEmployees()
    const empNum = Employees.emp

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    page.drawText('Musicologist', { x: 50, y: 750, size: 12 });
    page.drawText('Address: Via Aleotti 26, 43125 Parma (PR), Emilia-Romagna Italy', { x: 50, y: 730, size: 12 });

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    const title = `Monthly report of: ${currentMonth} - ${currentYear}`;
    page.drawText(title, { x: 50, y: 690, size: 14 });

    page.drawText(`Total Sales: €${totalSales}`, { x: 50, y: 650, size: 12 });
    page.drawText(`Number of instruments: ${InstrumentNum}`, { x: 50, y: 630, size: 12 });
    page.drawText(`Total Value of instruments: €${InstrumentValue}`, { x: 50, y: 610, size: 12 });
    page.drawText(`Number of Accessories: ${accNum}`, { x: 50, y: 590, size: 12 });
    page.drawText(`Total Value of Accessories: €${accValue}`, { x: 50, y: 570, size: 12 });
    page.drawText(`Number of Services Offered: ${serNum}`, { x: 50, y: 550, size: 12 });
    page.drawText(`Total value of Services Offered: €${serValue}`, { x: 50, y: 530, size: 12 });
    page.drawText(`Number of Employees: ${empNum}`, { x: 50, y: 510, size: 12 });

    const pdfBytes = await pdfDoc.save();

    fs.writeFileSync('Monthlyreport.pdf', pdfBytes);
}

module.exports =createReport;
