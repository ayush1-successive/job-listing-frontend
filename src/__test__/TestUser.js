import axios from "axios";

class TestUser {
  constructor() {
    this.testUserId = "";
    this.testUserToken = "";
    this.uniqueSuffix = `${Date.now()}`;
  }

  insertFakeEntry = async () => {
    try {
      this.testUserId = "";

      await axios.post("http://localhost:8080/users/register", {
        name: "Test User",
        password: "user@123",
        email: this.email(),
      });

      const response = await axios.post(`http://localhost:8080/users/login`, {
        email: this.email(),
        password: "user@123",
      });

      this.testUserId = response.data.data.existingUser._id;
      this.testUserToken = response.data.data.token;
    } catch (error) {
      console.log("error inserting fake user entry!", error.message);
    }
  };

  deleteFakeEntry = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/users/login`, {
        email: this.email(),
        password: "user@123",
      });

      this.testUserId = response.data.data.existingUser._id;

      await axios.delete(`http://localhost:8080/users/${this.testUserId}`, {
        headers: {
          Authorization: `Bearer ${this.token()}`,
        },
      });
      this.testUserId = "";
      this.testUserToken = "";
    } catch (error) {
      console.log("error deleting fake user entry!", error.message);
    }
  };

  userId = () => {
    return this.testUserId;
  };

  token = () => {
    return this.testUserToken;
  };

  name = () => {
    return "Test User";
  };

  email = () => {
    return `user-${this.uniqueSuffix}@test.com`;
  };

  password = () => {
    return "user@123";
  };
}

export default TestUser;
