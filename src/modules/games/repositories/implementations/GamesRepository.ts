import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private userRepository: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.userRepository = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('game')
      .where('game.title ILIKE :param', { param:`%${param}%` })
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('SELECT COUNT(*) FROM games');
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.games', 'games')
    .where('games.id = :id', { id: id })
    .getMany();

    return users;
  }
}
