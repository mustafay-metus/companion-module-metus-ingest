export function convertRGBAtoARGB(color) {
	const r = (color & 0xff000000) >>> 8
	const g = (color & 0x00ff0000) >>> 8
	const b = (color & 0x0000ff00) >>> 8
	const a = (color & 0x000000ff) << 24

	return (a | r | g | b) >>> 0
}

export function parseIngestEncoderId(context, id) {
	let parts = id.split('/')
	if (parts.length != 2) return null

	let ingestId = parts[0]
	let encoderName = parts[1]

	let ingest = context.getIngestById(ingestId)
	let encoder = context.getEncoderByNameAndIngestId(encoderName, ingestId)

	return {
		ingest,
		encoder,
	}
}
