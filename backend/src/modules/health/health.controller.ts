import type { Request, Response } from 'express';
import { HealthService } from './health.service.js';
import { ApiResponse } from '../../common/utils/api-response.js';

export class HealthController {
  private healthService: HealthService;

  constructor() {
    this.healthService = new HealthService();
  }

  public check = (req: Request, res: Response) => {
    const data = this.healthService.checkStatus();

    return ApiResponse.success(res, 'Health check passed', data);
  };
}
