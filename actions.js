import { parseIngestEncoderId } from './utils'

export function getActions() {
	let actions = {}

	actions['start_all_ingests'] = {
		name: 'Start All Ingests',
		options: [],
		callback: async (action) => {
			this.startAllIngests()
		},
	}

	actions['stop_all_ingests'] = {
		name: 'Stop All Ingests',
		options: [],
		callback: async (action) => {
			this.stopAllIngests()
		},
	}

	actions['pause_all_ingests'] = {
		name: 'Pause All Ingests',
		options: [],
		callback: async (action) => {
			this.pauseAllIngests()
		},
	}

	actions['split_all_ingests'] = {
		name: 'Split All Ingests',
		options: [],
		callback: async (action) => {
			this.splitAllIngests()
		},
	}

	actions['start_all_ingests_sync'] = {
		name: 'Sync Start All Ingests',
		options: [],
		callback: async (action) => {
			this.startAllIngestsSync()
		},
	}

	actions['stop_all_ingests_sync'] = {
		name: 'Sync Stop All Ingests',
		options: [],
		callback: async (action) => {
			this.stopAllIngestsSync()
		},
	}

	actions['pause_all_ingests_sync'] = {
		name: 'Sync Pause All Ingests',
		options: [],
		callback: async (action) => {
			this.pauseAllIngestsSync()
		},
	}

	actions['split_all_ingests_sync'] = {
		name: 'Sync Split All Ingests',
		options: [],
		callback: async (action) => {
			this.splitAllIngestsSync()
		},
	}

	actions['start_all_encoders'] = {
		name: 'Start All Encoders',
		options: [
			{
				type: 'dropdown',
				label: 'Ingest',
				id: 'ingestId',
				choices: this.generateIngestListActionChoices(),
			},
		],
		callback: async (action) => {
			let ingest = this.getIngestById(action.options.ingestId)
			if (ingest && ingest.controllerId) this.startAllEncoders(ingest.controllerId)
		},
	}

	actions['stop_all_encoders'] = {
		name: 'Stop All Encoders',
		options: [
			{
				type: 'dropdown',
				label: 'Ingest',
				id: 'ingestId',
				choices: this.generateIngestListActionChoices(),
			},
		],
		callback: async (action) => {
			let ingest = this.getIngestById(action.options.ingestId)
			if (ingest && ingest.controllerId) this.stopAllEncoders(ingest.controllerId)
		},
	}

	actions['pause_all_encoders'] = {
		name: 'Pause All Encoders',
		options: [
			{
				type: 'dropdown',
				label: 'Ingest',
				id: 'ingestId',
				choices: this.generateIngestListActionChoices(),
			},
		],
		callback: async (action) => {
			let ingest = this.getIngestById(action.options.ingestId)
			if (ingest && ingest.controllerId) this.pauseAllEncoders(ingest.controllerId)
		},
	}

	actions['split_all_encoders'] = {
		name: 'Split All Encoders',
		options: [
			{
				type: 'dropdown',
				label: 'Ingest',
				id: 'ingestId',
				choices: this.generateIngestListActionChoices(),
			},
		],
		callback: async (action) => {
			let ingest = this.getIngestById(action.options.ingestId)
			if (ingest && ingest.controllerId) this.splitAllEncoders(ingest.controllerId)
		},
	}

	actions['start_encoder'] = {
		name: 'Start Encoder',
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
		],
		callback: async (action) => {
			if (!action.options.id) return {}
			const result = parseIngestEncoderId(this, action.options.id)

			let ingest = result.ingest
			let encoder = result.encoder

			if (ingest && encoder) this.startEncoder(ingest.controllerId, encoder.id)
		},
	}

	actions['stop_encoder'] = {
		name: 'Stop Encoder',
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
		],
		callback: async (action) => {
			if (!action.options.id) return {}
			const result = parseIngestEncoderId(this, action.options.id)

			let ingest = result.ingest
			let encoder = result.encoder

			if (ingest && encoder) this.stopEncoder(ingest.controllerId, encoder.id)
		},
	}

	actions['pause_encoder'] = {
		name: 'Pause Encoder',
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
		],
		callback: async (action) => {
			if (!action.options.id) return {}
			const result = parseIngestEncoderId(this, action.options.id)

			let ingest = result.ingest
			let encoder = result.encoder

			if (ingest && encoder) this.pauseEncoder(ingest.controllerId, encoder.id)
		},
	}

	actions['split_encoder'] = {
		name: 'Split Encoder',
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
		],
		callback: async (action) => {
			if (!action.options.id) return {}
			const result = parseIngestEncoderId(this, action.options.id)

			let ingest = result.ingest
			let encoder = result.encoder

			if (ingest && encoder) this.splitEncoder(ingest.controllerId, encoder.id)
		},
	}

	actions['start_stop_encoder'] = {
		name: 'Start/Stop Encoder',
		options: [
			{
				type: 'dropdown',
				label: 'Encoder',
				id: 'id',
				choices: this.getAllEncodersActionChoices(),
			},
		],
		callback: async (action) => {
			if (!action.options.id) return {}
			const result = parseIngestEncoderId(this, action.options.id)

			let ingest = result.ingest
			let encoder = result.encoder

			if (ingest && encoder) {
				if (encoder.status == 1) this.startEncoder(ingest.controllerId, encoder.id)
				else this.stopEncoder(ingest.controllerId, encoder.id)
			}
		},
	}

	return actions
}
