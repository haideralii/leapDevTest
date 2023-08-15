// @ts-check
const { test, expect } = require("../fixtures/base")
import { employeeSchema } from "../schemas/employee-schema"
import {createEmployeeData, updateEmployeeData, createEmployeeInvalidData} from "../payloads/employee"
import { schemaValidator, logger } from "../utils/helper"

test.describe(`/employees CRUD Positive Test Cases`, async () => {
  let employeeId

  test.beforeAll(async ({ employeeApiController }) => {
      const response = await employeeApiController.createEmployee(createEmployeeData)
      const responseBody = await response.json()
      employeeId = responseBody._id
  })

  test.afterAll(async({ employeeApiController }) =>{
      await employeeApiController.deleteEmployee(employeeId)
  })

  test(`POST - Create Employee successfully with correct data & 201 Status Code Returns ||
        Verify that Response Body matches the defined Schema`, async ({ employeeApiController }) => {
    
      const response = await employeeApiController.createEmployee(createEmployeeData)
      const responseBody = await response.json()
      logger.info('Response Body:', responseBody)

      expect(response.status()).toBe(201)
      schemaValidator(employeeSchema, responseBody)
      expect(responseBody).toHaveProperty("_id")
      expect(responseBody).toEqual(expect.objectContaining(createEmployeeData))
  })

  test(`GET - All Employees & 200 Status Code Returns ||
        Verify that Response Body matches the defined Schema ||
        Verify that response body have all the created properties`, async ({ employeeApiController }) => {
      const response = await employeeApiController.getAllEmployees()
      const responseBody = await response.json()
      logger.info('Response Body:', responseBody)

      const itemAt0Index = responseBody[0]
      const properties = [
        "_id",
        "firstName",
        "lastName",
        "dateOfBirth",
        "startDate",
        "jobTitle",
        "email",
        "mobile",
        "address",
        "baseSalary",
      ]

      expect(response.status()).toBe(200)
      schemaValidator(employeeSchema, itemAt0Index)
      properties.forEach(prop => {
        expect(itemAt0Index, `${prop} not found in response`).toHaveProperty(prop)
      });
})

  test("GET - Employee By Id & 200 Status Code Returns", async ({ employeeApiController }) => {
      const response = await employeeApiController.getEmployeeById(employeeId)
      const responseBody = await response.json()
      logger.info('Response Body:', responseBody)

      expect(response.status()).toBe(200)
      expect(responseBody).toEqual(expect.objectContaining(createEmployeeData))
  })

  test(`PUT - Verify that UPDATE Employee API returns 200 and successfully updates the record ||
      Verify that updated data returns by fetching the response from Get Employee By Id API`, async ({employeeApiController}) => {
  
      const updateResponse = await employeeApiController.updateEmployee(employeeId,updateEmployeeData)
      expect(await updateResponse.status()).toBe(200)

      const getUpdatedResponse = await employeeApiController.getEmployeeById(employeeId)
      const getUpdatedResponseBody = await getUpdatedResponse.json()
      expect(getUpdatedResponseBody).toEqual(expect.objectContaining(updateEmployeeData))
      logger.info('Response Body:', getUpdatedResponseBody)
  })

  test(`DELETE - Remove Employee By Id successfully  & 200 Status Code Returns`, async ({employeeApiController}) => {
      const createResponse = await employeeApiController.createEmployee(createEmployeeData)
      const responseBody = await createResponse.json()
      let id = responseBody._id

      const deleteResponse = await employeeApiController.deleteEmployee(id)
      expect(deleteResponse.status()).toBe(200)
  })

})

test.describe("/employees CRUD Negative Test Cases", async () => {
  let employeeId

  test.beforeAll(async ({ employeeApiController }) => {
      const createResponse = await employeeApiController.createEmployee(createEmployeeData)
      const responseBody = await createResponse.json()
      employeeId = responseBody._id

      await employeeApiController.deleteEmployee(employeeId)
  })

  test(`POST - Verify that schema validation error occur on sending request with null first & last name`, async ({ employeeApiController }) => {
    // intentionally failing this test case as there is bug in api that we can create employee with null first name & last name
    test.fail()
    const response = await employeeApiController.createEmployee(createEmployeeInvalidData)
    const responseBody = await response.json()
    logger.info('Response Body:', responseBody)

    expect(response.status()).not.toBe(201)
    schemaValidator(employeeSchema, responseBody)
})

  test("GET By Id - Verify 404 Status Code Returns on sending request with Invalid Id ", async ({employeeApiController}) => {
      const invalidId = "123a1231"
      const response = await employeeApiController.getEmployeeById(invalidId)
      expect(response.status()).toBe(404)
  })

  test("PUT - Verify that 404 status Returns on trying to Update data with invalid Id & 404 Status Code Returns", async ({employeeApiController}) => {
      const invalidId = "asda123"
      const response = await employeeApiController.updateEmployee(invalidId)
      expect(response.status()).toBe(404)
  })

  test("GET BY Id - Verify that 404 & error message should be returned on trying to retrive employee id that is already deleted", async ({employeeApiController}) => {
      const response = await employeeApiController.getEmployeeById(employeeId)
      expect(response.status()).toBe(404)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          title: "Not Found",
          status: 404,
        })
      )
  })

  test("DELETE - Verify that 404 & error message returns on trying to delete id which is already deleted", async ({employeeApiController}) => {
      const response = await employeeApiController.deleteEmployee(employeeId)
      expect(response.status()).toBe(404)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          title: "Not Found",
          status: 404,
        })
      )
  })

})
