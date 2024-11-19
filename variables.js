export function getVariables() {
	const variables = []

	this.state?.ingestlist.items?.forEach((ingest) => {
		if (ingest) {
			variables.push({
				variableId: `ingest-${ingest.id}-name`,
				name: `Name of ingest ${ingest.name}`,
			})

			variables.push({
				variableId: `ingest-${ingest.id}-ipAddress`,
				name: `IP address of ingest ${ingest.name}`,
			})

			variables.push({
				variableId: `ingest-${ingest.id}-port`,
				name: `Port number of ingest ${ingest.name}`,
			})

			variables.push({
				variableId: `ingest-${ingest.id}-status`,
				name: `Status of ingest ${ingest.name}`,
			})

			this.setVariableValues({
				[`ingest-${ingest.id}-name`]: ingest.name,
				[`ingest-${ingest.id}-ipAddress`]: ingest.ipAddress,
				[`ingest-${ingest.id}-port`]: ingest.port,
				[`ingest-${ingest.id}-status`]: ingest.status,
			})

			if (ingest.stats) {
				variables.push({
					variableId: `ingest-${ingest.id}-cpu`,
					name: `CPU usage of ingest ${ingest.name} machine`,
				})

				variables.push({
					variableId: `ingest-${ingest.id}-ram`,
					name: `RAM usage of ingest ${ingest.name} machine`,
				})

				this.setVariableValues({
					[`ingest-${ingest.id}-cpu`]: ingest.stats.cpu,
					[`ingest-${ingest.id}-ram`]: ingest.stats.ram,
				})

				ingest.stats.hddInfo?.forEach((hddInfo) => {
					let driveName = hddInfo.name.slice(0, 1).toLowerCase()
					variables.push({
						variableId: `ingest-${ingest.id}-hdd-${driveName}`,
						name: `HDD usage of ingest ${ingest.name} machine drive ${driveName}`,
					})

					this.setVariableValues({
						[`ingest-${ingest.id}-hdd-${driveName}`]: hddInfo.percentUsed,
					})
				})
			}

			ingest.encoders?.forEach((encoder) => {
				let encoderName = this.validName(encoder.name)

				variables.push({
					variableId: `encoder-${encoderName}-${ingest.id}-name`,
					name: `Name of encoder ${ingest.name}/${encoder.name}`,
				})

				variables.push({
					variableId: `encoder-${encoderName}-${ingest.id}-status`,
					name: `Status of encoder ${ingest.name}/${encoder.name}`,
				})

				variables.push({
					variableId: `encoder-${encoderName}-${ingest.id}-status-code`,
					name: `Status code of encoder ${ingest.name}/${encoder.name}`,
				})

				this.setVariableValues({
					[`encoder-${encoderName}-${ingest.id}-name`]: encoder.name,
					[`encoder-${encoderName}-${ingest.id}-status`]: this.getEncoderStatusName(encoder.status),
					[`encoder-${encoderName}-${ingest.id}-status-code`]: encoder.status,
				})

				if (encoder.statistics) {
					variables.push({
						variableId: `encoder-${encoderName}-${ingest.id}-duration`,
						name: `Duration of encoder ${ingest.name}/${encoder.name}`,
					})

					variables.push({
						variableId: `encoder-${encoderName}-${ingest.id}-timecode`,
						name: `Timecode of encoder ${ingest.name}/${encoder.name}`,
					})

					variables.push({
						variableId: `encoder-${encoderName}-${ingest.id}-buffer`,
						name: `Buffer of encoder ${ingest.name}/${encoder.name}`,
					})

					variables.push({
						variableId: `encoder-${encoderName}-${ingest.id}-dropped`,
						name: `Dropped count of encoder ${ingest.name}/${encoder.name}`,
					})

					this.setVariableValues({
						[`encoder-${encoderName}-${ingest.id}-duration`]: encoder.statistics.durationText,
						[`encoder-${encoderName}-${ingest.id}-timecode`]: encoder.statistics.tcText,
						[`encoder-${encoderName}-${ingest.id}-buffer`]: encoder.statistics.buffer,
						[`encoder-${encoderName}-${ingest.id}-dropped`]: encoder.statistics.dropped,
					})
				}

				encoder.profiles?.forEach((profile) => {
					variables.push({
						variableId: `profile-${profile.id}-${encoderName}-${ingest.id}-name`,
						name: `Name of profile ${ingest.name}/${encoder.name}/${profile.name}`,
					})

					variables.push({
						variableId: `profile-${profile.id}-${encoderName}-${ingest.id}-status`,
						name: `Status of profile ${ingest.name}/${encoder.name}/${profile.name}`,
					})

					variables.push({
						variableId: `profile-${profile.id}-${encoderName}-${ingest.id}-status-code`,
						name: `Status code of profile ${ingest.name}/${encoder.name}/${profile.name}`,
					})

					this.setVariableValues({
						[`profile-${profile.id}-${encoderName}-${ingest.id}-name`]: profile.name,
						[`profile-${profile.id}-${encoderName}-${ingest.id}-status`]: this.getEncoderStatusName(profile.status),
						[`profile-${profile.id}-${encoderName}-${ingest.id}-status-code`]: profile.status,
					})

					if (profile.statistics) {
						variables.push({
							variableId: `profile-${profile.id}-${encoderName}-${ingest.id}-duration`,
							name: `Duration of profile ${ingest.name}/${encoder.name}/${profile.name}`,
						})

						variables.push({
							variableId: `profile-${profile.id}-${encoderName}-${ingest.id}-timecode`,
							name: `Timecode of profile ${ingest.name}/${encoder.name}/${profile.name}`,
						})

						variables.push({
							variableId: `profile-${profile.id}-${encoderName}-${ingest.id}-buffer`,
							name: `Buffer of profile ${ingest.name}/${encoder.name}/${profile.name}`,
						})

						variables.push({
							variableId: `profile-${profile.id}-${encoderName}-${ingest.id}-dropped`,
							name: `Dropped count of profile ${ingest.name}/${encoder.name}/${profile.name}`,
						})

						this.setVariableValues({
							[`profile-${profile.id}-${encoderName}-${ingest.id}-duration`]: profile.statistics.durationText,
							[`profile-${profile.id}-${encoderName}-${ingest.id}-timecode`]: profile.statistics.tcText,
							[`profile-${profile.id}-${encoderName}-${ingest.id}-buffer`]: profile.statistics.buffer,
							[`profile-${profile.id}-${encoderName}-${ingest.id}-dropped`]: profile.statistics.dropped,
						})
					}
				})
			})

			if (ingest.agentAlarms) {
				variables.push({
					variableId: `ingest-${ingest.id}-alarm-count`,
					name: `Alarm count of ingest ${ingest.name}`,
				})

				this.setVariableValues({
					[`ingest-${ingest.id}-alarm-count`]: ingest.agentAlarms.length,
				})
			}

			if (ingest.encoders) {
				variables.push({
					variableId: `ingest-${ingest.id}-encoder-count`,
					name: `Encoder count of ingest ${ingest.name}`,
				})

				variables.push({
					variableId: `ingest-${ingest.id}-running-encoder-count`,
					name: `Running encoder count of ingest ${ingest.name}`,
				})

				variables.push({
					variableId: `ingest-${ingest.id}-paused-encoder-count`,
					name: `Paused encoder count of ingest ${ingest.name}`,
				})

				let runningCount = 0
				let pausedCount = 0

				ingest.encoders?.forEach((encoder) => {
					switch (encoder.status) {
						case 2:
							++runningCount
							break
						case 3:
							++pausedCount
							break
					}
				})

				this.setVariableValues({
					[`ingest-${ingest.id}-encoder-count`]: ingest.encoders?.length,
				})

				this.setVariableValues({
					[`ingest-${ingest.id}-running-encoder-count`]: runningCount,
				})

				this.setVariableValues({
					[`ingest-${ingest.id}-paused-encoder-count`]: pausedCount,
				})
			}
		}
	})

	return variables
}
