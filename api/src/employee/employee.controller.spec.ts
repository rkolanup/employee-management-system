import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeModel } from './employee.model';
import { of } from 'rxjs';
import { EmployeeEntity } from '../entities/employee.entity';
import { DepartmentEntity } from '../entities/department.entity';

describe('EmployeeController', () => {
  let employeeController: EmployeeController;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(EmployeeEntity),
          useValue: jest.fn()
        },
        {
          provide: getRepositoryToken(DepartmentEntity),
          useValue: jest.fn()
        }
      ]
    }).compile();

    employeeController = module.get<EmployeeController>(EmployeeController);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  describe('create', () => {
    it('should call the EmployeeService create method and return the result', async () => {
      const employee = new EmployeeModel();
      employee.firstName = 'John';
      employee.lastName = 'Doe';
      employee.email = 'john.doe@example.com';
      employee.departmentId = 5;
      employee.id = 1;

      jest
        .spyOn(employeeService, 'addNewEmployee')
        .mockImplementation(() => of(employee));
      //we are using the subscribe method of the Observable object returned by employeeController.
      //create to get the actual result, and then we are comparing it with the expected value employee.
      employeeController.create(employee).subscribe((result) => {
        expect(result).toEqual(employee);
      });
    });
  });

  describe('findAllEmployee', () => {
    it('should call the EmployeeService findAll method and return the result', async () => {
      const employeeModels = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'jdoe@example.com',
          departmentId: 1,
          department: {
            id: 1,
            name: 'Marketing'
          }
        },
        {
          id: 2,
          firstName: 'Sri',
          lastName: 'Ram',
          email: 'sram@example.com',
          departmentId: 5,
          department: {
            id: 5,
            name: 'HR'
          }
        }
      ];
      const findAllSpy = jest
        .spyOn(employeeService, 'listofAllEmployees')
        .mockImplementation(() => of(employeeModels));

      expect(await employeeController.findAllEmployee().toPromise()).toEqual(
        employeeModels
      );

      expect(findAllSpy).toHaveBeenCalled();
    });
  });
  /*
  describe('findEmployeeById', () => {
    it('should call the EmployeeService findOne method and return the result', async () => {
      const employeeModel = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'jdoe@example.com',
          departmentId: 1,
          department: {
            id: 1,
            name: 'Marketing'
          }
        }
      ];
      const findOneSpy = jest
        .spyOn(employeeService, 'findEmployeeById')
        .mockImplementation(() => of(employeeModel[0]));
      expect(await employeeController.findEmployeeById(1)).toEqual(
        employeeModel
      );
      expect(findOneSpy).toHaveBeenCalledWith(1);
    });
  });*/
});
