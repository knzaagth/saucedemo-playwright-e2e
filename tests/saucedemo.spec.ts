import { test, expect } from '@playwright/test';

const usernames = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
];

for (const username of usernames) {

    test(`E2E Checkout Flow: ${username}`, async ({ page }) => {
        // 1. NAVIGATE & LOGIN
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill(username);
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // 2. INTERACT: Tambah item ke keranjang
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // 3. INTERACT: Masuk ke halaman Cart
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        // 4. INTERACT: Klik tombol Checkout
        await page.locator('[data-test="checkout"]').click();

        // 5. INTERACT: Isi form informasi pengiriman barang
        await page.locator('[data-test="firstName"]').fill('Kenza');
        await page.locator('[data-test="lastName"]').fill('Agatha');
        await page.locator('[data-test="postalCode"]').fill('12345');

        // 6. INTERACT: Klik tombol Continue
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        // 7. INTERACT: Klik tombol Finish
        await page.locator('[data-test="finish"]').click();

        // 8. ASSERTION FINAL
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        const successHeader = page.locator('[data-test="complete-header"]');
        await expect(successHeader).toHaveText('Thank you for your order!');
    });
}