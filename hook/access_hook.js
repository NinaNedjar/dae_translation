async function (ctx, callback) {
  const unavailable_actions = ['change:username', 'change:email', 'change:password', 'reset:password'];

  
  if (unavailable_actions.includes(ctx.payload.action)) {
      return callback(new Error('Cette action n\'est pas possible depuis la DAE.'));
  }

  if (ctx.payload.action === 'send:verification-email') {
    try{
        const axios = require('axios');
        const auth0Domain = "sebia-dev.eu.auth0.com";
        await axios.patch(
            'https://' + auth0Domain + '/dbconnections/change_password',
            {email: ctx.payload.user.email,
            connection: "db-customers"}
        );
      }catch(err){
        ctx.log(err);
      }
  }


  return callback();
}