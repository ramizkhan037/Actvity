class MonitoringService {
  async getSystemUsage(): Promise<{ cpuUsage: number; memoryUsage: number }> {
    return new Promise((resolve) => {      
      const cpuUsage = Math.random();
      const memoryUsage = Math.random();
      resolve({
        cpuUsage,
        memoryUsage,
      });
    })
  }
}

export default MonitoringService;