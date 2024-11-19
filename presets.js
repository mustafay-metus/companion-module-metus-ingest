import { combineRgb } from '@companion-module/base'

export function getPresets() {
	let presets = {}

	const colorWhite = combineRgb(255, 255, 255)
	const colorGray = combineRgb(72, 72, 72)
	const colorBlack = combineRgb(0, 0, 0)
	const colorRed = combineRgb(244, 67, 54)
	const colorGreen = combineRgb(46, 125, 50)
	const colorOrange = combineRgb(245, 124, 0)
	const colorYellow = combineRgb(204, 204, 0)

	presets['startAllIngests'] = {
		type: 'button',
		category: 'Global',
		name: 'Start All Ingests',
		style: {
			text: 'Start\\nAll\\nIngests',
			size: 'auto',
			color: colorWhite,
			bgcolor: colorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'start_all_ingests',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['stopAllIngests'] = {
		type: 'button',
		category: 'Global',
		name: 'Stop All Ingests',
		style: {
			text: 'Stop\\nAll\\nIngests',
			size: 'auto',
			color: colorWhite,
			bgcolor: colorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'stop_all_ingests',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['pauseAllIngests'] = {
		type: 'button',
		category: 'Global',
		name: 'Pause All Ingests',
		style: {
			text: 'Pause\\nAll\\nIngests',
			size: 'auto',
			color: colorWhite,
			bgcolor: colorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'pause_all_ingests',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['splitAllIngests'] = {
		type: 'button',
		category: 'Global',
		name: 'Split All Ingests',
		style: {
			text: 'Split\\nAll\\nIngests',
			size: 'auto',
			color: colorWhite,
			bgcolor: colorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'split_all_ingests',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['startAllIngestsSync'] = {
		type: 'button',
		category: 'Global',
		name: 'Sync Start All Ingests',
		style: {
			text: 'Sync Start\\nAll\\nIngests',
			size: 'auto',
			color: colorWhite,
			bgcolor: colorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'start_all_ingests_sync',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['stopAllIngestsSync'] = {
		type: 'button',
		category: 'Global',
		name: 'Sync Stop All Ingests',
		style: {
			text: 'Sync Stop\\nAll\\nIngests',
			size: 'auto',
			color: colorWhite,
			bgcolor: colorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'stop_all_ingests_sync',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['pauseAllIngestsSync'] = {
		type: 'button',
		category: 'Global',
		name: 'Sync Pause All Ingests',
		style: {
			text: 'Sync Pause\\nAll\\nIngests',
			size: 'auto',
			color: colorWhite,
			bgcolor: colorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'pause_all_ingests_sync',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['splitAllIngestsSync'] = {
		type: 'button',
		category: 'Global',
		name: 'Sync Split All Ingests',
		style: {
			text: 'Sync Split\\nAll\\nIngests',
			size: 'auto',
			color: colorWhite,
			bgcolor: colorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'split_all_ingests_sync',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	this.state?.ingestlist.items?.forEach((ingest) => {
		if (!ingest) return

		presets[`ingest-${ingest.id}`] = {
			category: 'Ingest',
			name: ingest.name,
			type: 'text',
			text: '',
		}

		presets[`startAllEncoders-${ingest.id}`] = {
			type: 'button',
			category: 'Ingest',
			name: `Start All Encoders of ${ingest.name}`,
			style: {
				text: `$(ingest-controller:ingest-${ingest.id}-name)\\nStart\\nAll`,
				size: 'auto',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'start_all_encoders',
							options: {
								ingestId: ingest.id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`stopAllEncoders-${ingest.id}`] = {
			type: 'button',
			category: 'Ingest',
			name: `Stop All Encoders of ${ingest.name}`,
			style: {
				text: `$(ingest-controller:ingest-${ingest.id}-name)\\nStop\\nAll`,
				size: 'auto',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'stop_all_encoders',
							options: {
								ingestId: ingest.id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`pauseAllEncoders-${ingest.id}`] = {
			type: 'button',
			category: 'Ingest',
			name: `Pause All Encoders of ${ingest.name}`,
			style: {
				text: `$(ingest-controller:ingest-${ingest.id}-name)\\nPause\\nAll`,
				size: 'auto',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pause_all_encoders',
							options: {
								ingestId: ingest.id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`splitAllEncoders-${ingest.id}`] = {
			type: 'button',
			category: 'Ingest',
			name: `Split All Encoders of ${ingest.name}`,
			style: {
				text: `$(ingest-controller:ingest-${ingest.id}-name)\\nSplit\\nAll`,
				size: 'auto',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'split_all_encoders',
							options: {
								ingestId: ingest.id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`cpuUsage-${ingest.id}`] = {
			type: 'button',
			category: 'Ingest',
			name: `CPU usage of ${ingest.name}`,
			style: {
				text: `$(ingest-controller:ingest-${ingest.id}-name)\\nCPU\\n$(ingest-controller:ingest-${ingest.id}-cpu)%`,
				size: 'auto',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'cpu-usage',
					options: {
						ingestId: ingest.id,
						limit: 90,
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}

		presets[`ramUsage-${ingest.id}`] = {
			type: 'button',
			category: 'Ingest',
			name: `RAM usage of ${ingest.name}`,
			style: {
				text: `$(ingest-controller:ingest-${ingest.id}-name)\\nRAM\\n$(ingest-controller:ingest-${ingest.id}-ram)%`,
				size: 'auto',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'ram-usage',
					options: {
						ingestId: ingest.id,
						limit: 90,
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}

		ingest.stats?.hddInfo?.forEach((hddInfo) => {
			let driveName = hddInfo.name.slice(0, 1).toLowerCase()
			presets[`hddUsage-${ingest.id}-${driveName}`] = {
				type: 'button',
				category: 'Ingest',
				name: `HDD ${driveName.toUpperCase()} usage of ${ingest.name}`,
				style: {
					text: `$(ingest-controller:ingest-${ingest.id}-name)\\nHDD ${driveName.toUpperCase()}\\n$(ingest-controller:ingest-${ingest.id}-hdd-${driveName})%`,
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'hdd-usage',
						options: {
							drive: ingest.id + '/' + driveName,
							limit: 90,
						},
						style: {
							color: colorWhite,
							bgcolor: colorRed,
						},
					},
				],
			}
		})

		presets[`cpuGraph-${ingest.id}`] = {
			type: 'button',
			category: 'Ingest',
			name: `CPU graph of ${ingest.name}`,
			style: {
				text: `CPU: $(ingest-controller:ingest-${ingest.id}-cpu)%`,
				size: 14,
				color: colorWhite,
				bgcolor: colorBlack,
				alignment: 'center:top',
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'cpu-usage',
					options: {
						ingestId: ingest.id,
						limit: 90,
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
				{
					feedbackId: 'cpu-graph',
					options: {
						ingestId: ingest.id,
						fillColor: colorWhite,
					},
				},
			],
		}

		presets[`ramGraph-${ingest.id}`] = {
			type: 'button',
			category: 'Ingest',
			name: `RAM graph of ${ingest.name}`,
			style: {
				text: `RAM: $(ingest-controller:ingest-${ingest.id}-ram)%`,
				size: 14,
				color: colorWhite,
				bgcolor: colorBlack,
				alignment: 'center:top',
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'ram-usage',
					options: {
						ingestId: ingest.id,
						limit: 90,
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
				{
					feedbackId: 'ram-graph',
					options: {
						ingestId: ingest.id,
						fillColor: colorWhite,
					},
				},
			],
		}

		if (ingest.agentAlarms) {
			presets[`alarm-count-${ingest.id}`] = {
				type: 'button',
				category: 'Ingest',
				name: `Alarm count of ${ingest.name}`,
				style: {
					text: `$(ingest-controller:ingest-${ingest.id}-name)\\nAlarms\\n$(ingest-controller:ingest-${ingest.id}-alarm-count)`,
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'alarm-count',
						options: {
							ingestId: ingest.id,
							limit: 1,
						},
						style: {
							color: colorWhite,
							bgcolor: colorRed,
						},
					},
				],
			}
		}

		ingest.encoders?.forEach((encoder) => {
			let validEncoderName = this.validName(encoder.name)

			presets[`ingest-${ingest.id}-encoders-${validEncoderName}`] = {
				category: 'Encoder',
				name: ingest.name + ' / ' + encoder.name,
				type: 'text',
				text: '',
			}

			presets[`start-encoder-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Start ${encoder.name}`,
				style: {
					text: `Start\\n$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-name)`,
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'start_encoder',
								options: {
									id: ingest.id + '/' + encoder.name,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'encoder-status',
						options: {
							id: ingest.id + '/' + encoder.name,
							fgStopped: colorWhite,
							bgStopped: colorBlack,
							fgRunning: colorWhite,
							bgRunning: colorRed,
							fgPaused: colorWhite,
							bgPaused: colorOrange,
						},
					},
				],
			}

			presets[`stop-encoder-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Stop ${encoder.name}`,
				style: {
					text: `Stop\\n$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-name)`,
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'stop_encoder',
								options: {
									id: ingest.id + '/' + encoder.name,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'encoder-status',
						options: {
							id: ingest.id + '/' + encoder.name,
							fgStopped: colorWhite,
							bgStopped: colorBlack,
							fgRunning: colorWhite,
							bgRunning: colorRed,
							fgPaused: colorWhite,
							bgPaused: colorOrange,
						},
					},
				],
			}

			presets[`pause-encoder-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Pause ${encoder.name}`,
				style: {
					text: `Pause\\n$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-name)`,
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'pause_encoder',
								options: {
									id: ingest.id + '/' + encoder.name,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'encoder-status',
						options: {
							id: ingest.id + '/' + encoder.name,
							fgStopped: colorWhite,
							bgStopped: colorBlack,
							fgRunning: colorWhite,
							bgRunning: colorRed,
							fgPaused: colorWhite,
							bgPaused: colorOrange,
						},
					},
				],
			}

			presets[`split-encoder-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Split ${encoder.name}`,
				style: {
					text: `Split\\n$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-name)`,
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'split_encoder',
								options: {
									id: ingest.id + '/' + encoder.name,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'encoder-status',
						options: {
							id: ingest.id + '/' + encoder.name,
							fgStopped: colorWhite,
							bgStopped: colorBlack,
							fgRunning: colorWhite,
							bgRunning: colorRed,
							fgPaused: colorWhite,
							bgPaused: colorOrange,
						},
					},
				],
			}

			presets[`start-stop-encoder-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Start/Stop ${encoder.name}`,
				style: {
					text: `Start ${encoder.name}`,
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'start_stop_encoder',
								options: {
									id: ingest.id + '/' + encoder.name,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'encoder-status',
						options: {
							id: ingest.id + '/' + encoder.name,
							fgStopped: colorWhite,
							bgStopped: colorBlack,
							fgRunning: colorWhite,
							bgRunning: colorRed,
							fgPaused: colorWhite,
							bgPaused: colorOrange,
						},
					},
					{
						feedbackId: 'encoder-start-stop-button-text',
						options: {
							id: ingest.id + '/' + encoder.name,
							txtStarted: `Stop ${encoder.name}`,
							txtNotStarted: `Start ${encoder.name}`,
						},
					},
				],
			}

			presets[`duration-encoder-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Duration of ${encoder.name}`,
				style: {
					text: `$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-name)\\nDuration\\n$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-duration)`,
					size: 14,
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'encoder-status',
						options: {
							id: ingest.id + '/' + encoder.name,
							fgStopped: colorWhite,
							bgStopped: colorBlack,
							fgRunning: colorWhite,
							bgRunning: colorRed,
							fgPaused: colorWhite,
							bgPaused: colorOrange,
						},
					},
				],
			}

			presets[`timecode-encoder-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Timecode of ${encoder.name}`,
				style: {
					text: `$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-name)\\nTimecode\\n$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-timecode)`,
					size: 14,
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'encoder-status',
						options: {
							id: ingest.id + '/' + encoder.name,
							fgStopped: colorWhite,
							bgStopped: colorBlack,
							fgRunning: colorWhite,
							bgRunning: colorRed,
							fgPaused: colorWhite,
							bgPaused: colorOrange,
						},
					},
				],
			}

			presets[`buffer-encoder-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Buffer value of ${encoder.name}`,
				style: {
					text: `$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-name)\\nBuffer\\n$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-buffer)`,
					size: 14,
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'buffer-value',
						options: {
							id: ingest.id + '/' + encoder.name,
							limit: 60,
						},
						style: {
							color: colorWhite,
							bgcolor: colorRed,
						},
					},
				],
			}

			presets[`dropped-encoder-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Dropped count of ${encoder.name}`,
				style: {
					text: `$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-name)\\nDropped\\n$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-dropped)`,
					size: 14,
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'dropped-count',
						options: {
							id: ingest.id + '/' + encoder.name,
							limit: 1,
						},
						style: {
							color: colorWhite,
							bgcolor: colorRed,
						},
					},
				],
			}

			presets[`encoder-preview-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Preview ${encoder.name}`,
				style: {
					text: `$(ingest-controller:encoder-${validEncoderName}-${ingest.id}-duration)`,
					size: 14,
					color: colorWhite,
					bgcolor: colorBlack,
					show_topbar: false,
					alignment: 'center:bottom',
				},
				steps: [
					{
						down: [],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'encoder-preview',
						options: {
							id: ingest.id + '/' + encoder.name,
							showBottomBar: true,
							fgStopped: colorWhite,
							bgStopped: colorBlack,
							fgRunning: colorWhite,
							bgRunning: colorRed,
							fgPaused: colorWhite,
							bgPaused: colorOrange,
						},
					},
				],
			}

			presets[`encoder-profiles-buffer-values-${ingest.id}-${validEncoderName}`] = {
				type: 'button',
				category: 'Encoder',
				name: `Buffer of ${encoder.name} profiles`,
				style: {
					size: 14,
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'encoder-profiles-buffer-values',
						options: {
							id: ingest.id + '/' + encoder.name,
						},
					},
				],
			}
		})
	})

	return presets
}
