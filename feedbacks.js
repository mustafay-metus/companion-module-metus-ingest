import { combineRgb } from '@companion-module/base'
import { HorizontalAlign, Jimp, loadFont } from 'jimp'
import { convertRGBAtoARGB, parseIngestEncoderId } from './utils'
import { SANS_8_WHITE } from 'jimp/fonts'

export function getFeedbacks() {
	if (this.pendingJoinToEncoderImageGroupRequests.length > 0) this.processJoinToEncoderImageGroupRequest()

	const feedbacks = {}

	const colorWhite = combineRgb(255, 255, 255)
	const colorGray = combineRgb(72, 72, 72)
	const colorBlack = combineRgb(0, 0, 0)
	const colorRed = combineRgb(244, 67, 54)
	const colorGreen = combineRgb(46, 125, 50)
	const colorOrange = combineRgb(245, 124, 0)
	const colorYellow = combineRgb(204, 204, 0)

	feedbacks['cpu-usage'] = {
		type: 'boolean',
		name: 'CPU Usage',
		description: 'If CPU usage is high, change the style of the button.',
		defaultStyle: {
			color: colorWhite,
			bgcolor: colorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Ingest',
				id: 'ingestId',
				choices: this.generateIngestListActionChoices(),
			},
			{
				type: 'number',
				label: 'Usage limit',
				id: 'limit',
				default: 90,
				min: 0,
				max: 100,
				range: true,
			},
		],
		callback: async (feedback, context) => {
			let limit = feedback.options.limit
			let ingestId = feedback.options.ingestId
			let ingest = this.getIngestById(ingestId)
			return ingest?.stats?.cpu >= limit
		},
	}

	feedbacks['ram-usage'] = {
		type: 'boolean',
		name: 'RAM Usage',
		description: 'If RAM usage is high, change the style of the button.',
		defaultStyle: {
			color: colorWhite,
			bgcolor: colorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Ingest',
				id: 'ingestId',
				choices: this.generateIngestListActionChoices(),
			},
			{
				type: 'number',
				label: 'Usage limit',
				id: 'limit',
				default: 90,
				min: 0,
				max: 100,
				range: true,
			},
		],
		callback: async (feedback, context) => {
			let limit = feedback.options.limit
			let ingestId = feedback.options.ingestId
			let ingest = this.getIngestById(ingestId)
			return ingest?.stats?.ram >= limit
		},
	}

	feedbacks['hdd-usage'] = {
		type: 'boolean',
		name: 'HDD Usage',
		description: 'If HDD usage is high, change the style of the button.',
		defaultStyle: {
			color: colorWhite,
			bgcolor: colorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Drive',
				id: 'drive',
				choices: this.getAllHDDInfosActionChoices(),
			},
			{
				type: 'number',
				label: 'Usage limit',
				id: 'limit',
				default: 90,
				min: 0,
				max: 100,
				range: true,
			},
		],
		callback: async (feedback, context) => {
			let parts = feedback.options.drive.split('/')
			if (parts.length != 2) return

			let ingestId = parts[0]
			let driveName = parts[1]

			let limit = feedback.options.limit
			let ingest = this.getIngestById(ingestId)
			if (!ingest) return false

			let hddInfo = this.getHDDInfo(ingest, driveName)
			if (!hddInfo) return false

			return hddInfo.percentUsed >= limit
		},
	}

	feedbacks['encoder-status'] = {
		type: 'advanced',
		name: 'Encoder Status',
		description: 'Change the style of the button according to the encoder status.',
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
			{
				type: 'colorpicker',
				label: 'Stopped foreground color',
				id: 'fgStopped',
				default: colorWhite,
			},
			{
				type: 'colorpicker',
				label: 'Stopped background color',
				id: 'bgStopped',
				default: colorBlack,
			},
			{
				type: 'colorpicker',
				label: 'Running foreground color',
				id: 'fgRunning',
				default: colorWhite,
			},
			{
				type: 'colorpicker',
				label: 'Running background color',
				id: 'bgRunning',
				default: colorRed,
			},
			{
				type: 'colorpicker',
				label: 'Paused foreground color',
				id: 'fgPaused',
				default: colorWhite,
			},
			{
				type: 'colorpicker',
				label: 'Paused background color',
				id: 'bgPaused',
				default: colorOrange,
			},
		],
		callback: async (feedback, context) => {
			const id = feedback.options.id
			if (!id) return {}
			const result = parseIngestEncoderId(this, id)
			let encoder = result.encoder

			if (encoder) {
				switch (encoder.status) {
					case 1:
						return { color: feedback.options.fgStopped, bgcolor: feedback.options.bgStopped }
					case 2:
						return { color: feedback.options.fgRunning, bgcolor: feedback.options.bgRunning }
					case 3:
						return { color: feedback.options.fgPaused, bgcolor: feedback.options.bgPaused }
					default:
						return {}
				}
			} else {
				return {}
			}
		},
	}

	feedbacks['alarm-count'] = {
		type: 'boolean',
		name: 'Alarm Count',
		description: 'Change the style of the button if alarm count reaches the limit.',
		defaultStyle: {
			color: colorWhite,
			bgcolor: colorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Ingest',
				id: 'ingestId',
				choices: this.generateIngestListActionChoices(),
			},
			{
				type: 'number',
				label: 'Limit',
				id: 'limit',
				default: 1,
				min: 0,
			},
		],
		callback: async (feedback, context) => {
			let limit = feedback.options.limit
			let ingestId = feedback.options.ingestId
			let ingest = this.getIngestById(ingestId)
			return ingest?.agentAlarms?.length >= limit
		},
	}

	feedbacks['encoder-start-stop-button-text'] = {
		type: 'advanced',
		name: 'Encoder Start/Stop',
		description: 'Change the text of the button according to the encoder status.',
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
			{
				type: 'textinput',
				label: 'Started button text',
				id: 'txtStarted',
				default: 'Stop',
			},
			{
				type: 'textinput',
				label: 'Not started button text',
				id: 'txtNotStarted',
				default: 'Start',
			},
		],
		callback: async (feedback, context) => {
			const id = feedback.options.id
			if (!id) return {}
			const result = parseIngestEncoderId(this, id)
			let encoder = result.encoder

			if (encoder) {
				switch (encoder.status) {
					case 1:
						return { text: feedback.options.txtNotStarted }
					case 2:
					case 3:
						return { text: feedback.options.txtStarted }
					default:
						return {}
				}
			} else {
				return {}
			}
		},
	}

	feedbacks['buffer-value'] = {
		type: 'boolean',
		name: 'Buffer Value',
		description: 'If buffer value is high, change the style of the button.',
		defaultStyle: {
			color: colorWhite,
			bgcolor: colorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
			{
				type: 'number',
				label: 'Limit',
				id: 'limit',
				default: 60,
				range: false,
			},
		],
		callback: async (feedback, context) => {
			let limit = feedback.options.limit
			const id = feedback.options.id
			if (!id) return {}

			const result = parseIngestEncoderId(this, id)
			let encoder = result.encoder

			return encoder?.statistics?.buffer >= limit
		},
	}

	feedbacks['dropped-count'] = {
		type: 'boolean',
		name: 'Dropped Count',
		description: 'If dropped count is high, change the style of the button.',
		defaultStyle: {
			color: colorWhite,
			bgcolor: colorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
			{
				type: 'number',
				label: 'Limit',
				id: 'limit',
				default: 1,
				range: false,
			},
		],
		callback: async (feedback, context) => {
			let limit = feedback.options.limit

			const id = feedback.options.id
			if (!id) return {}
			const result = parseIngestEncoderId(this, id)
			let encoder = result.encoder

			return encoder?.statistics?.dropped >= limit
		},
	}

	// feedbacks['cpu-bar'] = {
	// 	type: 'advanced',
	// 	name: 'CPU Usage Bar',
	// 	description: 'Shows CPU usage with a vertical bar.',
	// 	options: [
	// 		{
	// 			type: 'dropdown',
	// 			label: 'Ingest',
	// 			id: 'ingestId',
	// 			choices: this.generateIngestListActionChoices(),
	// 		},
	// 	],
	// 	callback: (feedback) => {
	// 		let ingestId = feedback.options.ingestId
	// 		let ingest = this.getIngestById(ingestId)

	// 		const options = {
	// 			width: feedback.image.width,
	// 			height: feedback.image.height,
	// 			colors: [
	// 				{ size: 50, color: combineRgb(0, 255, 0), background: combineRgb(0, 255, 0), backgroundOpacity: 64 },
	// 				{ size: 25, color: combineRgb(255, 255, 0), background: combineRgb(255, 255, 0), backgroundOpacity: 64 },
	// 				{ size: 25, color: combineRgb(255, 0, 0), background: combineRgb(255, 0, 0), backgroundOpacity: 64 },
	// 			],
	// 			barLength: 62,
	// 			barWidth: 6,

	// 			value: ingest?.stats?.cpu,

	// 			type: 'vertical',
	// 			offsetX: 64,
	// 			offsetY: 5,
	// 			opacity: 255,
	// 		}

	// 		return {
	// 			//imageBuffer: graphics.bar(options),
	// 		}
	// 	},
	// }

	feedbacks['encoder-preview'] = {
		type: 'advanced',
		name: 'Encoder Preview',
		description: 'Shows encoder preview.',
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
			{
				type: 'checkbox',
				label: 'Show bottom bar',
				id: 'showBottomBar',
				default: true,
			},
			{
				type: 'colorpicker',
				label: 'Stopped foreground color',
				id: 'fgStopped',
				default: colorWhite,
			},
			{
				type: 'colorpicker',
				label: 'Stopped background color',
				id: 'bgStopped',
				default: colorBlack,
			},
			{
				type: 'colorpicker',
				label: 'Running foreground color',
				id: 'fgRunning',
				default: colorWhite,
			},
			{
				type: 'colorpicker',
				label: 'Running background color',
				id: 'bgRunning',
				default: colorRed,
			},
			{
				type: 'colorpicker',
				label: 'Paused foreground color',
				id: 'fgPaused',
				default: colorWhite,
			},
			{
				type: 'colorpicker',
				label: 'Paused background color',
				id: 'bgPaused',
				default: colorOrange,
			},
		],
		callback: async (feedback, context) => {
			const id = feedback.options.id
			if (!id) return {}
			const result = parseIngestEncoderId(this, id)

			let ingest = result.ingest
			let encoder = result.encoder

			if (!ingest || !encoder) return {}

			let base64Image = ingest.encoderImages[encoder.id]
			if (!base64Image) return {}

			const imageBuffer = Buffer.from(base64Image, 'base64')
			const image = await Jimp.read(imageBuffer)

			const targetWidth = feedback?.image?.width ?? 72
			const targetHeight = feedback?.image?.height ?? 72

			image.resize({ w: targetWidth, h: targetHeight })

			if (feedback.options.showBottomBar) {
				let backgroundColor
				switch (encoder.status) {
					case 1:
						backgroundColor = feedback.options.bgStopped
						break
					case 2:
						backgroundColor = feedback.options.bgRunning
						break
					case 3:
						backgroundColor = feedback.options.bgPaused
						break
					default:
						backgroundColor = colorBlack
				}

				// backgroundColor is rgb, convert it to rgba.
				const barColor = (255 + (backgroundColor << 8)) >>> 0

				// draw bottom bar.
				const barHeight = 18
				image.scan((x, y, idx) => {
					if (y > targetHeight - barHeight) image.setPixelColor(barColor, x, y)
				})

				// const font = await loadFont(SANS_8_WHITE)
				// const duration = encoder?.statistics?.durationText
				// image.print({ font, x: 0, y: 54, text: duration, alignmentX: HorizontalAlign.CENTER, maxWidth: 72 })
			}

			const finalBuffer = Buffer.alloc(targetWidth * targetHeight * 4)
			image.scan((x, y, idx) => {
				const color = image.getPixelColor(x, y)
				// color data is rgba. convert it to argb.
				const argb = convertRGBAtoARGB(color)
				finalBuffer.writeUInt32BE(argb, idx)
			})

			let textColor
			switch (encoder.status) {
				case 1:
					textColor = feedback.options.fgStopped
					break
				case 2:
					textColor = feedback.options.fgRunning
					break
				case 3:
					textColor = feedback.options.fgPaused
					break
				default:
					textColor = colorWhite
			}

			return {
				imageBuffer: finalBuffer,
				color: textColor,
			}
		},
		subscribe: async (feedback) => {
			const id = feedback.options.id
			if (!id) return {}
			const result = parseIngestEncoderId(this, id)

			let ingest = result.ingest
			let encoder = result.encoder

			if (ingest && encoder) {
				this.joinToEncoderImageGroup(encoder, ingest)
			} else {
				this.addJoinToEncoderImageGroupRequest(id)
			}
		},
		unsubscribe: async (feedback) => {
			const id = feedback.options.id
			if (!id) return {}
			const result = parseIngestEncoderId(this, id)

			let ingest = result.ingest
			let encoder = result.encoder

			if (ingest && encoder) {
				this.leaveFromEncoderImageGroup(encoder, ingest)
			}
		},
	}

	feedbacks['cpu-graph'] = {
		type: 'advanced',
		name: 'CPU Graph',
		description: 'CPU Graph of the Ingest machine.',
		options: [
			{
				type: 'dropdown',
				label: 'Ingest',
				id: 'ingestId',
				choices: this.generateIngestListActionChoices(),
			},
			{
				type: 'colorpicker',
				label: 'Fill color',
				id: 'fillColor',
				default: colorWhite,
			},
		],

		callback: async (feedback, context) => {
			let ingestId = feedback.options.ingestId
			let ingest = this.getIngestById(ingestId)

			if (!ingest?.stats?.cpuGraph) return {}

			const targetWidth = feedback?.image?.width ?? 72
			const targetHeight = feedback?.image?.height ?? 72
			const finalBuffer = generateGraphImage(
				ingest.stats.cpuGraph,
				targetWidth,
				targetHeight,
				feedback.options.fillColor,
			)

			return {
				imageBuffer: finalBuffer,
			}
		},
	}

	feedbacks['ram-graph'] = {
		type: 'advanced',
		name: 'RAM Graph',
		description: 'RAM Graph of the Ingest machine.',
		options: [
			{
				type: 'dropdown',
				label: 'Ingest',
				id: 'ingestId',
				choices: this.generateIngestListActionChoices(),
			},
			{
				type: 'colorpicker',
				label: 'Fill color',
				id: 'fillColor',
				default: colorWhite,
			},
		],

		callback: async (feedback, context) => {
			let ingestId = feedback.options.ingestId
			let ingest = this.getIngestById(ingestId)

			if (!ingest?.stats?.ramGraph) return {}

			const targetWidth = feedback?.image?.width ?? 72
			const targetHeight = feedback?.image?.height ?? 72
			const finalBuffer = generateGraphImage(
				ingest.stats.ramGraph,
				targetWidth,
				targetHeight,
				feedback.options.fillColor,
			)

			return {
				imageBuffer: finalBuffer,
			}
		},
	}

	feedbacks['encoder-profiles-buffer-values'] = {
		type: 'advanced',
		name: 'Encoder Profiles Buffer Values',
		description: 'Shows the encoder and its profiles buffer values.',
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
		],
		callback: async (feedback, context) => {
			let limit = feedback.options.limit
			const id = feedback.options.id
			if (!id) return {}

			const result = parseIngestEncoderId(this, id)
			let encoder = result.encoder

			if (!encoder?.profiles || !encoder?.statistics) return {}

			let text = encoder.name + '\n'
			text += encoder.statistics.buffer

			encoder.profiles?.forEach((profile) => {
				if (profile.statistics) {
					text += '-' + profile.statistics.buffer
				}
			})

			return {
				text: text,
			}
		},
	}

	return feedbacks
}

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max)
}

function generateGraphImage(graph, targetWidth, targetHeight, color) {
	const finalBuffer = Buffer.alloc(targetWidth * targetHeight * 4)
	const fillColor = 255 * Math.pow(2, 24) + color

	let pointsNeeded = targetWidth - graph.length
	while (pointsNeeded > 0) {
		for (let i = 0; i < graph.length; i++) {
			if (i == graph.length - 1) break

			const diff = Math.abs(graph[i + 1] - graph[i])
			if (diff < 10 || i == graph.length - 2) {
				const half = (graph[i + 1] + graph[i]) / 2
				graph.splice(i + 1, 0, half)
				pointsNeeded--
				i++
			}
			if (pointsNeeded <= 0) break
		}
	}

	const graphLength = graph.length

	for (let x = targetWidth - 1; x >= 0; x--) {
		const graphIndex = x
		if (graphIndex >= graphLength) continue

		const data = graph[graphIndex]
		const pointY = clamp(targetHeight - Math.round((data / 100) * targetHeight), 0, targetHeight - 1)

		for (let y = targetHeight - 1; y > pointY; y--) {
			const bufferIndex = y * targetWidth + x
			finalBuffer.writeUInt32BE(fillColor, bufferIndex * 4)
		}
	}

	return finalBuffer
}
