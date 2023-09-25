#!/usr/bin/env node

import accessFile from './index.js'
import fs from 'fs'
import chalk from 'chalk'
import validate from './http-validation.js'

function errorTreatment(error) {
    if (error.code === "ENOENT") {
        throw new Error(chalk.red("File/Directory not found."))
    }
    if (error.code === "EISDIR") {
        throw new Error(chalk.red("Illegal operation on a directory."))
    }

    throw new Error(chalk.red(error))
}

async function printLinks(file, links){
    if (validation) {links = await validate(links)}
    console.log(chalk.yellow(file) + ':')
    console.log(links)
}

async function processText(args){
    try {
        const path = args
        if(fs.lstatSync(path).isFile()) {
            const links = await accessFile(path)
            printLinks(path, links)
        } else if (fs.lstatSync(path).isDirectory()) {
            const files = await fs.promises.readdir(path)
            files.forEach(file => processText(path + file))
        }
    } catch (error){
        errorTreatment(error)
    }
}

const path = process.argv[2]
const validation = process.argv[3] ===  "--validate"

processText(path)
