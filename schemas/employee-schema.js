export const employeeSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Generated schema for Root",
  type: "object",
  properties: {
    _id: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    dateOfBirth: {
      type: "string",
    },
    startDate: {
      type: "string",
    },
    department: {
      type: "string",
    },
    jobTitle: {
      type: "string",
    },
    email: {
      type: "string",
    },
    mobile: {
      type: "string",
    },
    address: {
      type: "string",
    },
    baseSalary: {
      type: "number",
    },
  },
  required: [
    "_id",
    "firstName",
    "lastName",
    "dateOfBirth",
    "startDate",
    "department",
    "jobTitle",
    "email",
    "mobile",
    "address",
    "baseSalary",
  ],
}
