import { parseCSVFile } from '../index'

parseCSVFile('./cities.csv', { trim: true })
	.then(data => {
		console.log(`Field/Header names: `, data.output[0])
		console.log(`Number of lines: `, data.lines)
		console.log(`Number of records: `, data.records)
		console.log(`Bytes parsed: `, data.byteCount)
	})
	.catch(error => {
		console.log(error.message)
	})
