import arg from 'arg'
import inquirer from 'inquirer'
import { createProject } from './main'

// 参数处理
// 处理 options
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install'
    },
    {
      argv: rawArgs.slice(2)
    }
  )
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false
  }
}
// 处理参数缺省
async function promptForMissingOptions(options) {
  const defaultTemplate = 'JavaScript'
  
  // 拥有参数的情况下
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate
    }
  }
  
  // 参数缺省的情况下
  const questions = []
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['JavaScript', 'TypeScript'],
      default: defaultTemplate
    })
  }
  
  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false
    })
  }
  
  questions.push({
    type: 'checkbox',
    name: 'dependencies',
    message: 'Please choose the dependencies you want to install',
    choices: [
      'less',
      'sass',
      'redux',
      'react-router-dom'
    ]
  })
  
  if (!options.runInstall) {
    questions.push({
      type: 'confirm',
      name: 'runInstall',
      message: 'Auto install dependencies?',
      default: false
    })
  }
  
  const answers = await inquirer.prompt(questions)
  
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    runInstall: options.runInstall || answers.runInstall,
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options)
  await createProject(options)
}