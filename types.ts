export type resolveType = {
	output: any
	lines: number
	records: number
	byteCount: number
}

type contextType = {
	column: number | string
	empty_lines: number
	header: boolean
	index: number
	invalid_field_length: number
	lines: number
	quoting: boolean
	records: number
}

export type optionsType =
	| {
			bom: boolean
			cast: boolean | ((value: string, context: contextType) => any)
			cast_date: boolean | ((value: string, context: contextType) => any)
			columns: boolean | string[] | ((header: string[]) => string[])
			columns_duplicates_to_array: boolean
			comment: string | Buffer
			delimiter: string | Buffer | string[] | Buffer[]
			encoding: string | Buffer
			escape: string | Buffer
			from: number
			from_line: number
			info: boolean
			ltrim: boolean
			max_record_size: number
			objname: string | Buffer
			on_record: (record: string, context: contextType) => string | null | undefined
			quote: string | Buffer | boolean
			raw: boolean
			record_delimiter: string | string[]
			relax: boolean
			relax_column_count: boolean
			relax_column_count_less: boolean
			relax_column_count_more: boolean
			rtrim: boolean
			skip_empty_lines: boolean
			skip_lines_with_empty_values: boolean
			skip_lines_with_error: boolean
			to: number
			to_line: number
			trim: boolean
	  }
	| {}
