async function(ctx, callback) {
    const auth0Domain = ""; // Replace with your Auth0 domain
    const clientId = ""; // Replace with your Auth0 client ID
    const clientSecret = ""; // Replace with your Auth0 client secret
      const axios = require('axios');
    const userFieldsUrl = "https://raw.githubusercontent.com/NinaNedjar/dae_translation/main/user_fields_en.json";
  
    try {
      // 1. Fetch userFields JSON from the provided URL
      const userFieldsResponse = await axios.get(userFieldsUrl);
      let userFieldsJson = userFieldsResponse.data;
  
      // 2. Obtain a Management API token
      const tokenResponse = await axios.post('https://' + auth0Domain + '/oauth/token', {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        audience: 'https://' + auth0Domain + '/api/v2/'
      });
  
      const accessToken = tokenResponse.data.access_token;
  
      // 3. Use the token to get all the clients (applications) in your tenant
      const clientsResponse = await axios.get('https://' + auth0Domain + '/api/v2/clients', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      const clients = clientsResponse.data;
     
  
      // 4. Iterate over each client and add fields to userFields if the client has a technical_name
      clients.forEach(client => {
        let label;
        let technical_name;
        if(client['client_metadata']){
          label = client['client_metadata']['label'];
          technical_name = client['client_metadata']['technical_name'];
        }
        if (label && technical_name) {
          ctx.log("update fileds");
          ctx.log(label);
          ctx.log(technical_name);
          // Add a new field for each client with technical_name
          userFieldsJson.push({
            label: label, // Fallback label if not present
            property: `app_metadata.${technical_name}`,
            display: true,
            create: {
              required: true,
              display: true,
              type: "select",
              component: "InputCombo",
              options: [
                { value: "true", label: "Grant Access" },
                { value: "false", label: "Forbid Access" }
              ]
            }
          });
        }
      });
  
      // 5. Build the configuration object and call the callback
      const configuration = {
        userFields: userFieldsJson,
        canCreateUser: true,
        suppressRawData: true
      };
  
      ctx.log("Conf: ", configuration); // Logging the configuration for debugging
      callback(null, configuration);
    } catch (error) {
      ctx.log("Error: ", error);
      callback(error);
    }
  }
  