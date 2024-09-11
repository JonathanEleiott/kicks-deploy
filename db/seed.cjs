const client = require('./client.cjs');
const { createInventory } = require('./inventory.cjs');

const dropTables = async() => {
  try {
    console.log('DROPPING TABLES!');

    await client.query(`
        DROP TABLE IF EXISTS inventory;
      `);

    console.log('TABLES DROPPED!');
  } catch(err) {
    console.log('ERROR DROPPING TABLES: ', err);
  }
}

const createTables = async() => {
  try {
    console.log('CREATING TABLES!');
    
    await client.query(`
        CREATE TABLE inventory (
          id SERIAL PRIMARY KEY,
          name VARCHAR(30) UNIQUE NOT NULL,
          price INTEGER
        );
      `);

      console.log('TABLES CREATED!');

  } catch(err) {
    console.log('CREATE TABLES BROKE: ', err);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log('CONNECTED!');

  await dropTables();

  await createTables();

  await createInventory('Arizona Birkenstock Birko-Flor', 25);
  await createInventory('Vans Sport Low Shoes', 35);
  await createInventory('Ray Ban Meta Wayfarer', 50);
  console.log('INVENTORY CREATED!');

  await client.end();
  console.log('DISCONNECTED!');
}

syncAndSeed();