import { getVariables } from './variables.js'
import { getActions } from './actions.js'
import { getPresets } from './presets.js'
import { getFeedbacks } from './feedbacks.js'
import { parseIngestEncoderId } from './utils'

const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')

const { ingestRestClient, ingestHub, initRestClient, initSignalRClient } = require('./ingestWebAPIClient')

class ModuleInstance extends InstanceBase {
	pendingJoinToEncoderImageGroupRequests = []

	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.updateStatus(InstanceStatus.Connecting)

		this.initState()
		this.config = config
		this.state.token = config.token

		this.updateModuleState()
		initRestClient(this.state, config, this)
		initSignalRClient(this.state, config, this)

		if (!config.token) {
			this.log('debug', 'No token found. Trying to login with credentials...')
			ingestRestClient.login()
		} else {
			this.log('debug', 'Token found. Checking if it is valid...')
			ingestRestClient.getCurrentUserInfo()
		}
	}

	async destroy() {
		this.log('debug', 'destroy')
		ingestHub.stopSignalRClient()
	}

	async configUpdated(config) {
		this.log('debug', 'Configuration changed. Reinitializing...')

		this.config = config
		this.state.token = config.token

		this.init(config)
	}

	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'webAPIUrl',
				label: 'IngestWeb API URL',
				width: 12,
			},
			{
				type: 'textinput',
				id: 'userName',
				label: 'User Name',
				width: 6,
			},
			{
				type: 'textinput',
				id: 'password',
				label: 'Password',
				width: 6,
			},
			{
				type: 'static-text',
				id: 'tokenInfo',
				label: '',
				width: 12,
				value: 'Token will be set automatically. Just enter your credentials and save your configuration.',
			},
			{
				type: 'textinput',
				id: 'token',
				label: 'Token',
				width: 12,
			},
		]
	}

	updateActions() {
		const actions = getActions.bind(this)()
		this.setActionDefinitions(actions)
	}

	updatePresets() {
		const presets = getPresets.bind(this)()
		this.setPresetDefinitions(presets)
	}

	updateFeedbacks() {
		const feedbacks = getFeedbacks.bind(this)()
		this.setFeedbackDefinitions(feedbacks)
	}

	updateVariableDefinitions() {
		const variables = getVariables.bind(this)()
		this.setVariableDefinitions(variables)
	}

	initState() {
		this.state = {
			isConnected: false,
			isAuthenticated: false,
			user: null,
			token: null,
			ingestlist: {
				status: 'idle',
				items: null,
				errorMessage: null,
			},
		}
	}

	async initAPI() {
		ingestHub.startSignalRClient().then(async () => {
			let version = await ingestHub.getVersion()
			this.log('info', 'IngestWEB API version: ' + version)

			await ingestRestClient.getIngestList()
		})
	}

	updateModuleState() {
		this.updateVariableDefinitions()
		this.updateActions()
		this.updateFeedbacks()
		this.checkFeedbacks()
		this.updatePresets()
	}

	validName(name) {
		try {
			return name.replace(/[\W]/gi, '_')
		} catch (error) {
			this.log('debug', `Unable to generate validName for ${name}: ${error}`)
			return name
		}
	}

	getEncoderStatusName(statusCode) {
		switch (statusCode) {
			case 1:
				return 'stopped'
			case 2:
				return 'running'
			case 3:
				return 'paused'
			default:
				return 'na'
		}
	}

	defineVariable(variableId, name, value) {
		this.setVariableDefinitions([
			{
				variableId: variableId,
				name: name,
			},
		])

		this.setVariableValues({
			[variableId]: value,
		})
	}

	async startAllIngests() {
		ingestHub.startAllIngests()
	}

	async stopAllIngests() {
		ingestHub.stopAllIngests()
	}

	async pauseAllIngests() {
		ingestHub.pauseAllIngests()
	}

	async splitAllIngests() {
		ingestHub.splitAllIngests()
	}

	async startAllIngestsSync() {
		ingestHub.startAllIngestsSync()
	}

	async stopAllIngestsSync() {
		ingestHub.stopAllIngestsSync()
	}

	async pauseAllIngestsSync() {
		ingestHub.pauseAllIngestsSync()
	}

	async splitAllIngestsSync() {
		ingestHub.splitAllIngestsSync()
	}

	async startAllEncoders(controllerId) {
		ingestHub.startAllEncoders(controllerId)
	}

	async stopAllEncoders(controllerId) {
		ingestHub.stopAllEncoders(controllerId)
	}

	async pauseAllEncoders(controllerId) {
		ingestHub.pauseAllEncoders(controllerId)
	}

	async splitAllEncoders(controllerId) {
		ingestHub.splitAllEncoders(controllerId)
	}

	async startEncoder(controllerId, encoderId) {
		ingestHub.startEncoder(controllerId, encoderId)
	}

	async stopEncoder(controllerId, encoderId) {
		ingestHub.stopEncoder(controllerId, encoderId)
	}

	async pauseEncoder(controllerId, encoderId) {
		ingestHub.pauseEncoder(controllerId, encoderId)
	}

	async splitEncoder(controllerId, encoderId) {
		ingestHub.splitEncoder(controllerId, encoderId)
	}

	generateIngestListActionChoices() {
		return this.state.ingestlist && this.state.ingestlist.items
			? this.state.ingestlist.items.map((ingest) => {
					return {
						id: ingest.id,
						label: ingest.name,
					}
				})
			: []
	}

	getEncodersByIngestControllerId(controllerId) {
		if (!controllerId) return null

		if (!this.state.ingestlist.items) return null

		let ingest = this.state.ingestlist.items.find((x) => x.controllerId == controllerId)
		if (!ingest || !ingest.encoders) return null

		return ingest.encoders
	}

	getIngestById(id) {
		if (!this.state.ingestlist.items) return null

		return this.state.ingestlist.items.find((x) => x.id == id)
	}

	getEncoderByIngestControllerId(controllerId, encoderId) {
		if (!this.state.ingestlist.items) return null

		let ingest = this.state.ingestlist.items.find((x) => x.controllerId == controllerId)
		if (!ingest || !ingest.encoders) return null

		return ingest.encoders.find((x) => x.id == encoderId)
	}

	getAllEncoders() {
		if (!this.state.ingestlist.items) return null
		let result = []
		this.state.ingestlist?.items?.forEach((ingest) => {
			if (ingest.encoders) {
				ingest.encoders.forEach((encoder) =>
					result.push({
						...encoder,
						ingest: ingest,
					}),
				)
			}
		})

		return result
	}

	getEncoderByNameAndIngestId(name, ingestId) {
		let ingest = this.getIngestById(ingestId)
		if (!ingest || !ingest.encoders) return

		return ingest.encoders.find((x) => x.name === name)
	}

	getAllEncodersActionChoices() {
		let encoders = this.getAllEncoders()
		if (!encoders) return null
		return encoders.map((encoder) => {
			return {
				// encoder id can change between sessions. Use name instead.
				id: encoder.ingest.id + '/' + encoder.name,
				label: encoder.ingest.name + '/' + encoder.name,
			}
		})
	}

	getAllHDDInfos() {
		if (!this.state.ingestlist.items) return null
		let result = []
		this.state.ingestlist.items.forEach((ingest) => {
			if (ingest.stats && ingest.stats.hddInfo)
				ingest.stats.hddInfo.forEach((hddInfo) =>
					result.push({
						...hddInfo,
						ingest: ingest,
					}),
				)
		})

		return result
	}

	getAllHDDInfosActionChoices() {
		let hddInfos = this.getAllHDDInfos()
		if (!hddInfos) return null

		return hddInfos.map((hddInfo) => {
			let driveName = hddInfo.name.slice(0, 1).toLowerCase()

			return {
				id: hddInfo.ingest.id + '/' + driveName,
				label: hddInfo.ingest.name + '/' + driveName.toUpperCase(),
			}
		})
	}

	getHDDInfo(ingest, driveName) {
		return ingest.stats?.hddInfo?.find((hddInfo) => {
			let drive = hddInfo.name.slice(0, 1).toLowerCase()
			return driveName === drive
		})
	}

	joinToEncoderImageGroup(encoder, ingest) {
		ingestHub.joinToEncoderImageGroup(ingest.controllerId, encoder.id)
	}

	leaveFromEncoderImageGroup(encoder, ingest) {
		ingestHub.leaveFromEncoderImageGroup(ingest.controllerId, encoder.id)
	}

	addJoinToEncoderImageGroupRequest(id) {
		const exists = this.pendingJoinToEncoderImageGroupRequests.some((x) => x === id)
		if (exists) return

		this.pendingJoinToEncoderImageGroupRequests.push(id)
	}

	processJoinToEncoderImageGroupRequest() {
		for (let i = this.pendingJoinToEncoderImageGroupRequests.length - 1; i >= 0; i--) {
			const id = this.pendingJoinToEncoderImageGroupRequests[i]

			const result = parseIngestEncoderId(this, id)

			let ingest = result.ingest
			let encoder = result.encoder

			if (!ingest || !encoder) continue

			this.pendingJoinToEncoderImageGroupRequests.splice(i, 1)
			this.subscribeFeedbacks('encoder-preview')
		}
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
