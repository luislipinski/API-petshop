const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM  users WHERE id = $1";
const checkLoginExist = "SELECT s FROM users s WHERE s.login = $1";
const addUsers = "INSERT INTO users (login, password) VALUES ($1, $2)";
const removeUsers = "DELETE FROM users WHERE id = $1";
const updateUsers = "UPDATE users SET password = $1 WHERE id = $2";
const loginUser = "SELECT s FROM users s WHERE s.login = $1 and s.password = $2" ;

module.exports = {
    getUsers, 
    getUsersById, 
    checkLoginExist,
    addUsers,
    removeUsers,
    updateUsers,
    loginUser
};