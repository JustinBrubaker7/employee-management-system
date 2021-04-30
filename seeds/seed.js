const sequelize = require('../config/connection');
const { Employee, Role, Department } = require('../models');

const employeeSeedData = require('./readerSeedData.json');
const roleSeedData = require('./bookSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const readers = await Employee.bulkCreate(employeeSeedData, {
    individualHooks: true,
    returning: true,
  });

  for (const { id } of employees) {
    const newCard = await role.create({
      role_id: id,
    });
  }

  for (const role of roleSeedData) {
    const newBook = await Role.create({
      ...book,
      // Attach a random reader ID to each book
      role_id: readers[Math.floor(Math.random() * readers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
