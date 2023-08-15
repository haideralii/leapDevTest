import { apiUId, employees } from "../end-points"

exports.EmployeeApiController = class EmployeeApiController {
  constructor(request) {
    this.request = request
  }

  async getAllEmployees() {
    const response = await this.request.get(`${apiUId}${employees}`, {})
    return response
  }

  async getEmployeeById(id) {
    const response = await this.request.get(`${apiUId}${employees}/${id}`, {})
    return response
  }

  async createEmployee(employeeData) {
    const response = await this.request.post(`${apiUId}${employees}`, {
      data: employeeData,
    })

    return response
  }

  async updateEmployee(id, employeeData) {
    const response = await this.request.put(`${apiUId}${employees}/${id}`, {
      data: employeeData,
    })

    return response
  }

  async deleteEmployee(id) {
    const response = await this.request.delete(`${apiUId}${employees}/${id}`, {})
    return response
  }
}
