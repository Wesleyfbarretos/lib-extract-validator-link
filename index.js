import chalk from 'chalk';
import fs from 'fs';

export async function getFile(fileDir) {
	try {
		const enconding = 'utf-8';
		const fileResponse = await fs.promises.readFile(fileDir, enconding);
	
		return getLinks(fileResponse)
	}	catch (error) {
		console.log(chalk.red(error.message))
	}
}

function getLinks(text) {
	const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
	const links = [...text.matchAll(regex)];
	const linksResponse = links.map(link => ({[link[1]]: link[2]}))
	return linksResponse != 0 ? linksResponse : 'Não há links no arquivo'
}