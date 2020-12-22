import { parseCSVFile } from '../index'

test('Empty path / No such file or directory', async () => {
	await expect(parseCSVFile('')).rejects.toThrow('Empty file path.')
	await expect(parseCSVFile('./abc.csv')).rejects.toThrow()
})

test('Returns an array of string arrays(header, values)', async () => {
	const data = [
		['Username', 'Identifier', 'First name', 'Last name'],
		['booker12', '9012', 'Rachel', 'Booker'],
		['grey07', '2070', 'Laura', 'Grey'],
		['johnson81', '4081', 'Craig', 'Johnson'],
		['jenkins46', '9346', 'Mary', 'Jenkins'],
		['smith79', '5079', 'Jamie', 'Smith']
	]
	const result = await parseCSVFile('username.csv')
	expect(result.output).toStrictEqual(data)
	expect(result.lines).toBe(6)
	expect(result.records).toBe(6)
	expect(result.byteCount).toBe(173)
})
