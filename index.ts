import { createReadStream } from 'fs'
const parse = require('csv-parse')

import { optionsType, resolveType } from './types'

/** Represents a custom error
 * @extends Error
 */
class EmptyFilePath extends Error {
	/**
	 * Creates a custom error: EmptyFilePath
	 * @param {string} message - error message to be displayed
	 */
	constructor(message: string) {
		super(message)
		Object.setPrototypeOf(this, EmptyFilePath.prototype)
	}
}

/**
 * parses a csv file
 * @param {string} filePath - relative / absolute path of a file to be parsed
 * @param {Object} options - these options are provided by csv-parse package, please refer {@link https://csv.js.org/parse/options/}
 * @returns { Promise } - returns parsed data in JSON-like/Object form or as an array of strings (depends on the options passed)
 */
export function parseCSVFile(filePath: string, options: optionsType = {}) {
	return new Promise(async (resolve: (value: resolveType) => void, reject: (reason: Error) => void) => {
		// throw an exception if the filepath is empty
		if (filePath.length === 0) reject(new EmptyFilePath('Empty file path.'))

		// create read stream of the file
		const stream = createReadStream(filePath)
		const parser = parse(options) // create parser
		let output: any = []
		let byteCount: number = 0

		stream.on('data', (chunk: Buffer) => {
			byteCount += Buffer.byteLength(chunk)
			parser.write(chunk) // feed the stream into the parser
		})

		parser.on('readable', () => {
			let record
			while ((record = parser.read())) {
				output.push(record) // collect each record into output array.
			}
		})

		parser.on('end', () => {
			const { lines, records } = parser.info
			// return the output + metadata
			resolve({
				output,
				lines,
				records,
				byteCount
			})
		})

		stream.on('end', () => {
			// close the parser
			parser.end()
		})

		parser.on('error', (error: Error) => {
			reject(error)
		})

		stream.on('error', (error: Error) => {
			reject(error)
		})
	})
}
