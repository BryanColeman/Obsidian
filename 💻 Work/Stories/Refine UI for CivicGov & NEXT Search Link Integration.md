As a public user, I want to click a button instead of a link to access the integration, so it stands out against the rest of the text and can easily be identified in mobile view. 

I will know that this is complete when:

-   a card/container is present on the product landing page for each integration (replicate the look and feel found here: [Arvada, CO | Municode Library](https://library.municode.com/co/arvada)
-   the container displays a button and a one-sentence description of the purpose of the button
    -   For Essential:
        -   Description on container above: "Access meeting agendas, minutes, and video recordings for (client name)."
        -   Header name: "Meetings Essential"
        -   Button text: "View" (aria text = View Meetings Essential)
    -   For CivicGov:
        -   Description on container above: "Access code enforcement, permitting, and licensing for (client name)." 
        -   Header name: "CivicGov"
        -   Button text: "View" (aria text = View code enforcement, permitting, and licensing for (client name).

##### Implementation:
- Cards should be reactive to the width of the device
	- Mobile should be stacked
	- Maybe 2-3 as the max width


##### Links:
[Example (Prod change to dev)](https://library.municode.com/fl/madeira_beach/codes/code_of_ordinances)
[Change Integrations (Prod change to dev)](https://admin.municode.com/clientintegrations)
