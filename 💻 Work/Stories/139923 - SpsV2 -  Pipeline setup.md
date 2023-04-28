### [Story:](https://civicplus.tpondemand.com/RestUI/Board.aspx#page=board/4700871645113644934&appConfig=eyJhY2lkIjoiRDVFRTNFODg3NkIzNTM2MzVEQkU0RkVGRDg4Q0FCQUEifQ==&boardPopup=userstory/139923/silent)

#### AC:
- all current environments will be setup as stages in our pipeline process
- we can deploy code using the new pipeline processes in DevOps
##### Specifically:
- deploy pipeline for each dev slot
- build pipeline to build master again and deploy to QA (what we have been referencing as "production")

*build pipeline is required and dev/deploy pipelines are optional in PR

### To do:
- Ask for permissions to change the main branch policy.
	- Remove check for linked work items
	- 

### Implementation:
- Use linux agents _this will help with speed_

### Questions (5 max unanswered):
- What are the branch policies we need?
	- "Build validation" branch policies
	- We will only need one required and that is to build, which will be the smaller portion of whatever main.yaml is. This will build, run tests, migrations, etc.
	- 
- How many pipelines will we need? Look into meetings for this?
- Which stages will be needed?
- Can all the commands we need be ran with linux
- What projects will need to be published?

### Notes:
- Focus on speed

