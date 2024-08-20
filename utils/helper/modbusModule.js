// modbusModule.js
const Modbus = require('modbus-serial');
const client = new Modbus();

const connectToModbusDevice = (ipAddress, port) => {
  return new Promise((resolve, reject) => {
    client.connectTCP(
      ipAddress,
      {port},
      () => {
        resolve();
      },
      reject,
    );
  });
};

const readModbusRegister = (address, length, unitId) => {
  return new Promise((resolve, reject) => {
    client.readHoldingRegisters(address, length, unitId, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.data);
      }
    });
  });
};

module.exports = {
  connectToModbusDevice,
  readModbusRegister,
};
