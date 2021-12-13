'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT userID, username, email, ppicture, bio FROM m_user'
    );
    return rows;
  } catch (e) {
    console.error('getAllUsers error', e.message);
    next(httpError('Database error', 500));
  }
};

const getUser = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT userID, email, ppicture, bio FROM m_user WHERE userID = ?',
      [id]
    );
    return rows;
  } catch (e) {
    console.error('getUser error', e.message);
    next(httpError('Database error', 500));
  }
};

const addUser = async (username, email, password, ppicture, bio, next) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO m_user (username, email, password, ppicture, bio) VALUES (?, ?, ?, ?, ?)',
      [username, email, password, ppicture, bio]
    );
    return rows;
  } catch (e) {
    console.error('addUser error', e.message);
    next(httpError('Database error', 500));
  }
};
const modifyUser = async (
  userID,
  ppicture,
  email,
  bio,
  next
) => {
  let sql =
    'UPDATE m_user SET email = ?, ppicture = ?, bio = ? WHERE userID = ?;';
  let params = [email, ppicture, bio, userID];
  console.log('sql', sql);
  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows;
  } catch (e) {
    console.error('modifyUser error', e.message);
    next(httpError('Database error', 500));
  }
};

const getUserLogin = async (params) => {
  try {
    console.log('getUserLogin', params);
    const [rows] = await promisePool.execute(
      'SELECT * FROM m_user WHERE email = ?;',
      params
    );
    return rows;
  } catch (e) {
    console.log('getUserLogin error', e.message);
    next(httpError('Database error', 500));
  }
};

const updateUser = async (ppicture, email, bio, next) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE m_user SET (ppicture, email, bio) VALUES (?, ?, ?)',
      [ppicture, email, bio]
    );
    return rows;
  } catch (e) {
    console.error('updateUser error', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  modifyUser,
  getUserLogin,
  updateUser,
};
