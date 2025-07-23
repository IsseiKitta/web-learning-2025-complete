const bcrypt = require("bcryptjs");

async function testHash() {
  const password = "password";
  const hash = await bcrypt.hash(password, 10);
  console.log("ハッシュ化:", hash);
}

testHash();
