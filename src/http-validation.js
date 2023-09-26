import chalk from "chalk"

function errorTreatment(error){
    if (error.cause.code === "ENOTFOUND"){
        console.log(chalk.red(`${error.cause.hostname} not found.`))
        return `Page not found.`
    } else {
        return "An error has ocurried."
    }
}

function extractLinks(links){
    if (links === "No links found." ) {return links}
    return links.map((objLink) => Object.values(objLink).join())
}

async function checkURL(links){
    const arrStatus = await Promise.all(
        links.map(async (link) => {
            try {
                const response = await fetch(link, {method: "HEAD"})
                return response.status
            } catch(error){
                return errorTreatment(error)
        }
        }))
    return arrStatus
}

export default async function validate(links){
    const validatedLinks = extractLinks(links)
    if (validatedLinks === "No links found.") {return validatedLinks}
    const status = await checkURL(validatedLinks)
    const objectLink = validatedLinks.map((objLink, index) => ({link: objLink, status: status[index]}))
    return(objectLink)
}