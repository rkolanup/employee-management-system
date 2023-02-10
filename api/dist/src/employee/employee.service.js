"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const rxjs_1 = require("rxjs");
const department_entity_1 = require("../department/department.entity");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository, departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }
    addNewEmployee(employeeModel) {
        return (0, rxjs_1.from)(this.employeeRepository.save(employeeModel));
    }
    listofAllEmployees() {
        return (0, rxjs_1.from)(this.employeeRepository.find({ relations: ['department'] }));
    }
    findEmployeeById(id) {
        return (0, rxjs_1.from)(this.employeeRepository.findOne({
            where: { id },
            relations: ['department']
        }));
    }
    async findByName(firstName, lastName) {
        return await this.employeeRepository.find({
            where: [
                { firstName: (0, typeorm_2.Like)(`%${firstName}%`) },
                { lastName: (0, typeorm_2.Like)(`%${lastName}%`) }
            ]
        });
    }
    updateEmployees(id, employeeModel) {
        return (0, rxjs_1.from)(this.employeeRepository.update(id, employeeModel));
    }
    deleteEmployee(id) {
        return (0, rxjs_1.from)(this.employeeRepository.delete(id));
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map