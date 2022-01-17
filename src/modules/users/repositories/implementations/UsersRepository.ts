import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';

import { User } from '../../entities/User';
import { Game } from '../../../games/entities/Game';

import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  private gameRepository: Repository<Game>;

  constructor() {
    this.repository = getRepository(User);
    this.gameRepository = getRepository(Game);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    const [user] = await this.repository.find({
      where: {
        id: user_id
      },
      relations: ['games']
    });

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT * FROM users ORDER BY first_name ASC');
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`SELECT * FROM users WHERE LOWER(first_name)=LOWER('${first_name}') AND LOWER(last_name)=LOWER('${last_name}')`);
  }
}
