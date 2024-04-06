import { Controller, Get, Param } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {

  constructor(private readonly reportService: ReportService) {}
  @Get('overview')
  async getDashboardOverview() {
    return await this.reportService.getDashboardData();
  }
  @Get('yearly/:year')
  async getYearlySalesData(@Param("year") year : number) {
    return await this.reportService.getYearlySalesData(year);
  }
}
