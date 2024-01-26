const a = 17;
const b = 20;

export const encryptAffineCipher = (msg: string) => {
  ///Cipher Text initially empty
  let cipher = '';
  for (const element of msg) {
    // Avoid space to be encrypted
    if (element != ' ')
      /* applying encryption formula ( a x + b ) mod m
            {here x is msg[i] and m is 26} and added 'A' to 
            bring it in range of ascii alphabet[ 65-90 | A-Z ] */
      cipher =
        cipher +
        String.fromCharCode(((a * (element.charCodeAt(0) - 65) + b) % 26) + 65);
    //else simply append space character
    else cipher += element;
  }
  return cipher;
};

export const decryptAffineCipher = (cipher: string) => {
  let msg = '';
  let a_inv = 0;
  let flag = 0;

  //Find a^-1 (the multiplicative inverse of a
  //in the group of integers modulo m.)
  for (let i = 0; i < 26; i++) {
    flag = (a * i) % 26;

    //Check if (a*i)%26 == 1,
    //then i will be the multiplicative inverse of a
    if (flag == 1) {
      a_inv = i;
    }
  }
  for (const element of cipher) {
    if (element != ' ')
      /*Applying decryption formula a^-1 ( x - b ) mod m 
            {here x is cipher[i] and m is 26} and added 'A' 
            to bring it in range of ASCII alphabet[ 65-90 | A-Z ] */
      msg =
        msg +
        String.fromCharCode(
          ((a_inv * (element.charCodeAt(0) + 65 - b)) % 26) + 65,
        );
    //else simply append space character
    else msg += element;
  }

  return msg;
};
