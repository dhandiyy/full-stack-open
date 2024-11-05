const {test, expect, describe, beforeEach} = require('@playwright/test')
const {loginWith, createNote} = require('./helper')

describe("Note App", () => {
	beforeEach(async ({ page, request }) => {
		await request.post('/api/testing/reset')
		await request.post('/api/users', {
			data: {
				name: 'Dhandi Yudhit Yuniar',
				username: 'dhandi1',
				password: 'salainen'
			}
		})
		await page.goto('')


	})

	test('front page can be opened', async ({page}) => {
		const locator = await page.getByText('Notes')
		await expect(locator).toBeVisible()
		await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
	})

	test('login form can be opened', async ({page}) => {
		// await page.getByRole('button', {name: "login"}).click()
		// await page.getByTestId('username').fill('dhandi1') //using id in attribute tag -> better using this
		// await page.getByTestId('password').fill('salainen')
		// await page.getByRole('button', {name: "login"}).click()

		await loginWith(page, "dhandi1", "salainen")
		await expect(page.getByRole('button', {name: "new note"})).toBeVisible()

	})

	test('login fails with wrong password', async ({page}) => {
		// await page.getByRole('button', {name: "login"}).click()
		// await page.getByTestId('username').fill('dhandi1')
		// await page.getByTestId('password').fill('wrongpassword')
		// await page.getByRole('button', {name: "login"}).click()

		await loginWith(page, "dhandi1", "wrongpassword")

		const errorDiv = await page.locator('.error')

		await expect(errorDiv).toContainText('Wrong credentials') //case sensitive
		await expect(errorDiv).toHaveCSS('border-style', 'solid')
		await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)') //Colors must be defined to Playwright as rgb codes.
		await expect(page.getByText('wrong credentials')).toBeVisible()

		await expect(page.getByText('Dhandi Yudhit Yuniar logged in')).not.toBeVisible()

	})

	describe("when logged in", () => {
		beforeEach(async ({page}) => {
			await loginWith(page, "dhandi1", "salainen")
		})

		test('a new note can be created', async ({page}) => {
			await createNote(page, 'a note created by playwright')

			await expect(page.getByText('a note created by playwright')).toBeVisible()
		})

		describe("and a note exists", () => {
			beforeEach(async ({page}) => {
				await createNote(page, 'another note by playwright')
			})

			test('importance can be changed', async ({page}) => {
				await page.getByRole('button', {name: "make important"}).click()
				await expect(page.getByText("make not important")).toBeVisible()
			})
		})

		describe("and several note exists", () => {
			beforeEach(async ({page}) => {
				await createNote(page, "note1")
				await createNote(page, "note2")
			})

			test('one of those can be made not important', async ({page}) => {
				// const otherNoteElement = await page.getByText('note1')
				// const iniElementnya = await otherNoteText.locator('..') -> jika teksnya ada pada tag span
				//(..) -> untuk menujuk parent elemetnya

				//
				// await otherNoteElement.getByRole('button', {name: "make important"}).click()
				// await expect(page.getByText("make not important")).toBeVisible()


				await page.getByText('first note')
					.getByRole('button', { name: 'make not important' }).click()

				await expect(page.getByText('first note').getByText('make important'))
					.toBeVisible()
			})
		})
	})



})