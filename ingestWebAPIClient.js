const { InstanceStatus } = require('@companion-module/base')
const axios = require('axios')
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export let ingestRestClient = {}
export let ingestHub = {}

export function initSignalRClient(state, config, moduleInstance) {
	let connection = null
	let closedManually = false

	//#region methods

	ingestHub.connectToIngest = (id) => {
		return startedPromise.then(() => connection.invoke('ConnectToIngest', id))
	}

	ingestHub.joinToIngestGroup = (ingestControllerId) => {
		return startedPromise.then(() => connection.invoke('JoinToIngestGroup', ingestControllerId))
	}

	ingestHub.leaveFromIngestGroup = (ingestControllerId) => {
		return startedPromise.then(() => connection.invoke('LeaveFromIngestGroup', ingestControllerId))
	}

	ingestHub.joinToEncoderImageGroup = (ingestControllerId, encoderId) => {
		return startedPromise.then(() => connection.invoke('JoinToEncoderImageGroup', ingestControllerId, encoderId))
	}

	ingestHub.leaveFromEncoderImageGroup = (ingestControllerId, encoderId) => {
		return startedPromise.then(() => connection.invoke('LeaveFromEncoderImageGroup', ingestControllerId, encoderId))
	}

	ingestHub.getEncoderFrameImage = (controllerId, encoderId) => {
		return startedPromise.then(() => connection.invoke('GetEncoderFrameImage', controllerId, encoderId))
	}

	ingestHub.startEncoder = (controllerId, encoderId) => {
		return startedPromise
			.then(() => connection.invoke('StartEncoder', controllerId, encoderId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.pauseEncoder = (controllerId, encoderId) => {
		return startedPromise
			.then(() => connection.invoke('PauseEncoder', controllerId, encoderId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.stopEncoder = (controllerId, encoderId) => {
		return startedPromise
			.then(() => connection.invoke('StopEncoder', controllerId, encoderId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.splitEncoder = (controllerId, encoderId) => {
		return startedPromise
			.then(() => connection.invoke('SplitEncoder', controllerId, encoderId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.startAllEncoders = (controllerId) => {
		return startedPromise
			.then(() => connection.invoke('StartAllEncoders', controllerId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.pauseAllEncoders = (controllerId) => {
		return startedPromise
			.then(() => connection.invoke('PauseAllEncoders', controllerId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.stopAllEncoders = (controllerId) => {
		return startedPromise
			.then(() => connection.invoke('StopAllEncoders', controllerId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.splitAllEncoders = (controllerId) => {
		return startedPromise
			.then(() => connection.invoke('SplitAllEncoders', controllerId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.startAllIngests = () => {
		return startedPromise
			.then(() => connection.invoke('StartAllIngests'))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.pauseAllIngests = () => {
		return startedPromise
			.then(() => connection.invoke('PauseAllIngests'))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.stopAllIngests = () => {
		return startedPromise
			.then(() => connection.invoke('StopAllIngests'))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.splitAllIngests = () => {
		return startedPromise
			.then(() => connection.invoke('SplitAllIngests'))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.startAllIngestsSync = () => {
		return startedPromise
			.then(() => connection.invoke('StartAllIngestsSync'))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.pauseAllIngestsSync = () => {
		return startedPromise
			.then(() => connection.invoke('PauseAllIngestsSync'))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.stopAllIngestsSync = () => {
		return startedPromise
			.then(() => connection.invoke('StopAllIngestsSync'))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.splitAllIngestsSync = () => {
		return startedPromise
			.then(() => connection.invoke('SplitAllIngestsSync'))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.setTapeNameForEncoder = (controllerId, encoderId, tapeName) => {
		return startedPromise
			.then(() => connection.invoke('SetTapeNameForEncoder', controllerId, encoderId, tapeName))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.setTapeNameForProfile = (controllerId, encoderId, profileId, tapeName) => {
		return startedPromise
			.then(() => connection.invoke('SetTapeNameForProfile', controllerId, encoderId, profileId, tapeName))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.setStreamUrlForProfile = (controllerId, encoderId, profileId, streamUrl) => {
		return startedPromise
			.then(() => connection.invoke('SetStreamUrlForProfile', controllerId, encoderId, profileId, streamUrl))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.setOutputFileNameForEncoder = (controllerId, encoderId, tapeName) => {
		return startedPromise
			.then(() => connection.invoke('SetOutputFileNameForEncoder', controllerId, encoderId, tapeName))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.setOutputFileNameForProfile = (controllerId, encoderId, profileId, tapeName) => {
		return startedPromise
			.then(() => connection.invoke('SetOutputFileNameForProfile', controllerId, encoderId, profileId, tapeName))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getLicenseInfo = (controllerId) => {
		return startedPromise
			.then(() => connection.invoke('GetLicenseInfo', controllerId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getLocalSystemInfo = (controllerId) => {
		return startedPromise
			.then(() => connection.invoke('GetLocalSystemInfo', controllerId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getAppInfo = (controllerId) => {
		return startedPromise
			.then(() => connection.invoke('GetAppInfo', controllerId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getProjectList = (controllerId) => {
		return startedPromise
			.then(() => connection.invoke('GetProjectList', controllerId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getScheduleList = (controllerId, encoderId) => {
		return startedPromise
			.then(() => connection.invoke('GetScheduleList', controllerId, encoderId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.addSchedule = (controllerId, encoderId, schedule) => {
		return startedPromise
			.then(() => connection.invoke('AddSchedule', controllerId, encoderId, schedule))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.updateSchedule = (controllerId, encoderId, schedule) => {
		return startedPromise
			.then(() => connection.invoke('UpdateSchedule', controllerId, encoderId, schedule))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.removeSchedule = (controllerId, encoderId, schedule) => {
		return startedPromise
			.then(() => connection.invoke('RemoveSchedule', controllerId, encoderId, schedule))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.updateEncoderRecordingMode = (controllerId, encoderId, mode) => {
		return startedPromise
			.then(() => connection.invoke('UpdateEncoderRecordingMode', controllerId, encoderId, mode))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getSwitcherInputs = (controllerId, switcher, preset) => {
		return startedPromise
			.then(() => connection.invoke('GetSwitcherInputs', controllerId, switcher, preset))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.takeSwitcher = (controllerId, switcher, preset, sourceNo, destinationNo) => {
		return startedPromise
			.then(() => connection.invoke('TakeSwitcher', controllerId, switcher, preset, sourceNo, destinationNo))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getSwitcherOutputs = (controllerId, switcher, preset) => {
		return startedPromise
			.then(() => connection.invoke('GetSwitcherOutputs', controllerId, switcher, preset))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.runIngest = (controllerId) => {
		return startedPromise
			.then(() => connection.invoke('RunIngest', controllerId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.killIngest = (controllerId) => {
		return startedPromise
			.then(() => connection.invoke('KillIngest', controllerId))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.setStreamEnabled = (controllerId, encoderId, isEnabled) => {
		return startedPromise
			.then(() => connection.invoke('SetStreamEnabled', controllerId, encoderId, isEnabled))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.loadIngestProject = (controllerId, filePath, saveCurrentProject) => {
		return startedPromise
			.then(() => connection.invoke('LoadIngestProject', controllerId, filePath, saveCurrentProject))
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getControllerList = () => {
		return startedPromise
			.then(() => {
				return connection.invoke('GetControllerList')
			})
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getVersion = () => {
		return startedPromise
			.then(() => {
				return connection.invoke('GetVersion')
			})
			.catch((error) => {
				throw error
			})
	}

	ingestHub.searchAgentLogs = (controllerId, pageNo, sortFieldName, isDescendingOrder) => {
		return startedPromise
			.then(() => {
				return connection.invoke('SearchAgentLogs', controllerId, pageNo, sortFieldName, isDescendingOrder)
			})
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getAgentAlarms = (controllerId) => {
		return startedPromise
			.then(() => {
				return connection.invoke('GetAgentAlarms', controllerId)
			})
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getFields = (controllerId) => {
		return startedPromise
			.then(() => {
				return connection.invoke('GetFields', controllerId)
			})
			.catch((error) => {
				throw error
			})
	}

	ingestHub.getAllMetadata = (controllerId, encoderId, profileId) => {
		return startedPromise
			.then(() => {
				return connection.invoke('GetAllMetadata', controllerId, encoderId, profileId)
			})
			.catch((error) => {
				throw error
			})
	}

	ingestHub.updateMetadata = (controllerId, encoderId, profileId, value) => {
		return startedPromise
			.then(() => {
				return connection.invoke('UpdateMetadata', controllerId, encoderId, profileId, value)
			})
			.catch((error) => {
				throw error
			})
	}

	ingestHub.addMarker = (controllerId, encoderId, profileId, markerType, description) => {
		return startedPromise
			.then(() => {
				return connection.invoke('AddMarker', controllerId, encoderId, profileId, markerType, description)
			})
			.catch((error) => {
				throw error
			})
	}

	//#endregion

	let startedPromise = null

	function start() {
		moduleInstance.log('debug', 'Connecting to hub...')

		moduleInstance.updateStatus(InstanceStatus.Connecting)

		closedManually = false
		connection = buildConnection(state)
		setConnectionEvents(connection, state, ingestHub)

		startedPromise = connection
			.start()
			.then(() => {
				state.isConnected = true

				// store.dispatch('loadIngestlist', 'loading')

				moduleInstance.log('debug', 'Connected to hub.')
				moduleInstance.updateStatus(InstanceStatus.Ok)
				moduleInstance.updateModuleState()
			})
			.catch((err) => {
				moduleInstance.log('debug', err)

				state.isConnected = false

				if (err.statusCode === 401) {
					moduleInstance.updateStatus(InstanceStatus.AuthenticationFailure, 'Cannot login.')
				} else {
					moduleInstance.updateStatus(InstanceStatus.ConnectionFailure, 'Cannot connect to IngestWeb API.')
					return new Promise((resolve, reject) => {
						setTimeout(() => start().then(resolve).catch(reject), 5000)
					})
				}
			})
		return startedPromise
	}

	function stop() {
		closedManually = true
		if (connection) connection.stop()
	}

	ingestHub.startSignalRClient = () => start()
	ingestHub.stopSignalRClient = () => stop()

	function buildConnection(state) {
		return new HubConnectionBuilder()
			.withUrl(config.webAPIUrl + '/ingest', {
				accessTokenFactory: () => (state.token !== null ? state.token : ''),
			})
			.configureLogging(LogLevel.Information)
			.build()
	}

	//#region  events
	function setConnectionEvents(connection, state, ingestHub) {
		connection.on('ConnectionMade', (result) => {
			ingestRestClient.setIngestStatusByIpAddressAndPort({
				ipAddress: result.ipAddress,
				port: result.port,
				controllerId: result.controllerId,
				status: 'connected',
			})

			ingestHub.getAgentAlarms(result.controllerId).then((agentAlarms) => {
				moduleInstance.log('debug', 'Agent alarms received.')

				ingestRestClient.setIngestAgentAlarms({
					controllerId: result.controllerId,
					agentAlarms: agentAlarms,
				})
			})

			ingestHub.joinToIngestGroup(result.controllerId)
		})

		connection.on('Connecting', (result) => {
			ingestRestClient.setIngestStatusByIpAddressAndPort({
				ipAddress: result.ipAddress,
				port: result.port,
				controllerId: result.controllerId,
				status: 'connecting',
			})
		})

		connection.on('ConnectionClosed', (result) => {
			ingestRestClient.setIngestStatusByIpAddressAndPort({
				ipAddress: result.ipAddress,
				port: result.port,
				controllerId: result.controllerId,
				status: 'disconnected',
			})
		})

		connection.on('ConnectionError', (result) => {
			ingestRestClient.setIngestStatusByIpAddressAndPort({
				ipAddress: result.ipAddress,
				port: result.port,
				controllerId: result.controllerId,
				status: 'disconnected',
			})
		})

		connection.on('AppSystemInfoUpdated', (result) => {
			ingestRestClient.updateIngestStats(result)
		})

		connection.on('AppStatusInfoUpdated', (result) => {
			ingestRestClient.updateIngestStatus(result)
		})

		connection.on('StatisticsUpdated', (result) => {
			ingestRestClient.updateEncoders(result)
		})

		// connection.on('FieldListReceived', (result) => {
		// 	ingestHub.$emit('FieldListReceived', result)
		// })

		// connection.on('MetadataReceived', (result) => {
		// 	ingestHub.$emit('MetadataReceived', result)
		// })

		// connection.on('MetadataUpdated', (result) => {
		// 	ingestHub.$emit('MetadataUpdated', result)
		// })

		// connection.on('MetadataAdded', (result) => {
		// 	ingestHub.$emit('MetadataAdded', result)
		// })

		// connection.on('MetadataRemoved', (result) => {
		// 	ingestHub.$emit('MetadataRemoved', result)
		// })

		// connection.on('MetadataCleared', (result) => {
		// 	ingestHub.$emit('MetadataCleared', result)
		// })

		connection.on('EncoderFrameImageReceived', (result) => {
			ingestRestClient.setEncoderFrameImage(result)
		})

		// connection.on('SignOut', () => {
		// 	store.dispatch('signOut').then(() => {
		// 		router.push('/signin')
		// 	})
		// })

		// connection.on('LicenseInfo', (result) => {
		// 	store.dispatch('updateLicenseInfo', result)
		// 	ingestHub.$emit('LicenseInfo', result)
		// })

		connection.on('LocalSystemInfo', (result) => {
			ingestRestClient.updateLocalSystemInfo(result)
		})

		connection.on('AppInfoUpdated', (result) => {
			ingestRestClient.updateAppInfo(result)
		})

		// connection.on('ProjectListReceived', (result) => {
		// 	store.dispatch('updateProjectList', result)
		// })

		// connection.on('SwitcherPresetInfo', (result) => {
		// 	store.dispatch('updateSwitcherPresetInfo', result)
		// })

		// connection.on('CommandExecutionResult', (result) => {
		// 	ingestHub.$emit('commandExecutionResultReceived', result)
		// })

		connection.on('IngestRemoved', (id) => {
			ingestRestClient.removeIngest(id)
		})

		connection.on('IngestAdded', (ingest) => {
			ingestRestClient.addIngest(ingest)
		})

		connection.on('IngestUpdated', (ingest) => {
			ingestRestClient.updateIngest(ingest)
		})

		// connection.on('AgentLogAdded', () => {
		// 	ingestHub.$emit('AgentLogAdded')
		// })

		// connection.on('EncoderAdded', (result) => {
		// 	ingestHub.$emit('EncoderAdded', result)
		// })

		connection.on('EncoderUpdated', (result) => {
			ingestRestClient.updateEncoderName(result)
		})

		connection.on('EncoderRemoved', (result) => {
			ingestRestClient.removeEncoder(result)
		})

		connection.on('AgentAlarmsUpdated', (result) => {
			ingestHub.getAgentAlarms(result.controllerId).then((agentAlarms) => {
				ingestRestClient.setIngestAgentAlarms({
					controllerId: result.controllerId,
					agentAlarms: agentAlarms,
				})
			})
		})

		// connection.on('ScheduleListUpdated', (result) => {
		// 	store.dispatch('setScheduleList', result).then(() => {
		// 		ingestHub.$emit('ScheduleListUpdated', result)
		// 	})
		// })

		connection.onclose(() => {
			moduleInstance.updateStatus(InstanceStatus.Disconnected)
			state.isConnected = false

			if (!closedManually) start()
		})
	}

	//#endregion
}

export function initRestClient(state, config, moduleInstance) {
	axios.interceptors.request.use((setting) => {
		if (state.token) setting.headers['Authorization'] = 'Bearer ' + state.token

		return setting
	})

	ingestRestClient.login = () => {
		axios
			.post(config.webAPIUrl + '/users/login', {
				userName: config.userName,
				password: config.password,
			})
			.then(async (res) => {
				moduleInstance.log('debug', 'User logged in.')

				let token = res.data.token.token
				config.token = token
				state.token = token
				state.isAuthenticated = true

				moduleInstance.saveConfig(config)
				moduleInstance.initAPI()
			})
			.catch((err) => {
				state.isAuthenticated = false

				if (err && err.response && err.response.status && err.response.status == 400) {
					moduleInstance.log('debug', 'Cannot login.')
					moduleInstance.updateStatus(InstanceStatus.AuthenticationFailure, 'Cannot login.')
				} else {
					moduleInstance.log('debug', 'Cannot connect to IngestWeb API.')
					moduleInstance.updateStatus(InstanceStatus.ConnectionFailure, 'Cannot connect to IngestWeb API.')
				}
			})
	}

	ingestRestClient.getCurrentUserInfo = () => {
		axios
			.get(config.webAPIUrl + '/users/getcurrentuserinfo')
			.then(async (res) => {
				moduleInstance.log('debug', 'Token is valid.')
				moduleInstance.initAPI()
			})
			.catch((err) => {
				moduleInstance.log('debug', 'Invalid token.')

				moduleInstance.updateStatus(InstanceStatus.AuthenticationFailure, 'Invalid token.')
				config.token = null
				state.token = null

				moduleInstance.log('debug', 'Reinitializing...')

				moduleInstance.saveConfig(config)
				moduleInstance.init(config)
			})
	}

	ingestRestClient.setIngestlistStatus = (status) => {
		state.ingestlist.status = status
	}

	ingestRestClient.setIngestlistErrorMessage = (errorMessage) => {
		state.ingestlist.errorMessage = errorMessage
	}

	ingestRestClient.getIngestList = () => {
		ingestRestClient.setIngestlistStatus('loading')

		axios
			.get(config.webAPIUrl + '/ingests')
			.then(async (res) => {
				moduleInstance.log('debug', 'Ingest list received.')
				console.log(res.data)

				let items = res.data.map((obj) => ({
					...obj,
					status: 'disconnected',
					stats: {
						cpu: 0,
						ram: 0,
						hddInfo: [],
					},
					licenseInfo: null,
					licenseStatus: null,
					localSystemInfo: null,
					appInfo: null,
					switcherPresetInfos: [],
					encoderImages: {},
					encoders: [],
					agentAlarms: null,
				}))

				state.ingestlist.items = items
				ingestRestClient.setIngestlistStatus('loaded')
				items.forEach((ingest) => {
					ingestRestClient.retryIngestConnection(ingest.id)
				})

				moduleInstance.updateModuleState()
			})
			.catch((err) => {
				moduleInstance.log('error', 'Cannot get ingest list.')
				moduleInstance.log('error', err)
			})
	}

	ingestRestClient.setIngestStatus = (id, status) => {
		if (state.ingestlist.items === null) return

		let ingest = state.ingestlist.items.find((x) => x.id === id)
		if (!ingest) return

		ingest.status = status

		moduleInstance.updateModuleState()
	}

	ingestRestClient.setIngestControllerId = (payload) => {
		if (state.ingestlist.items === null) return

		let ingest = state.ingestlist.items.find((x) => x.id === payload.id)
		if (!ingest) return

		ingest.controllerId = payload.controllerId

		moduleInstance.updateModuleState()
	}

	ingestRestClient.setIngestStatusByIpAddressAndPort = (payload) => {
		if (state.ingestlist.items === null) return

		let ingests = state.ingestlist.items.filter((x) => x.ipAddress === payload.ipAddress && x.port === payload.port)

		ingests.forEach((ingest) => {
			ingest.status = payload.status
			ingest.controllerId = payload.controllerId
		})
	}

	ingestRestClient.updateIngestStats = (payload) => {
		if (state.ingestlist.items == null) return

		let ingests = state.ingestlist.items.filter((x) => x.controllerId == payload.controllerId)

		ingests.forEach((ingest) => {
			ingest.stats.cpu = payload.cpu
			ingest.stats.ram = payload.ram
			ingest.stats.cpuGraph = payload.cpuGraph
			ingest.stats.ramGraph = payload.ramGraph

			if (payload.hddInfo.length > 0) ingest.stats.hddInfo = payload.hddInfo
		})
	}

	ingestRestClient.updateIngestStatus = (payload) => {
		if (state.ingestlist.items == null) return

		let ingests = state.ingestlist.items.filter((x) => x.controllerId == payload.controllerId)

		ingests.forEach((ingest) => {
			ingest.appStatus = payload.statusInfo
		})
	}

	ingestRestClient.updateEncoders = (payload) => {
		if (state.ingestlist.items == null) return

		let ingests = state.ingestlist.items.filter((x) => x.controllerId == payload.controllerId)

		ingests.forEach((ingest) => {
			if (ingest) ingest.encoders = payload.encoders
		})

		moduleInstance.updateModuleState()
	}

	ingestRestClient.setEncoderFrameImage = (payload) => {
		if (state.ingestlist.items === null) return

		let ingest = state.ingestlist.items.find((x) => x.controllerId === payload.controllerId)
		if (!ingest) return

		if (ingest.encoderImages === null) ingest.encoderImages = {}

		ingest.encoderImages[payload.encoderId] = payload.base64ImageData
	}

	ingestRestClient.updateLocalSystemInfo = (payload) => {
		if (state.ingestlist.items == null) return

		let ingests = state.ingestlist.items.filter((x) => x.controllerId == payload.controllerId)

		ingests.forEach((ingest) => {
			ingest.localSystemInfo = payload.localSystemInfo
		})
	}

	ingestRestClient.updateAppInfo = (payload) => {
		if (state.ingestlist.items == null) return

		let ingests = state.ingestlist.items.filter((x) => x.controllerId == payload.controllerId)

		ingests.forEach((ingest) => {
			ingest.appInfo = payload.appInfo
		})
	}

	ingestRestClient.removeIngest = (id) => {
		if (state.ingestlist.items == null) return

		let index = state.ingestlist.items.findIndex(function (i) {
			return i.id === id
		})

		if (index < 0) return

		state.ingestlist.items.splice(index, 1)

		moduleInstance.updateModuleState()
	}

	ingestRestClient.addIngest = (ingest) => {
		if (state.ingestlist.items == null) {
			state.ingest.items = []
		}

		let item = {
			...ingest,
			status: 'disconnected',
			stats: {
				cpu: 0,
				ram: 0,
				hddInfo: [],
				cpuGraph: [],
				ramGraph: [],
			},
			licenseInfo: null,
			licenseStatus: {
				isLicensed: true,
				status: 1,
			},
			localSystemInfo: null,
			appInfo: null,
			switcherPresetInfos: [],
			encoderImages: {},
			agentAlarms: null,
		}

		let index = state.ingestlist.items.findIndex(function (i) {
			return i.id === item.id
		})

		if (index >= 0) return

		state.ingestlist.items.push(item)

		moduleInstance.updateModuleState()
	}

	ingestRestClient.updateIngest = (ingest) => {
		if (state.ingestlist.items == null) return

		let currentIngest = state.ingestlist.items.find((x) => x.id == ingest.id)
		if (!currentIngest) return

		let index = state.ingestlist.items.findIndex((x) => x.id == ingest.id)

		if (index < 0) return

		let item = {
			...currentIngest,
			...ingest,
		}

		state.ingestlist.items[index] = item

		moduleInstance.updateModuleState()
	}

	ingestRestClient.updateEncoderName = (payload) => {
		if (state.ingestlist.items == null) return

		let ingests = state.ingestlist.items.filter((x) => x.controllerId == payload.controllerId)

		ingests.forEach((ingest) => {
			let encoder = ingest.encoders.find((x) => x.id == payload.encoderId)

			if (!encoder) return null

			encoder.name = payload.encoderName
		})

		moduleInstance.updateModuleState()
	}

	ingestRestClient.removeEncoder = (payload) => {
		if (state.ingestlist.items == null) return

		let ingest = state.ingestlist.items.find((x) => x.controllerId == payload.controllerId)

		if (!ingest) return

		let index = ingest.encoders.findIndex(function (i) {
			return i.id === payload.encoderId
		})

		if (index < 0) return

		ingest.encoders.splice(index, 1)

		moduleInstance.updateModuleState()
	}

	ingestRestClient.setIngestAgentAlarms = (payload) => {
		if (state.ingestlist.items == null) return

		let ingests = state.ingestlist.items.filter((x) => x.controllerId == payload.controllerId)

		ingests.forEach((ingest) => {
			ingest.agentAlarms = payload.agentAlarms
		})
	}

	ingestRestClient.retryIngestConnection = (id) => {
		moduleInstance.log('debug', 'Connecting to ingest with id ' + id)

		if (state.ingestlist === null || state.ingestlist.items === null) return

		let ingest = state.ingestlist.items.find((x) => x.id === id)
		if (!ingest) return

		if (ingest.status === 'connecting' || ingest.status === 'connected') return

		ingestRestClient.setIngestStatus(id, 'connecting')
		ingestHub
			.connectToIngest(ingest.id)
			.then((result) => {
				moduleInstance.log('debug', 'Connected to ingest controller id ' + result.controllerId)
				ingestRestClient.setIngestControllerId({
					id,
					controllerId: result.controllerId,
				})
			})
			.catch((error) => {
				ingestRestClient.setIngestStatus(id, 'disconnected')
				moduleInstance.log('error', error)
			})
	}

	ingestRestClient.setIngestAgentAlarms = (payload) => {
		if (state.ingestlist.items == null) return

		let ingests = state.ingestlist.items.filter((x) => x.controllerId == payload.controllerId)

		ingests.forEach((ingest) => {
			ingest.agentAlarms = payload.agentAlarms
		})
	}
}
