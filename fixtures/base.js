const Base = require("@playwright/test")
const { EmployeeApiController } = require("../models/employee-api-controller")

exports.test = Base.test.extend({
  employeeApiController: async ({ request }, use) => {
    await use(new EmployeeApiController(request))
  },
})

exports.expect = Base.test.expect
exports.request = Base.test.request
