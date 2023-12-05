// Run this in terminal to generate a migration file 
// npx sequelize-cli migration:generate --name <migration-name>

const sequelize = require('../database/db')
const {DataTypes} = require('sequelize')

const Todo = sequelize.define('todo',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: true
})

module.exports = Todo