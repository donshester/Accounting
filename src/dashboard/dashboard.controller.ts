import {
  Controller,
  Get,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/top_departments')
  getTopDepartments() {
    return this.dashboardService.topDepartments();
  }

  @Get('/last_employees')
  getLast() {
    return this.dashboardService.lastEmployees();
  }
}
