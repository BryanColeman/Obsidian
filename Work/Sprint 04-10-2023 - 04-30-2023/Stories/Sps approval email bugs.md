_this story is almost finished - starting this note late_

##### Implementation:
- Create two new Razor Views. One for the approval email and one for the attest email for proposals. These prevent Safe Links from making the server call since the user will now have another button to click on the Razor View.
- Created a LoggedOutLayout for the two new email pages. _since we aren't logging the users in on the new Razor Views_
-  Simplified the ApprovalEmailModel to only get the absolute info we need. The new ContactInfo property will be the whole last line now.
	- Created a extension class for string validation. The first method that was added was validating if the string is an email.
	- Added a helper class for getting an emails contact info at the bottom. Giving less and less info until it's blank if needed. _this is based on the data we have at the time of the user_
- Updated the Email constructor that takes a list of email to addresses. This will now remove empty, null or duplicate emails which was cause problems.

# Reference:
[#145213](https://civicplus.tpondemand.com/RestUI/Board.aspx#page=board/4700871645113644934&appConfig=eyJhY2lkIjoiRDVFRTNFODg3NkIzNTM2MzVEQkU0RkVGRDg4Q0FCQUEifQ==&boardPopup=userstory/145213/silent)
