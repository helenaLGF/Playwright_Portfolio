
 // Importe les fonctions test et expect depuis Playwright.
 // test permet de créer et d'exécuter un test.
 // expect permet de vérifier les résultats attendus.
const { test, expect } = require('@playwright/test');

// Déclare un test automatisé.
// async permet d'utiliser await à l'intérieur de la fonction.
// page représente l'onglet du navigateur contrôlé par Playwright.
test('Acheter un smartphone avec paiement', async ({ page }) => {

  // Crée un objet contenant les données du client.
  // const signifie que customer ne sera pas réaffecté.
  const customer = {
    name: 'Helena',              // Nom du client.
    country: 'France',           // Pays du client.
    city: 'Paris',               // Ville du client.
    card: '4111111111111111',    // Numéro de carte de test.
    month: '11',                 // Mois d'expiration.
    year: '2026'                 // Année d'expiration.
  };

  // ÉTAPE 1 : OUVRIR LA BOUTIQUE
  // test.step découpe le scénario en étapes lisibles dans le rapport.
  await test.step('Ouvrir la boutique DemoBlaze', async () => {

    // Ouvre l'adresse de la boutique dans le navigateur.
    await page.goto('https://www.demoblaze.com');

    // Vérifie que le titre de l'onglet contient STORE.
    // /STORE/i est une expression régulière.
    // Le i ignore les différences entre majuscules et minuscules.
    await expect(page).toHaveTitle(/STORE/i);
  });

  // ÉTAPE 2 : SÉLECTIONNER LE SMARTPHONE
  await test.step('Sélectionner le smartphone Samsung Galaxy S6', async () => {

    // Recherche le lien par son rôle et son nom accessible, puis clique dessus.
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    // Vérifie que le titre du produit correspond au smartphone attendu.
    await expect(page.locator('#tbodyid h2.name'))
      .toHaveText('Samsung galaxy s6');
  });

  // Déclare une variable qui contiendra le prix du smartphone.
  // let autorise la modification de sa valeur.
  // Elle est déclarée ici pour être accessible dans les étapes suivantes.
  let productPrice;

  // ÉTAPE 3 : AJOUTER LE SMARTPHONE AU PANIER
  await test.step('Ajouter le smartphone au panier', async () => {

    // Récupère le texte visible dans le bloc contenant le prix.
    const priceText = await page.locator('#tbodyid .price-container').innerText();

    // Recherche une suite de chiffres dans le texte du prix.
    // match(/\d+/) renvoie les chiffres trouvés.
    // [0] récupère le premier résultat.
    // Number() transforme le texte en nombre.
    productPrice = Number(priceText.match(/\d+/)[0]);

    // Prépare l'attente de la boîte de dialogue native AVANT le clic.
    const addDialog = page.waitForEvent('dialog');

    // Clique sur le lien Add to cart.
    await page.getByRole('link', { name: 'Add to cart' }).click();

    // Attend l'apparition de la boîte de dialogue.
    const dialog = await addDialog;

    // Vérifie que le message contient Product added.
    expect(dialog.message()).toContain('Product added');

    // Accepte la boîte de dialogue, comme un clic sur OK.
    await dialog.accept();
  });

  // ÉTAPE 4 : VÉRIFIER LE PANIER
  await test.step('Vérifier le contenu du panier', async () => {

    // Recherche le lien du panier grâce à son identifiant HTML cartur.
    // Clique dessus pour afficher le panier.
    await page.locator('#cartur').click();

    // Vérifie que le panier contient le smartphone sélectionné.
    await expect(page.locator('#tbodyid'))
      .toContainText('Samsung galaxy s6');

    // Vérifie que le total correspond au prix mémorisé.
    // String() convertit le nombre en texte pour l'assertion.
    await expect(page.locator('#totalp'))
      .toHaveText(String(productPrice));
  });

  // ÉTAPE 5 : RENSEIGNER LES INFORMATIONS DE COMMANDE
  await test.step('Renseigner les informations de commande', async () => {

    // Recherche le bouton Place Order et clique dessus.
    // Cela ouvre le formulaire de commande.
    await page.getByRole('button', { name: 'Place Order' }).click();

    // Remplit le champ du nom avec la valeur de customer.name.
    await page.locator('#name').fill(customer.name);

    // Remplit le champ du pays.
    await page.locator('#country').fill(customer.country);

    // Remplit le champ de la ville.
    await page.locator('#city').fill(customer.city);

    // Remplit le champ du numéro de carte.
    await page.locator('#card').fill(customer.card);

    // Remplit le champ du mois d'expiration.
    await page.locator('#month').fill(customer.month);

    // Remplit le champ de l'année d'expiration.
    await page.locator('#year').fill(customer.year);
  });

  // ÉTAPE 6 : CONFIRMER LE PAIEMENT
  await test.step('Confirmer le paiement', async () => {

    // Clique sur Purchase pour déclencher le paiement.
    await page.getByRole('button', { name: 'Purchase' }).click();

    // Identifie la fenêtre de confirmation SweetAlert.
    const confirmation = page.locator('.sweet-alert');

    // Identifie le paragraphe contenant les détails de la commande.
    const confirmationDetails = confirmation.locator('p.lead');

    // Vérifie que la fenêtre de confirmation est visible.
    await expect(confirmation).toBeVisible({ timeout: 10000 });

    // Vérifie que le titre de confirmation est correct.
    await expect(confirmation.locator('h2'))
      .toHaveText('Thank you for your purchase!');

    // Vérifie que le montant payé correspond au prix du smartphone.
    await expect(confirmationDetails)
      .toContainText(`Amount: ${productPrice} USD`);

    // Vérifie que le numéro de carte affiché correspond à celui saisi.
    await expect(confirmationDetails)
      .toContainText(`Card Number: ${customer.card}`);

    // Vérifie que le nom affiché correspond au nom du client.
    await expect(confirmationDetails)
      .toContainText(`Name: ${customer.name}`);

    // Vérifie la présence d'un identifiant de commande numérique.
    // \d+ signifie un ou plusieurs chiffres.
    await expect(confirmationDetails)
      .toContainText(/Id: \d+/);

    // Vérifie que la date respecte le format JJ/MM/AAAA.
    await expect(confirmationDetails)
      .toContainText(/Date: \d{2}\/\d{2}\/\d{4}/);

    // Identifie le bouton OK dans la fenêtre de confirmation.
    const okButton = confirmation.locator('button.confirm');

    // Identifie la fenêtre lorsqu'elle possède la classe CSS visible.
    // Cette classe correspond à l'état interactif de SweetAlert.
    const interactiveConfirmation = page.locator('.sweet-alert.visible');

    // Attend que la fenêtre ait atteint son état interactif.
    await expect(interactiveConfirmation).toBeVisible({ timeout: 10000 });

    // Vérifie que le bouton OK est activé.
    await expect(okButton).toBeEnabled();

    // Attend simultanément deux opérations :
    // 1. La redirection vers la page d'accueil.
    // 2. Le clic de l'utilisateur sur le bouton OK.
    // Promise.all permet d'attendre la réussite des deux opérations.
    await Promise.all([
      page.waitForURL(/index\.html/, { timeout: 15000 }),
      okButton.click()
    ]);

    // Vérifie que la fenêtre de confirmation a disparu.
    await expect(confirmation).not.toBeVisible();

    // Vérifie que le smartphone est de nouveau visible sur la page d'accueil.
    await expect(
      page.getByRole('link', { name: 'Samsung galaxy s6' })
    ).toBeVisible();

    // Attend cinq secondes pour permettre d'observer la page en mode headed.
    await page.waitForTimeout(5000);
  });

});
