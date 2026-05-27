export class HealthService {
  public checkStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'All Services are up',
    };
  }
}
