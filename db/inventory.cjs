const client = require('./client.cjs');

const createInventory = async(inventoryName, inventoryPrice) => {
  try {
    await client.query(`
      INSERT INTO inventory (name, price)
      VALUES ('${inventoryName}', ${inventoryPrice});
    `);
  } catch(err) {
    console.log('ERROR CREATING INVENTORY: ', err);
  }
}

module.exports = {
  createInventory
}