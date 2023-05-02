## [Story:](https://civicplus.tpondemand.com/RestUI/Board.aspx#page=board/4700871645113644934&appConfig=eyJhY2lkIjoiRDVFRTNFODg3NkIzNTM2MzVEQkU0RkVGRDg4Q0FCQUEifQ==&boardPopup=userstory/139923/silent)
#### AC:
- all current environments will be setup as stages in our pipeline process
- we can deploy code using the new pipeline processes in DevOps
##### Specifically:
- deploy pipeline for each dev slot
- build pipeline to build master again and deploy to QA (what we have been referencing as "production")

*build pipeline is required and dev/deploy pipelines are optional in PR

## To do
- Ask for permissions to change the main branch policy.
	- Remove check for linked work items
	- Add build validations policies _see question 1_
- 

## Implementation:
- Use linux agents _this will help with speed_

## Notes:
- Focus on speed

## Questions (5 max unanswered):
- What are the branch policies we need?
	- "Build validation" branch policies
	- We will only need one required and that is to build, which will be the smaller portion of whatever main.yaml is. This will build, run tests, migrations, etc.
	- We will then have 4 optional pipelines for releasing to one of the dev sites.
	- __*Pipelines need to be made first*__
- How many pipelines will we need? Look into meetings for this?
	- Main - this is everything except swapping staging and prod. _nuget restore to publishing to staging_
	- Release Dev1-4 - Four different pipelines that can use a base yaml file _meetings does that_
	- Release Production - This will just swap staging and prod
- Which stages will be needed?
	- Main
		- Build - build, run tests, migrations, publish, etc.
		- DeployQA - This will be done on the condition that the PR is completed.
		- DeployStaging - This will be done on the condition that this stage is approved. _The approvals are setup through the pipeline environments_
	- Release Dev1-4 - Single stage
	- Release Production - Single stage
- Can all the commands we need be ran with linux
	- I think for SPSv2 we might be in the clear with this - I'll just need to ad hoc check honestly.
- What projects will need to be published?
	- Municode.Library.AzureFunctions
	- Municode.Library.Api
	- Municode.Library.SPA
-  What about the document processor?
	- Municode.DocumentProcessor.API
	- AccessibilizeWorker
	- Municode.DocumentProcessor.OcrWorker
	- Municode.DocumentProcessor.BackgroundFunctions
- Which environments should be created for the pipelines?
	- Development - It's okay to have the dev sites share an azure environment
	- Quality Assurance
	- Staging
	- Production
- What now? Let's look at the pipe and take check of all we need. After this maybe put it through GPT?
	- Main
		- [[trigger]]
			- Meetings uses master (main)
		- [[pool]]
			- Meetings uses windows
			- We want to use linux to see how it speeds things up
		- [[stages]]
			- [[stage]] - Build
			- [[jobs]]
				- [[job]]
					- steps
						- task: UseDotNet@2
						- task: Nuget things
						- task: Run front end things such as npm
						- task: Run unit tests
						- task: Run migrations
						- task: Publish projects
						- task: Special commands to create run.exe for continous web jobs
						- task: PublishPipelineArtifact@1
			- [[stage]] - Deploy QA
			- [[condition]] - and(succeeded(), eq(variables['Build.SourceBranchName'], 'master'))
			- [[dependsOn]] - Build
			- [[jobs]]
				- [[job]]
					- steps
						- _Do we need to use UseDotNet@2 again?_
						- [[deployment]] - Projects? _they can probably all be in the one_
						- [[environment]] - Quality Assurance
						- strategy > runOnce > deploy > steps
						- checkout - self
							- task: Migrations
							- task: AzureWebApp@1
							- task: AzureRmWebAppDeployment@4
			- [[stage]] - Deploy Staging
			- [[condition]] - and(succeeded(), eq(variables['Build.SourceBranchName'], 'master'))
			- [[dependsOn]] - Deploy QA
			- [[jobs]]
				- [[job]]
					- steps
						- _Do we need to use UseDotNet@2 again?_
						- [[deployment]] - Projects? _they can probably all be in the one_
						- [[environment]] - Staginge (approval check)
						- strategy > runOnce > deploy > steps
						- checkout - self
							- task: Migrations
							- task: AzureWebApp@1
							- task: AzureRmWebAppDeployment@4
	- Build Dev1-4 (5 pipelines all together)
		### Dev1-4
		- [[trigger]]: none
		- [[pool]]
			- Meetings uses windows
			- We want to use linux to see how it speeds things up
		- extends:
			- template: release-dev-slot.yml
			-  parameters:
				- slotNumber: 3
		### Deploy-dev-slot
		- parameters:
		- name: slotNumber
		- type: number
		- values:
			- 1
			- 2
			- 3
			- 4
		- [[jobs]]:
		- [[deployment]] - Projects? _they can probably all be in the one_
						- [[environment]] - Development 
						- strategy > runOnce > deploy > steps
						- checkout - self
							- task: DownloadPipelineArtifact@2
							- task: AzureWebApp@1
							- task: AzureRmWebAppDeployment@4
	- Production 
		- [[jobs]]:
		- [[deployment]] - Projects? _they can probably all be in the one_
						- [[environment]] - Production
						- strategy > runOnce > deploy > steps
						- checkout - self
							- task: AzureAppServiceManage@0 (swaps)