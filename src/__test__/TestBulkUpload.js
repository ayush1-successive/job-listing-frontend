import axios from "axios";

class TestBulkUpload {
  constructor() {
    this.testRecordId = "";
    this.uniqueSuffix = `${Date.now()}`;
  }

  insertFakeEntry = async () => {
    try {
      this.testRecordId = "";

      const response = await axios.post("http://localhost:8080/bulk-upload", {
        filename: `Test File - ${this.uniqueSuffix}`,
        status: "running",
        time: 1122,
        successfulEntries: 0,
        failedEntries: 0,
        entriesCompleted: 0,
        totalEntries: 0,
        errorDetails: ['Error-1', 'Error-2', 'Error-3']
      });

      this.testRecordId = response.data.data._id;
    } catch (error) {
      console.log("error inserting fake user entry!", error);
    }
  };

  id = () => {
    return this.testRecordId;
  };
}

export default TestBulkUpload;
