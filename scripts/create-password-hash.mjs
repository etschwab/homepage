import { hash } from "@node-rs/argon2";

const password = process.argv[2];

if (!password || password.length < 12) {
  console.error("Usage: npm run auth:hash -- \"your-strong-password\"");
  console.error("The password must be at least 12 characters long.");
  process.exit(1);
}

const passwordHash = await hash(password, {
  memoryCost: 19456,
  outputLen: 32,
  parallelism: 1,
  timeCost: 2,
});

console.log(passwordHash);
