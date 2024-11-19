## Metus Technology Ingest Controller

This module allows you to control [Metus Ingest](https://www.metus.com/metus-ingest/) using the [IngestWeb API](https://metuskb.atlassian.net/wiki/spaces/INGEST/pages/3182559237/Metus+IngestWEB+Controller).

### Configuration

- Install IngestWeb.
- You need to specify a user to control Metus Ingest. Login to IngestWeb with the admin user and browse to the Users page.
- Create a new user. Change this user's role to Operator.
- Open the module configuration in Companion. Enter the IngestWeb API URL. The default port for the API is 5000. Eg: http://10.7.10.42:5000
- Enter the credentials of the newly created user. You don't need to fill the token field, it will be set automatically.
- Save your configuration. The module should connect to the IngestWeb API.
