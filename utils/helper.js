const { expect } = require("../fixtures/base")
import  log4js from 'log4js'
import Ajv from "ajv"
const ajv = new Ajv()

export function schemaValidator(expectedSchema, actualSchema) {
  try {
    const validate = ajv.compile(expectedSchema)
    const isValid = validate(actualSchema)
    expect(isValid).toBeTruthy()
    expect(validate.errors).toBeNull()
  } catch (error) {
    throw new error
  }
}


log4js.configure({
  appenders: { stdout: { type: 'stdout' } },
  categories: { default: { appenders: ['stdout'], level: 'info' } }
});

export const logger = log4js.getLogger();