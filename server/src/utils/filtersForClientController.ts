/* eslint-disable no-restricted-syntax */
import { BitFieldResolvable, PermissionString } from 'discord.js';

interface CommandConfig {
	tag: string;
	alias?: [string];
	description: string;
	permissions?: BitFieldResolvable<PermissionString>[];
}

interface AllCommands {
	group: string;
	commands: CommandConfig[];
}

export const getOnlyConfig = (command: CollectionType): CommandConfig => {
	const { config } = command.info.command;

	return config;
};

export const getOnlyConfigFromArray = (
	commands: CollectionType[],
): CommandConfig[] => {
	const parsed = commands.map((c) => {
		const { config } = c.info.command;

		return config;
	});

	return parsed;
};

export const getAllCommands = (commands: CollectionType[]): AllCommands[] => {
	const groups = [] as string[];

	const groupsCommands = [] as AllCommands[];

	commands.forEach((c) => {
		if (!groups.find((g) => g === c.info.dir)) {
			groups.push(c.info.dir);
		}
	});

	groups.forEach((g) => {
		const innerCommands = [] as CommandConfig[];

		commands.forEach((c) => {
			if (c.info.dir === g) {
				innerCommands.push(c.info.command.config);
			}
		});

		groupsCommands.push({ group: g, commands: innerCommands });
	});

	return groupsCommands;
};
