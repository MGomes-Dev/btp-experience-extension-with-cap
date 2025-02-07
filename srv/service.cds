using { incidents_mgt as my } from '../db/schema.cds';

@path : '/service/ProcessorService'
service ProcessorService
{
    @odata.draft.enabled
    entity Incidents as
        projection on my.Incidents;

    entity Customers as
        projection on my.Customers;
}

annotate ProcessorService with @requires :
[
    'authenticated-user'
];
