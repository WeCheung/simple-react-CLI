const inquirer = require('inquirer')

inquirer
  .prompt([
    {
      type: 'input',
      name: 'username',
      message: 'name?'
    },
    {
      type: 'input',
      name: 'version',
      message: 'version?(0.0.1)',
      default: '0.0.1'
    },
    {
      type: 'input',
      name: 'license',
      message: 'license?(MIT)',
      default: 'MIT'
    },
    {
      type: 'input',
      name: 'license',
      message: 'license?'
    },
    {
      type: 'checkbox',
      name: 'dependencies',
      message: 'Please choose the dependencies you want to install',
      choices: [
        'typescript',
        'less',
        'sass',
        'redux',
        'react-router-dom'
      ]
    }
  ])
  .then((answers) => {
    console.log(`The answers are: \n ${JSON.stringify(answers)}`)
  })
  .catch((err) => {
    console.log(err);
  })