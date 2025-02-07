using { incidents_mgt as my } from '../db/schema.cds';

@path: '/service/StatisticsService'
service StatisticsService {
    @odata.draft.enabled
    entity StatisticsService as
        projection on my.Incidents {
            title, // expose as-is
            status.name                             as status, // expose with alias name using a path expression

            modifiedAt || ' (' || modifiedBy || ')' as modified          : String,
            count(
                conversations.ID
            )                                       as conversationCount : Integer
        }
        where
            urgency.code = 'H' // filter
        group by
            ID // needed for count()
}

annotate StatisticsService with @requires: ['authenticated-user'];
