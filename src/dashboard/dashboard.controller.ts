import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/top_departments')
  getTopDepartments() {
    try {
      return this.dashboardService.topDepartments();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('/last_employees')
  getLast() {
    try {
      return this.dashboardService.lastEmployees();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
