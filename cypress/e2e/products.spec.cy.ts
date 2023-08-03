import { faker } from "@faker-js/faker";

describe("Products", () => {
  it("creates a product", () => {
    const baseUrl = "http://localhost:5173/";

    const productData = {
      name: faker.commerce.productName(),
      sellingPrice: faker.commerce.price(),
      reference: faker.datatype.uuid(),
      unitOfMeasurement: faker.random.word(),
      manufacturer: faker.company.name(),
      stock: faker.datatype.number({ min: 1, max: 100 }),
      image: faker.image.imageUrl(),
    };

    cy.visit(baseUrl);

    cy.contains("Adicionar").click();

    cy.get("#modal-root").within(() => {
      cy.get('input[name="name"]').type(productData.name);
      cy.get('input[name="sellingPrice"]').type(productData.sellingPrice);
      cy.get('input[name="reference"]').type(productData.reference);
      cy.get('input[name="unitOfMeasurement"]').type(productData.unitOfMeasurement);
      cy.get('input[name="manufacturer"]').type(productData.manufacturer);
      cy.get('input[name="stock"]').type(productData.stock);
      cy.get('input[name="image"]').type(productData.image);

      cy.contains("Salvar").click();
    });

    cy.contains("OK").click();

    cy.get("table tbody tr").contains("td", productData.reference).should("exist");
  });
});

