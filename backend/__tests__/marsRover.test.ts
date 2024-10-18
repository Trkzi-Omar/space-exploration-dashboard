import { MarsRoverService } from '../src';

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({
        data: {
            photos: [
                {
                    id: 1,
                    img_src: 'http://example.com/photo.jpg',
                    earth_date: '2024-01-01',
                    rover: {
                        name: 'Curiosity',
                    },
                },
            ],
        },
    })),
}));

test('fetches Mars Rover photos correctly', async () => {
    const photo = await MarsRoverService.fetchMarsRoverPhotos(1000, 1);
    expect(photo).toBeDefined();
    expect(photo?.img_src).toBe('http://example.com/photo.jpg');
});
