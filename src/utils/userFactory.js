function createUser() {
  const timestamp = Date.now();

  return {
    email: `qa-teste-hits${timestamp}@hotmail.com`,
    name: 'James',
    lastName: 'Bond',
    cpf: '10332628620',
    phone: '34992752783',
    password: 'QAjamesBond@21'
  };
}

module.exports = {
  createUser
};