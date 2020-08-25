const axios = require('axios');
const Excel = require('exceljs');

const { log } = console;

async function run() {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile('/data/Website-Keyword-Project-List.xlsx');
  const worksheet = workbook.getWorksheet('Company - Website - Keywords');

  const domains = {};

  worksheet.eachRow((row, rowNumber) => {
    // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
    const domain = row.getCell(2).value;
    const correctedDomain = row.getCell(3).value;

    if (correctedDomain !== null) {
      return;
    }
    domains[rowNumber] = domain;
  });

  for (const rowNumber of Object.keys(domains)) {
    const domain = domains[rowNumber];
    const correctedCell = worksheet.getRow(rowNumber).getCell(3);
    const errorCell = worksheet.getRow(rowNumber).getCell(5);

    let res;
    try {
      res = await axios.get(`http://${domain}`, { 
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36' },
        timeout: 15000,
      });
      log(rowNumber, domain, res.status, res.request.res.responseUrl);
      correctedCell.value = res.request.res.responseUrl;
    } catch (err) {
      log(rowNumber, domain, err.message);
      correctedCell.value = '-';
      errorCell.value = err.message;
    }

    if (rowNumber % 15 === 0) {
      log('Saving...');
      await workbook.xlsx.writeFile('/data/Website-Keyword-Project-List.xlsx');
    }
  }
  await workbook.xlsx.writeFile('/data/Website-Keyword-Project-List.xlsx');

  log('*End*');
}

run();
