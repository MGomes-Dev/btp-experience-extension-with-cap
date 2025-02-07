const LCAPApplicationService = require('@sap/low-code-event-handler');

const cds = require('@sap/cds');

class ProcessorService extends LCAPApplicationService {
    async init() {

        this.before('CREATE', 'Incidents', (request) => {
            const { data } = request;
            if (data) {
                const incidents = Array.isArray(data) ? data : [data]
                incidents.forEach(incident => {
                    if (incident.title?.toLowerCase().includes('urgent')) {
                        incident.urgency = { code: 'H' }
                    }
                })
            }
        });

        // connect to S4 backend
        const S4bupa = await cds.connect.to('API_BUSINESS_PARTNER')

        this.on('READ', 'Customers', async (request, next) => {
            console.log(`>> delegating '${request.target.name}' to S4 service...`, request.query)
            const result = await S4bupa.run(request.query)
            return result
        });

        const db = await cds.connect.to('db')                // our primary database
        const { Customers } = db.entities("incidents_mgt")  // CDS definition of the Customers entity

        this.after(['CREATE', 'UPDATE'], 'Incidents', async (results, request) => {
            const { customer_ID: ID } = results;
            if (ID) {
                console.log('>> Updating customer', ID)
                const customer = await S4bupa.read(Customers, ID) // read from remote
                await UPSERT(customer).into(Customers)          // update cache
            }
        });

        // update cache if BusinessPartner has changed
        S4bupa.on('BusinessPartner.Changed', async ({ event, data }) => {
            console.log('<< received', event, data)
            const { BusinessPartner: ID } = data
            const customer = await S4bupa.read(Customers, ID)
            await UPSERT.into(Customers).entries(customer)
        })

        return super.init();
    }
}


module.exports = {
    ProcessorService
};