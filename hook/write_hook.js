function(ctx, callback) {
    // Function to generate a random password
    function generateRandomPassword() {
      const length = 12;
      
      // Define the characters we need in the password
      const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
      const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';
      
      // Ensure at least one character from each required set is included
      let password = '';
      password += lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
      password += upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
      password += numbers[Math.floor(Math.random() * numbers.length)];
      password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
      
      // Fill the remaining password length with random characters from all sets
      const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;
      
      for (let i = password.length; i < length; i++) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
      }
      
      // Shuffle the password to ensure randomness
      password = password.split('').sort(() => 0.5 - Math.random()).join('');
      
      return password;
    }
  
    // Create a new profile object, generating a random password
    var newProfile = {
      email: ctx.payload.email,
      password: generateRandomPassword(), 
      connection: ctx.payload.connection,
      user_metadata: ctx.payload.user_metadata,
      app_metadata: {
        ...ctx.payload.app_metadata
      }
    };
  
    if (ctx.method === 'update') {
      // If updating, only set the fields we need to send
      Object.keys(newProfile).forEach(function(key) {
        if (newProfile[key] === ctx.request.originalUser[key]) delete newProfile[key];
      });
    }
  
    // This is the payload that will be sent to API v2. You have full control over how the user is created in API v2.
    return callback(null, newProfile);
  }
  