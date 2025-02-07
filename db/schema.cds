namespace incidents_mgt;

using { API_BUSINESS_PARTNER as S4 } from 's4-bupa-integration/bupa';

using
{
    sap.common.CodeList,
    cuid,
    managed
}
from '@sap/cds/common';

entity Incidents : cuid, managed
{
    title : String
        @title : 'Title';
    conversations : Composition of many Conversations on conversations.incidents = $self;
    status : Association to one Status;
    urgency : Association to one Urgency;
    customer : Association to one Customers;
}

entity Conversations : cuid, managed
{
    timestamp : DateTime;
    author : String(100);
    message : String;
    incidents : Association to one Incidents;
}

entity Status : CodeList
{
    key code : String;
}

entity Urgency : CodeList
{
    key code : String;
}

@cds.persistence.table
entity Customers as
    projection on S4.A_BusinessPartner
    {
        /**
         * Key identifying a business partner in the SAP system. The key is unique within a client.
         */
        BusinessPartner as ID,
        BusinessPartnerFullName as name
    };
