import { test as setup, expect } from "@playwright/test"

setup("Create Unique Id for test execution", async ({ request }) => {
  const response = await request.get(`/`, {})
  const responseHeaders = response.headers()
  const getUniqueId = responseHeaders["set-cookie"].replace(
    /^UniqueEndpointId=([^;]+).*/,
    "$1"
  )
  process.env.UNIQUE_ID = getUniqueId
  expect(response.status()).toBe(200)
})
