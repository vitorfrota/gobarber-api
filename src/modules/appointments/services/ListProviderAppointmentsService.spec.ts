import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(()=> {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderMonthAvailability = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    );
  })
  it('should be able to list the appointments on a specific day', async () => {
      const appointment1 = await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user-client',
        date: new Date(2020, 6, 20, 10, 0, 0)
      });

      const appointment2 = await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user-client',
        date: new Date(2020, 6, 20, 11, 0, 0)
      });


    const appointments = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 7,
      day: 20
    });

    expect(appointments).toEqual([
      appointment1,
      appointment2
    ]);
  });
});
