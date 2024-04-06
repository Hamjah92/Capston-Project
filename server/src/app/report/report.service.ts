import { Inject, Injectable } from '@nestjs/common';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { ProductEntity } from '../product/entity/product.entity';
import { InvoiceEntity } from '../invoice/entity/Invoice.entity';
import { CONNECTION } from 'src/public/tenancy/tenancy.provider';
import { PurchaseEntity } from '../purchase/entity/purchase.entity';

@Injectable()
export class ReportService {
  private _invoiceRepository: Repository<InvoiceEntity>;
  private _purchaseRepository: Repository<PurchaseEntity>;
  private _productRepository: Repository<ProductEntity>;
  protected connection: Connection;

  private readonly _queryRunner: QueryRunner;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this._queryRunner = connection.createQueryRunner();
    this._invoiceRepository = connection.getRepository(InvoiceEntity);
    this._productRepository = connection.getRepository(ProductEntity);
    this._purchaseRepository = connection.getRepository(PurchaseEntity);
  }


  async getDashboardData(): Promise<any> {
    const totalSales = await this.getTotalSales();
    const totalPurchases = await this.getTotalPurchases();
    const salesOverTime = await this.getSalesOverTime();
    const purchasesOverTime = await this.getPurchasesOverTime();

    // Assume you have methods to calculate these or fetch from _mock if needed
    const salesProfit = totalSales - totalPurchases; // Simplified, adjust according to your actual logic

    return {
      totalSales,
      totalPurchases,
      salesProfit,
      salesOverTime,
      purchasesOverTime,
    };
  }

  async getYearlySalesData(year: number): Promise<any> {
    // Aggregating sales data
    const salesData = await this._invoiceRepository
      .createQueryBuilder('invoice')
      .select('EXTRACT(MONTH FROM invoice.invoiceDate)', 'month')
      .addSelect('SUM(invoice.netTotal)', 'totalSales')
      .where(`EXTRACT(YEAR FROM invoice.invoiceDate) = :year`, { year })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();



    // Aggregating purchase data
    const purchaseData = await this._purchaseRepository
      .createQueryBuilder('purchase')
      .select('EXTRACT(MONTH FROM purchase.purchaseDate)', 'month')
      .addSelect('SUM(purchase.netTotal)', 'totalPurchases')
      .where(`EXTRACT(YEAR FROM purchase.purchaseDate) = :year`, { year })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();



    return this.formatYearlyData(salesData, purchaseData, year);
  }

  private formatYearlyData(salesData: any[], purchaseData: any[], year: number): any {
    // Initialize an array to hold formatted data for all months
    const formattedData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalSales: 0,
      totalPurchases: 0,
    }));

    // Populate totalSales for each month
    salesData.forEach(item => {
      const index = parseInt(item.month) - 1;
      formattedData[index].totalSales = parseFloat(item.totalSales);
    });

    // Populate totalPurchases for each month
    purchaseData.forEach(item => {
      const index = parseInt(item.month) - 1;
      formattedData[index].totalPurchases = parseFloat(item.totalPurchases);
    });

    // Transform into the format expected by the YearlySales component
    const salesSeries = { name: 'Total Income', data: formattedData.map(d => d.totalSales) };
    const purchasesSeries = { name: 'Total Expenses', data: formattedData.map(d => d.totalPurchases) };

    return {
      salesSeries, purchasesSeries
    };
  }



  private async getTotalSales(): Promise<number> {
    const invoices = await this._invoiceRepository.find();
    return invoices.reduce((total, invoice) => total + Number(invoice.netTotal), 0);
  }

  private async getTotalPurchases(): Promise<number> {
    const purchases = await this._purchaseRepository.find();
    return purchases.reduce((total, purchase) => total + Number(purchase.netTotal), 0);
  }

  private async getSalesOverTime(): Promise<{ month: string, total: number }[]> {
    const invoices = await this._invoiceRepository.find({ select: ["invoiceDate", "netTotal"] });
    const monthlySales = new Map<string, number>();

    invoices.forEach(invoice => {
      const month = invoice.invoiceDate.toLocaleString('default', { month: 'short', year: 'numeric' });
      const total = Number(invoice.netTotal);
      monthlySales.set(month, (monthlySales.get(month) || 0) + total);
    });

    return Array.from(monthlySales, ([month, total]) => ({ month, total }));
  }

  private async getPurchasesOverTime(): Promise<{ month: string, total: number }[]> {
    const purchases = await this._purchaseRepository.find({ select: ["purchaseDate", "netTotal"] });
    const monthlyPurchases = new Map<string, number>();

    purchases.forEach(purchase => {
      const month = purchase.purchaseDate.toLocaleString('default', { month: 'short', year: 'numeric' });
      const total = Number(purchase.netTotal);
      monthlyPurchases.set(month, (monthlyPurchases.get(month) || 0) + total);
    });

    return Array.from(monthlyPurchases, ([month, total]) => ({ month, total }));
  }

}
