import { IGuild } from './guild.model';

export interface IGuildRepository {
	create(params: IGuild): Promise<IGuild>;

	readOne(params: { guildId: string }): Promise<IGuild | null>;
	readList(params: { query?: string; page?: number; regsPerPage?: number }): Promise<Array<IGuild>>;
}
