import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(()=> {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  })
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'teste2@teste.com'
    });

    expect(updatedUser.name).toBe('John Trê');
  });

  it('should be able to update the profile with non existing id', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-id',
      name: 'Teste',
      email: 'teste@t.com'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to existing email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123456'
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 't@teste.com',
      password: '123456'
    });


    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'teste@teste.com'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'teste2@teste.com',
      old_password: '123456',
      password: '123123'
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'teste2@teste.com',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'teste2@teste.com',
      old_password: '1234567',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });

});
