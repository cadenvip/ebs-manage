'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://183.230.101.142:58080/ebs/"'
  // BASE_API: '"http://10.189.13.151:8080/ebs/"'
  // BASE_API: '"http://10.189.15.190:8080/ebs/"'
})
