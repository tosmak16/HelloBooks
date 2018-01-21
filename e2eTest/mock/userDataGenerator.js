
export const userDataGenerator = {
  username: `user${Math.floor(Math.random(100) * 100000).toString()}`,
  email: `user${Math.floor(Math.random(100) * 1000000000).toString()}@gmail.com`,
  password: `user${Math.floor(Math.random(100) * 1000000000).toString()}`
};
export default userDataGenerator;
