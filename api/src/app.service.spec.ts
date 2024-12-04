import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { BookDto } from './app.controller';
import { Book } from './book.entity';
import { mock } from 'node:test';

describe('AppService', () => {
    let service: AppService;

    //create mock book repository and this mock repo has a method in it called find()
    const mockBookRepository = {
        find: jest.fn(),
        findOneBy: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
                {
                    provide: 'BookRepository',
                    useValue: mockBookRepository,
                },
            ],
        }).compile();

        service = module.get<AppService>(AppService);

        //reset mocks
        jest.clearAllMocks();

    });

    //alternative way to reset mocks
    // afterEach(() => {
    //     jest.clearAllMocks();
    // })

    //first test is that the service should be defined
    //part in quotes is a description of what the test is for
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    //getBooks test
    it('should call the book repository find method and return the result', async () => {
        const books = [{id: 1, title: 'Test Book'}];

        mockBookRepository.find.mockReturnValue(books);

        //call the method you are trying to test
        const result = await service.getBooks();
        expect(result).toEqual(books);
        expect(mockBookRepository.find).toHaveBeenCalled();
        expect(mockBookRepository.find).toHaveBeenCalledTimes(1);
        expect(mockBookRepository.find).toHaveBeenCalledWith({
            order: {
              id: "ASC", 
            }
          });
        expect(mockBookRepository.findOneBy).not.toHaveBeenCalled();  
    });

    //getBook() method test
    it('should call the book repository findeOneBy method with a book id and return the result', async () => {
        //input
        const id = 1;
        //output or return value
        const book = {id: 1, title: "Test Book"};

        //mock results with returnn value
        mockBookRepository.findOneBy.mockReturnValue(book);

        //call the function you are trying to test
        const result = await service.getBook(id);
        expect(result).toEqual(book);
        expect(mockBookRepository.findOneBy).toHaveBeenCalled();
        expect(mockBookRepository.findOneBy).toHaveBeenCalledTimes(1);
        expect(mockBookRepository.findOneBy).toHaveBeenCalledWith({id});

    });

    //createBook method test
    it('should call the book repository save and find methods and the getBooks method and return the result', async () => {
        //input
        const book = {} as BookDto;
        //output is array of books
        const books = [] as Book[];

        mockBookRepository.save.mockReturnValue(book);
        //need to mock find bc the return value for createBooks() contains getBooks()  which involves a find method
        mockBookRepository.find.mockReturnValue(books);

        const result = await service.createBook(book);
        expect(result).toEqual(books);
        expect(mockBookRepository.save).toHaveBeenCalled();
        expect(mockBookRepository.save).toHaveBeenCalledTimes(1);
        expect(mockBookRepository.save).toHaveBeenCalledWith(book);
        expect(mockBookRepository.find).toHaveBeenCalled();
        expect(mockBookRepository.find).toHaveBeenCalledTimes(1);
        expect(mockBookRepository.find).toHaveBeenCalledWith({
            order: {
                id: 'ASC',
            }
        });

    });

    it ('should call the book repository update method with a book id and a book and the getBooks method and return the results', async () => {
        //input
        const id = 1;
        const book = {
            title: 'Test book',
            author: 'test author',
            genre: 'test genre',
            price: 'test price'
        };

        //output
        const books = [book] as Book[];

        mockBookRepository.update.mockReturnValue(book);
        mockBookRepository.find.mockReturnValue(books);

        const result = await service.updateBook(id, book);
        expect(result).toEqual(books);
        expect(mockBookRepository.update).toHaveBeenCalled();
        expect(mockBookRepository.update).toHaveBeenCalledTimes(1);
        expect(mockBookRepository.update).toHaveBeenCalledWith(id, book);
        expect(mockBookRepository.find).toHaveBeenCalled();
        expect(mockBookRepository.find).toHaveBeenCalledTimes(1);
        expect(mockBookRepository.find).toHaveBeenCalledWith({
            order: {
                id: 'ASC',
            }
        });
    
    });

    it('should call the book repository delete method with a book id and the getBooks method and return the results', async () => {
        //input 
        const id = 1;

        //output
        const books = [] as Book[];

        mockBookRepository.delete.mockReturnValue({ affected: 1 });
        mockBookRepository.find.mockReturnValue(books);

        const result = await service.deleteBook(id);
        expect(result).toEqual(books);
        expect(mockBookRepository.delete).toHaveBeenCalled();
        expect(mockBookRepository.delete).toHaveBeenCalledTimes(1);
        expect(mockBookRepository.delete).toHaveBeenCalledWith(id);
        expect(mockBookRepository.find).toHaveBeenCalled();
        expect(mockBookRepository.find).toHaveBeenCalledTimes(1);
        expect(mockBookRepository.find).toHaveBeenCalledWith({
            order: {
                id: 'ASC',
            }
        });

    });


});

//all tests overlap--so if you mock something in one test, and you dont reset your mocks, then its going to stay mocked in all tests. so mocks need to be reset after every single test.