import chalk from "chalk";
import fs from 'fs';
import { listValidator } from "./http-validation.js";
import { getFile } from "./index.js";
export { listValidator } from './http-validation.js';

async function textProcess(cliPath) {
	try {
		const path = cliPath[2];
		const validator = cliPath[3] === '--valid'

		if(fs.lstatSync(path).isFile()) {
			const files = await getFile(cliPath[2]);
			await showLinks(validator, files)
		};
	
		if(fs.lstatSync(path).isDirectory()) {
			const files = await fs.promises.readdir(path);
			files.forEach(async (file) => {
				const listFiles = await getFile(`${path}/${file}`)
				await showLinks(validator, listFiles, file)
			})
		};	
	} catch (error) {
		if(error.code === 'ENOENT') {
			console.log('diretório ou arquivo não encontrado')
		}		
	}
}

async function showLinks(valid = '', links, file = '') {
	if(valid) {
		console.log(chalk.yellow(`lista validada ${file}:`), await listValidator(links) )
	}	else {
		console.log(chalk.yellow(`lista de links ${file}:`), links)
	}
}

textProcess(process.argv)