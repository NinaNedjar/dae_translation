function(ctx, callback) {
    const axios = require('axios');
    const userFieldsUrl = "https://raw.githubusercontent.com/NinaNedjar/dae_translation/main/user_fields_fr.json";
  
    axios.get(userFieldsUrl)
      .then((response) => {
        const userFieldsJson = response.data;
        const configuration = {
          userFields : userFieldsJson,   
          languageDictionary:  "https://raw.githubusercontent.com/NinaNedjar/dae_translation/main/translation_fr.json",
          canCreateUser: true,
          suppressRawData: true
        };
  
        ctx.log("Conf : ", configuration);
        callback(null, configuration);
      })
      .catch((error) => {
        ctx.log("Error : ", error);
        callback(error);
      });
  }