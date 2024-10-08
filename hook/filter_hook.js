function(ctx, callback) {
    // Get the department from the current user's metadata.
    var groups = ctx.request.user.groups
    if (groups.includes("SG_CIAM_Global_AMSSupport") || groups.includes("SG_CIAM_Global_ExportSalesAdmin")) {
      return callback(null, 'identities.provider:"auth0"');
    }
      let country = "";
    if( groups.includes("SG_CIAM_DE_SalesAdmin") ){
      country = "DE";
    }else if( groups.includes("SG_CIAM_AT_SalesAdmin") ){
      country = "AT";
    }else{
      country = "FR";
    }
    return callback(null, 'app_metadata.country:"' + country + '"');
  
  }