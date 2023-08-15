const { faker } = require("@faker-js/faker");

export const createEmployeeData = {
     firstName: faker.person.firstName(),
     lastName: faker.person.lastName(),
     dateOfBirth: faker.date.between({from: '1950-01-01', to: '2005-12-31'}).toISOString().split('T')[0],
     startDate: faker.date.between({from: '1950-01-01', to: '2005-12-31'}).toISOString().split('T')[0],
     department: faker.person.jobArea(),
     jobTitle: faker.person.jobTitle(),
     email: faker.internet.email(),
     mobile: faker.phone.number(),
     address: faker.location.secondaryAddress(),
     baseSalary: parseInt(faker.finance.amount(50000, 200000))
}

export const createEmployeeInvalidData = {
     firstName: null,
     lastName: null,
     dateOfBirth: faker.date.between({from: '1950-01-01', to: '2005-12-31'}).toISOString().split('T')[0],
     startDate: faker.date.between({from: '2023-11-11', to: '2024-01-01'}).toISOString().split('T')[0],
     department: faker.person.jobArea(),
     jobTitle: faker.person.jobTitle(),
     email: "invalid@@email",
     mobile: faker.phone.number(),
     address: faker.location.secondaryAddress(),
     baseSalary: parseInt(faker.finance.amount(50000, 200000))
}

export const updateEmployeeData = {
     firstName: faker.person.firstName(),
     lastName: faker.person.lastName(),
     dateOfBirth: `${faker.date.birthdate()}`,
     startDate: `${faker.date.future()}`,
     department: faker.person.jobArea(),
     jobTitle: faker.person.jobTitle(),
     email: faker.internet.email(),
     mobile: faker.phone.number(),
     address: faker.location.secondaryAddress(),
     baseSalary: parseInt(faker.finance.amount(50000, 200000))
}