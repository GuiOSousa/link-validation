import chalk from 'chalk'
import fs from 'fs'
import { type } from 'os'

function errorTreatment(error) {
    if (error.code === "ENOENT") {
        throw new Error(chalk.red("File not found."))
    }
    if (error.code === "EISDIR") {
        throw new Error(chalk.red("Illegal operation on a directory."))
    }

    throw new Error(chalk.red(error))
}

function findLinks(text, pathType){
    let regex

    if (pathType === "md"){
        regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*?)\)/gm
        const links = [...text.matchAll(regex)]
        const result = links.map(cap => ({[cap[1]]: [cap[2]]}))
        return (result.length ? result : "No links found.")
    } else {
        regex = /(https?:\/\/[^\s?#)]*)/gm
        const links = [...text.matchAll(regex)]
        const result = links.map(cap => ({link: [cap[1]]}))
        return (result.length ? result : "No links found.")
    }
}

async function accessFile(path){
    try {
        const pathType = path.split(".")[1]
        const text = await fs.promises.readFile(path, 'utf-8')
        const links = findLinks(text, pathType)
        return links
    } catch (error) {
        errorTreatment(error)
    }
}

export default accessFile
