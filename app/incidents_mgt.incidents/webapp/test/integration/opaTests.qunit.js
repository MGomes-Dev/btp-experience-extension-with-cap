sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'incidentsmgt/incidents/test/integration/FirstJourney',
		'incidentsmgt/incidents/test/integration/pages/IncidentsList',
		'incidentsmgt/incidents/test/integration/pages/IncidentsObjectPage',
		'incidentsmgt/incidents/test/integration/pages/ConversationsObjectPage'
    ],
    function(JourneyRunner, opaJourney, IncidentsList, IncidentsObjectPage, ConversationsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('incidentsmgt/incidents') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheIncidentsList: IncidentsList,
					onTheIncidentsObjectPage: IncidentsObjectPage,
					onTheConversationsObjectPage: ConversationsObjectPage
                }
            },
            opaJourney.run
        );
    }
);