const {test, expect, describe, beforeEach} = require('@playwright/test')

describe("Note App", () => {
	beforeEach(async ({ page }) => {
		await page.goto('http://localhost:5173')
	})

	test('front page can be opened', async ({page}) => {
		const locator = await page.getByText('Notes')
		await expect(locator).toBeVisible()
		await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
	})

	test('login form can be opened', async ({page}) => {
		await page.getByRole('button', {name: "login"}).click()
		await page.getByTestId('username').fill('dhandi1') //using id in attribute tag -> better using this
		await page.getByTestId('password').fill('salainen')
		await page.getByRole('button', {name: "login"}).click()

		await expect(page.getByRole('button', {name: "new note"})).toBeVisible()

	})

	describe("when logged in", () => {
		beforeEach(async ({page}) => {
			await page.getByRole('button', { name: 'login' }).click()
			await page.getByTestId('username').fill('dhandi1')
			await page.getByTestId('password').fill('salainen')
			await page.getByRole('button', { name: 'login' }).click()
		})

		test('a new note can be created', async ({page}) => {
			await page.getByRole('button', {name:"new note"}).click()
			await page.getByRole('textbox').fill('a note created by playwright')
			await page.getByRole('button', { name: 'save' }).click()
			await expect(page.getByText('a note created by playwright')).toBeVisible()


		})
	})



})